<script setup lang="ts">
const props = defineProps({
  text: {
    default: "",
    type: String,
  },
  width: {
    default: "fit-content",
    type: String,
  },
  height: {
    default: "fit-content",
    type: String,
  },
  fontSize: {
    default: "14px",
    type: String,
  },
  fontFamily: {
    default: "RegularFont",
    type: String,
  },
  lineHeight: {
    default: "20px",
    type: String,
  },
  theme: {
    default: "theme",
    type: String,
  },
  disable: {
    default: false,
    type: Boolean,
  },
  icon: {
    default: null,
    type: String,
  },
});
</script>

<template>
  <div
    :class="['Button', disable ? 'disable' : theme]"
    :style="{ width, height, fontFamily, fontSize, lineHeight }"
  >
    <img v-if="icon" :src="icon" />
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.Button {
  box-sizing: border-box;
  padding: 7px 30px;
  border-radius: 2px;
  transition: all 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    margin-right: 4px;
    width: 12px;
  }
  p {
    margin: 0;
    padding: 0;
    user-select: none;
    white-space: nowrap;
  }
}
.disable {
  border: 1px solid $borderColor_M3;
  background-color: $backgroundColor_M2;
  color: $fontColor_M8;
}

.white {
  border: 1px solid $borderColor_M6;
  background-color: $backgroundColor_M7;
  color: $fontColor_M1;
}
.white:hover {
  background-color: rgb(250, 250, 250);
}
.white:active {
  background-color: rgb(240, 240, 240);
}

.theme {
  border: 1px solid $buttonColor_Black;
  background-color: $buttonColor_Black;
  color: $fontColor_M8;
}
.theme:hover {
  background-color: $buttonColor_Black_hover;
}
.theme:active {
  background-color: $buttonColor_Black_active;
}

.red {
  border: 1px solid $buttonColor_Red;
  background-color: $buttonColor_Red;
  color: $fontColor_M8;
}
.red:hover {
  background-color: $buttonColor_Red_hover;
}
.red:active {
  background-color: $buttonColor_Red_active;
}

.green {
  border: 1px solid $buttonColor_Green;
  background-color: $buttonColor_Green;
  color: $fontColor_M8;
}
.green:hover {
  background-color: $buttonColor_Green_hover;
}
.green:active {
  background-color: $buttonColor_Green_active;
}

.blue {
  border: 1px solid $buttonColor_Blue;
  background-color: $buttonColor_Blue;
  color: $fontColor_M8;
}
.blue:hover {
  background-color: $buttonColor_Blue_hover;
}
.blue:active {
  background-color: $buttonColor_Blue_active;
}

.greenblue {
  border: 1px solid $buttonColor_GreenBlue;
  background-color: $buttonColor_GreenBlue;
  color: $fontColor_M8;
}
.greenblue:hover {
  background-color: $buttonColor_GreenBlue_hover;
}
.greenblue:active {
  background-color: $buttonColor_GreenBlue_active;
}

.purple {
  border: 1px solid $buttonColor_Purple;
  background-color: $buttonColor_Purple;
  color: $fontColor_M8;
}
.purple:hover {
  background-color: $buttonColor_Purple_hover;
}
.purple:active {
  background-color: $buttonColor_Purple_active;
}

.pink {
  border: 1px solid $buttonColor_Pink;
  background-color: $buttonColor_Pink;
  color: $fontColor_M8;
}
.pink:hover {
  background-color: $buttonColor_Pink_hover;
}
.pink:active {
  background-color: $buttonColor_Pink_active;
}

.dark {
  border: 1px solid $buttonColor_Dark;
  background-color: $buttonColor_Dark;
  color: $fontColor_M8;
}
.dark:hover {
  background-color: $buttonColor_Dark_hover;
}
.dark:active {
  background-color: $buttonColor_Dark_active;
}

.yellow {
  border: 1px solid $buttonColor_Yellow;
  background-color: $buttonColor_Yellow;
  color: $fontColor_M8;
}
.yellow:hover {
  background-color: $buttonColor_Yellow_hover;
}
.yellow:active {
  background-color: $buttonColor_Yellow_active;
}

.orange {
  border: 1px solid $buttonColor_Orange;
  background-color: $buttonColor_Orange;
  color: $fontColor_M8;
}
.orange:hover {
  background-color: $buttonColor_Orange_hover;
}
.orange:active {
  background-color: $buttonColor_Orange_active;
}
</style>