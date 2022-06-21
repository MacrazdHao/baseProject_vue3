<script setup lang="ts">
import { ref, watch } from "vue";
import { tokenRef } from "@/utils/request/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const ver = ref(process.env.version);
watch(tokenRef, () => {
  if (!!tokenRef.value) router.push({ path: "/index/dashboard" });
  else router.push({ path: "/" });
});
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
        <component class="page" :is="Component" />
      </transition>
    </router-view>
  </div>
  <p style="display: none">{{ ver }}</p>
</template>

<style lang="scss">
#app {
  @include flex(row, flex-end);
  @include fullSize();
  background-image: radial-gradient(
    circle,
    $backgroundColor_M7,
    $backgroundColor_M11,
    $backgroundColor_M2,
    $backgroundColor_M10,
    $backgroundColor_M9
  );
  .shadowBox--beforeLogin {
    width: 600px;
    margin-right: 24px;
  }
  .shadowBox--afterLogin {
    width: calc(100% - 64px);
    margin: 0 32px;
  }
  .shadowBox {
    @include flex();
    backdrop-filter: blur(1px);
    box-shadow: 0 0 10px 0 $shadowColor_Gray1;
    background-color: getThemeRgba($backgroundColor_M8, 0.8);
    height: calc(100% - 36px);
    border-radius: 4px;
    transition: 0.6s all;
    position: relative;
    overflow: auto;
    .page {
      @include flex();
      @include fullSize();
    }
  }
}
</style>
