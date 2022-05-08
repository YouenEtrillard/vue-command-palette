<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core';
import { computed, ref, onMounted } from 'vue';
import { commandList } from '../features/commands';

const keys = useMagicKeys();
const commandFilterText = ref('');
const highlightedItemIndex = ref(0);

const filteredCommandList = computed(() => {
  const filterText = commandFilterText.value.toLowerCase();

  return commandList.value.filter((command: { title: string }) => {
    return command.title.toLowerCase().includes(filterText);
  });
});

const commandInput = ref();
const displayed = ref(false);
onMounted(() => {
  displayed.value = true;
  commandInput.value.focus();
});

whenever(keys.down, () => {
  if (displayed) {
    highlightedItemIndex.value < filteredCommandList.value.length - 1
      ? highlightedItemIndex.value++
      : (highlightedItemIndex.value = 0);
  }
});

whenever(keys.up, () => {
  if (displayed) {
    highlightedItemIndex.value > 0
      ? highlightedItemIndex.value--
      : (highlightedItemIndex.value = filteredCommandList.value.length - 1);
  }
});
</script>

<template>
  <div class="command-palette">
    <h1>My command palette</h1>
    <input ref="commandInput" type="text" v-model="commandFilterText" />
    <ul>
      <li
        v-for="(command, index) in filteredCommandList"
        :key="command.id"
        @click="command.command"
        :class="index === highlightedItemIndex ? 'is-highlighted' : ''"
      >
        {{ command.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  padding: 0;
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}

li {
  list-style-type: none;
  text-align: left;
  padding-left: 15px;
  position: relative;
}
.is-highlighted {
  color: #048b9a;
}

.is-highlighted::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-left-color: currentColor;
}
</style>
