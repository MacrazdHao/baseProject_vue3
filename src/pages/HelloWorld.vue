<script setup lang="ts">
import { getCurrentInstance, getCurrentScope, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { useI18n } from "vue-i18n";
const { proxy } = getCurrentInstance();
const counterStore = modules.counter();
const { count } = storeToRefs(counterStore);
console.log(useI18n())
const onclick = () => {
  counterStore.increment();
};
</script>

<template>
  <h1>test pinia</h1>
  <button type="button" @click="onclick">count is: {{ count }}</button>
</template>

<style lang="scss" scoped>
h1 {
  font-size: vw(60);
}
</style>
