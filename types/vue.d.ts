import { Vue as _Vue } from 'vue-class-component';
import { VueRenderAttributes } from './jsx';
export declare function h(type: any, props?: any, ...args: any[]): import("@vue/runtime-core").VNode<import("@vue/runtime-core").RendererNode, import("@vue/runtime-core").RendererElement, {
    [key: string]: any;
}>;
export { VueConstructor } from 'vue-class-component';
export declare class Vue<P extends {}> extends _Vue {
    _jsxProps: P & VueRenderAttributes;
    constructor(_opts?: any, _props?: P);
}
/**
 * Modify the given object to set it as non reactive.
 *
 * This helps saving memory by not adding an observer to all data.
 */
export declare function nonReactive(value: any): any;
