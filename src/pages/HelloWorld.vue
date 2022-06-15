<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";

const counterStore = modules.counter();
const { count } = storeToRefs(counterStore);
const onclick = () => {
  counterStore.increment();
};
</script>

<template>
  <h1>test pinia</h1>
  <button type="button" @click="onclick">count is: {{ count }}</button>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
