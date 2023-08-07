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

- Callback functions
~~~js
console.log("Before");
getUser(1, function (user) {
    getRepos(user.gitHubUsername, function (repos) {
        getCommits(repos[0], function (commits) {
            console.log(commits);
        });
    });

});
console.log("After");

function getUser(id, callback) {
    return new Promise((resolve, reject)=> {
    setTimeout(() => {
        console.log("Reading a user from database....");
        callback({ id, gitHubUsername: 'mosh' })
    }, 2000);
    });    
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log("Reading from getRepos: " + username);
        callback(['repo1', 'repo2']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log("Reading commits for: " + repo);
        callback("commitId1");
    }, 2000);
}
~~~

- Getting rid of Callback Hell
~~~js
console.log("Before");
getUser(1, getRepository);
console.log("After");

function getRepository(user) {
    getRepositories(user.gitHubUsername, getCommit);
}

function getCommit(repos) {
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from database....");
        callback({ id, gitHubUsername: 'mosh' })
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log("Reading from getRepos: " + username);
        callback(['repo1', 'repo2']);
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log("Reading repo for commits: " + repo);
        callback({ commit: 'g2342sgf' })
    }, 2000);
}
~~~

- Promises
~~~js
const p = new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
        // resolve(1);
        reject(new Error("message"));
    }, 2000);


});

p
.then(result => console.log("Result is: " + result))
.catch(error => console.log(error));
~~~

- Promises
~~~js
console.log("Before");

getUser(1)
    .then(user => getRepos(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log(commits))
    .catch(error => console.log("Error", error.message));

console.log("After");


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from database....");
            resolve({ id, gitHubUsername: 'mosh' })
        }, 2000);
    });
}

function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading from getRepos: " + username);
            resolve(['repo1', 'repo2']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading commits for: " + repo);
            resolve("commitId1");
        }, 2000);
    });
}
~~~

- Always use Error object when dealing with promise rejects: You will see the error call stack
~~~js
const p = Promise.reject(new Error("Reason for rejection"));
p.catch(err => console.log(err));
~~~

- Multiple Promises
~~~js
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async Operation 1");
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async Operation 2");
        resolve(2)
    }, 2000);
});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log(err));
~~~

- Async/Await
~~~js
console.log("Before");
displayCommits();
console.log("After");

async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepos(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log("An Error occurred", err);
    }

}

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from database....");
            resolve({ id, gitHubUsername: 'mosh' })
        }, 2000);
    });
}

function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading from getRepos: " + username);
            resolve(['repo1', 'repo2']);
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading commits for: " + repo);
            resolve("commitId1");
            // reject(new Error("Error"));
        }, 2000);
    });
}
~~~

- Creating a schema using mongoose
~~~js
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log("Connected to MongoDB.."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date, default: Date.now
    },
    isPublished: Boolean
})
~~~

- Create the model
~~~js
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: "Node.js Course",
    author: "Mosh",
    tags: ['node', 'backend'],
    isPublished: true
});
~~~

- Add a course
~~~js
async function createCourse() {
    const course = new Course({
        name: "Angular Course",
        author: "Mosh",
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}
createCourse();
~~~

- Get all courses
~~~js
async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}
getCourses();
~~~

- Filtering
~~~js
async function getCourses() {
    const courses = await Course
    .find({ name: "Node.js Course" })
    .limit(10)
    .sort({name: 1});
    console.log(courses);
}
getCourses();
~~~

- Ascending(1) and descending(-1)
~~~js
async function getCourses() {
    const courses = await Course.find().limit(10).sort({ name: -1 });
    console.log(courses);
}
getCourses();
~~~

- Get certain fields only
~~~js
async function getCourses() {
    const courses = await Course.find().limit(10).sort({ name: -1 }).select({ name: 1, tags: 1 });
    console.log(courses);
}
getCourses();
~~~

- Comparison Operators
~~~js
async function getCourses() {
    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than or equal to)
    //lt (less than)
    //lte (less than or equal to)
    //in
    //nin
    const courses = await Course
        // .find({ price: { $gte: 10, $lte: 20 } })
        .find({ price: { $gte: 10, $lte: 20 } })
        .limit(10)
        .sort({ name: -1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
getCourses();
~~~