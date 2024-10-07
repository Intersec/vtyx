'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtimeCore = require('@vue/runtime-core');
var reactivity = require('@vue/reactivity');
var vueClassComponent = require('vue-class-component');
var vue = require('vue');
var vuePropertyDecorator = require('vue-property-decorator');

// tslint:disable:no-bitwise
/* {{{ Event modifiers */
var EventModifiers;
(function (EventModifiers) {
    EventModifiers[EventModifiers["None"] = 0] = "None";
    EventModifiers[EventModifiers["Prevent"] = 2] = "Prevent";
    EventModifiers[EventModifiers["Stop"] = 4] = "Stop";
})(EventModifiers || (EventModifiers = {}));
/** Modifiers that are related to the construction of the listener. */
const LISTENER_MODIFIERS = ['once', 'capture', 'passive'];
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
function handleEventModifiers(cb, elems) {
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
        return applyModifiers(cb, modifiers);
    }
    return cb;
}
function upperFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}
/* }}} */
/* Partial conversion to VNodeData
 *
 * Typescript JSX translation is raw:
 *   <Toto a=b c=d class='ic-hidden'>
 *     => h('Toto', { a: b, c: d})
 * Vue requires the data to be organized in several parts:
 *   <Toto a=b c=d class='ic-hidden'>
 *     => h('Toto, { attrs: { a: b, c: d }, class: { 'ic-hidden': true } })
 *
 * This function is responsible for this translation.
 */
function hArgV2ToV3(inData) {
    const vData = {};
    const keys = Object.keys(inData);
    const directives = [];
    for (const key of keys) {
        if (key.startsWith('v-')) {
            /* Manage directives */
            const value = inData[key];
            const [, directiveName, directiveArg = '', strModifiers = ''] = key.match(/^v-([^:.]+)(?::([^.]+))?((?:\.[^.]+)*)$/) || [];
            switch (directiveName) {
                case 'html':
                    vData['innerHTML'] = inData[key];
                    break;
                default:
                    /* if directive is not set Vue will display a warning if
                     * configuration allowed it */
                    const directive = vue.resolveDirective(directiveName);
                    const modifiers = strModifiers.split('.').reduce((mods, val) => {
                        if (val) {
                            mods[val] = true;
                        }
                        return mods;
                    }, {});
                    if (directive) {
                        directives.push([
                            directive,
                            value,
                            directiveArg,
                            modifiers,
                        ]);
                    }
            }
        }
        else if (key === 'on') {
            /*  Manage events */
            const value = inData[key];
            for (const [onKey, onVal] of Object.entries(value)) {
                let elems = onKey.split('.');
                const name = elems.shift();
                /* Listener event modifiers should be added to the event name.
                 * For example: onClickCapture, onMouseoverOnceCapture */
                const modifiers = [];
                /* Remove listener event modifiers from elems in order to
                 * manage only modifiers related to the event afterward. */
                elems = elems.filter((modifier) => {
                    if (LISTENER_MODIFIERS.includes(modifier)) {
                        modifiers.push(upperFirstLetter(modifier));
                        return false;
                    }
                    return true;
                });
                const propKey = 'on' + upperFirstLetter(name) + modifiers.join('');
                vData[propKey] = handleEventModifiers(onVal, elems);
            }
        }
        else {
            vData[key] = inData[key];
        }
    }
    return {
        props: vData,
        directives,
    };
}
function buildVNode(type, props, args = []) {
    if (props && Reflect.has(props, 'slot')) {
        /* In Vue3, children in slots should be given from a function.
         * So instead returning a VNode it should be an object with the slot
         * name as attribute and a function returning the VNode as value */
        const { slot } = props;
        delete props.slot;
        const slottedVNode = {
            '__slot': slot,
            vnode: runtimeCore.h(type, props, ...args),
        };
        /* XXX: fake the type to simplify TS usage, but this format is
         * correctly supported by Vue3 */
        return slottedVNode;
    }
    /* This is a normal vNode */
    return runtimeCore.h(type, props, ...args);
}
function cleanArgs(type, args) {
    if (args.length) {
        return args.reduce((argList, arg) => {
            /* Remove values like false, null or undefined which are not VNode */
            if (!arg) {
                return argList;
            }
            /* flat any array but also apply the same check on each value */
            if (Array.isArray(arg)) {
                const list = cleanArgs(type, arg);
                argList.push(...list);
                return argList;
            }
            argList.push(arg);
            return argList;
        }, []);
    }
    return args;
}
function h$1(type, props, ...args) {
    const { props: hProps, directives } = props ? hArgV2ToV3(props) : { props };
    const hArgs = cleanArgs(type, args);
    let hasSlots = false;
    const slots = {};
    let hSlots;
    const slottedArgs = hArgs.reduce((argList, arg) => {
        var _a;
        var _b;
        if (arg === null || arg === void 0 ? void 0 : arg.__slot) {
            const slotted = arg;
            (_a = slots[_b = slotted.__slot]) !== null && _a !== void 0 ? _a : (slots[_b] = []);
            slots[slotted.__slot].push(slotted.vnode);
            hasSlots = true;
            return argList;
        }
        argList.push(arg);
        return argList;
    }, []);
    if (hasSlots) {
        slots['default'] = slottedArgs;
        hSlots = [Object.entries(slots).reduce((res, [key, vNodes]) => {
                res[key] = () => vNodes;
                return res;
            }, {})];
    }
    const vNode = buildVNode(type, hProps, hSlots || hArgs);
    if (directives) {
        return runtimeCore.withDirectives(vNode, directives);
    }
    else {
        return vNode;
    }
}
class Vue extends vueClassComponent.Vue {
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
     * depend on the types of the props to avoid inferring {}.
     */
    constructor(_opts, _props) {
        return super(arguments);
    }
}
/**
 * Modify the given object to set it as non reactive.
 *
 * This helps saving memory by not adding an observer to all data.
 */
