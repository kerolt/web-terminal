import { shortcutList } from "../../components/terminal/shortcut";
import { CommandType } from "../command";

const shortcutCommand: CommandType = {
  cmd: "shortcut",
  name: "快捷键",
  desc: "查看快捷键",
  options: [],
  collapsible: true,
  action: (options, terminal) => {
    terminal.writeTextToResult("快捷键");
    const shortcuts = shortcutList;
    shortcuts.forEach((shortcut) => {
      if (shortcut?.keyDesc) {
        terminal.writeTextToResult(`${shortcut.keyDesc} ${shortcut.desc}`);
      }
    });
  }
};

export default shortcutCommand;
