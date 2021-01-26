/** Purpose:
 * List all directives which should be register in VueJs.
 */
import { DirectiveOptions } from 'vue';
export interface Directive {
    name: string;
    directive: DirectiveOptions;
}
export declare type Visible = boolean;
export declare const directives: Directive[];
export declare function registerDirectives(directives: Directive[]): void;
