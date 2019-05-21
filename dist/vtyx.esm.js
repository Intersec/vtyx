export { default as Component } from 'vue-class-component';
import _Vue from 'vue';
import _ from 'underscore';
import $ from 'jquery';
import 'bootstrap';
export { Prop, Watch } from 'vue-property-decorator';

// tslint:disable:no-bitwise
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* {{{ Event modifiers */
var EventModifiers;
(function (EventModifiers) {
    EventModifiers[EventModifiers["None"] = 0] = "None";
    EventModifiers[EventModifiers["Prevent"] = 2] = "Prevent";
    EventModifiers[EventModifiers["Stop"] = 4] = "Stop";
})(EventModifiers || (EventModifiers = {}));
function applyModifiers(cb, modifiers) {
    return function (evt) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (modifiers & EventModifiers.Prevent) {
            evt.preventDefault();
        }
        if (modifiers & EventModifiers.Stop) {
            evt.stopPropagation();
        }
        cb.apply(void 0, [evt].concat(args));
    };
}
function handleEventModifiers(events) {
    var keys = Object.keys(events);
    var newEvents = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var cb = events[key];
        var elems = key.split('.');
        var name_1 = elems.shift();
        if (elems.length > 0) {
            var modifiers = EventModifiers.None;
            for (var _a = 0, elems_1 = elems; _a < elems_1.length; _a++) {
                var modifier = elems_1[_a];
                switch (modifier) {
                    case 'prevent':
                        modifiers |= EventModifiers.Prevent;
                        break;
                    case 'stop':
                        modifiers |= EventModifiers.Stop;
                        break;
                    default:
                        throw new Error('unknown event modifier: ' + modifier);
                }
            }
            cb = applyModifiers(cb, modifiers);
        }
        newEvents[name_1] = cb;
    }
    return newEvents;
}
/* }}} */
/* For some elements, the bindings must be done on the dom properties, and
 * not the elements attributes. See `mustUseProp` in vue.js file */
function mustUseDomProps(tag, key, type) {
    /* XXX: non public function, not typed, and can break on update */
    return Vue.config.mustUseProp(tag, type, key);
}
/* Partial convertion to VNodeData
 *
 * Typescript JSX translation is raw:
 *   <Toto a=b c=d class='ic-hidden'>
 *     => h('Toto', { a: b, c: d})
 * Vue requires the data to be organised in several parts:
 *   <Toto a=b c=d class='ic-hidden'>
 *     => h('Toto, { attrs: { a: b, c: d }, class: { 'ic-hidden': true } })
 *
 * This function is responsible for this translation.
 */
function linearData2VNodeData(inData, tag) {
    var vData = {};
    var keys = Object.keys(inData);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        if (key === 'on') {
            var value = inData[key];
            if (vData.on === undefined) {
                vData.on = {};
            }
            vData.on = __assign({}, vData.on, handleEventModifiers(value));
        }
        else if (key.startsWith('on')) {
            var cbKey = key.slice(2).toLowerCase();
            if (vData.on === undefined) {
                vData.on = {};
            }
            vData.on[cbKey] = inData[key];
        }
        else if (key === 'class') {
            var value = inData[key];
            if (typeof value === 'object') {
                vData.class = value;
            }
            else {
                vData.class = {};
                vData.class[value] = true;
            }
        }
        else if (key === 'ref') {
            vData.ref = inData[key];
        }
        else if (key === 'key') {
            vData.key = inData[key];
        }
        else if (key.startsWith('v-')) {
            if (!Array.isArray(vData.directives)) {
                vData.directives = [];
            }
            var directive = key.slice(2);
            /* XXX: arg and modifiers won't be used currently */
            vData.directives.push({
                name: directive,
                value: inData[key],
            });
        }
        else {
            if (mustUseDomProps(tag, key, inData.type)) {
                var domProps = vData.domProps || (vData.domProps = {});
                domProps[key] = inData[key];
            }
            else {
                var attrs = vData.attrs || (vData.attrs = {});
                attrs[key] = inData[key];
            }
        }
    }
    return vData;
}
/* }}} */
var Vue = /** @class */ (function (_super) {
    __extends(Vue, _super);
    /* Spoof props as arguments of the constructor, so that the
     * class constructor can depend on props, meaning that the
     * generic inference of P can work when using the classes
     * constructors.
     *
     * class Foo extends Vue<{ a: string }> {}
     *
     * function build<T>(cst: VueConstructor<T>, _opts: T): Vue<T> {
     *     return new cst();
     * }
     * build(Foo, {}); // ok without this shim!
     *
     * This is because Foo has the type of the constructor, so it needs to
     * depend on the types of the props to avoid infering {}.
     */
    function Vue(_opts, _props) {
        var _this = this;
        return _this = _super.call(this, arguments) || this;
    }
    /* Wrapper to convert raw JSX attributes to vnode data. */
    Vue.prototype.renderWrapper = function () {
        var _this = this;
        return function (tag, data) {
            var children = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                children[_i - 2] = arguments[_i];
            }
            var vnodeData = data !== null ? linearData2VNodeData(data, tag)
                : {};
            return _this.$createElement(tag, vnodeData, children);
        };
    };
    return Vue;
}(_Vue));
var Observer = (new _Vue()).$data.__ob__.constructor;
/**
 * Modify the given object to set it as non reactive.
 * It adds a dummy observer on it, like this Vue thinks it is already
 * observed and not not investigate much more.
 *
 * This helps saving memory by not adding an observer to all data.
 */
