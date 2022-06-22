<script setup lang="ts">
import { getCurrentInstance, getCurrentScope, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { useI18n } from "vue-i18n";
import { removeToken } from "@/utils/request/auth";
// alert("123123")
</script>

<template>
  <div>
    <p>这是设备列表</p>
  </div>
</template>

<style lang="scss" scoped>
</style>
