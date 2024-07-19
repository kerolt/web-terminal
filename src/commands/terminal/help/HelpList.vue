<script setup lang="ts">
import { commandList } from "../../register";
</script>

<template>
  <div>
    <div>👋 您可使用help命令查看其他命令的用法，如：help shortcut</div>
    <div>命令列表：</div>
    <div v-for="(command, index) in commandList" :key="index">
      <a-row :gutter="16">
        <a-col :span="4">{{ command.cmd }}</a-col>
        <a-col :span="4">{{ command.name }}</a-col>
        <a-col>{{ command.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
