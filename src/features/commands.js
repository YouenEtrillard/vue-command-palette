import { ref } from 'vue';
import counter from './counter';

export const commandList = ref([
  {
    id: 123,
    title: 'Increment count',
    alias: [],
    hotkeys: ['ctrl_alt_i'],
    command: counter.incrementCount,
  },
  {
    id: 456,
    title: 'nikouli 2',
    alias: [],
    hotkeys: [],
    command: undefined,
  },
  {
    id: 789,
    title: 'makouli 3',
    alias: [],
    hotkeys: [],
    command: undefined,
  },
]);