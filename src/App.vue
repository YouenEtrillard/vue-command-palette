<script setup lang="ts">
import { ref } from 'vue';
import CommandPalette from './components/CommandPalette.vue';

const displayCommandPalette = ref(false);
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
    @click="displayCommandPalette = !displayCommandPalette"
  />
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
