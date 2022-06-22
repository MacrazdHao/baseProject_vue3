<script setup lang="ts">
import { getCurrentInstance, getCurrentScope, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { useI18n } from "vue-i18n";
import { removeToken } from "@/utils/request/auth";
</script>

<template>
  <div>
    11111111111111111111111
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component class="pageView" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
</style>
