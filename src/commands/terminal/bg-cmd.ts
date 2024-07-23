import { CommandType } from "../command";
import { useConfigStore } from "../../stores/terminal-config";

const backgroundCommand: CommandType = {
  cmd: "background",
  name: "切换背景",
  alias: ["bg"],
  options: [],
  params: [
    {
      paramName: "url",
      desc: "图片地址，可为颜色，不填则使用bing随机壁纸"
    }
  ],
  action: (options, terminal) => {
    const { _ } = options;
    const { setBackground } = useConfigStore();
    if (_.length === 0) {
      // 这里使用的接口并不是返回图像的url，虽然css的background可以直接用这个接口，
      // 但是如果每次修改时background的值不变，背景是不会修改的，这里取个巧，在接口后面加一个随机值参数
      setBackground(`https://bing.img.run/rand.php?tmp=${Math.random()}`);
    } else {
      setBackground(_[0]);
    }
  }
};

export default backgroundCommand;
