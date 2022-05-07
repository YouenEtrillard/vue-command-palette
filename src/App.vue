<script setup lang="ts">
import { ref, watch } from 'vue';
import CommandPalette from './components/CommandPalette.vue';
import { useMagicKeys } from '@vueuse/core';

const displayCommandPalette = ref(false);
const keys = useMagicKeys();

watch(keys.ctrl_shift_l, (isPressed) => {
  if (isPressed) {
    displayCommandPalette.value = !displayCommandPalette.value;
  }
});
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <CommandPalette v-if="displayCommandPalette" />
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
