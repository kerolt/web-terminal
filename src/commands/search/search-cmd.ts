import { CommandType } from "@/commands/command";
import baiduCommand from "@/commands/search/engine/baidu";
import bingCommand from "@/commands/search/engine/bing";
import githubCommand from "@/commands/search/engine/github";
import googleCommand from "@/commands/search/engine/google";
import mdnCommand from "@/commands/search/engine/mdn";
import zhihuCommand from "@/commands/search/engine/zhihu";

const engineDict: Record<string, CommandType> = {
  bing: bingCommand,
  baidu: baiduCommand,
  google: googleCommand,
  zhihu: zhihuCommand,
  mdn: mdnCommand,
  github: githubCommand
};

const searchCommand: CommandType = {
  cmd: "search",
  name: "网页搜索",
  alias: ["s"],
  options: [
    {
      key: "engine",
      type: "string",
      desc: "搜索引擎",
      alias: ["e"],
      defaultValue: "bing" // 默认使用bing搜索
    }
  ],
  params: [
    {
      key: "content",
      desc: "搜索内容",
      required: true
    }
  ],
  action: (options, terminal) => {
    const { _, engine } = options;
    if (!engineDict[engine]) {
      terminal.writeErrorTextToResult("没有找到对应的搜索引擎！");
      return;
    }
    if (_.length === 0) {
      terminal.writeErrorTextToResult("请输入搜索内容！");
      return;
    }
    engineDict[engine].action(options, terminal);
  }
};

export default [searchCommand, ...Object.values(engineDict)];
