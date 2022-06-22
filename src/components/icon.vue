<script setup lang="ts">
let x = 0;
let y = 0;
const rotate = (e: any) => {
  let cube = document.getElementById("IconContainer");
  x += e.movementX / 5; //movementX系统监听鼠标移动两次之间的相对位移
  y += e.movementY / 5;
  if (cube) {
    cube.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
  }
};
const app = document.getElementById("app");
app?.addEventListener("mousemove", (e: any) => {
  rotate(e);
});
</script>
<template>
  <div class="Icon">
    <div id="IconView" class="view">
      <div id="IconContainer" class="container">
        <div class="box">颂</div>
        <div class="box">颂</div>
        <div class="box">颂</div>
        <div class="box">颂</div>
        <div class="box">颂</div>
        <div class="box">颂</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Icon {
  .view {
    width: 90px;
    height: 90px;
    margin: 30px auto;
  }
  .container {
    transform-style: preserve-3d;
    transform-origin: 45px 45px;
    perspective-origin: center;
    transition: 0.2s all;
    // animation-name: animation;
    // animation-timing-function: ease-in-out;
    // animation-iteration-count: infinite;
    // animation-duration: 3s;
  }

  .box {
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    border: 5px solid $borderColor_M7;
    box-shadow: 0 0 6px $shadowColor_Gray4;
    background: getThemeRgba($backgroundColor_M9, 0.8);
    position: absolute;
    user-select: none;
    // color: getThemeRgba($fontColor_M6, 0.6) !important;
    // text-shadow: 0 0 6px $fontColor_M6 !important;
  }
  .box:nth-child(1) {
    transform: translateZ(45px);
    color: getThemeRgba($themeColor_Blue, 0.6);
    text-shadow: 0 0 6px $themeColor_Blue;
  }
  .box:nth-child(2) {
    transform: translateZ(-45px);
    color: getThemeRgba($themeColor_GreenBlue, 0.6);
    text-shadow: 0 0 6px $themeColor_GreenBlue;
  }
  .box:nth-child(3) {
    transform: rotateX(90deg) translateZ(45px);
    color: getThemeRgba($themeColor_Green, 0.6);
    text-shadow: 0 0 6px $themeColor_Green;
  }
  .box:nth-child(4) {
    transform: rotateX(-90deg) translateZ(45px);
    color: getThemeRgba($themeColor_Purple, 0.6);
    text-shadow: 0 0 6px $themeColor_Purple;
  }
  .box:nth-child(5) {
    transform: rotateY(90deg) translateZ(-45px);
    color: getThemeRgba($themeColor_Orange, 0.6);
    text-shadow: 0 0 6px $themeColor_Orange;
  }
  .box:nth-child(6) {
    transform: rotateY(-90deg) translateZ(-45px);
    color: getThemeRgba($themeColor_Yellow, 0.6);
    text-shadow: 0 0 6px $themeColor_Yellow;
  }
  @keyframes animation {
    16% {
      transform: rotateY(-90deg);
    }
    33% {
      transform: rotateY(-90deg) rotateZ(135deg);
    }
    50% {
      transform: rotateY(225deg) rotateZ(135deg);
    }
    66% {
      transform: rotateY(135deg) rotateZ(135deg);
    }
    83% {
      transform: rotateX(135deg);
    }
  }
}
</style>