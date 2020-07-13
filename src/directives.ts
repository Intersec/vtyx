/** Purpose:
 * List all directives which should be register in VueJs.
 */

/* XXX: If adding a directive, its type should be added in ./jsx too */

import { VNodeDirective, DirectiveOptions } from 'vue';
import _ from 'underscore';
import $ from 'jquery';

interface Directive {
    name: string;
    directive: DirectiveOptions;
}

/* TooltipOptions is from @types/bootstrap */
interface TooltipDirectiveOptions extends TooltipOptions {
    /* Remove the tooltip when parent is clicked */
    hideOnClick?: boolean;
}

export type Tooltip = string | TooltipDirectiveOptions;

function setTooltip($tooltip: JQuery, opts: Tooltip) {
    if (typeof opts === 'string') {
        $tooltip.tooltip({ title: opts });
    } else {
        $tooltip.tooltip(opts);
    }
}

export type Visible = boolean;

export const directives: Directive[] = [{
    name: 'tooltip',
    directive: {
        inserted: (el: HTMLElement, data: VNodeDirective) => {
            const value: Tooltip = data.value;

            setTooltip($(el), value);

            if (typeof value !== 'string' && value.hideOnClick) {
                el.addEventListener('click', () => {
                    $(el).tooltip('hide');
                }, false);
            }
        },
        update: (el: HTMLElement, data: VNodeDirective) => {
            const value: Tooltip = data.value;
            const oldValue: Tooltip = data.oldValue;

            if (_.isEqual(value, oldValue)) {
                /* No change */
                return;
            }

            const $tooltip = $(el);

            $tooltip.off('hidden.bs.tooltip');
            /**
             * Bootstrap tooltip is not ready to display it with changing content.
             * So each time content change it is needed to destroy the previous value
             * and to create a new tooltip.
             * To recreate a new tooltip it is needed to wait that the previous one
             * has been fully removed.
             */
            $tooltip.one('hidden.bs.tooltip', () => {
                /* wait for the full tooltip deletion */
                _.defer(() => {
                    setTooltip($tooltip, value);
                });
            });
            $tooltip.tooltip('destroy');
            setTooltip($tooltip, value);
        },
    },
}, {
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
