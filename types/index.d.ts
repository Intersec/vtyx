import { VNode } from '@vue/runtime-core';
import { IntrinsicElements as JsxIntrinsicElements } from './jsx';
import { h as _h, Vue } from './vue';
export declare const h: typeof _h;
export declare namespace h {
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
export * from './decorators';
export * from './directives';
export { Vue, nonReactive, VueConstructor } from './vue';
export { createApp } from 'vue';
export * from './jsx';
export { mixins } from 'vue-class-component';
