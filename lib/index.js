'use strict';

const stream = require('stream');
const writableObjectStream = stream.Writable({ objectMode: true });

const goodWinston = function(winston) {
    return Object.assign(Object.create(writableObjectStream), {
        _write(chunk, encoding, callback) {
            winston.info(chunk);
            callback();
        },
    });
};

module.exports = goodWinston;
