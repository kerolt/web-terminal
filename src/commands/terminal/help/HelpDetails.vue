<script setup lang="ts">
import { toRefs } from "vue";
import { CommandOptionType, CommandType } from "../../command";

const props = withDefaults(
  defineProps<{
    command: CommandType;
    parentCommand: CommandType;
  }>(),
  {}
);
const { command, parentCommand } = toRefs(props);

/**
 * 获取命令的用法，参数如果有必填项，显示为尖括号包裹，否则为方括号；选项不会具体显示，会在之后的选项部分分条列举
 * @param command
 * @param parentCommand
 */
function getUsage(command: CommandType, parentCommand: CommandType): string {
  if (!command) {
    return "";
  }
  let usageStr = "";
  if (parentCommand) {
    usageStr += parentCommand.cmd + " ";
  }
  usageStr += command.cmd;

  // 参数
  if (command.params && command.params.length > 0) {
    const paramStrList = command.params.map((param) => {
      const desc = param.desc;
      return param.required ? `<${desc}>` : `[${desc}]`;
    });
    usageStr += " " + paramStrList.join(" ");
  }

  // 选项
  if (command.options && command.options.length > 0) {
    usageStr += "[选项]";
  }

  return usageStr;
}

/**
 * 获取命令选项的描述列表
 * @param option
 */
function getOptionItem(option: CommandOptionType): string[] {
  const res = [];
  if (option.alias && option.alias.length > 0) {
    res.push("-" + option.alias[0]);
  }
  res.push("--" + option.name);
  return res;
}
</script>

<template>
  <div>命令：{{ command.name }}</div>
  <div v-if="command.desc">描述：{{ command.desc }}</div>
  <div v-if="command.alias && command.alias.length > 0">别名：{{ command.alias.join(", ") }}</div>
  <div>用法：{{ getUsage(command, parentCommand) }}</div>
  <template v-if="command.options && command.options.length > 0">
    <div>选项：</div>
    <ul>
      <li v-for="(option, index) in command.options" :key="index">
        {{ getOptionItem(option).join(", ") }}
        {{ option.desc }}
        {{ option.defaultValue ? `${option.defaultValue}` : "" }}
        {{ option.required ? "（必填）" : "" }}
      </li>
    </ul>
  </template>
</template>

<style lang="scss" scoped></style>
