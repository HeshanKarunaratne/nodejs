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