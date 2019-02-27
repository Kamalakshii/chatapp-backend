const express = require('express');
const bodyParser = require('body-parser');
const router = require("./api/routes/router")

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
//TO perform validations
var expressValidator = require('express-validator');
app.use(expressValidator());
const databaseConfig = require("../Server/configuration/database.configuration");
const mongoose = require("mongoose");
mongoose.Promise=global.Promise;
require('dotenv').config();
mongoose
.connect(databaseConfig.url,{useNewUrlParser:true})
.then(()=>{
console.log("Successfully connected to the database");
})
.catch(err => {
    console.log("could not connect to the database.Exiting now...",err);
    process.exit();
});
    app.use("/",router);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to chat-app"});
});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
module.exports = app;