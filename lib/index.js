import stream from 'stream';
import handlers from './handlers';

export const logLvl = {
    ops: 'debug',
    response: 'info',
    log: 'info',
    error: 'error',
    request: 'info',
};

export function log(logger, lvl, payload) {
    const { msg = '', meta = '' } = payload;
    logger.log(lvl, msg, meta);
}

const writableObjectStream = new stream.Writable({ objectMode: true });
const loggerStream = Object.assign(Object.create(writableObjectStream), {
    _write(event, encoding, callback) {
        const {
            event: type,
        } = event;

        if (handlers[type]) {
            const payload = handlers[type](event);
            log(this.logger, logLvl[type], payload);
        }

        callback();
    },
});


export default function goodWinston(logger) {
    if (!logger || !logger.log || typeof logger.log !== 'function') throw new Error('You must pass a valid winston logger');

    return Object.assign(Object.create(loggerStream), { logger });
}

export {
    goodWinston,
};
