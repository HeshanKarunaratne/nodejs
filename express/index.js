const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require("config");
const Joi = require('joi');
const morgan = require('morgan');
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

startupDebugger("Startup Enabled");
dbDebugger("DB Enabled");

app.get("/", (req, res) => {
    res.render('index', { title: "My Express App", message: "Hello" })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));