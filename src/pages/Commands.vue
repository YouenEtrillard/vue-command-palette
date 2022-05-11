<script setup lang="ts">
import { ref } from 'vue';
import { useCommandStore } from '../stores/CommandStore';
import { RegisteredCommand } from '../types/command.type';
import type { Ref } from 'vue';

const commandStore = useCommandStore();

const userAliasInputList: Ref<{ [k: string]: any }> = ref({});

const addAlias = (command: RegisteredCommand) => {
  command.aliasList
    ? command.aliasList.push(userAliasInputList.value[command.id])
    : (command.aliasList = [userAliasInputList.value[command.id]]);
};
</script>

<template>
  <h1>Commands</h1>
  <pre>{{ userAliasInputList }}</pre>
  <ul>
    <li v-for="(command, index) in commandStore.commandList" :key="command.id">
      {{ command.name }}
      <div>
        <input type="text" v-model="userAliasInputList[command.id]" />
        <button @click="addAlias(command)">Add alias</button>
      </div>
      <ul>
        <li v-for="alias in command.aliasList" :key="`${command.id}-${alias}`">
          {{ alias }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
li {
  text-align-last: left;
}
</style>
