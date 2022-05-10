<script setup lang="ts">
import 'normalize.css';
import { ref, watch } from 'vue';
import CommandPalette from './components/CommandPalette.vue';
import Counter from './components/Counter.vue';
import { useMagicKeys, whenever } from '@vueuse/core';
import { useCommandStore } from './stores/CommandStore';
import Todo from './components/Todo.vue';

const displayCommandPalette = ref(false);
const keys = useMagicKeys();

whenever(keys.ctrl_shift_l, () => {
  displayCommandPalette.value = !displayCommandPalette.value;
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
  <CommandPalette
    v-show="displayCommandPalette"
    :displayed="displayCommandPalette"
  />
  <Counter />
  <Todo />
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
