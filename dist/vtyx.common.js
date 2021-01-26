'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vueClassComponent = require('vue-class-component');
var _Vue = require('vue');
var vuePropertyDecorator = require('vue-property-decorator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var vueClassComponent__default = /*#__PURE__*/_interopDefaultLegacy(vueClassComponent);
var _Vue__default = /*#__PURE__*/_interopDefaultLegacy(_Vue);

// tslint:disable:no-bitwise
/* {{{ Event modifiers */
var EventModifiers;
(function (EventModifiers) {
    EventModifiers[EventModifiers["None"] = 0] = "None";
    EventModifiers[EventModifiers["Prevent"] = 2] = "Prevent";
    EventModifiers[EventModifiers["Stop"] = 4] = "Stop";
})(EventModifiers || (EventModifiers = {}));
function applyModifiers(cb, modifiers) {
    return (evt, ...args) => {
        if (modifiers & EventModifiers.Prevent) {
            evt.preventDefault();
        }
        if (modifiers & EventModifiers.Stop) {
            evt.stopPropagation();
        }
        cb(evt, ...args);
    };
}
function handleEventModifiers(events) {
    const keys = Object.keys(events);
    const newEvents = {};
    for (const key of keys) {
        let cb = events[key];
        const elems = key.split('.');
        const name = elems.shift();
        if (elems.length > 0) {
            let modifiers = EventModifiers.None;
            for (const modifier of elems) {
                switch (modifier) {
                    case 'prevent':
                        modifiers |= EventModifiers.Prevent;
                        break;
                    case 'stop':
                        modifiers |= EventModifiers.Stop;
                        break;
                    default:
                        throw new Error('unknown event modifier: ' + modifier);
                }
            }
            cb = applyModifiers(cb, modifiers);
        }
        newEvents[name] = cb;
    }
    return newEvents;
}
/* }}} */
/* For some elements, the bindings must be done on the dom properties, and
 * not the elements attributes. See `mustUseProp` in vue.js file */
function mustUseDomProps(tag, key, type) {
    /* XXX: non public function, not typed, and can break on update */
    return Vue.config.mustUseProp(tag, type, key);
}
/* Partial convertion to VNodeData
 *
 * Typescript JSX translation is raw:
 *   <Toto a=b c=d class='ic-hidden'>
 *     => h('Toto', { a: b, c: d})
 * Vue requires the data to be organised in several parts:
 *   <Toto a=b c=d class='ic-hidden'>
 *     => h('Toto, { attrs: { a: b, c: d }, class: { 'ic-hidden': true } })
 *
 * This function is responsible for this translation.
 */
function linearData2VNodeData(inData, tag) {
    const vData = {};
    const keys = Object.keys(inData);
    for (const key of keys) {
        if (key === 'on') {
            const value = inData[key];
            if (vData.on === undefined) {
                vData.on = {};
            }
            vData.on = Object.assign(Object.assign({}, vData.on), handleEventModifiers(value));
        }
        else if (key.startsWith('on')) {
            const cbKey = key.slice(2).toLowerCase();
            if (vData.on === undefined) {
                vData.on = {};
            }
            vData.on[cbKey] = inData[key];
        }
        else if (key === 'class') {
            const value = inData[key];
            if (typeof value === 'object') {
                vData.class = value;
            }
            else {
                vData.class = {};
                vData.class[value] = true;
            }
        }
        else if (key === 'ref') {
            vData.ref = inData[key];
        }
        else if (key === 'key') {
            vData.key = inData[key];
        }
        else if (key.startsWith('v-')) {
            if (!Array.isArray(vData.directives)) {
                vData.directives = [];
            }
            const directive = key.slice(2);
            /* XXX: arg and modifiers won't be used currently */
            vData.directives.push({
                name: directive,
                value: inData[key],
            });
        }
        else if (key === 'slot') {
            vData.slot = inData[key];
        }
        else if (key === 'scopedSlots') {
            vData.scopedSlots = inData[key];
        }
        else {
            if (mustUseDomProps(tag, key, inData.type)) {
                const domProps = vData.domProps || (vData.domProps = {});
                domProps[key] = inData[key];
            }
            else {
                const attrs = vData.attrs || (vData.attrs = {});
                attrs[key] = inData[key];
            }
        }
    }
    return vData;
}
/* }}} */
class Vue extends _Vue__default['default'] {
    /* Spoof props as arguments of the constructor, so that the
     * class constructor can depend on props, meaning that the
     * generic inference of P can work when using the classes
     * constructors.
     *
     * class Foo extends Vue<{ a: string }> {}
     *
     * function build<T>(cst: VueConstructor<T>, _opts: T): Vue<T> {
     *     return new cst();
     * }
     * build(Foo, {}); // ok without this shim!
     *
     * This is because Foo has the type of the constructor, so it needs to
     * depend on the types of the props to avoid infering {}.
     */
    constructor(_opts, _props) {
        return super(arguments);
    }
    /* Wrapper to convert raw JSX attributes to vnode data. */
    renderWrapper() {
        return (tag, data, ...children) => {
            const vnodeData = data !== null ? linearData2VNodeData(data, tag)
                : {};
            return this.$createElement(tag, vnodeData, children);
        };
    }
}
const Observer = (new _Vue__default['default']()).$data.__ob__.constructor;
/**
 * Modify the given object to set it as non reactive.
 * It adds a dummy observer on it, like this Vue thinks it is already
 * observed and not not investigate much more.
 *
 * This helps saving memory by not adding an observer to all data.
 */
function nonReactive(value) {
    /* Set dummy observer on value */
    value.__ob__ = new Observer({});
    return value;
}

/** Purpose:
 * List all directives which should be register in VueJs.
 */
const directives = [{
        name: 'visible',
        /* XXX: Could be improve to take into account transitions (see
         * https://gihub.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/show.js )
         */
        directive: {
            bind: (el, data) => {
                const value = data.value;
                const originalVisibility = el.style.visibility === 'hidden' ? '' : el.style.visibility;
                if (originalVisibility !== null) {
                    el.dataset.vOriginalVisibility = originalVisibility;
                }
                el.style.visibility = value ? originalVisibility : 'hidden';
            },
            update: (el, data) => {
                const value = data.value;
                const oldValue = data.oldValue;
                if (value === oldValue) {
                    return;
                }
                const vOriginalVisibility = el.dataset.vOriginalVisibility || '';
                el.style.visibility = value ? vOriginalVisibility : 'hidden';
            },
            unbind: (el) => {
                el.style.visibility = el.dataset.vOriginalVisibility || '';
            },
        },
    }];
function registerDirectives(directives) {
    for (const d of directives) {
        Vue.directive(d.name, d.directive);
    }
}

Object.defineProperty(exports, 'Component', {
    enumerable: true,
    get: function () {
        return vueClassComponent__default['default'];
    }
});
Object.defineProperty(exports, 'Inject', {
    enumerable: true,
    get: function () {
        return vuePropertyDecorator.Inject;
    }
});
Object.defineProperty(exports, 'Prop', {
    enumerable: true,
    get: function () {
        return vuePropertyDecorator.Prop;
    }
});
Object.defineProperty(exports, 'Provide', {
    enumerable: true,
    get: function () {
        return vuePropertyDecorator.Provide;
    }
});
Object.defineProperty(exports, 'Watch', {
    enumerable: true,
    get: function () {
        return vuePropertyDecorator.Watch;
    }
});
exports.Vue = Vue;
exports.default = Vue;
exports.directives = directives;
exports.linearData2VNodeData = linearData2VNodeData;
exports.nonReactive = nonReactive;
exports.registerDirectives = registerDirectives;
