<script setup lang="ts">
import { getCurrentInstance, getCurrentScope, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { useI18n } from "vue-i18n";
import { removeToken } from "@/utils/request/auth";
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component class="pageView" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: vw(60);
}
</style>
