require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {dbService} = require('./services/dbservice');
const app = express();

const keys = require('./settings/keys');
app.set('key', keys.key);
app.use(express.urlencoded({extended:false}));


app.use(bodyParser.json());

require('./routes')(app, dbService());

app.listen(3000,function () { 
    console.log('App escuhando en puerto 3000');
});