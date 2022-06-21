
<script setup lang="ts">
import CButton from "@/components/common/songButton.vue";
export default {
  components: {
    CButton,
  },
  data() {
    return {
      title: null,
      text: [""],
      theme: "blue",
      confirm: () => {},
      cancel: () => {},
      close: () => {},
      visible: false,
      confirmText: "",
      cancelText: "",
      showCancel: true,
      showConfirm: true,
      showClose: true,
      reverseButton: false,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.style.overflow = "hidden";
        this.cancelText = this.cancelText || "取消";
        this.confirmText = this.confirmText || "确定";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  mounted() {
    window.addEventListener("popstate", () => {
      this.visible = false;
    });
  },
  methods: {
    closeBtn() {
      this.close();
      this.visible = false;
    },
    confirmBtn() {
      this.confirm();
      this.visible = false;
    },
    cancelBtn() {
      // console.log(this.cancel);
      this.cancel();
      this.visible = false;
    },
  },
};
</script>

<template>
  <transition name="slide-fade">
    <div class="Dialog" v-if="visible">
      <div class="messageBox">
        <div class="header">
          <img
            src="@/assets/index/icon_close.svg"
            @click="closeBtn"
            v-if="showClose"
          />
        </div>
        <div class="content">
          <img :src="require(`@/assets/index/icon_msg_${theme}.svg`)" />
          <p class="title" v-html="title || '提示'"></p>
          <div class="msg">
            <p v-for="(item, index) in text" :key="index" v-html="item"></p>
          </div>
        </div>
        <div
          class="buttonBox"
          :style="{
            flexDirection: reverseButton ? 'row-reverse' : 'row',
          }"
        >
          <CButton
            :class="['button', cancelText.length > 2 ? 'shortPadding' : '']"
            :text="cancelText"
            theme="gray"
            @btnClick="cancelBtn"
            v-if="showCancel"
          />
          <div style="width: 60px"></div>
          <CButton
            :class="['button', confirmText.length > 2 ? 'shortPadding' : '']"
            :text="confirmText"
            :theme="theme"
            @btnClick="confirmBtn"
            v-if="showConfirm"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.Dialog {
  @include flex(row, flex-end);
  @include fullSize();
  background-color: getThemeRgba($backgroundColor_M8, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  p {
    @include noMarginPadding();
  }
  .messageBox {
    background-color: $backgroundColor_M7;
    border-radius: 4px;
    width: 600px;
    min-height: 280px;
    padding: 20px 20px 30px 20px;
    // margin-top: calc(100vh / 3);
    .header {
      @include flex(row, flex-end);
      width: 100%;
      img {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
    .content {
      @include flex(column, flex-start);
      margin-top: 18px;
      width: 100%;
      img {
        width: 60px;
        height: 60px;
      }
      .title {
        margin-top: 12px;
        font-size: var(--fontSize_Regular_medium);

        color: $fontColor_M1;
        line-height: 22px;
      }
      .msg {
        @include flex(column, flex-start);
        margin-top: 16px;
        p {
          font-size: var(--fontSize_Regular_regular);
          color: $fontColor_M2;
          line-height: 20px;
          text-align: center;
        }
      }
    }
    .buttonBox {
      @include flex(row, center, flex-start);
      margin-top: 34px;
      .shortPadding {
        padding: 7px 13px;
      }
    }
  }
}
</style>