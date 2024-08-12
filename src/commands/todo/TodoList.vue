<script setup lang="ts">
import { useTodoStore } from "../../stores/todo-store";

const { todoList, deleteTask } = useTodoStore();

function timeFormat(time: string) {
  const timestamp = new Date(time);
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, "0");
  const day = String(timestamp.getDate()).padStart(2, "0");

  const hours = String(timestamp.getHours()).padStart(2, "0");
  const minutes = String(timestamp.getMinutes()).padStart(2, "0");
  const seconds = String(timestamp.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<template>
  <div>
    <a-list bordered item-layout="horizontal" :data-source="todoList" class="list-contanier">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <a-list-item-meta>
            <template #avatar>
              <a-checkbox v-model:checked="item.isFinish" />
            </template>
            <template #title>
              <div v-if="!item.isFinish">{{ item.content }}</div>
              <del v-else>{{ item.content }}</del>
            </template>
            <template #description>
              <div>{{ timeFormat(item.createTime) }}</div>
            </template>
          </a-list-item-meta>
          <template #actions>
            <a-button type="text" danger @click="deleteTask(index)">删除</a-button>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style lang="scss" scoped>
.list-contanier {
  overflow: hidden;
  background: white;
  margin: 8px 0;
  max-width: 600px;
}
</style>
