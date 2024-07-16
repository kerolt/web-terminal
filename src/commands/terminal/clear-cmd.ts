import { CommandType } from "../command";

const clearCommand: CommandType = {
  cmd: "clear",
  name: "清屏",
  options: [],
  action: (options, terminal) => {
    setTimeout(() => {
      terminal.clear();
    }, 100);
  }
};

export default clearCommand;
