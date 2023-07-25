# NodeJS

- A runtime environment for executing Javascript code

- Check versions
~~~text
node --version
~~~

~~~js
function sayHello(name) {
    console.log("Hello " + name);
}

sayHello("heshan");
~~~

- Node doesn't support window
- NPM

- Exporting a module
~~~js
function add(a, b) {
    return a + b;
}

module.exports = { add };
~~~

~~~js
const { add } = require('./logger');
console.log(add(2, 3));
~~~

- Path Module
~~~js
const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);
~~~

- OS Module
~~~js
const os = require('os');
const free = os.freemem();
const total = os.totalmem();
console.log(free);
console.log(total);
~~~

- File Module: Always prefer asynchrounous
~~~js
const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);

fs.readdir('./', function (err, files) {
    if (err) console.log("Error", err);
    else console.log("Results", files)
});
~~~

- Event Module
~~~js
const EventEmitter = require('events');
const emitter = new EventEmitter();
// Register a Listener
emitter.on("logged", function () {
    console.log("Listener called");
})
// Raise an event
emitter.emit("logged");
~~~

- Event Arguments
~~~js
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on("logged", arg => console.log("Listener called", arg))

emitter.emit("logged", { id: 1, name: 'name1' });
emitter.emit("logged", { id: 2, name: 'name2' });
~~~

- Extending EventEmitter
~~~js
const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit("logged", { id: 1, name: 'name1' });
    }
}

module.exports = Logger;
~~~

~~~js
const Logger = require('./logger');
const logger = new Logger();

logger.on("logged", arg => console.log("Listener called", arg));
logger.log("message");
~~~

- Http Module: not the recommended way
~~~js
const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("Hello World");
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);
console.log("listenting on port 3000");
~~~

- Node Package Manager
- Before adding any node packages you need to have a package.json file
    - npm init --yes

- require() function works
1. Checks whether its a Core Module 
2. If not checks whether it starts with './' for File or Folder
3. Finally checks the node_modules

- Using 3rd party node_modules
~~~js
var _ = require("underscore");
var result = _.contains([1, 2, 3], 3);
console.log(result);
~~~

- Semantic Versioning
    - 4.13.6: Major.Minor.Patch
    - \^ : Interests in Minor version : 4.x
    - \~ : Interests in Patch version : 4.13.x

- npm list

- Show all the dependencies with their versions
    - npm view {dependency_name} dependencies

- Can identify all the versions for a dependency
    - npm view {dependency_name} versions

- Installing a specific version
    - npm i mongoose@2.4.2

- Update to Wanted  with current major version
    - npm update

- Checks for outdated dependencies
    - npm outdated

- Adding dev dependencies
    - npm i {dep_name} --save-dev

- Uninstalling a dependency
    - npm un {dep_name}

- Updating npm version
    - npm version minor
    - npm publish

# Rest Services

- Installing express
    - npm i express

- Setting express
~~~js
const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(3000, ()=>console.log("Listening on port 3000..."));
~~~

- Add nodemon
    - npm i -g nodemon
    
- Listening using nodemon
    - nodemon index.js

- Add port dynamically
~~~js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
~~~

- Route Parameters: for Required fields 
- Query Strings: for optional fields

- GET Endpoints
~~~js
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID not found");

    res.send(course);
});
~~~

- POST Endpoint

- To enable json middleware need to add below line in the code
~~~js
app.use(express.json());
~~~

~~~js
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});
~~~

- Installing joi
    - npm i joi

- All the Endpoints
~~~js
const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: "courses1" },
    { id: 2, name: "courses2" },
    { id: 3, name: "courses3" }
];

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID not found");

    res.send(course);
});

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Not Found
    if (!course) return res.status(404).send("The course with the given ID not found");


    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error);

    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Not Found
    if (!course) return res.status(404).send("The course with the given ID not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
~~~

- Middleware Functions
~~~js
// log.js
function log(req, res, next) {
    console.log("Logging...");
    next();
}

module.exports = log;

// index.js
const express = require("express");
const log = require('./logger');
const auth = require('./auth');
const app = express();

app.use(express.json());
app.use(log);
app.use(auth);
~~~

- Built in Middlewares in node
~~~js
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Enable url encoded requests eg: key1=value1&key2=value2
app.use(express.static("public")); // Enable static file hosting
~~~

- Enabling Morgan for development
~~~js
const morgan = require('morgan');
const express = require("express");
const app = express();

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log("Morgan Enabled");
}
~~~

- Logging using debug dependencies
- set DEBUG=app:startup
~~~js
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

startupDebugger("Startup Enabled");
dbDebugger("DB Enabled");
~~~

- Template Engines: using pug
~~~js
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", (req, res) => {
    res.render('index', { title: "My Express App", message: "Hello" })
})
~~~

~~~pug
html 
    head
        title= title 
    body 
        h2= message
~~~