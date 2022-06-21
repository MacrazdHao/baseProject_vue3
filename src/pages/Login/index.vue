<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import songButton from "@/components/common/songButton.vue";

const { proxy } = getCurrentInstance();
console.log(proxy.test);
const counterStore = modules.counter();
const { count } = storeToRefs(counterStore);
const onclick = () => {
  counterStore.increment();
};
const login = () => {
  proxy.$message.error({ text: "123123" });
  proxy.$loading.show();
};
</script>

<template>
  <div class="Login">
    <songButton text="ceshi"></songButton>
    <songButton text="ceshi" theme="red"></songButton>
    <songButton text="ceshi" theme="green"></songButton>
    <songButton text="ceshi" theme="blue"></songButton>
    <songButton text="ceshi" theme="greenblue"></songButton>
    <songButton text="ceshi" theme="purple"></songButton>
    <songButton text="ceshi" theme="pink"></songButton>
    <songButton text="ceshi" theme="dark"></songButton>
    <songButton text="ceshi" theme="yellow"></songButton>
    <songButton text="ceshi" theme="orange"></songButton>
    <div class="shadowBox">
      <div class="loginBox">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@-webkit-keyframes bganim {
}
.Login {
  @include flex(row, flex-end);
  height: 100%;
  width: 100%;
  background-image: radial-gradient(
    circle,
    #ffffff,
    #c7c7c7,
    #929292,
    #606060,
    #333333
  );
  animation: bganim 1s linear infinite;
  .shadowBox {
    @include flex();
    backdrop-filter: blur(1px);
    box-shadow: 0 0 10px 0 $shadowColor_Gray1;
    background-color: rgba(0, 0, 0, 0.8);
    height: calc(100% - 24px);
    width: calc(50% - 24px);
    max-width: 600px;
    margin-right: 24px;
    border-radius: 4px;
    .loginBox {
      @include flex();
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(2px);
      border: 2px solid rgba(190, 190, 190, 0.1);
      padding: 24px 12px;
      border-radius: 4px;
      .logo {
        width: 80px;
        height: 80px;
        box-shadow: #ff0000;
      }
      .form {
        @include flex();
        margin-top: 32px;
        border-radius: 4px;
        overflow: hidden;
        &-item {
          &-input {
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            width: 240px;
            height: 30px;
            padding: 4px 6px;
            transition: 0.2s all;
            color: rgb(200, 200, 200);
          }
          &-input:focus {
            background-color: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(20px);
            color: #fff;
          }
        }
      }
      .button {
        padding: 6px 12px;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        margin-top: 24px;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.2s all;
        p {
          @include userSelect();
          color: #fff;
          transition: 0.2s all;
        }
      }
      .button:hover {
        backdrop-filter: blur(16px);
        border: 2px solid rgba(255, 255, 255, 0.3);
      }
      .button:active {
        backdrop-filter: blur(100px);
        border: 2px solid rgba(255, 255, 255, 0.15);
        p {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>
