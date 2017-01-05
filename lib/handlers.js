import stringify from 'json-stringify-safe';

function dataToString(data) {
    const dataType = typeof data;
    let result;
    if (data && dataType === 'object') {
        result = stringify(data);
    } else if (dataType === 'undefined') {
        result = '';
    } else {
        result = String(data);
    }
    return result;
}

const handlers = {
    ['log']: event => ({
        msg: `[${event.tags}] ${dataToString(event.data)}`,
    }),

    ['error']: event => ({
        meta: event.error,
    }),

    ['response']: event => ({
        msg: `${event.instance}: ${event.method.toUpperCase()} ${event.path} ${JSON.stringify(event.query)} ${event.statusCode} (${event.responseTime}ms)`,
    }),

    ['ops']: event => {
        const mem = Math.round(event.proc.mem.rss / (1024 * 1024));
        const uptime = event.proc.uptime;
        const load = event.os.load;

        return {
            msg: `memory: ${mem}Mb, uptime: ${uptime}s, load: ${load}`,
        };
    },

    ['request']: event => ({
        msg: `[${event.tags}] ${event.method.toUpperCase()} ${event.path} ${dataToString(event.data)}`,
    }),
};

export default handlers;
