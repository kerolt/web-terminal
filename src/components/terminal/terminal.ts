/**
 * 输出状态，成功，失败，警告
 */
export type OutputStatusType = "success" | "error" | "warning";

/**
 * 输出类型
 * command：最终用于渲染已经执行过的命令
 * - text：文本结果，可写入command.resultList，也可直接写入终端，用于作为初始化时的提示等
 * - component：组件结果，写入command.result
 */
export interface OutputType {
  type: "command" | "text" | "component";
  text?: string;
  resultList?: OutputType[];
  status?: OutputStatusType;
  props?: any;
  collapsible?: boolean;
  component?: any;
}

/**
 * 当前执行的命令、历史记录保存的命令的类型
 */
export interface CommandOutputType extends OutputType {
  type: "command";
  text: string;
  resultList: OutputType[];
}

export interface TextOutputType extends OutputType {
  type: "text";
  text: string;
}

export interface ComponentOutputType extends OutputType {
  type: "component";
  component: any;
  props?: any;
}

/**
 * 命令输入类型
 */
export interface CommandInputType {
  text: string;
  placeholder?: string;
}

/**
 * 终端类型，定义了一组操作终端的API
 */
export interface TerminalType {
  // 提交命令
  doSubmitCommand: () => void;

  // 清屏
  clear: () => void;

  // 直接将文本输出至Terminal的outputList中
  writeTextToOutputList: (text: string, status?: OutputStatusType) => void;

  // 将文本写入当前执行命令的结果
  writeTextToResult: (text: string, status?: OutputStatusType) => void;
  // 写命令错误文本结果
  writeErrorTextToResult: (text: string) => void;
  // 写命令成功文本结果
  writeSuccessTextToResult: (text: string) => void;
  // 将组件写入执行命令的结果列表
  writeComponentToResult: (output: ComponentOutputType) => void;

  // 输入框聚焦
  focusOnInput: () => void;
  // 获取输入框是否聚焦
  isInputFocused: () => boolean;
  // 设置输入框的值
  setTabCompletion: () => void;
  // 查看下一条命令
  showNextCommand: () => void;
  // 查看上一条命令
  showPrevCommand: () => void;
  // 查看历史命令
  listCommandHistory: () => CommandOutputType[];
  // 折叠 / 展开所有块
  toggleAllCollapse: () => void;
  // 设置命令是否可折叠
  // setCommandCollapsible: (collapsible: boolean) => void;
}
