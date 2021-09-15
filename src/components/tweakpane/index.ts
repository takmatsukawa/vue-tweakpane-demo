import {defineComponent, h, inject, InjectionKey, onUnmounted, provide, watch} from "vue";
import {FolderApi, Pane} from 'tweakpane'
import {InputParams} from "@tweakpane/core/src/blade/common/api/params";

interface PaneStateDefinition {
    pane: Pane
}

const PaneContext = Symbol('PaneContext') as InjectionKey<PaneStateDefinition>

function usePaneContext(component: string) {
    const context = inject(PaneContext, null)

    if (context === null) {
        throw new Error(`<${component} /> is missing a parent <TPane /> component.`)
    }

    return context
}

export const TPane = defineComponent({
    name: 'TPane',
    props: {
      title: { type: String, default: undefined }
    },
    render () {
        return h(
            'div',
            {},
            this.$slots.default?.()
        )
    },
    setup (props) {
        const pane = new Pane(props.title ? {
            title: props.title
        }: undefined);

        provide(PaneContext, {
            pane
        })
    }
})

interface FolderStateDefinition {
    folder: FolderApi
}

const FolderContext = Symbol('FolderContext') as InjectionKey<FolderStateDefinition>

function useFolderContext(component: string) {
    return inject(FolderContext, null)
}

export const TFolder = defineComponent({
    name: 'TFolder',
    render () {
        return h(
            'div',
            {},
            this.$slots.default?.()
        )
    },
    props: {
        title: { type: String, required: true }
    },
    setup (props) {
        const {title} = props;
        const paneContext = usePaneContext('TFolder')
        const folder = paneContext.pane.addFolder({title})
        provide(FolderContext, {
            folder
        })

        onUnmounted(() => paneContext.pane.remove(folder));
    }
})

export const TInput = defineComponent({
    name: 'TInput',
    emits: { 'update:modelValue': (_value: any) => true },
    props: {
        modelValue: { type: [Object, String, Number, Boolean] },
        name: { type: String, required: true },
        optParams: { type: Object as () => InputParams, default: undefined}
    },
    render () {},
    setup (props, {emit}) {
        const paneContext = usePaneContext('TInput')
        const folderContext = useFolderContext('TInput')
        const blade = folderContext ? folderContext.folder : paneContext.pane;

        const PARAMS = {
            [props.name]: props.modelValue,
        };

        const input = blade.addInput(PARAMS, props.name, props.optParams);

        input.on('change', ev => {
            emit('update:modelValue', ev.value);
        })

        onUnmounted(() => blade.remove(input))
    }
})