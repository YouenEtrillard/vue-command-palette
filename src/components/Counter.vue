<script setup>
import { ref } from 'vue';
import { register as registerCommand } from '../features/commands';

const currentCount = ref(0);

const incrementCount = () => currentCount.value++;

registerCommand({
  name: 'Increment count',
  function: incrementCount,
  hotkeys: ['Ctrl_Alt_I'],
});
</script>

<template>
  <h2>Counter</h2>
  <p>{{ currentCount }}</p>
  <button @click="incrementCount">+</button>
</template>

<style scoped></style>
