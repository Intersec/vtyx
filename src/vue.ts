// tslint:disable:no-bitwise

import { h as _h, withDirectives } from '@vue/runtime-core';
import { markRaw } from '@vue/reactivity';
import { Vue as _Vue } from 'vue-class-component';
import {
    SyntheticEvent,
    VueRenderAttributes,
} from './jsx';
import { Directive, resolveDirective, VNode } from 'vue';

type DirectiveArgs = [Directive, any, string, Record<string, boolean>];
interface V3HArgs {
    props: Record<string, any>;
    directives?: DirectiveArgs[];
}

/* {{{ Render wrapper */

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

function handleEventModifiers(cb: (...args: unknown[]) => unknown, elems: string[]) {
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
function hArgV2ToV3(inData: RenderAttributes): V3HArgs {
    const vData: Record<string, any> = {};
    const keys = Object.keys(inData);
    const directives: DirectiveArgs[] = [];

    for (const key of keys) {
        if (key.startsWith('v-')) {
            /* Manage directives */

            const value = inData[key];
            const [,directiveName, directiveArg = '', strModifiers = ''] =
                key.match(/^v-([^:.]+)(?::([^.]+))?((?:\.[^.]+)*)$/) || [];
            /* if directive is not set Vue will display a warning if
             * configuration allowed it */
            const directive = resolveDirective(directiveName);
            const modifiers = strModifiers.split('.').reduce((mods, val) => {
                if (val) {
                    mods[val] = true;
                }
                return mods;
            }, {} as Record<string, boolean>);

            if (directive) {
                directives.push([
                    directive,
                    value,
                    directiveArg,
                    modifiers,
                ]);
            }
        } else if (key === 'on') {
            /*  Manage events */

            const value = inData[key]!;

            for (const [onKey, onVal] of Object.entries(value)) {
                const elems = onKey.split('.');
                const name = elems.shift()!;
                const propKey = 'on' + name[0].toUpperCase() + name.slice(1);
                vData[propKey] = handleEventModifiers(onVal, elems);
            }
        } else {
            vData[key] = inData[key];
        }
    }

    return {
        props: vData,
        directives,
    };
}

function buildVNode(type: any, props?: any, args: any[] = []): VNode {
    if (props && Reflect.has(props, 'slot')) {
        /* In Vue3, children in slots should be given from a function.
         * So instead returning a VNode it should be an object with the slot
         * name as attribute and a function returning the VNode as value */
        const slot = props['slot'];
        const vNode = {
            [slot]: () => _h(type, props, ...args),
        };

        /* XXX: fake the type to simplify TS usage, but this format is
         * correctly supported by Vue3 */
        return vNode as unknown as VNode;
    }

    /* This is a normal vNode */
    return _h(type, props, ...args);
}

function cleanArgs<T = any>(type: any, args: T[]): T[] {
    if (type?.prototype instanceof Vue && args.length) {
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
        }, [] as T[]);
    }

    return args;
}

export function h(type: any, props?: any, ...args: any[]) {
    const {props: hProps, directives}: V3HArgs = props ? hArgV2ToV3(props) : { props };
    const hArgs = cleanArgs(type, args);

    const vNode = buildVNode(type, hProps, hArgs);
    if (directives) {
        return withDirectives(vNode, directives);
    } else {
        return vNode;
    }
}

/* }}} */

export { VueConstructor } from 'vue-class-component';

export class Vue<P extends {}> extends _Vue {
    /* Add a dummy field to type the component in JSX.
     * This field does not actually exist, and is only used in Typescript. */
    public _jsxProps: P & VueRenderAttributes;

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
    public constructor(_opts?: any, _props?: P) {
        return super(arguments as any) as any;
    }
}

/**
 * Modify the given object to set it as non reactive.
 *
 * This helps saving memory by not adding an observer to all data.
 */
export function nonReactive(value: any) {
    /* Set dummy observer on value */
    return markRaw(value);
}
