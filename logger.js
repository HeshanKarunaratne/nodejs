const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit("logged", { id: 1, name: 'name1' });
    }
}

module.exports = Logger;