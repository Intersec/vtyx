import { h as h$2 } from '@vue/runtime-core';
import { markRaw } from '@vue/reactivity';
import { Vue as Vue$1 } from 'vue-class-component';
export { Emit, Inject, Model, Prop, Provide, Ref, Watch } from 'vue-property-decorator';
export { createApp } from 'vue';

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
    for (const key of keys) {
        if (key === 'on') {
            const value = inData[key];
            for (const [onKey, onVal] of Object.entries(value)) {
                const elems = onKey.split('.');
                const name = elems.shift();
                const propKey = 'on' + name[0].toUpperCase() + name.slice(1);
                vData[propKey] = handleEventModifiers(onVal, elems);
            }
        }
        else {
            vData[key] = inData[key];
        }
    }
    return vData;
}
function h$1(type, props, ...args) {
    return h$2(type, props ? hArgV2ToV3(props) : props, ...args);
}
class Vue extends Vue$1 {
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
    return markRaw(value);
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
/* }}} */
const Component = (v) => v;

export { Component, Vue, directives, h, nonReactive, registerDirectives };
