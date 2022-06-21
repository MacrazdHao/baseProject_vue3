<script setup lang="ts">
import { getCurrentInstance, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import songButton from "@/components/common/songButton.vue";
import { setToken, tokenRef } from "@/utils/request/auth";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const route = useRouter();
console.log(proxy.test);
const counterStore = modules.counter();
const { count } = storeToRefs(counterStore);
const onclick = () => {
  counterStore.increment();
};
const login = () => {
  // proxy.$message.error({ text: "123123" });
  // proxy.$loading.show();
  setToken("123123");
};
watch(tokenRef, () => {
  if (!!tokenRef.value) route.push({ path: "/index/dashboard" });
});
</script>

<template>
  <div class="Login">
    <img class="logo" src="@/assets/logo.svg" />
    <div class="form">
      <div class="form-item">
        <input class="form-item-input" placeholder="请输入帐号" />
      </div>
      <div class="form-item">
        <input
          class="form-item-input"
          type="password"
          placeholder="请输入密码"
        />
      </div>
    </div>
    <div class="button" @click="login">
      <p class="text">登录</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Login {
  @include flex();
  background-color: getThemeRgba($backgroundColor_M8, 0.2);
  padding: 24px 12px;
  border-radius: 4px;
  .logo {
    width: 80px;
    height: 80px;
  }
  .form {
    @include flex();
    margin-top: 32px;
    border-radius: 4px;
    overflow: hidden;
    &-item {
      &-input {
        background: getThemeRgba($backgroundColor_M7, 0.2) !important;
        backdrop-filter: blur(10px);
        width: 240px;
        height: 30px;
        padding: 4px 6px;
        transition: 0.2s all;
        color: $commonGray7 !important;
      }
      &-input:focus {
        background: getThemeRgba($backgroundColor_M7, 0.3) !important;
        color: $fontColor_M8 !important;
      }
    }
  }
  .button {
    padding: 8px 12px;
    width: 100%;
    box-sizing: border-box;
    // border: 2px solid getThemeRgba($borderColor_M2, 0.2);
    background-color: $buttonColor_Black;
    backdrop-filter: blur(10px);
    margin-top: 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s all;
    p {
      @include userSelect();
      color: $fontColor_M8;
      transition: 0.2s all;
    }
  }
  .button:hover {
    // border: 2px solid getThemeRgba($borderColor_M2, 0.3);
    background-color: $buttonColor_Black_hover;
  }
  .button:active {
    // border: 2px solid getThemeRgba($borderColor_M2, 0.1);
    background-color: $buttonColor_Black_active;
    p {
      color: getThemeRgba($fontColor_M8, 0.6);
    }
  }
}
</style>
