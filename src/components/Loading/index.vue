<script setup lang="ts">
import { getDataRefs, toggle } from "./data";
const { visible, tips } = getDataRefs();
</script>

<template>
  <transition name="slide-fade">
    <div class="Loading" v-if="visible">
      <img src="@/assets/loading.svg" />
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
  z-index: 1999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  img {
    width: 50px;
    animation: rotate 0.6s linear infinite;
  }
  @-webkit-keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  p {
    margin: 0;
    color: $fontColor_M1;
  }
}
</style>