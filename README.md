# hapi-good-winston

A good reporter to send and log events with  winston

## Installation

```bash
$ npm install --save winston
$ npm install --save hapi-good-winston
```

## Usage

```javascript
const Hapi = require('hapi');
const winston = require('winston');
const goodWinston =  require('hapi-good-winston');
const server = new Hapi.Server();
server.connection();

const options = {
    reporters: {
        winston: [goodWinston(winston)],
    }
};

server.register({
    register: require('good'),
    options,
}, (err) => {

    if (err) {
        return console.error(err);
    }
    server.start(() => {
        console.info(`Server started at ${ server.info.uri }`);
    });

});
```
