<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { commandList } from '../features/commands';

const commandFilterText = ref('');

const filteredCommandList = computed(() => {
  const filterText = commandFilterText.value.toLowerCase();

  return commandList.value.filter((command: { title: string }) => {
    return command.title.toLowerCase().includes(filterText);
  });
});

const commandInput = ref();
onMounted(() => {
  commandInput.value.focus();
});
</script>

<template>
  <div class="command-palette">
    <h1>My command palette</h1>
    <input ref="commandInput" type="text" v-model="commandFilterText" />
    <ul>
      <li
        v-for="command in filteredCommandList"
        :key="command.id"
        @click="command.command"
      >
        {{ command.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
