<script setup lang="ts">
import { ref } from "vue";
import Terminal from "@/components/terminal/Terminal.vue";
import { TerminalType } from "../components/terminal/terminal";

const terminalRef = ref();

const doSubmitCommand = (inputText: string) => {
  // alert(inputText);
  const terminal: TerminalType = terminalRef.value.terminal;
  terminal.writeTextToResult("hello");
};
</script>

<template>
  <Terminal ref="terminalRef" :on-submit-command="doSubmitCommand"></Terminal>
</template>

<style lang="scss" scoped></style>
