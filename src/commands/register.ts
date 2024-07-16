import { CommandType } from "./command";
import clearCommand from "./terminal/clear-cmd";

const commandList: CommandType[] = [clearCommand];

const commandMap: Record<string, CommandType> = {};

commandList.forEach((command) => {
  commandMap[command.cmd] = command;
  command.alias?.forEach((name) => {
    commandMap[name] = command;
  });
});

export { commandList, commandMap };
