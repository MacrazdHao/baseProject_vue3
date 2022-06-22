<script setup lang="ts">
import { getCurrentInstance, getCurrentScope, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { useI18n } from "vue-i18n";
import { removeToken } from "@/utils/request/auth";
const { proxy } = getCurrentInstance();
const counterStore = modules.counter();
const { count } = storeToRefs(counterStore);
const onclick = () => {
  counterStore.increment();
};
const logout = () => {
  removeToken();
};
</script>

<template>
  <div>
    <h1>test pinia</h1>
    <button type="button" @click="onclick">count is: {{ count }}</button>
    <button type="button" @click="logout">退出登录</button>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: vw(60);
}
</style>
