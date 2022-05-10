<script setup lang="ts">
import { ref } from 'vue';
import { register as registerCommand } from '../features/commands';

const taskList = ref([
  {
    name: 'static task',
  },
]);

const addTask = () => {
  taskList.value.push({
    name: 'added task',
  });
};

registerCommand({
  name: 'Add task to todo list',
  function: addTask,
});
</script>

<template>
  <ul>
    <li v-for="(task, index) in taskList" :key="index">
      {{ task.name }}
    </li>
  </ul>
</template>

<style scoped></style>
