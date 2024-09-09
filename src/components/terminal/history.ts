import { ref, Ref } from "vue";
import { CommandInputType, CommandOutputType } from "./terminal";

const useHistory = (commandList: Ref<CommandOutputType[]>, inputCommand: Ref<CommandInputType>) => {
  const commandHistoryPos = ref(commandList.value.length);

  const historyCommandList = () => {
    return commandList.value;
  };

  const showNextCommand = () => {
    if (commandHistoryPos.value < commandList.value.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = commandList.value[commandHistoryPos.value].text;
    } else if (commandHistoryPos.value === commandList.value.length - 1) {
      commandHistoryPos.value++;
      inputCommand.value.text = "";
    }
  };

  const showPrevCommand = () => {
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--;
      inputCommand.value.text = commandList.value[commandHistoryPos.value].text;
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
