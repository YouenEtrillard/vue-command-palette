<script setup>
import { ref } from 'vue';
import { register as registerCommand } from '../features/commands';

const currentCount = ref(0);

const incrementCount = () => currentCount.value++;
const decrementCount = () => currentCount.value--;

registerCommand({
  name: 'Increment count',
  function: incrementCount,
  hotkeys: ['Ctrl_Alt_I'],
});

registerCommand({
  name: 'Decrement count',
  function: decrementCount,
  hotkeys: ['Ctrl_Alt_D'],
});
</script>

<template>
  <h2>Counter</h2>
  <p>{{ currentCount }}</p>
  <button @click="decrementCount">-</button>
  <button @click="incrementCount">+</button>
</template>

<style scoped></style>
