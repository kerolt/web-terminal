import { CommandType } from "@/commands/command";
import { useConfigStore } from "@/stores/terminal-config";
import uploadCommand from "@/commands/background/sub/upload-cmd";

const subCommandsMap: Record<string, CommandType> = { upload: uploadCommand };

const backgroundCommand: CommandType = {
  cmd: "background",
  name: "切换背景",
  alias: ["bg"],
  desc: "可选择颜色或图片URL作为背景，或者上传不超过3MB大小的图片",
  options: [],
  params: [
    {
      key: "url",
      desc: "图片URL/颜色"
    }
  ],
  subCommandsMap: subCommandsMap,
  action: (options, terminal) => {
    const { _ } = options;
    const { setBackground } = useConfigStore();
    if (_.length === 0) {
      // 这里使用的接口并不是返回图像的url，虽然css的background可以直接用这个接口，
      // 但是如果每次修改时background的值不变，背景是不会修改的，这里取个巧，在接口后面加一个随机值参数
      setBackground(`https://bing.img.run/rand.php?tmp=${Math.random()}`);
    } else if (!Object.keys(subCommandsMap).includes(_[0])) {
      setBackground(_[0]);
    }
  }
};

export default backgroundCommand;
