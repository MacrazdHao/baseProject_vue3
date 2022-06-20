<script setup lang="ts">
import { watch } from "fs";
import { computed, ref, watchEffect } from "vue";
let visible = ref(true);

const props = defineProps({
  id: { type: String, default: "" },
  text: { type: String, default: "无提示内容" },
  duration: { type: Number, default: 0 },
  callback: { type: Function, default: (messageId: number) => {} },
  theme: { type: String, default: "blue" },
  messageIndex: { type: Number, default: 1 },
});

const baseTop = computed(() => (props.messageIndex - 1) * 50);
const show = (cb?: Function) => {
  setTimeout(() => {
    const el = document.getElementById(`bubble${props.id}`);
    if (el) {
      el.style.display = "block";
      setTimeout(() => {
        el.style.transform = `translate(0, 0px)`;
        el.style.opacity = "1";
        cb && cb();
      }, 200);
    }
  }, 100);
};
const hide = () => {
  setTimeout(() => {
    const el = document.getElementById(`bubble${props.id}`);
    if (el) {
      el.style.transform = `translate(0, -30px)`;
      el.style.opacity = "0";
      setTimeout(() => {
        props.callback(props.id);
        visible.value = false;
      }, 200);
    }
  }, props.duration);
};
watchEffect(() => {
  visible.value && show(hide);
});
</script>

<template>
  <div
    :class="['Message', theme]"
    :style="{
      display: 'none',
      transform: `translate(0, -30px)`,
    }"
    v-if="visible"
    :id="`bubble${id}`"
  >
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.Message {
  // position: fixed;
  // top: 0px;
  opacity: 0;
  // left: 50%;
  min-width: 380px;
  padding: 10px 24px;
  transition: all 0.2s ease;
  // z-index: 2000;
  p {
    margin: 0;
    font-size: var(--fontSize_Regular_regular);
    color: $commonColor_white;
    line-height: 20px;
    text-align: center;
    user-select: none;
  }
}
.blue {
  background-color: $functionColor_Message;
  box-shadow: 0px 4px 16px 0px rgba(56, 100, 225, 0.4);
}
.green {
  background-color: $functionColor_Success;
  box-shadow: 0px 4px 16px 0px rgba(94, 197, 28, 0.4);
}
.yellow {
  background: $functionColor_Warning;
  box-shadow: 0px 4px 16px 0px rgba(242, 189, 59, 0.4);
}
.red {
  background-color: $functionColor_Error;
  box-shadow: 0px 4px 16px 0px rgba(232, 83, 76, 0.4);
}
</style>
