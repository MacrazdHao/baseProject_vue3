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
  <div class="Index">
    <p>123123123123</p>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.Index {
  
}
</style>
