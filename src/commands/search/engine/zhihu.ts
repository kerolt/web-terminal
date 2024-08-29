import { CommandType } from "@/commands/command";

const zhihuCommand: CommandType = {
  cmd: "zhihu",
  name: "知乎搜索",
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
    window.open(`https://www.zhihu.com/search?q=${content}`);
  }
};

export default zhihuCommand;
