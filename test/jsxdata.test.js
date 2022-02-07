const tape = require('tape')
const vtyx = require('..');

/* Test conversions from plain data to VNode data structure of Vue 2.X */

tape.test('must transform "on" event in "onFoo"', (t) => {
    const f = () => {};
    const data = { on: { 'click': f } };
    const res = vtyx.h('span', data);

    t.deepEqual(res.props, { onClick: f });
    t.end();
});

tape.test('must keep "onFoo" object', (t) => {
    const cb = () => {};
    const data = { 'onClick': cb, 'onFoo': cb };
    const res = vtyx.h('span', data);

    t.deepEqual(res.props, {
        'onClick': cb,
        'onFoo': cb,
    });
    t.end();
});

tape.test('must handle both "onFoo" and "on" keys together', (t) => {
    const cb = () => {};
    let res = vtyx.h('span', {
        'onClick': cb,
        'on': { 'foo': cb },
        'onBar': cb
    });

    t.deepEqual(res.props, {
        'onClick': cb,
        'onFoo': cb,
        'onBar': cb,
    });

    res = vtyx.h('span', {
        'on': { 'foo': cb },
        'onClick': cb,
        'onBar': cb,
    });

    t.deepEqual(res.props, {
        'onFoo': cb,
        'onClick': cb,
        'onBar': cb,
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

    const res = vtyx.h('span', data);

    t.ok(res.props.onClick);

    let prevented = false;
    const evt = { 'preventDefault': () => prevented = true };

    res.props.onClick(evt);
    t.ok(prevented);
    t.equal(cb.data.clicked, 1);

    t.end();
});

tape.test('must handle stop', (t) => {
    const cb = spy();
    const data = { on: { 'click.stop': cb } };

    const res = vtyx.h('span', data);
    t.ok(res.props.onClick);

    let stopped = false;
    const evt = { 'stopPropagation': () => stopped = true };
    res.props.onClick(evt);

    t.ok(stopped);
    t.equal(cb.data.clicked, 1);

    t.end();
});

tape.test('must handle multiple modifiers', (t) => {
    const cb = spy();
    const data = { on: { 'click.stop.prevent': cb } };

    const res = vtyx.h('span', data);
    t.ok(res.props.onClick);

    let stopped = false;
    let prevented = false;
    const evt = {
        'stopPropagation': () => stopped = true,
        'preventDefault': () => prevented = true
    };
    res.props.onClick(evt);

    t.ok(stopped);
    t.ok(prevented);
    t.equal(cb.data.clicked, 1);

    t.end();
});

tape.test('must throw on unknown modifier', (t) => {
    const data = { on: { 'click.foo': () => {} } };

    t.throws(
        () => vtyx.h('span', data),
        /unknown event modifier: foo/
    );
    t.end();
});

tape.test('for input', (t) => {
    const data = { value: 'a', style: 'b' };

    let res = vtyx.h('span', data);
    t.deepEqual(res.props, {
        value: 'a',
        style: 'b',
    });

    res = vtyx.h('input', data);
    t.deepEqual(res.props, {
        style: 'b',
        value: 'a',
    });

    res = vtyx.h('input', { checked: true });
    t.deepEqual(res.props, {
        checked: true,
    });

    t.end();
});

tape.test('must handle "key" special attribute', (t) => {
    const data = { key: '1' };

    const res = vtyx.h('span', data);
    t.deepEqual(res.props, {
        key: '1'
    });

    t.end();
});

tape.test('must handle v-show directive differently', (t) => {
    const data = { 'v-show': true };

    const res = vtyx.h('span', data);
    t.notDeepEqual(res.props, {
        'v-show': true,
    });

    t.end();
});

tape.test('must handle slot name differently', (t) => {
    const data = { slot: 'foo' };

    const res = vtyx.h('div', data);
    t.notDeepEqual(res.props, {
        slot: 'foo',
    });

    t.end();
});

tape.test('must handle scoped slots', (t) => {
    const cb = () => {};
    const data = {
        scopedSlots: { default: cb },
    };

    const res = vtyx.h('div', data);

    t.deepEqual(res.props, {
        scopedSlots: { default: cb }
    });

    t.end();
});

tape.test('must handle v-html directive', (t) => {
    const data = { 'v-html': '<span>test</span>' };

    const res = vtyx.h('span', data);
    t.deepEqual(res.props, {
        'innerHTML': '<span>test</span>'
    });

    t.end();
});

tape.test('must clean args of DOM elements', (t) => {
    const res = vtyx.h('span', null, false);

    t.equal(res.type, 'span');
    t.equal(res.children, null);

    t.end();
});
