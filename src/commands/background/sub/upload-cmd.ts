import { CommandType } from "@/commands/command";
import { useConfigStore } from "@/stores/terminal-config";

const uploadCommand: CommandType = {
  cmd: "upload",
  name: "选择文件上传图片作为背景",
  options: [],
  action(options, terminal) {
    const inputFile = document.getElementById("upload")!!;
    const { setBackground } = useConfigStore();
    inputFile.addEventListener("change", function (e) {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }
      if (file.size >= 3 * 1024 * 1024) {
        terminal.writeTextToOutputList("图片大小应控制在3MB内！", "warning");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && e.target.result) {
          setBackground(e.target.result.toString());
        }
      };
      reader.onerror = function (e) {
        terminal.writeTextToOutputList("读取文件时发生错误：" + e.target?.error?.message, "error");
      };
      reader.readAsDataURL(file);
    });

    inputFile.click();
  }
};

export default uploadCommand;
