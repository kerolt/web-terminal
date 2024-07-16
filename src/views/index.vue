<script setup lang="ts">
import { onMounted, ref } from "vue";
import Terminal from "@/components/terminal/Terminal.vue";
import { TerminalType } from "../components/terminal/terminal";
import { executeCommand } from "../commands/executor";

const terminalRef = ref();

onMounted(() => {
  terminalRef.value.terminal.writeTextToOutputList("Welcome to use Web Terminal!");
  terminalRef.value.terminal.writeTextToOutputList(
    "<a href='https://github.com/kerolt/web-terminal' target='_blank'>Github: https://github.com/kerolt/web-terminal</a>"
  );
});

const doSubmitCommand = (inputText: string) => {
  const terminal: TerminalType = terminalRef.value.terminal;
  executeCommand(inputText, terminal);
};
</script>

<template>
  <Terminal ref="terminalRef" :on-submit-command="doSubmitCommand"></Terminal>
</template>

<style lang="scss" scoped></style>
