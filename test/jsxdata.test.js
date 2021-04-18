const tape = require('tape')
const vtyx = require('..');

/* Test conversions from plain data to VNode data structure of Vue 2.X */

tape.test('must keep "on" object', (t) => {
    const data = { on: { 'click': () => {} } };
    const res = vtyx.linearData2VNodeData(data, 'span');

    t.deepEqual(res, data);
    t.end();
});

tape.test('must put "onFoo" key in "on" object', (t) => {
    const cb = () => {};
    const data = { 'onClick': cb, 'onFoo': cb };
    const res = vtyx.linearData2VNodeData(data, 'span');

    t.deepEqual(res, {
        'on': {
            'click': cb,
            'foo': cb,
        }
    });
    t.end();
});

tape.test('must handle both "onFoo" and "on" keys together', (t) => {
    const cb = () => {};
    let res = vtyx.linearData2VNodeData({
        'onClick': cb,
        'on': { 'foo': cb },
        'onBar': cb
    }, 'span');

    t.deepEqual(res, {
        'on': {
            'click': cb,
            'foo': cb,
            'bar': cb
        }
    });

    res = vtyx.linearData2VNodeData({
        'on': { 'foo': cb },
        'onClick': cb,
        'onBar': cb
    }, 'span');

    t.deepEqual(res, {
        'on': {
            'foo': cb,
            'click': cb,
            'bar': cb
        }
    });
    t.end();
});

const spy = () => {
    const data = { clicked: 0 };
    const cb = () => data.clicked++;
    cb.data = data;

    return cb;
};

tape.test('must handle prevent', (t) => {
    const cb = spy();
    const data = { on: { 'click.prevent': cb } };

    const res = vtyx.linearData2VNodeData(data, 'span');

    t.ok(res.on.click);

    let prevented = false;
    const evt = { 'preventDefault': () => prevented = true };

    res.on.click(evt);
    t.ok(prevented);
    t.equal(cb.data.clicked, 1);

    t.end();
});

tape.test('must handle stop', (t) => {
    const cb = spy();
    const data = { on: { 'click.stop': cb } };

    const res = vtyx.linearData2VNodeData(data, 'span');
    t.ok(res.on.click);

    let stopped = false;
    const evt = { 'stopPropagation': () => stopped = true };
    res.on.click(evt);

    t.ok(stopped);
    t.equal(cb.data.clicked, 1);

    t.end();
});

tape.test('must handle multiple modifiers', (t) => {
    const cb = spy();
    const data = { on: { 'click.stop.prevent': cb } };

    const res = vtyx.linearData2VNodeData(data, 'span');
    t.ok(res.on.click);

    let stopped = false;
    let prevented = false;
    const evt = {
        'stopPropagation': () => stopped = true,
        'preventDefault': () => prevented = true
    };
    res.on.click(evt);

    t.ok(stopped);
    t.ok(prevented);
    t.equal(cb.data.clicked, 1);

    t.end();
});

tape.test('must throw on unknown modifier', (t) => {
    const data = { on: { 'click.foo': () => {} } };

    t.throws(
        () => vtyx.linearData2VNodeData(data, 'span'),
        /unknown event modifier: foo/
    );
    t.end();
});

tape.test('for input', (t) => {
    const data = { value: 'a', style: 'b' };

    let res = vtyx.linearData2VNodeData(data, 'span');
    t.deepEqual(res, {
        attrs: { value: 'a', style: 'b' }
    });

    res = vtyx.linearData2VNodeData(data, 'input');
    t.deepEqual(res, {
        attrs: { style: 'b' },
        domProps: { value: 'a' }
    });

    res = vtyx.linearData2VNodeData({ checked: true }, 'input');
    t.deepEqual(res, {
        domProps: { checked: true }
    });

    t.end();
});

tape.test('must handle "key" special attribute', (t) => {
    const data = { key: '1' };

    const res = vtyx.linearData2VNodeData(data, 'span');
    t.deepEqual(res, {
        key: '1'
    });

    t.end();
});

tape.test('must handle v-show directive', (t) => {
    const data = { 'v-show': true };

    const res = vtyx.linearData2VNodeData(data, 'span');
    t.deepEqual(res, {
        directives: [{
            name: 'show',
            value: true,
        }]
    });

    t.end();
});

tape.test('must handle slot name', (t) => {
    const data = { slot: 'foo' };

    const res = vtyx.linearData2VNodeData(data, 'div');
    t.deepEqual(res, {
        slot: 'foo',
    });

    t.end();
});

tape.test('must handle scoped slots', (t) => {
    const cb = () => {};
    const data = {
        scopedSlots: { default: cb },
    };

    const res = vtyx.linearData2VNodeData(data, 'div');

    t.deepEqual(res, {
        scopedSlots: { default: cb }
    });

    t.end();
});

tape.test('must handle v-html directive', (t) => {
    const data = { 'v-html': '<span>test</span>' };

    const res = vtyx.linearData2VNodeData(data, 'span');
    t.deepEqual(res, {
        domProps: {
            innerHTML: '<span>test</span>'
        }
    });

    t.end();
});
