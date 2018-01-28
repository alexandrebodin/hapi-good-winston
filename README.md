# hapi-good-winston

A good reporter to send and log events with winston

[![npm](https://img.shields.io/npm/v/hapi-good-winston.svg?style=flat-square)](https://www.npmjs.com/package/hapi-good-winston)
[![npm](https://img.shields.io/npm/dm/hapi-good-winston.svg?style=flat-square)](https://www.npmjs.com/package/hapi-good-winston)
[![license](https://img.shields.io/github/license/alexandrebodin/hapi-good-winston.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[![CircleCI](https://img.shields.io/circleci/project/alexandrebodin/hapi-good-winston.svg?style=flat-square)](https://circleci.com/gh/alexandrebodin/hapi-good-winston)
[![Dependency Status](https://dependencyci.com/github/alexandrebodin/hapi-good-winston/badge?style=flat-square)](https://dependencyci.com/github/alexandrebodin/hapi-good-winston)

[![Issues](https://img.shields.io/github/issues-raw/alexandrebodin/hapi-good-winston.svg?style=flat-square)](https://github.com/alexandrebodin/hapi-good-winston/issues)
[![PR](https://img.shields.io/github/issues-pr-raw/alexandrebodin/hapi-good-winston.svg?style=flat-square)](https://github.com/alexandrebodin/hapi-good-winston/pulls)

## Installation

```bash
$ npm install --save hapi-good-winston
```

## Usage

```javascript
import { Server } from 'hapi';
import winston from 'winston';
import goodWinston from 'hapi-good-winston';

const server = new Server();

// Set winston minimum log level to debug
winston.level = 'debug';

 // Only the 'response' and 'error' event levels will be overwritten
const goodWinstonOptions = {
    levels: {
        response: 'debug',
        error: 'info',
    }
};

const options = {
    reporters: {
        // Simple and straight forward usage
        winston: [goodWinston(winston)],

        // Adding some customization configuration
        winstonWithLogLevels: [goodWinston(winston, goodWinstonOptions)],

        // This example simply illustrates auto loading and instantiation made by good
        winston2: [{
            module: 'hapi-good-winston',
            name: 'goodWinston',
            args: [winston, goodWinstonOptions],
        }],
    },
};

server.register({
    plugin: require('good'),
    options,
}, (err) => {

    if (err) {
        return console.error(err);
    }
    server.start(() => {
        console.info(`Server started at ${server.info.uri}`);
    });

});
```

# Links

- [Hapi](https://github.com/hapijs/hapi)
- [Good](https://github.com/hapijs/good)
- [Winston](https://github.com/winstonjs/winston)

# License

[MIT](LICENSE)
