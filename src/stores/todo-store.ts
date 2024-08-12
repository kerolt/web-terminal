import { defineStore } from "pinia";
import { TodoType } from "../commands/todo/type";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todoList: [] as TodoType[]
  }),
  getters: {},
  persist: {
    key: "todo_list",
    storage: window.localStorage
  },
  actions: {
    addTask(task: TodoType) {
      if (!task || !task.content) {
        return false;
      }
      task.createTime = new Date();
      task.isFinish = false;
      this.todoList.push(task);
      return true;
    },

    deleteTask(i: number) {
      if (i < 0 || i >= this.todoList.length) {
        return false;
      }
      this.todoList.splice(i, 1);
      return true;
    },

    updateTask(i: number, task: TodoType) {
      if (i < 0 || i >= this.todoList.length) {
        return false;
      }
      this.todoList[i] = { ...this.todoList[i], ...task };
      return true;
    }
  }
});
