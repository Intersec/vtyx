import { VNode } from '@vue/runtime-core';

import { IntrinsicElements as JsxIntrinsicElements } from './jsx';
import { h as _h, Vue } from './vue';

/* {{{ JSX */

/* JSX typings distinguish elements (starts with a capital letter)
 * and intrinsic elements (html markups).
 *  * Elements are Vue components, with a type generic describing
 *    the interface of the element.
 *  * Intrinsic elements are described in the 'jsx.ts' file.
 */
export const h = _h;
export namespace h {
    export namespace JSX {
        export interface Element extends VNode {}
        export interface ElementClass extends Vue<any> {}
        export interface ElementAttributesProperty {
            _jsxProps: {};
        }
        export interface IntrinsicElements extends JsxIntrinsicElements {}
    }
}

/* }}} */

const Component: <V>(v: V) => V = (v) => v;

export {
    Component,
};
export { Prop, Model, Watch, Emit, Ref, Inject, Provide } from 'vue-property-decorator';
export * from './directives';
export { Vue, nonReactive, VueConstructor } from './vue';
export { createApp } from 'vue';
export * from './jsx';
export { mixins } from 'vue-class-component';
