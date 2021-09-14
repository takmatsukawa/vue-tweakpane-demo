import {defineComponent, h, inject, InjectionKey, provide, Ref} from "vue";
import {Pane} from 'tweakpane'

interface StateDefinition {
    pane: Pane
}

let PaneContext = Symbol('PaneContext') as InjectionKey<StateDefinition>

function usePaneContext(component: string) {
    let context = inject(PaneContext, null)

    if (context === null) {
        let err = new Error(`<${component} /> is missing a parent <TPane /> component.`)
        throw err
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

        return {pane}
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

        api.pane.addInput(PARAMS, 'factor');

    }
})