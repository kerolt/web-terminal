<script setup lang="ts">
import { computed, toRefs } from "vue";
import { OutputType } from "./terminal";

const props = defineProps<{ output: OutputType }>();
const { output } = toRefs(props);
const tagColor = computed((): string => {
  if (!output.value.status) {
    return "";
  }
  switch (output.value.status) {
    case "success":
      return "limegreen";
    case "error":
      return "#c0300f";
    case "warning":
      return "#fe8c00";
    default:
      return "";
  }
});
</script>

<template>
  <div class="output-content">
    <!-- 文本输出 -->
    <template v-if="output.type === 'text'">
      <a-tag v-if="tagColor" :color="tagColor">{{ output.status }}</a-tag>
      <span v-html="output.text"></span>
    </template>
    <!-- 组件输出 -->
    <component
      v-if="output.type === 'component'"
      :is="output.component"
      v-bind="output.props"
    ></component>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
