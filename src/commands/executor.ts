import getopts, { ParsedOptions, Options } from "getopts";
import { TerminalType } from "../components/terminal/terminal";
import { CommandOptionType, CommandType } from "./command";
import { commandMap } from "./register";

/**
 * 命令执行器
 * @param text
 * @param terminal
 * @param parentCommand
 * @returns
 */
export async function executeCommand(
  text: string,
  terminal: TerminalType,
  parentCommand?: CommandType
) {
  // 1. 除去输入字符串中的首尾空格
  text = text.trim();
  if (!text) {
    return;
  }

  // 2. 获取命令
  const command = getCommad(text, parentCommand);
  if (!command) {
    terminal.writeErrorTextToResult("没有该命令");
    return;
  }

  // 3. 解析参数
  const parseOptions = parse(text, command.options);
  // getopts.ParsedOptions中的“_”属性会存储命令中没有以“-”或“--”开头的选项，一般来说，这是子命令的列表
  const { _ } = parseOptions;
  if (_.length > 0 && command.subCommandsMap && Object.keys(command.subCommandsMap).length > 0) {
    // 执行子命令
    const subText = text.substring(text.indexOf(" ") + 1);
    await executeCommand(subText, terminal, command);
    return;
  }

  // 4. 执行命令
  await doAction(command, parseOptions, terminal, parentCommand);
}

/**
 * 获取输入的字符串中的命令
 * @param text
 * @param parentCommand
 * @returns
 */
function getCommad(text: string, parentCommand?: CommandType): CommandType {
  let cmd = text.split(" ", 1)[0];
  cmd = cmd.toLowerCase();

  // 如果当前命令有父命令，则在父命令的map中去查找
  if (
    parentCommand &&
    parentCommand.subCommandsMap &&
    Object.keys(parentCommand.subCommandsMap).length > 0
  ) {
    return parentCommand.subCommandsMap[cmd];
  }
  // commandMap注册了所有一级命令（没有父命令的顶级命令），通常在这里面找
  return commandMap[cmd];
}

/**
 * 使用getopts库解析参数
 * @param text
 * @param commandOptions
 */
function parse(text: string, commandOptions: CommandOptionType[]): ParsedOptions {
  const args = text.split(" ").slice(1);
  const options: Options = {
    alias: {},
    default: {},
    string: [],
    boolean: []
  };

  commandOptions.forEach((commandOption) => {
    const { alias, name, type, defaultValue } = commandOption;
    if (alias && options.alias) {
      options.alias[name] = alias;
    }
    if (defaultValue && options.default) {
      options.default[name] = defaultValue;
    }
    // options.string.push or options.boolean.push
    options[type]?.push(name);
  });

  const parseOptions = getopts(args, options);
  console.log(parseOptions);
  return parseOptions;
}

async function doAction(
  command: CommandType,
  options: ParsedOptions,
  terminal: TerminalType,
  parentCommand?: CommandType
) {
  // TODO 当有“--help”时，应该用help命令提示当前命令的信息
  await command.action(options, terminal);
}
