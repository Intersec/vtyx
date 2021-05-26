# vtyx

> VueJS 3.X + Typescript + JSX

[![npm](https://img.shields.io/npm/v/vtyx.svg)](https://www.npmjs.com/package/vtyx)

### Introduction

A module allowing the use of Typescript and JSX to declare VueJS components.

It provides all the necessary definitions to use Vue components with strong
typings, in particular in the render function.

It uses both [vue-class-component](https://github.com/vuejs/vue-class-component)
and [vue-property-decorators](https://github.com/kaorun343/vue-property-decorator)
to allow the use of class syntax for Vue components.

In addition, it provides JSX typings so that the render function of components
can be written in JSX, enabling type checking.

### Example

```js
import { Vue, Prop } from 'vtyx';

interface ChildProps {
    title: string;
}

// (1)
class Child extends Vue<ChildProps> {
    @Prop()
    title: string;

    render() {
        const h = this.renderWrapper(); // (2)

        return (
          // type checking on intrinsic elements
          <a
            href="#"
            onClick={() => this.$emit('click')}
          >
            {title}
          </a>
        );
    }
}

class Parent extends Vue<{}> {
    hide = false;

    render() {
        const h = this.renderWrapper(); // (2)

        return (
          <Child
            class={['c1', { 'c2': true, 'c3': false }]}
            prop1="foo" // type checking on components
            on={{
                // event modifiers handled
                'change.prevent.default': () => this.hide = !this.hide,
            }}
            v-visible={this.hide} // a few directives are available
          />
        );
    }
}
```

* (1) See [vue-class-component](https://github.com/vuejs/vue-class-component)
      and [vue-property-decorators](https://github.com/kaorun343/vue-property-decorator)
      for the class syntax.
* (2) A "render wrapper" is required to transfrom the JSX arguments into the complex arguments
      of vue's createElement function.

### Features

* JSX type definitions for intrinsic elements (mostly taken from @types/react).
* `onClick`, `onChange`, `onInput` available on intrinsic elements.
* For a `foo` event, either `onFoo=...` or `on={{ 'foo': ... }}` can be used.
  Event modifiers can be used, but only in the `on={{ 'foo.modifier': ... }}`
  syntax.
* `class`, `key` and `ref` are handled. See
  [The Vue documentation](https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance)
  for more details.
* A few directives are available: `v-visible`.
* no `v-model` or `v-bind`
* Some additional features available in the
  [createElement API](https://v3.vuejs.org/guide/render-function.html#creating-component-vnodes)
  may be missing. It either means we never had a use for it, or that it
  cannot fit with the JSX design.
