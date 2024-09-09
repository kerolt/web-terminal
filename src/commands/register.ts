import searchCommand from "@/commands/search/search-cmd";
import { CommandType } from "./command";
import backgroundCommand from "./background/bg-cmd";
import clearCommand from "./terminal/clear-cmd";
import helpCommand from "./terminal/help/help-cmd";
import historyCommand from "./terminal/history/history-cmd";
import shortcutCommand from "./terminal/shortcut-cmd";
import todoCommand from "./todo/todo-cmd";

const commandList: CommandType[] = [
  clearCommand,
  historyCommand,
  shortcutCommand,
  helpCommand,
  backgroundCommand,
  todoCommand,
  ...searchCommand
];

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.cmd] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
