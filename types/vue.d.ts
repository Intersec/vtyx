import _Vue, { VNode, VNodeData } from 'vue';
import { VueRenderAttributes } from './jsx';
export declare type VtyxRender = (tag: string, data: object | null, ...children: any[]) => VNode;
interface RenderAttributes extends VueRenderAttributes {
    [key: string]: any;
}
export declare function linearData2VNodeData(inData: RenderAttributes, tag: string): VNodeData;
export declare class Vue<P extends {}> extends _Vue {
    protected _jsxProps: P & VueRenderAttributes;
    constructor(_opts?: any, _props?: P);
    protected renderWrapper(): VtyxRender;
}
/**
 * Modify the given object to set it as non reactive.
 * It adds a dummy observer on it, like this Vue thinks it is already
 * observed and not not investigate much more.
 *
 * This helps saving memory by not adding an observer to all data.
 */
export declare function nonReactive(value: any): any;
export declare type VueConstructor<T> = new (_opts?: any, _props?: T) => Vue<T>;
export {};
