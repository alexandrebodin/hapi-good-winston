import stream from 'stream';

const writableObjectStream = new stream.Writable({ objectMode: true });

const loggingLevelsMapping = {
    ops: 'debug',
    response: 'info',
    log: 'info',
    error: 'error',
    request: 'info',
};

// event loggers

const internals = {
    log(logger, type, {tags, msg, meta = ''}) {
        const lvl = loggingLevelsMapping[type];
        let output = msg;

        if (tags) output += `[${tags}] `;

        logger.log(lvl, `${msg}`, meta);
    },
};

const loggers = {
    serverLog(logger, event) {
        const data = {
            timestamp: event.timestamp,
            tags: event.tags,
            msg: event.data,
        };
        internals.log(logger, event.event, data);
    },

    requestError(logger, event) {
        const data = {
            timestamp: event.timestamp,
            msg: ``,
            meta: event.error,
        };
        internals.log(logger, event.event, data);
    },

    requestSent(logger, event) {
        const data = {
            timestamp: event.timestamp,
            msg: `${event.instance}: ${event.method.toUpperCase()} ${event.path} ${JSON.stringify(event.query)} ${event.statusCode} (${event.responseTime}ms)`,
        };
        internals.log(logger, event.event, data);
    },

    ops(logger, event) {
        const mem = Math.round(event.proc.mem.rss / (1024 * 1024));
        const uptime = event.proc.uptime;
        const load = event.os.load;

        const data = {
            timestamp: event.timestamp,
            msg: `memory: ${mem}Mb, uptime: ${uptime}s, load: ${load}`,
        };
        internals.log(logger, event.event, data);
    },

    requestLog(logger, event) {
        const data = {
            timestamp: event.timestamp,
            tags: event.tags,
            msg: `${event.method} ${event.data}`,
        };
        internals.log(logger, event.event, data);
    },
};

// Defaults

const eventMapping = {
    ops: loggers.ops,
    response: loggers.requestSent,
    log: loggers.serverLog,
    error: loggers.requestError,
    request: loggers.requestLog,
};

export default function goodWinston(logger) {
    return Object.assign(Object.create(writableObjectStream), {
        _write(chunk, encoding, callback) {
            if (eventMapping[chunk.event]) eventMapping[chunk.event](logger, chunk);
            callback();
        },
    });
}
