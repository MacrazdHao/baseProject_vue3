<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
</script>

<template>
  <div class="Index">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.Index {
}
</style>
