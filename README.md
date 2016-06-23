# hapi-good-winston

A good reporter to send and log events with winston

[![CircleCI](https://circleci.com/gh/alexandrebodin/hapi-good-winston.svg?style=svg)](https://circleci.com/gh/alexandrebodin/hapi-good-winston)

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
server.connection();

const options = {
    reporters: {
        winston: [goodWinston(winston)],
        winston2: [{
            module: 'hapi-good-winston',
            name: 'goodWinston',
            args: [winston],
        }],
    },
};

server.register({
    register: require('good'),
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
