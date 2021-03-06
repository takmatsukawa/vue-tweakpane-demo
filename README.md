# Vue ❤ Tweakpane (Demo)

Vue.js wrapper for [Tweakpane](https://cocopon.github.io/tweakpane/) demo

![img.png](img.png)

```vue
<script setup lang="ts">
import {TPane, TInput, TFolder} from './components/tweakpane';
import {ref} from "vue";

const params = ref({
  factor: 123,
  title: 'hello',
  color: '#0f0',

  percentage: 50,
  theme: 'dark',
})
</script>

<template>
  <TPane title="Tweakpane">
    <TFolder title="Group1">
      <TInput v-model="params.factor" name="factor"></TInput>
      <TInput v-model="params.title" name="title"></TInput>
      <TInput v-model="params.color" name="color"></TInput>
    </TFolder>

    <TFolder title="Group2">
      <TInput v-model="params.percentage" name="percentage" :opt-params="{min: 0, max: 100, step: 1}"></TInput>
      <TInput v-model="params.theme" name="theme" :opt-params="{options: {Dark: 'dark', Light: 'light'}}"></TInput>
    </TFolder>
  </TPane>
</template>
```