function nonReactive(value) {
    /* Set dummy observer on value */
    return reactivity.markRaw(value);
}

const Component = (v) => v;
function Emits(events) {
    return vueClassComponent.createDecorator((componentOptions) => {
        componentOptions.emits || (componentOptions.emits = []);
        const eventList = new Set([...componentOptions.emits, ...events]);
        componentOptions.emits = Array.from(eventList);
    });
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
            beforeMount: (el, data) => {
                const value = data.value;
                const originalVisibility = el.style.visibility === 'hidden' ? '' : el.style.visibility;
                if (originalVisibility !== null) {
                    el.dataset.vOriginalVisibility = originalVisibility;
                }
                el.style.visibility = value ? originalVisibility : 'hidden';
            },
            updated: (el, data) => {
                const value = data.value;
                const oldValue = data.oldValue;
                if (value === oldValue) {
                    return;
                }
                const vOriginalVisibility = el.dataset.vOriginalVisibility || '';
                el.style.visibility = value ? vOriginalVisibility : 'hidden';
            },
            unmounted: (el) => {
                el.style.visibility = el.dataset.vOriginalVisibility || '';
            },
        },
    }];
function registerDirectives(app, ds) {
    for (const d of ds) {
        app.directive(d.name, d.directive);
    }
}

/* {{{ JSX */
/* JSX typings distinguish elements (starts with a capital letter)
 * and intrinsic elements (html markups).
 *  * Elements are Vue components, with a type generic describing
 *    the interface of the element.
 *  * Intrinsic elements are described in the 'jsx.ts' file.
 */
const h = h$1;

Object.defineProperty(exports, 'mixins', {
    enumerable: true,
    get: function () { return vueClassComponent.mixins; }
});
Object.defineProperty(exports, 'createApp', {
    enumerable: true,
    get: function () { return vue.createApp; }
});
Object.defineProperty(exports, 'Emit', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Emit; }
});
Object.defineProperty(exports, 'Inject', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Inject; }
});
Object.defineProperty(exports, 'Model', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Model; }
});
Object.defineProperty(exports, 'Prop', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Prop; }
});
Object.defineProperty(exports, 'Provide', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Provide; }
});
Object.defineProperty(exports, 'Ref', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Ref; }
});
Object.defineProperty(exports, 'Watch', {
    enumerable: true,
    get: function () { return vuePropertyDecorator.Watch; }
});
exports.Component = Component;
exports.Emits = Emits;
exports.Vue = Vue;
exports.directives = directives;
exports.h = h;
exports.nonReactive = nonReactive;
exports.registerDirectives = registerDirectives;
