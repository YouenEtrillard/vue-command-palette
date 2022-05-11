<script setup lang="ts">
import 'normalize.css';
import { ref, watch } from 'vue';
import CommandPalette from './components/CommandPalette.vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import { useCommandStore } from './stores/CommandStore';
import Navbar from './components/Navbar.vue';
import { Command } from './types/command.type';

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
commandStore.commandList.forEach((command: Command) => {
  if (command.hotkeys && command.hotkeys.length > 0) {
    command.hotkeys.forEach((hotkey) => {
      if (command.action) {
        whenever(keys[hotkey], () => {
          command.action();
        });
      }
    });
  }
});
</script>

<template>
  <Navbar />
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
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
