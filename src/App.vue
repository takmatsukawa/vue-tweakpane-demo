<script setup lang="ts">
import {TPane, TInput} from './components/tweakpane';
import {ref} from "vue";

const params = ref({
  factor: 123,
  title: 'hello',
  color: '#0f0',
})
</script>

<template>
  <TPane>
    <TInput v-model="params.factor" name="factor"></TInput>
    <TInput v-model="params.title" name="title"></TInput>
    <TInput v-model="params.color" name="color"></TInput>
  </TPane>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
