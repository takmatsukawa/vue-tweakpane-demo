import {defineComponent, h, inject, InjectionKey, onUnmounted, provide} from "vue";
import {Pane} from 'tweakpane'
import {InputParams} from "@tweakpane/core/src/blade/common/api/params";

interface StateDefinition {
    pane: Pane
}

const PaneContext = Symbol('PaneContext') as InjectionKey<StateDefinition>

function usePaneContext(component: string) {
    let context = inject(PaneContext, null)

    if (context === null) {
        throw new Error(`<${component} /> is missing a parent <TPane /> component.`)
    }

    return context
}

export let TPane = defineComponent({
    name: 'TPane',
    render () {
        return h(
            'div',
            {},
            this.$slots.default?.()
        )
    },
    setup () {
        const pane = new Pane();

        const api = {
            pane
        }

        provide(PaneContext, api)
    }
})

export let TInput = defineComponent({
    name: 'TInput',
    emits: { 'update:modelValue': (_value: any) => true },
    props: {
        modelValue: { type: [Object, String, Number, Boolean] },
        name: { type: String, required: true },
        optParams: { type: Object as () => InputParams, default: undefined}
    },
    render () {},
    setup (props, {emit}) {
        const api = usePaneContext('TInput')

        const PARAMS = {
            [props.name]: props.modelValue,
        };

        const input = api.pane.addInput(PARAMS, props.name, props.optParams);

        input.on('change', ev => {
            emit('update:modelValue', ev.value);
        })

        onUnmounted(() => api.pane.remove(input))
    }
})