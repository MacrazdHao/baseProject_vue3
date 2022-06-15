import { defineStore } from "pinia";
// import actions from 

export default defineStore("counter", {
  state: () => ({
    count: 1,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
