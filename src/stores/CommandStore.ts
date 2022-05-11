import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { RegisteredCommand } from "../types/command.type";

export const useCommandStore = defineStore('CommandStore', {
  state: () => ({
    commandList: [] as RegisteredCommand[],
  }),
  getters: {
    composedList: (state) => {
      const composedCommandList: RegisteredCommand[] = [];

      state.commandList.forEach((command: RegisteredCommand) => {
        composedCommandList.push({
          id: uuidv4(),
          name: command.name,
          origin: 'Primary command',
          action: command.action,
        });

        if (command.aliasList && command.aliasList.length > 0) {
          command.aliasList.forEach((alias) => {
            composedCommandList.push({
              id: uuidv4(),
              name: alias,
              origin: command.name,
              action: command.action,
            });
          });
        }
      });
      return composedCommandList;
    },
  },
});
