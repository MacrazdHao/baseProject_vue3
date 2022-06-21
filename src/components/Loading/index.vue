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
  @include flex(column);
  @include fullSize();
  background-color: getThemeRgba($themeColor_Black, 0.8);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1999;
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
    @include noMarginPadding();
    color: $fontColor_M1;
  }
}
</style>