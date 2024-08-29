import { CommandType } from "@/commands/command";

const mdnCommand: CommandType = {
  cmd: "mdn",
  name: "MDN搜索",
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
    window.open(`https://developer.mozilla.org/zh-CN/search?q=${content}`);
  }
};

export default mdnCommand;
