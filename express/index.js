const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses')
const home = require('./routes/home')
const config = require("config");
const Joi = require('joi');
const morgan = require('morgan');
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

startupDebugger("Startup Enabled");
dbDebugger("DB Enabled");

app.use(express.json());
app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));