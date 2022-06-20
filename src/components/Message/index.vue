
<script setup lang="ts">
import { getDataRefs } from "./data";
import message from "./message.vue";
const { messages } = getDataRefs();
</script>

<template>
  <div class="MessagesList">
    <message
      class="messageItem"
      v-for="(item, index) in messages"
      :key="index"
      :id="item.id"
      :theme="item.theme"
      :text="item.text"
      :duration="item.duration"
      :messageIndex="index + 1"
      :callback="item.callback"
    />
  </div>
</template>

<style lang="scss" scoped>
.MessagesList {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: fit-content;
  margin-top: 30px;
  .messageItem + .messageItem {
    margin-top: 12px;
  }
}
</style>