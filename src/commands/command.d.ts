import { ParsedOptions } from "getopts";
import { TerminalType } from "../components/terminal/terminal";

/**
 * 命令类型
 */
interface CommandType {
  // 可用于执行的命令名称
  cmd: string;
  // 命令的中文名称
  name: string;
  // 选项配置
  options: CommandOptionType[];
  // 介绍
  desc?: string;
  // 功能别名
  alias?: string[];
  // 参数配置
  params?: CommandParamsType[];
  // 子命令
  subCommandsMap?: Record<string, CommandType>;
  // 执行命令结果是否可折叠
  collapsible?: boolean;
  // 执行功能
  action: (options: ParsedOptions, terminal: TerminalType, parentCommand?: CommandType) => void;
}

/**
 * 命令参数类型，用于help命令的提示
 */
interface CommandParamsType {
  paramName: string; // 参数名
  desc: string; // 描述
  defaultValue?: string | boolean;
  required?: boolean; // 是否必填
}

/**
 * 命令选项类型
 */
interface CommandOptionType {
  name: string; // 选项名，如果是长格式选项，则不用在里面写“--”，例如--list只需要写list
  type: "string" | "boolean";
  desc: string; // 描述
  alias?: string[]; // 命令简写，通常为短格式选项，不用写“-”，例如-s只需要写s
  defaultValue?: string | boolean; // 默认值，标识作用
  required?: boolean; // 是否必填
}
