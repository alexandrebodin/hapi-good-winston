import test from 'tape';
import handlers from '../lib/handlers';
import fixtures from './fixtures';
import { defaultLevels, log, goodWinston }  from '../lib';

test('check logLevels', t => {
    t.plan(5);

    t.equal(defaultLevels.ops, 'debug');
    t.equal(defaultLevels.log, 'info');
    t.equal(defaultLevels.error, 'error');
    t.equal(defaultLevels.request, 'info');
    t.equal(defaultLevels.response, 'info');
});

test('checking logging function', t => {
    t.plan(9);

    const genFakeLogger =  (expectedLvl, expectedMsg, expectedMeta) => {
        return {
            log(lvl, msg, meta) {
                t.equal(lvl, expectedLvl);
                t.equal(msg, expectedMsg);
                t.equal(meta, expectedMeta);
            },
        };
    };

    log(genFakeLogger('ops', 'my message', 'my meta'), 'ops', {
        msg: 'my message',
        meta: 'my meta',
    });

    log(genFakeLogger('ops', 'my message', ''), 'ops', {
        msg: 'my message',
    });

    log(genFakeLogger('ops', '', ''), 'ops', {});
});

test('checking stream instance', t => {
    t.plan(1);

    const fakeLogger = { log: () => {} };
    const stream = goodWinston(fakeLogger);

    t.equal(typeof stream.pipe, 'function');
});

test('checking throws if not logger or not log method on logger', t => {
    t.plan(6);

    const err = new TypeError('You must pass a valid winston logger');
    t.throws(goodWinston, err);
    t.throws(goodWinston.bind({}), err);
    t.throws(goodWinston.bind(() => {}), err);
    t.throws(goodWinston.bind({log: 'azd'}), err);
    t.throws(goodWinston.bind({log: 1}), err);
    t.throws(goodWinston.bind({log: {}}), err);
});

test('checking instance safety of loggers', t => {
    t.plan(2);

    const s1 = goodWinston({ log: () => {}});
    const s2 = goodWinston({ log: () => {}});

    t.equal(Object.getPrototypeOf(s1), Object.getPrototypeOf(s2));
    t.notEqual(s1.logger, s2.logger);
});

test('testing ops handler', t => {
    t.plan(1);

    const expected = {
        msg: 'memory: 29Mb, uptime: 6s, load: 1.650390625,1.6162109375,1.65234375',
    };

    t.deepEqual(handlers[fixtures.ops.event](fixtures.ops), expected);
});

test('testing log handler', t => {
    t.plan(1);

    const expected = {
        msg: `[log,info] my data`,
    };

    t.deepEqual(handlers[fixtures.log.event](fixtures.log), expected);
});

test('testing error handler', t => {
    t.plan(1);

    const expected = {
        meta: {
            message: 'Just a simple error',
            stack: 'Error: Just a simple Error',
        },
    };

    t.deepEqual(handlers[fixtures.error.event](fixtures.error), expected);
});


test('testing request handler', t => {
    t.plan(1);

    const expected = {
        msg: `[user,info] GET / you made a request`,
    };

    t.deepEqual(handlers[fixtures.request.event](fixtures.request), expected);
});

test('testing response handler', t => {
    t.plan(1);

    const expected = {
        msg: `http://localhost:61253: POST /data {"name":"adam"} 200 (150ms)`,
    };

    t.deepEqual(handlers[fixtures.response.event](fixtures.response), expected);
});


test('testing custom log levels', t => {
    t.plan(1);

    const expectedLogLevels = {
        ops: 'silly',
        response: 'silly',
        log: 'silly',
        error: 'silly',
        request: 'silly',
    };

    const stream = goodWinston({ log: () => {}}, { levels: expectedLogLevels });
    t.deepEqual(stream.levels, expectedLogLevels);
});
