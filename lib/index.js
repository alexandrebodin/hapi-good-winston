import stream from 'stream';
import handlers from './handlers';

export const defaultLevels = {
    ops: 'debug',
    response: 'info',
    log: 'info',
    error: 'error',
    request: 'info',
};

// Creating a writableObjectStream prototype
const writableObjectStream = new stream.Writable({ objectMode: true });

// Creating a logger prototype
const loggerStream = Object.assign(Object.create(writableObjectStream), {
    _write(event, encoding, callback) {
        const {
            event: type,
        } = event;

        // If an handler is available for the event received call the handler and log the message it returns
        if (handlers[type]) {
            const payload = handlers[type](event);
            log(this.logger, this.levels[type], payload);
        }

        callback();
    },
});

/**
 * Logs a msg using a logger and a loggin level
 * @param  {Object} logger    winston logger
 * @param  {string} lvl       logging level
 * @param  {Object} payload   message payload containig eventual meta-data
 */
export function log(logger, lvl, payload) {
    const { msg = '', meta = '' } = payload;
    logger.log(lvl, msg, meta);
}


export function goodWinston(logger, { levels } = {}) {
    if (!logger || !logger.log || typeof logger.log !== 'function') throw new TypeError('You must pass a valid winston logger');

    // Instantiate a logger with loggerStream prototype and assign local properties logger and levels to the instance
    return Object.assign(Object.create(loggerStream), {
        logger,
        levels: levels ? Object.assign({}, defaultLevels, levels) : defaultLevels,
    });
}

export default goodWinston;
