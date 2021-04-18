// tslint:disable:no-bitwise

import _Vue, { VNode, VNodeData, VNodeDirective } from 'vue';
import {
    SyntheticEvent,
    VueRenderAttributes,
    VueRenderOnAttribute
} from './jsx';

/* {{{ Render wrapper */

export type VtyxRender = (tag: string, data: object | null,
                          ...children: any[]) => VNode;

interface RenderAttributes extends VueRenderAttributes {
    [key: string]: any;
}

/* {{{ Event modifiers */

enum EventModifiers {
    None = 0,
    Prevent = 1 << 1,
    Stop = 1 << 2,
}

function applyModifiers(cb: (...args: any[]) => any,
                        modifiers: EventModifiers)
{
    return (evt: SyntheticEvent<any>, ...args: any[]) => {
        if (modifiers & EventModifiers.Prevent) {
            evt.preventDefault();
        }
        if (modifiers & EventModifiers.Stop) {
            evt.stopPropagation();
        }
        cb(evt, ...args);
    };
}

function handleEventModifiers(events: VueRenderOnAttribute) {
    const keys = Object.keys(events);
    const newEvents: VueRenderOnAttribute = {};

    for (const key of keys) {
        let cb = events[key];
        const elems = key.split('.');
        const name: string = elems.shift()!;

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
function mustUseDomProps(tag: string, key: string, type?: string) {
    /* XXX: non public function, not typed, and can break on update */
    return (Vue.config as any).mustUseProp(tag, type, key);
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
export function linearData2VNodeData(inData: RenderAttributes, tag: string) {
    const vData: VNodeData = {};
    const keys = Object.keys(inData);

    for (const key of keys) {
        if (key === 'on') {
            const value = inData[key]!;

            if (vData.on === undefined) {
                vData.on = {};
            }
            vData.on = {
                ...vData.on,
                ...handleEventModifiers(value)
            };
        } else
        if (key.startsWith('on')) {
            const cbKey = key.slice(2).toLowerCase();

            if (vData.on === undefined) {
                vData.on = {};
            }
            vData.on[cbKey] = inData[key];
        } else
        if (key === 'class') {
            const value = inData[key]!;

            if (typeof value === 'object') {
                vData.class = value;
            } else {
                vData.class = {};
                vData.class[value] = true;
            }
        } else
        if (key === 'ref') {
            vData.ref = inData[key];
        } else
        if (key === 'key') {
            vData.key = inData[key];
        } else
        if (key.startsWith('v-')) {
            const directive = key.slice(2);

            if (directive === 'html') {
                const domProps = vData.domProps || (vData.domProps = {});
                domProps.innerHTML = inData[key];
            } else {
                if (!Array.isArray(vData.directives)) {
                    vData.directives = [];
                }

                /* XXX: arg and modifiers won't be used currently */
                vData.directives.push({
                    name: directive,
                    value: inData[key],
                } as VNodeDirective);
            }
        } else
        if (key === 'slot') {
            vData.slot = inData[key];
        } else
        if (key === 'scopedSlots') {
            vData.scopedSlots = inData[key];
        } else {
            if (mustUseDomProps(tag, key, inData.type)) {
                const domProps = vData.domProps || (vData.domProps = {});
                domProps[key] = inData[key];
            } else {
                const attrs = vData.attrs || (vData.attrs = {});
                attrs[key] = inData[key];
            }
        }
    }

    return vData;
}

/* }}} */

export class Vue<P extends {}> extends _Vue {
    /* Add a dummy field to type the component in JSX.
     * This field does not actually exist, and is only used in Typescript. */
    protected _jsxProps: P & VueRenderAttributes;

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
    public constructor(_opts?: any, _props?: P) {
        return super(arguments as any) as any;
    }

    /* Wrapper to convert raw JSX attributes to vnode data. */
    protected renderWrapper(): VtyxRender {
        return (tag, data, ...children) => {
            const vnodeData = data !== null ? linearData2VNodeData(data, tag)
                                            : {};

            return this.$createElement(tag, vnodeData, children);
        };
    }
}

const Observer = (new _Vue()).$data.__ob__.constructor;
/**
 * Modify the given object to set it as non reactive.
 * It adds a dummy observer on it, like this Vue thinks it is already
 * observed and not not investigate much more.
 *
 * This helps saving memory by not adding an observer to all data.
 */
export function nonReactive(value: any) {
    /* Set dummy observer on value */
    value.__ob__ = new Observer({});
    return value;
}

export type VueConstructor<T> = new(_opts?: any, _props?: T) => Vue<T>;
