export interface Command {
  id?: string,
  name: string,
  action: Function,
  hotkeys?: string[],
  aliasList?: string[],
  origin?: string,
}

export interface RegisteredCommand extends Command {
  id: string,
}