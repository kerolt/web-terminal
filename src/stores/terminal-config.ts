import { defineStore } from "pinia";

export const useConfigStore = defineStore("terminal-config", {
  state: () => ({
    background: "black",
    welcomeText: [] as string[]
  }),
  getters: {},
  persist: {
    key: "terminal_config",
    storage: window.localStorage
  },
  actions: {
    setBackground(url: string) {
      if (!url) {
        return;
      }
      this.background = url;
    },
    reset() {
      this.$reset();
    }
  }
});
