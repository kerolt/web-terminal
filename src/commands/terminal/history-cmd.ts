import { CommandType } from "../command";

const historyCommand: CommandType = {
  cmd: "history",
  name: "历史记录",
  alias: ["h"],
  desc: "查看历史记录",
  options: [],
  collapsible: true,
  action: (options, terminal) => {
    const historys = terminal.listCommandHistory();
    historys.forEach((history, index) => {
      terminal.writeTextToResult(`${index + 1} ${history.text}`);
    });
  }
};

export default historyCommand;
