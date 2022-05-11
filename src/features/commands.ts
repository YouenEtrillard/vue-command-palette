import { v4 as uuidv4 } from 'uuid';
import { useCommandStore } from '../stores/CommandStore';
import { Command } from "../types/command.type";

export const register = (config: Command) => {
  const commandStore = useCommandStore();

  commandStore.commandList.push({
    id: uuidv4(),
    name: config.name,
    action: config.action,
    hotkeys: config.hotkeys || [],
    aliasList: config.aliasList || [],
  });
};

