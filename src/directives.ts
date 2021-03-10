/** Purpose:
 * List all directives which should be register in VueJs.
 */

/* XXX: If adding a directive, its type should be added in ./jsx too */

import { App, ObjectDirective, DirectiveBinding } from '@vue/runtime-core';

export interface Directive {
    name: string;
    directive: ObjectDirective;
}

export type Visible = boolean;

export const directives: Directive[] = [{
    name: 'visible',
    /* XXX: Could be improve to take into account transitions (see
     * https://gihub.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/show.js )
     */
    directive: {
        beforeMount: (el: HTMLElement, data: DirectiveBinding) => {
            const value = data.value as Visible;

            const originalVisibility =
                el.style.visibility === 'hidden' ? '' : el.style.visibility;
            if (originalVisibility !== null) {
                el.dataset.vOriginalVisibility = originalVisibility;
            }
            el.style.visibility = value ? originalVisibility : 'hidden';
        },
        updated: (el: HTMLElement, data: DirectiveBinding) => {
            const value = data.value as Visible;
            const oldValue = data.oldValue as Visible;

            if (value === oldValue) {
                return;
            }
            const vOriginalVisibility = el.dataset.vOriginalVisibility || '';
            el.style.visibility = value ? vOriginalVisibility : 'hidden';
        },
        unmounted: (el: HTMLElement) => {
            el.style.visibility = el.dataset.vOriginalVisibility || '';
        },
    },
}];

export function registerDirectives(app: App, ds: Directive[]) {
    for (const d of ds) {
        app.directive(d.name, d.directive);
    }
}
