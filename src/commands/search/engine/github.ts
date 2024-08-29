import { CommandType } from "@/commands/command";

const githubCommand: CommandType = {
  cmd: "github",
  name: "Github搜索",
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
    window.open(`https://github.com/search?q=${content}`);
  }
};

export default githubCommand;
