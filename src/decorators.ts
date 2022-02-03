import { createDecorator } from 'vue-class-component';

export { Emit, Inject, Model, Prop, Provide, Ref, Watch } from 'vue-property-decorator';

export const Component: <V>(v: V) => V = (v) => v;

export function Emits(events: string[]) {
    return createDecorator((componentOptions) => {
        componentOptions.emits || (componentOptions.emits = []);
        const eventList = new Set([...componentOptions.emits, ...events]);
        componentOptions.emits = Array.from(eventList);
    });
}
