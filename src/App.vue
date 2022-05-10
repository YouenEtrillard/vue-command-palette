<script setup lang="ts">
import 'normalize.css';
import { ref, watch } from 'vue';
import CommandPalette from './components/CommandPalette.vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import { useCommandStore } from './stores/CommandStore';

const displayCommandPalette = ref(false);
const keys = useMagicKeys();

whenever(keys.ctrl_shift_l, () => {
  displayCommandPalette.value = !displayCommandPalette.value;
});

whenever(keys.escape, () => {
  if (displayCommandPalette.value) {
    displayCommandPalette.value = false;
  }
});

const commandStore = useCommandStore();
commandStore.commandList.forEach(
  (item: {
    id: number;
    title: string;
    command: Function;
    hotkeys: Array<any>;
  }) => {
    if (item.hotkeys.length > 0) {
      item.hotkeys.forEach((hotkey) => {
        if (item.command) {
          whenever(keys[hotkey], () => {
            item.command();
          });
        }
      });
    }
  }
);
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view />
  <CommandPalette
    v-show="displayCommandPalette"
    :displayed="displayCommandPalette"
  />
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

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
