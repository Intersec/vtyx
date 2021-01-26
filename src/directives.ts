/** Purpose:
 * List all directives which should be register in VueJs.
 */

/* XXX: If adding a directive, its type should be added in ./jsx too */

import { Vue } from './vue';
import { VNodeDirective, DirectiveOptions } from 'vue';

export interface Directive {
    name: string;
    directive: DirectiveOptions;
}

export type Visible = boolean;

export const directives: Directive[] = [{
    name: 'visible',
    /* XXX: Could be improve to take into account transitions (see
     * https://gihub.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/show.js )
     */
    directive: {
        bind: (el: HTMLElement, data: VNodeDirective) => {
            const value = data.value as Visible;

            const originalVisibility =
                el.style.visibility === 'hidden' ? '' : el.style.visibility;
            if (originalVisibility !== null) {
                el.dataset.vOriginalVisibility = originalVisibility;
            }
            el.style.visibility = value ? originalVisibility : 'hidden';
        },
        update: (el: HTMLElement, data: VNodeDirective) => {
            const value = data.value as Visible;
            const oldValue = data.oldValue as Visible;

            if (value === oldValue) {
                return;
            }
            const vOriginalVisibility = el.dataset.vOriginalVisibility || '';
            el.style.visibility = value ? vOriginalVisibility : 'hidden';
        },
        unbind: (el: HTMLElement) => {
            el.style.visibility = el.dataset.vOriginalVisibility || '';
        },
    },
}];

export function registerDirectives(directives: Directive[]) {
    for (const d of directives) {
        Vue.directive(d.name, d.directive);
    }
}
