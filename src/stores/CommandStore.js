import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useCommandStore = defineStore('CommandStore', {
  state: () => ({
    commandList: [],
  }),
  getters: {
    composedList: (state) => {
      const composedCommandList = [];

      state.commandList.forEach((command) => {
        composedCommandList.push({
          id: uuidv4(),
          title: command.title,
          origin: 'Primary command',
          function: command.command,
        });

        if (command.aliasList.length > 0) {
          command.aliasList.forEach((alias) => {
            composedCommandList.push({
              id: uuidv4(),
              title: alias,
              origin: command.title,
              function: command.command,
            });
          });
        }
      });
      return composedCommandList;
    },
  },
});
