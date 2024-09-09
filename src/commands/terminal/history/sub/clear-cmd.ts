import { CommandType } from "@/commands/command";
import { useHistoryStore } from "@/stores/history-store";

const clearHistoryCommand: CommandType = {
  cmd: "clear",
  name: "清除历史命令记录",
  options: [],
  action(options, terminal) {
    const { cleanHistoryList } = useHistoryStore();
    cleanHistoryList();
    terminal.clearCommandList();
  }
};

export default clearHistoryCommand;
