<script setup lang="ts">
import { getCurrentInstance, ref } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";

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
    <div class="shadowBox">
      <div class="loginBox">
        <img class="logo" src="@/assets/logo.png" />
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
.Login {
  @include flex(row, flex-end);
  height: 100%;
  width: 100%;
  // background: url("@/assets/logo.png");
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 50%,
      transparent 50%
    ),
    linear-gradient(90deg, rgba(0, 0, 0, 0.5) 50%, transparent 50%);
  background-size: 40px 40px;
  .shadowBox {
    @include flex;
    backdrop-filter: blur(1px);
    box-shadow: 0 0 10px 0 $commonColor_black;
    background-color: rgba(0, 0, 0, 0.8);
    height: calc(100% - 24px);
    width: calc(50% - 24px);
    margin-right: 24px;
    border-radius: 4px;
    .loginBox {
      @include flex;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(2px);
      border: 2px solid rgba(190, 190, 190, 0.1);
      padding: 24px 12px;
      border-radius: 4px;
      .logo {
        width: 80px;
        height: 80px;
      }
      .form {
        @include flex;
        margin-top: 32px;
        border-radius: 4px;
        overflow: hidden;
        // .form-item + .form-item {
        //   margin-top: 12px;
        // }
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
        margin-top: 12px;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.2s all;
        p {
          color: #fff;
          user-select: none;
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
