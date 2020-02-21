const express = require('express');
const mysqlDb = require("../mysqlDb");
const router = express.Router();

router.get('/', async (req, res) => {
    const tools = await mysqlDb.getConnection().query('SELECT * FROM `category`');
    res.send(tools)
});


module.exports = router;