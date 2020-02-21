const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;
app.use(cors());

const officeTools = require('./app/officeTools');
const category = require('./app/category');
const mysqlDb = require("./mysqlDb");
const location = require('./app/location');


app.use('/officetools', officeTools);
app.use('/category', category);
app.use('/location', location);




app.use(express.json());
app.use(express.static('public'));

const run = async () =>{
    await mysqlDb.connect();

    app.listen(port);

    process.on('exit', ()=>{
        mysqlDb.disconnect()
    })
};

run().catch(err=> {
    console.error(err)
});

