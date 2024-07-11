import { ref, Ref } from "vue";
import { CommandInputType, CommandOutputType } from "./terminal";

const useHistory = (commandList: CommandOutputType[], inputCommand: Ref<CommandInputType>) => {
  const commandHistoryPos = ref(commandList.length);

  const historyCommandList = () => {
    return commandList;
  };

  const showNextCommand = () => {
    if (commandHistoryPos.value < commandList.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    } else if (commandHistoryPos.value === commandList.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = "";
    }
  };

  const showPrevCommand = () => {
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--;
      inputCommand.value.text = commandList[commandHistoryPos.value].text;
    }
  };

  return {
    commandHistoryPos,
    historyCommandList,
    showNextCommand,
    showPrevCommand
  };
};

export default useHistory;
