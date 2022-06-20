<script setup lang="ts">
import { watch } from "fs";
import { watchEffect } from "vue-demi";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getDataRefs, toggle } from "./data";
const { visible, tips } = getDataRefs();
</script>

<template>
  <transition name="slide-fade">
    <div class="Loading" v-if="visible">
      <img src="@/assets/loading2.svg" />
      <!-- <p>加载中...{{ loadingTips }}</p> -->
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.Loading {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
  }
  p {
    margin: 0;
    color: $themeColor;
  }
}
</style>