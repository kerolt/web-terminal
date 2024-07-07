<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { DEFAULT_USER } from "../../commands/user/constant";
import { UserType } from "../../commands/user/user";
import {
  OutputType,
  CommandInputType,
  CommandOutputType,
  OutputStatusType,
  TextOutputType,
  ComponentOutputType,
  TerminalType
} from "./terminal";

/**
 * 可以类比为一个指针，指向当前正在执行的命令，可通过这个“指针”来添加输出结果
 */
let currentCommandPtr: CommandOutputType;

interface TerminalProps {
  height?: string | number;
  user?: UserType;
  onSubmitCommand: (inputText: string) => void;
}

/**
 * props默认值，高度默认屏幕100vh，用户名默认local
 */
const props = withDefaults(defineProps<TerminalProps>(), {
  height: "100vh",
  user: DEFAULT_USER as any
});

/**
 * ref of user，可通过命令来修改username
 */
const { user } = toRefs(props);

/**
 * 命令行prompt
 */
const prompt = computed(() => {
  return `[${user?.value?.username}]$ `;
});

/**
 * collapse相关
 */
const activeKeys = ref<number[]>([]);
const terminalRef = ref();

/**
 * 当前是否有命令在执行
 */
const isRunning = ref(false);

/**
 * 执行的命令列表，可用于上下快捷键选择、查看历史等
 */
const commandList = ref<CommandOutputType[]>([]);

/**
 * TODO 历史记录 history
 */

/**
 * TODO 提示 hint
 */

/**
 * 输出列表，用于渲染已经执行命令的结果
 */
const outputList = ref<OutputType[]>([]);

/**
 * 输入命令
 */
const inputCommand = ref<CommandInputType>({
  text: "",
  placeholder: ""
});
const inputRef = ref();

/**
 * 点击终端时将光标聚焦于输入框
 * @param e
 */
const handleClickOnTerminal = (e: Event) => {
  if ((e.target as HTMLElement).className === "terminal-wrapper") {
    focusOnInput();
  }
};

/**
 * 提交命令（回车执行）
 */
const doSubmitCommand = async () => {
  isRunning.value = true;
  // TODO setHint("");

  // 设置当前命令指针的指向
  let inputText = inputCommand.value.text;
  const currentCommand: CommandOutputType = {
    text: inputText,
    type: "command",
    resultList: []
  };
  currentCommandPtr = currentCommand;

  // 执行命令，执行完毕后将其加入结果输出列表
  // 在执行器中会将结果写入currentCommandPtr，即写入了currentCommand
  await props.onSubmitCommand?.(inputText);
  outputList.value.push(currentCommand);
  activeKeys.value.push(outputList.value.length - 1);

  // 输入不为空，则加入commandList，用于设置历史记录等
  if (inputText) {
    commandList.value.push(currentCommand);
    writeSuccessTextToResult("这是一条测试数据");
    // TODO 设置历史记录
  }
  inputCommand.value = {
    text: "",
    placeholder: ""
  };
  isRunning.value = false;
};

/**
 * TODO 输入框内容改变时，触发输入提示
 */

/**
 * 清空输出
 */
const clear = () => {
  outputList.value = [];
};

/**
 * 直接写入终端，可用于做页面初始化的提示语等
 * @param text
 * @param status
 */
const writeTextToOutputList = (text: string, status?: OutputStatusType) => {
  const output: TextOutputType = {
    text,
    type: "text",
    status
  };
  outputList.value.push(output);
};

/**
 * 将文本放入命令执行结果
 * @param text
 * @param status
 */
const writeTextToResult = (text: string, status?: OutputStatusType) => {
  const result: OutputType = {
    type: "text",
    text,
    status
  };
  currentCommandPtr.resultList.push(result);
};

/**
 * 写入文本类错误状态结果
 * @param text
 */
const writeErrorTextToResult = (text: string) => {
  writeTextToResult(text, "error");
};

/**
 * 写入文本类成功状态结果
 * @param text
 */
const writeSuccessTextToResult = (text: string) => {
  writeTextToResult(text, "success");
};

/**
 * 将组件写入命令执行结果
 * @param output
 */
const writeComponentToResult = (output: ComponentOutputType) => {
  currentCommandPtr.resultList.push(output);
};

/**
 * 点击窗口，光标聚焦到输入框中
 */
const focusOnInput = () => {
  inputRef.value.focus();
};

const isFocusInput = ref<boolean>(false);

