const path = require('path');
const express = require('express');
const multer = require('multer');
const config = require("../config");
const nanoid = require("nanoid");
const mysqlDb = require("../mysqlDb");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req,res)=>{
  const officetools =  await mysqlDb.getConnection().query('SELECT * FROM `officetools`');
   res.send(officetools)
});

router.get('/:id', async (req,res)=>{
    const id = req.params.id;
    const tools = await mysqlDb.getConnection().query('SELECT * FROM `officetools` WHERE `id` = ? ', id);
    res.send(tools)
});

router.delete('/:id', async (req,res)=>{
    const id = req.params.id;
    await mysqlDb.getConnection().query('DELETE FROM `officetools` WHERE `id` = ?', id);
    res.send("Deleted")
});

router.put('/:id',upload.single('image'), async (req,res)=>{
    const id = req.params.id;
    const tools = req.body;
    await mysqlDb.getConnection().query('UPDATE `officetools` ' +
        'SET `name` = ?, `description` = ?, `category_id` = ?, `location_id` = ? , `image` = ?  WHERE `id` = ?',
        [tools.name, tools.description, tools.category, tools.location, tools.image, id]
    );
    res.send('Ok')
});

router.post('/', upload.single('image'), async (req, res) => {
    const tools = {
        name: req.body.name,
        description: req.body.description,
        image: req.file.filename,
        category: req.body.category,
        location: req.body.location
    };

    await mysqlDb.getConnection().query(
        'INSERT INTO `officetools` (`category_id`, `location_id`, `name`, `description`, `image`)' +
        'VALUES (?,?,?,?,?)',
        [tools.category, tools.location, tools.name, tools.description, tools.image]
    );
    res.send('OK')
});

module.exports = router;