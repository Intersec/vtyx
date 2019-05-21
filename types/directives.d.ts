/** Purpose:
 * List all directives which should be register in VueJs.
 */
import { DirectiveOptions } from 'vue';
import 'bootstrap';
interface Directive {
    name: string;
    directive: DirectiveOptions;
}
interface TooltipDirectiveOptions extends TooltipOptions {
    hideOnClick?: boolean;
}
export declare type Tooltip = string | TooltipDirectiveOptions;
export declare type Visible = boolean;
export declare const directives: Directive[];
export {};
