<script setup lang="ts">
import { ref } from "vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const ver = ref(process.env.version);
</script>

<template>
  <router-view></router-view>
  <p style="display: none">{{ ver }}</p>
</template>

<style lang="scss">
#app {
  font-family: RegularFont;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $fontColor_M1;
  width: 100%;
  height: 100%;
}
</style>
