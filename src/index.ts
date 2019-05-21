import { VNode } from 'vue';
import Component from 'vue-class-component';

import { IntrinsicElements as JsxIntrinsicElements } from './jsx';
import { Vue } from './vue';
import { directives } from './directives';

/* {{{ JSX */

/* JSX typings distinguish elements (starts with a capital letter)
 * and intrinsic elements (html markups).
 *  * Elements are Vue components, with a type generic describing
 *    the interface of the element.
 *  * Intrinsic elements are described in the 'jsx.ts' file.
 */

declare global {
    namespace JSX {
        interface Element extends VNode {}
        interface ElementClass extends Vue<any> {}
        interface ElementAttributesProperty {
            _jsxProps: {};
        }
        interface IntrinsicElements extends JsxIntrinsicElements {}
    }
}

/* }}} */

export function registerDirectives() {
    /* Register directives */
    for (const d of directives) {
        Vue.directive(d.name, d.directive);
    }
}

export default Vue;

export {
    Component,
};
export { Prop, Watch } from 'vue-property-decorator';
export * from './vue';
export * from './jsx';
