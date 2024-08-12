import { useTodoStore } from "../../../stores/todo-store";
import { CommandType } from "../../command";

const delTodoCommand: CommandType = {
  cmd: "del",
  name: "删除第i个代办事项",
  options: [],
  action: (options, terminal) => {
    const { _ } = options;
    const index = parseInt(_[0]) - 1;
    const { deleteTask } = useTodoStore();
    if (deleteTask(index)) {
      terminal.writeSuccessTextToResult("删除成功:D");
    } else {
      terminal.writeErrorTextToResult("删除失败:(");
    }
  }
};

export default delTodoCommand;
