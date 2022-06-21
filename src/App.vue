<script setup lang="ts">
import { ref } from "vue";
import { tokenRef } from "@/utils/request/auth";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const ver = ref(process.env.version);
</script>

<template>
  <div
    :class="[
      'shadowBox',
      !!tokenRef ? 'shadowBox--afterLogin' : 'shadowBox--beforeLogin',
    ]"
  >
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <p style="display: none">{{ ver }}</p>
</template>

<style lang="scss">
#app {
  @include flex(row, flex-end);
  height: 100%;
  width: 100%;
  background-image: radial-gradient(
    circle,
    $backgroundColor_M7,
    $backgroundColor_M11,
    $backgroundColor_M2,
    $backgroundColor_M10,
    $backgroundColor_M9
  );
  .shadowBox--beforeLogin {
    width: calc(50% - 24px);
    max-width: 600px;
    margin-right: 24px;
  }
  .shadowBox--afterLogin {
    width: calc(100% - 48px);
    margin: 0 24px;
  }
  .shadowBox {
    @include flex();
    backdrop-filter: blur(1px);
    box-shadow: 0 0 10px 0 $shadowColor_Gray1;
    background-color: getThemeRgba($backgroundColor_M8, 0.8);
    height: calc(100% - 24px);
    border-radius: 4px;
    transition: 0.3s all;
  }
}
</style>
