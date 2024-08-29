import { CommandType } from "@/commands/command";

const baiduCommand: CommandType = {
  cmd: "baidu",
  name: "百度搜索",
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
    window.open(`https://www.baidu.com/s?wd=${content}`);
  }
};

export default baiduCommand;
