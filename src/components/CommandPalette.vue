<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { commandList } from '../features/commands';

const props = defineProps({
  displayed: {
    type: Boolean,
    default: true,
  },
});
const keys = useMagicKeys();

// Filter list with user input
const commandFilterText = ref('');
const highlightedCommandIndex = ref(0);

const filteredCommandList = computed(() => {
  const filterText = commandFilterText.value.toLowerCase();

  return commandList.value.filter((command: { title: string }) => {
    return command.title.toLowerCase().includes(filterText);
  });
});
// End Filter list with user input

// Focus input automatically
const elFilterInput = ref();
onMounted(() => {
  elFilterInput.value.focus();
});
watch(props, async (cv) => {
  if (props.displayed) {
    await nextTick();
    elFilterInput.value.focus();
  }
});
// End Focus input automatically

// Highlight and select command
const highlightedCommand = computed(() => {
  return filteredCommandList.value[highlightedCommandIndex.value];
});

whenever(keys.down, () => {
  if (props.displayed) {
    highlightedCommandIndex.value < filteredCommandList.value.length - 1
      ? highlightedCommandIndex.value++
      : (highlightedCommandIndex.value = 0);
  }
});

whenever(keys.up, () => {
  if (props.displayed) {
    highlightedCommandIndex.value > 0
      ? highlightedCommandIndex.value--
      : (highlightedCommandIndex.value = filteredCommandList.value.length - 1);
  }
});

whenever(keys.enter, () => {
  if (highlightedCommand.value.command) {
    highlightedCommand.value.command();
  } else {
    console.log('No command associated');
  }
});
// End Highlight and select command
</script>

<template>
  <div class="command-palette">
    <h1>My command palette</h1>
    <input ref="elFilterInput" type="text" v-model="commandFilterText" />
    <ul>
      <li
        v-for="(command, index) in filteredCommandList"
        :key="command.id"
        @click="command.command"
        :class="index === highlightedCommandIndex ? 'is-highlighted' : ''"
      >
        <span>{{ command.title }}</span>
        <span v-if="command.hotkeys">{{ command.hotkeys }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  padding: 0;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

li {
  list-style-type: none;
  padding: 10px;
  text-align: left;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.is-highlighted {
  background: hsl(186, 95%, 31%, 30%);
}
</style>