/**
 * 判断光标是否聚焦于输入框
 */
const isInputFocused = (): boolean => {
  return isFocusInput.value;
};

/**
 * TODO 按tab键补全命令
 */
const setTabCompletion = () => {};

/**
 * TODO 查看下一条命令
 */
const showNextCommand = () => {};

/**
 * TODO 查看上一条命令
 */
const showPrevCommand = () => {};

/**
 * TODO 查看历史命令
 */
const listCommandHistory = (): CommandOutputType[] => {};

/**
 * 折叠 / 展开所有块
 */
const toggleAllCollapse = () => {
  if (activeKeys.value.length === 0) {
    activeKeys.value = outputList.value.map((_, index) => {
      return index;
    });
  } else {
    activeKeys.value = [];
  }
};

const terminal: TerminalType = {
  doSubmitCommand,
  clear,
  writeTextToOutputList,
  writeTextToResult,
  writeErrorTextToResult,
  writeSuccessTextToResult,
  writeComponentToResult,
  focusOnInput,
  isInputFocused,
  setTabCompletion,
  showNextCommand,
  showPrevCommand,
  listCommandHistory,
  toggleAllCollapse
};

defineExpose({
  terminal
});
</script>

<template>
  <div class="terminal-wrapper" @click="handleClickOnTerminal">
    <div class="terminal">
      <!-- 命令执行结果（可折叠显示） -->
      <div class="collapse-wrapper">
        <a-collapse
          v-model:activeKey="activeKeys"
          :bordered="false"
          expand-icon-position="end"
          ghost
        >
          <template v-for="(output, index) in outputList" :key="index">
            <!-- 折叠内容，一般是内容比较多 -->
            <a-collapse-panel
              v-if="output.type === 'command'"
              :key="index"
              class="terminal-row"
              :show-arrow="false"
            >
              <template #header>
                <span class="prompt">{{ prompt }}</span>
                <span>{{ output.text }}</span>
              </template>
              <!-- TODO <ContentOutput></ContentOutput> component -->
              <div>{{ output }}</div>
            </a-collapse-panel>
            <!-- 不折叠内容 -->
            <template v-else>
              <!-- 如果输出结果的type不为command，则可能是初始化页面时的版本、版权、提示等信息 -->
              <!-- TODO <ContentOutput :output="output"></ContentOutput> component -->
              <div style="color: aquamarine">{{ output }}</div>
            </template>
          </template>
        </a-collapse>
      </div>
      <!-- 命令输入 -->
      <div style="padding: 5px 15px">
        <a-input
          ref="inputRef"
          class="command-input"
          v-model:value="inputCommand.text"
          autofocus
          :bordered="false"
          @press-enter="doSubmitCommand"
          @focus="
            () => {
              isFocusInput = true;
            }
          "
          @blur="
            () => {
              isFocusInput = false;
            }
          "
        >
          <template #addonBefore>
            <span class="command-input-prompt">{{ prompt }}</span>
          </template>
        </a-input>
      </div>
      <!-- 提示 -->
      <div class="hint"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.terminal-wrapper {
  padding: 20px;
  overflow: scroll;
  width: 100wh;
  background: black;
  min-height: 100vh;

  .terminal {
    background: rgba(0, 0, 0, 0.5);
  }

  ::v-deep(.ant-collapse-expand-icon) {
    color: white;
  }

  .prompt {
    user-select: none;
    color: white !important;
  }

  .collapse-wrapper {
    .terminal-row {
      font-size: 18px !important;
      font-family: courier-new, courier, monospace;

      ::v-deep(.ant-collapse-header) {
        padding: 5px 15px;
      }

      ::v-deep(.ant-collapse-header-text) {
        color: white;
      }

      ::v-deep(.ant-collapse-content-box) {
        color: white;
        padding: 5px 15px;
      }
    }
  }

  .command-input {
    color: white;
    font-size: 18px;
    font-family: courier-new, courier, monospace;

    :deep(input) {
      color: white !important;
      font-size: 18px;
      padding: 0 10px;
      font-size: 18px;
      font-family: courier-new, courier, monospace;
    }

    :deep(.ant-input) {
      background: none;
      border: none;
    }

    :deep(.ant-input-group-addon) {
      background: none;
      border: none;
      padding: 0;
    }

    &-prompt {
      user-select: none;
      color: white;
      background: transparent;
      font-size: 18px;
      font-family: courier-new, courier, monospace;
    }
  }
}
</style>
