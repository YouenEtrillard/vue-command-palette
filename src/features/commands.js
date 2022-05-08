import counter from './counter';

const commandList = [
  {
    id: 123,
    title: 'Increment count',
    alias: [],
    hotkeys: [],
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
];

export default { commandList };
