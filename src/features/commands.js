import { v4 as uuidv4 } from 'uuid';
import { useCommandStore } from '../stores/CommandStore';

export const register = (config) => {
  const commandStore = useCommandStore();

  commandStore.commandList.push({
    id: uuidv4(),
    title: config.name,
    command: config.function,
    hotkeys: config.hotkeys || [],
  });
};
