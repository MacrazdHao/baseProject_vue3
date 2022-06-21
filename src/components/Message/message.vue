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
    @include userSelect();
    @include noMarginPadding();
    font-size: var(--fontSize_Regular_regular);
    color: $fontColor_M8;
    line-height: 20px;
    text-align: center;
  }
}
.blue {
  @include messageShadow($functionColor_Message);
  background-color: $functionColor_Message;
}
.green {
  @include messageShadow($functionColor_Success);
  background-color: $functionColor_Success;
}
.yellow {
  @include messageShadow($functionColor_Warning);
  background: $functionColor_Warning;
}
.red {
  @include messageShadow($functionColor_Error);
  background-color: $functionColor_Error;
}
</style>
