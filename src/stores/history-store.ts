import { defineStore } from "pinia";
import { CommandOutputType } from "@/components/terminal/terminal";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    historyList: [] as CommandOutputType[]
  }),
  getters: {},
  persist: {
    key: "history",
    storage: window.localStorage
  },
  actions: {
    getHistoryList() {
      return this.historyList;
    },
    updateHistoryList(list: CommandOutputType[]) {
      this.historyList = list;
    },
    cleanHistoryList() {
      this.historyList = [];
      console.log(this.historyList);
    }
  }
});
