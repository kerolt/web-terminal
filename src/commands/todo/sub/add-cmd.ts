import { useTodoStore } from "../../../stores/todo-store";
import { CommandType } from "../../command";
import { TodoType } from "../type";

const addTodoCommand: CommandType = {
  cmd: "add",
  name: "添加代办事项",
  options: [],
  action: (options, terminal) => {
    const { _ } = options;
    const content = _.join(" ");
    const { addTask } = useTodoStore();
    const task = {
      content
    } as TodoType;
    if (addTask(task)) {
      terminal.writeSuccessTextToResult("添加成功:D");
    } else {
      terminal.writeErrorTextToResult("添加失败:(");
    }
    // console.log(_.join(" "));
  }
};

export default addTodoCommand;
