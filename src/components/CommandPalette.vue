<script setup lang="ts">
import { computed, ref } from 'vue';

const commandFilterText = ref('');
const commandList = ref([
  { id: 123, title: 'command arigato 1', alias: [], hotkeys: [] },
  { id: 456, title: 'command nikouli 2', alias: [], hotkeys: [] },
  { id: 789, title: 'command makouli 3', alias: [], hotkeys: [] },
]);

const filteredCommandList = computed(() => {
  const filterText = commandFilterText.value.toLowerCase();

  return commandList.value.filter((command) => {
    return command.title.toLowerCase().includes(filterText);
  });
});
</script>

<template>
  <div class="command-palette">
    <h1>My command palette</h1>
    <input type="text" v-model="commandFilterText" />
    <ul>
      <li v-for="command in filteredCommandList" :key="command.id">
        {{ command.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
