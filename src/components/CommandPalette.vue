<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useCommandStore } from '../stores/CommandStore';
import { Command } from '../types/command.type';

const props = defineProps({
  displayed: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    default: 'light',
  },
});
const commandStore = useCommandStore();
const keys = useMagicKeys();

// Filter list with user input
const commandFilterText = ref('');
const highlightedCommandIndex = ref(0);

const filteredCommandList = computed(() => {
  const filterText = commandFilterText.value.toLowerCase();

  return commandStore.composedList.filter((command: Command) => {
    return command.name.toLowerCase().includes(filterText);
  });
});
// End Filter list with user input

// Focus input automatically
const elFilterInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  elFilterInput.value?.focus();
});
watch(props, async (cv) => {
  if (props.displayed) {
    await nextTick();
    elFilterInput.value?.focus();
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
  if (highlightedCommand.value.action) {
    highlightedCommand.value.action();
  } else {
    console.log('No command associated');
  }
});
// End Highlight and select command
</script>

<template>
  <div
    class="command-palette-overlay"
    :class="
      theme === 'dark'
        ? 'command-palette-overlay--dark'
        : 'command-palette-overlay--light'
    "
  >
    <section class="command-palette">
      <input
        class="command-palette-filter"
        ref="elFilterInput"
        type="text"
        v-model="commandFilterText"
        placeholder="Select a command"
      />
      <ul class="command-palette-list">
        <li
          v-for="(command, index) in filteredCommandList"
          :key="command.id"
          @click="command.action()"
          class="command-palette-item"
          :class="index === highlightedCommandIndex ? 'is-highlighted' : ''"
        >
          <span
            >{{ command.name
            }}<span class="command-origin">{{ command.origin }}</span></span
          >

          <span v-if="command.hotkeys">{{ command.hotkeys }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style>
.command-palette-overlay {
  --backgroundColor: 0, 0%, 90%;
  background: hsl(var(--backgroundColor), 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.command-palette {
  background: hsl(var(--backgroundColor), 0.9);
  color: hsl(0, 0%, 0%);
  width: 90%;
  max-width: 600px;
  margin: 20px auto 0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.command-palette-overlay--dark {
  --backgroundColor: 0, 0%, 0%;
}

.command-palette-overlay--dark .command-palette {
  color: hsl(0, 0%, 80%);
}

.command-palette-overlay--dark .command-palette-filter {
  border-color: hsl(0, 0%, 50%, 0.9);
  color: inherit;
}

.command-palette-filter {
  background: inherit;
  border: 1px solid hsl(0, 0%, 0%, 0.4);
  margin-bottom: 8px;
  padding: 8px 7px;
}

.command-palette-list {
  padding: 0;
  margin: 0;
}

.command-palette-item {
  list-style-type: none;
  padding: 8px;
  text-align: left;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.is-highlighted {
  background: hsl(186, 95%, 31%, 0.5);
}

.command-origin {
  display: block;
  font-size: 0.8rem;
}
</style>