function nonReactive(value) {
    /* Set dummy observer on value */
    value.__ob__ = new Observer({});
    return value;
}

/** Purpose:
 * List all directives which should be register in VueJs.
 */
function setTooltip($tooltip, opts) {
    if (typeof opts === 'string') {
        $tooltip.tooltip({ title: opts });
    }
    else {
        $tooltip.tooltip(opts);
    }
}
var directives = [{
        name: 'tooltip',
        directive: {
            inserted: function (el, data) {
                var value = data.value;
                setTooltip($(el), value);
                if (typeof value !== 'string' && value.hideOnClick) {
                    el.addEventListener('click', function () {
                        $(el).tooltip('hide');
                    }, false);
                }
            },
            update: function (el, data) {
                var value = data.value;
                var oldValue = data.oldValue;
                if (_.isEqual(value, oldValue)) {
                    /* No change */
                    return;
                }
                var $tooltip = $(el);
                $tooltip.off('hidden.bs.tooltip');
                /**
                 * Bootstrap tooltip is not ready to display it with changing content.
                 * So each time content change it is needed to destroy the previous value
                 * and to create a new tooltip.
                 * To recreate a new tooltip it is needed to wait that the previous one
                 * has been fully removed.
                 */
                $tooltip.one('hidden.bs.tooltip', function () {
                    /* wait for the full tooltip deletion */
                    _.defer(function () {
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
            bind: function (el, data) {
                var value = data.value;
                var originalVisibility = el.style.visibility === 'hidden' ? '' : el.style.visibility;
                if (originalVisibility !== null) {
                    el.dataset.vOriginalVisibility = originalVisibility;
                }
                el.style.visibility = value ? originalVisibility : 'hidden';
            },
            update: function (el, data) {
                var value = data.value;
                var oldValue = data.oldValue;
                if (value === oldValue) {
                    return;
                }
                var vOriginalVisibility = el.dataset.vOriginalVisibility || null;
                el.style.visibility = value ? vOriginalVisibility : 'hidden';
            },
            unbind: function (el) {
                el.style.visibility = el.dataset.vOriginalVisibility || null;
            },
        },
    }];

/* }}} */
function registerDirectives() {
    /* Register directives */
    for (var _i = 0, directives_1 = directives; _i < directives_1.length; _i++) {
        var d = directives_1[_i];
        Vue.directive(d.name, d.directive);
    }
}

export default Vue;
export { Vue, linearData2VNodeData, nonReactive, registerDirectives };
