const express = require('express');
const mysqlDb = require("../mysqlDb");
const router = express.Router();

router.get('/', async (req,res)=>{
   const location = await mysqlDb.getConnection().query('SELECT * FROM `location`')
    res.send(location)
});

module.exports = router;