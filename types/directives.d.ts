/** Purpose:
 * List all directives which should be register in VueJs.
 */
import { App, ObjectDirective } from '@vue/runtime-core';
export interface Directive {
    name: string;
    directive: ObjectDirective;
}
export type Visible = boolean;
export declare const directives: Directive[];
export declare function registerDirectives(app: App, ds: Directive[]): void;
