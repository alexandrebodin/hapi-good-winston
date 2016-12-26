const log = {
    event: 'log',
    timestamp: 1458264810957,
    tags: ['log', 'info'],
    data: 'my data',
    pid: 64291,
};

const logObjData = {
    event: 'log',
    timestamp: 1458264810957,
    tags: ['log', 'info'],
    data: { param: [1, 'some data', false] },
    pid: 64291,
};

const ops = {
    event: 'ops',
    timestamp: 1458264810957,
    host: 'localhost',
    pid: 64291,
    os: {
        load: [1.650390625, 1.6162109375, 1.65234375],
        mem: { total: 17179869184, free: 8190681088 },
        uptime: 704891,
    },
    proc: {
        uptime: 6,
        mem: {
            rss: 30019584,
            heapTotal: 18635008,
            heapUsed: 9989304,
        },
        delay: 0.03084501624107361,
    },
    load: {
        requests: {},
        concurrents: {},
        responseTimes: {},
        listener: {},
        sockets: { http: {}, https: {} },
    },
};

const response = {
    event: 'response',
    timestamp: 1458264810957,
    id: '1458264811279:localhost:16014:ilx17kv4:10001',
    instance: 'http://localhost:61253',
    labels: [],
    method: 'post',
    path: '/data',
    query: {
        name: 'adam',
    },
    responseTime: 150,
    statusCode: 200,
    pid: 16014,
    httpVersion: '1.1',
    source: {
        remoteAddress: '127.0.0.1',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
        referer: 'http://localhost:61253/',
    },
};

const request = {
    event: 'request',
    timestamp: 1458264810957,
    tags: ['user', 'info'],
    data: 'you made a request',
    pid: 64291,
    id: '1419005623332:new-host.local:48767:i3vrb3z7:10000',
    method: 'get',
    path: '/',
};

const requestObjData = {
    event: 'request',
    timestamp: 1458264810957,
    tags: ['user', 'info'],
    data: [{route: '/call', query: 'a=1&b=2'}, 'payload'],
    pid: 64291,
    id: '1419005623332:new-host.local:48767:i3vrb3z7:10000',
    method: 'post',
    path: '/api/v1/call',
};

const error = {
    event: 'error',
    timestamp: 1458264810957,
    id: '1419005623332:new-host.local:48767:i3vrb3z7:10000',
    url: 'http://localhost/test',
    method: 'get',
    pid: 64291,
    error: {
        message: 'Just a simple error',
        stack: 'Error: Just a simple Error',
    },
};

export default {
    request,
    requestObjData,
    error,
    response,
    ops,
    log,
    logObjData,
};
