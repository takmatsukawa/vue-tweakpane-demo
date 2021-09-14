import {defineComponent, h, inject, InjectionKey, onUnmounted, provide} from "vue";
import {Pane} from 'tweakpane'

interface StateDefinition {
    pane: Pane
}

let PaneContext = Symbol('PaneContext') as InjectionKey<StateDefinition>

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
    render () {},
    setup () {
        const api = usePaneContext('TInput')

        const PARAMS = {
            factor: 123,
            title: 'hello',
            color: '#0f0',
        };

        const input = api.pane.addInput(PARAMS, 'factor');

        onUnmounted(() => api.pane.remove(input))
    }
})