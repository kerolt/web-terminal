import { CommandType } from "../../command";
import { ComponentOutputType } from "../../../components/terminal/terminal";
import { defineAsyncComponent, markRaw } from "vue";
import { commandMap } from "../../register";

const helpCommand: CommandType = {
  cmd: "help",
  name: "查看帮助",
  alias: ["man"],
  params: [
    {
      paramName: "commandName",
      desc: "命令参数名称"
    }
  ],
  options: [],
  action: (options, terminal, parentCommand) => {
    const { _ } = options;
    // 只输入help时，列出所有命令的名称及描述
    if (_.length < 1) {
      const output: ComponentOutputType = {
        type: "component",
        component: markRaw(defineAsyncComponent(() => import("./HelpList.vue")))
      };
      terminal.writeComponentToResult(output);
      return;
    }

    // 当输入 help 命令名称 时，需要输出该命令的详情
    const commandName = _[0];
    let command = commandMap[commandName];
    if (
      parentCommand &&
      parentCommand.subCommandsMap &&
      Object.keys(parentCommand.subCommandsMap).length > 1
    ) {
      command = parentCommand.subCommandsMap[commandName];
    }
    if (!command) {
      terminal.writeErrorTextToResult("找不到该命令");
      return;
    }
    const output: ComponentOutputType = {
      type: "component",
      component: markRaw(defineAsyncComponent(() => import("./HelpDetails.vue"))),
      props: { command, parentCommand }
    };
    terminal.writeComponentToResult(output);
  }
};

export default helpCommand;
