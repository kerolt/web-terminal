import { defineAsyncComponent, markRaw } from "vue";
import { ComponentOutputType } from "../../components/terminal/terminal";
import { CommandType } from "../command";
import addTodoCommand from "./sub/add-cmd";
import delTodoCommand from "./sub/del-cmd";

const todoCommand: CommandType = {
  cmd: "todo",
  name: "代办事项",
  options: [],
  params: [
    {
      paramName: "add",
      desc: "添加代办事项"
    }
  ],
  collapsible: true,
  subCommandsMap: {
    add: addTodoCommand,
    del: delTodoCommand
  },
  action: (options, terminal) => {
    const { _ } = options;
    if (_.length <= 0) {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./TodoList.vue")))
      };
      terminal.writeComponentToResult(output);
      return;
    }
  }
};

export default todoCommand;
