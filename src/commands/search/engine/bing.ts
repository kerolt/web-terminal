import { CommandType } from "@/commands/command";

const bingCommand: CommandType = {
  cmd: "bing",
  name: "Bing搜索",
  alias: [],
  options: [],
  params: [
    {
      key: "content",
      desc: "搜索内容",
      required: true
    }
  ],
  action: (options, terminal) => {
    const { _ } = options;
    const content = _.join(" ");
    window.open(`https://bing.com/search?q=${content}`);
  }
};

export default bingCommand;
