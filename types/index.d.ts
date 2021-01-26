import { VNode } from 'vue';
import Component from 'vue-class-component';
import { IntrinsicElements as JsxIntrinsicElements } from './jsx';
import { Vue } from './vue';
declare global {
    namespace JSX {
        interface Element extends VNode {
        }
        interface ElementClass extends Vue<any> {
        }
        interface ElementAttributesProperty {
            _jsxProps: {};
        }
        interface IntrinsicElements extends JsxIntrinsicElements {
        }
    }
}
export default Vue;
export { Component, };
export { Prop, Watch, Inject, Provide } from 'vue-property-decorator';
export * from './directives';
export * from './vue';
export * from './jsx';
