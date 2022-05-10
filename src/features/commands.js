import { ref } from 'vue';

export const register = (config) => {
  console.log(config);
  commandList.value.push({
    id: 356,
    title: config.name,
    command: config.function,
    hotkeys: config.hotkeys || [],
  });
};

export const commandList = ref([
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
