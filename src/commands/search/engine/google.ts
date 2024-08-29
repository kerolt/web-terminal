import { CommandType } from "@/commands/command";

const googleCommand: CommandType = {
  cmd: "google",
  name: "谷歌搜索",
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
    window.open(`https://www.google.com/search?q=${content}`);
  }
};

export default googleCommand;
