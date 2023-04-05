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