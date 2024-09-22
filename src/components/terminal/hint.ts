import { Ref, ref } from "vue";
import { CommandInputType, HintType } from "./terminal";
import { commandMap } from "../../commands/register";
import { buildDebounce } from "@/utils/debounce";

export function useTab() {
  const hintList = ref<HintType[]>([]);

  function setInputComand(inputCommand: Ref<CommandInputType>) {
    if (hintList.value.length > 0) {
      inputCommand.value.text = hintList.value[0].command + " ";
    }
  }

  function setHintList(input: string) {
    clearHintList(); // 每一次响应input时应该清空之前的hint

    if (!input) {
      return;
    }

    const args = input.trim().split(" ");
    const cmdName = args[0].toLowerCase();
    const cmd = commandMap[cmdName];

    if (
      cmd &&
      cmd.subCommandsMap &&
      Object.keys(cmd.subCommandsMap).length > 0 &&
      args.length > 1
    ) {
      // 处理可能有子命令的情况，以：todo add 为例
      // 在todo命令的子命令map中能匹配args[1]的子命令
      const possibleCmdNames = Object.keys(cmd.subCommandsMap).filter((key) => {
        return key.startsWith(args[1].toLowerCase());
      });
      if (possibleCmdNames.length === 0) {
        return;
      }
      // 有子命令的情况下，hint的格式为：父命令 子命令 （命令描述）
      possibleCmdNames.forEach((command) => {
        hintList.value.push({
          command: `${cmdName} ${cmd.subCommandsMap![command].cmd}`,
          desc: cmd.subCommandsMap![command].name
        });
      });
    } else {
      const possibleCmdNames = Object.keys(commandMap).filter((key) => {
        return key.startsWith(cmdName);
      });
      if (possibleCmdNames.length === 0) {
        return;
      }
      possibleCmdNames.forEach((command) => {
        hintList.value.push({
          command: command,
          desc: commandMap[command].name
        });
      });
    }
  }

  function clearHintList() {
    hintList.value = [];
  }

  const debounceSetHintList = buildDebounce((input: string) => {
    setHintList(input);
  }, 150);

  return {
    hintList,
    setInputComand,
    setHintList,
    clearHintList,
    debounceSetHintList
  };
}
