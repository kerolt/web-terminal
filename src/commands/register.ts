import { CommandType } from "./command";
import backgroundCommand from "./terminal/bg-cmd";
import clearCommand from "./terminal/clear-cmd";
import helpCommand from "./terminal/help/help-cmd";
import historyCommand from "./terminal/history-cmd";
import shortcutCommand from "./terminal/shortcut-cmd";

const commandList: CommandType[] = [
  clearCommand,
  historyCommand,
  shortcutCommand,
  helpCommand,
  backgroundCommand
];

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.cmd] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
