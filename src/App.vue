<script setup lang="ts">
import { ref, watch } from 'vue';
import CommandPalette from './components/CommandPalette.vue';
import Counter from './components/Counter.vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import { commandList } from './features/commands';

const displayCommandPalette = ref(true);
const keys = useMagicKeys();

whenever(keys.ctrl_shift_l, () => {
  displayCommandPalette.value = !displayCommandPalette.value;
});

commandList.value.forEach((item) => {
  if (item.hotkeys.length > 0) {
    item.hotkeys.forEach((hotkey) => {
      if (item.command) {
        whenever(keys[hotkey], () => {
          item.command();
        });
      }
    });
  }
});
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <CommandPalette
    v-show="displayCommandPalette"
    :displayed="displayCommandPalette"
  />
  <Counter />
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
