<script setup lang="ts">
import Lodash from "lodash";
import { onBeforeUnmount, onMounted, ref } from "vue-demi";

const props = defineProps({
  size: { type: Number, default: 140 },
  shadow: { type: Boolean, default: true },
});
const iconId = Lodash.uniqueId();
const eyeSize = props.size;
const eyeBallSize = eyeSize / 2;
const eyeHoleSize = eyeBallSize / 4;
const minEyeHoleSize = eyeBallSize / 8;
const eyeBallStyle = ref<any>({});
const eyeHoleStyle = ref<any>({});

const app = document.getElementById("app");
onBeforeUnmount(() => {
  app?.removeEventListener("mousemove", moveBall);
});

onMounted(() => {
  app?.addEventListener("mousemove", moveBall);
  let eye = document.getElementById(`IconView${iconId}`);
  let eyeWhite = document.getElementById(`IconWhite${iconId}`);
  let eyeLight = document.getElementById(`IconLight${iconId}`);
  if (eye && eyeWhite && eyeLight) {
    eye.style.width = `${eyeSize}px`;
    eye.style.height = `${eyeSize}px`;
    eye.style.borderRadius = `${eyeSize}px`;
    eyeWhite.style.width = `${eyeSize / 1.4}px`;
    eyeWhite.style.height = `${eyeSize / 1.4}px`;
    eyeWhite.style.borderTopLeftRadius = `${eyeSize}px`;
    eyeWhite.style.borderBottomRightRadius = `${eyeSize}px`;
    eyeLight.style.boxShadow = `${eyeSize / 20}px ${eyeSize / 20}px ${
      eyeSize / 10
    }px ${eyeSize / 10}px #f0f0f0`;
  }
  let eyeHole = document.getElementById(`IconHole${iconId}`);
  if (eyeHole) {
    eyeHole.style.width = `${eyeHoleSize}px`;
    eyeHole.style.height = `${eyeHoleSize}px`;
    eyeHole.style.borderRadius = `${eyeHoleSize}px`;
  }
  let ball = document.getElementById(`IconBall${iconId}`);
  if (ball) {
    ball.style.width = `${eyeBallSize}px`;
    ball.style.height = `${eyeBallSize}px`;
    ball.style.borderRadius = `${eyeBallSize}px`;
  }
});

const moveBall = (e: any) => {
  let view = document.getElementById(`IconView${iconId}`);
  if (!view) return;
  let viewRect = view.getBoundingClientRect();
  const viewPos = { x: viewRect.x + eyeBallSize, y: viewRect.y + eyeBallSize };
  const mousePos = { x: e.pageX, y: e.pageY };
  const axisScope = { x: window.innerWidth, y: window.innerHeight };
  const lor =
    mousePos.x - viewPos.x == 0 ? 0 : mousePos.x - viewPos.x < 0 ? -1 : 1;
  const tob =
    mousePos.y - viewPos.y == 0 ? 0 : mousePos.y - viewPos.y < 0 ? -1 : 1;
  const xDist = eyeSize / 2 - eyeBallSize / 2;
  const yDist = eyeSize / 2 - eyeBallSize / 2;
  let x = 0;
  let y = 0;
  if (lor >= 0) {
    x =
      xDist *
      (1 + (mousePos.x - viewPos.x) / (axisScope.x + eyeSize / 14 - viewPos.x));
  } else {
    x = xDist * (1 - (viewPos.x - mousePos.x + eyeSize / 14) / viewPos.x);
  }
  if (tob >= 0) {
    y =
      yDist *
      (1 + (mousePos.y - viewPos.y) / (axisScope.y + eyeSize / 14 - viewPos.y));
  } else {
    y = yDist * (1 - (viewPos.y - mousePos.y + eyeSize / 14) / viewPos.y);
  }
  eyeBallStyle.value = {
    left: `${x}px`,
    top: `${y}px`,
    background: `radial-gradient(circle at ${xDist * 1.6 - x}px ${
      yDist * 1.6 - y
    }px, #b22222, #d2691e)`,
  };

  const maxDist = Math.sqrt(
    Math.pow(axisScope.x - viewPos.x, 2) + Math.pow(axisScope.y - viewPos.y, 2)
  );
  const curDist = Math.sqrt(
    Math.pow(mousePos.x - viewPos.x, 2) + Math.pow(mousePos.y - viewPos.y, 2)
  );
  const curEyeHoleSize = Math.max(
    eyeHoleSize * (1 - curDist / maxDist),
    minEyeHoleSize
  );
  eyeHoleStyle.value = {
    width: `${curEyeHoleSize}px`,
    height: `${curEyeHoleSize}px`,
  };
  if (props.shadow) {
    let ball = document.getElementById(`IconBall${iconId}`);
    let hole = document.getElementById(`IconHole${iconId}`);
    let shadowLightSize = minEyeHoleSize / 3;
    if (ball && hole) {
      let holeRect = hole.getBoundingClientRect();
      const shadowLight = document.createElement("div");
      shadowLight.id = `shadowLight${Lodash.uniqueId(`${iconId}-`)}${new Date().getTime()}`;
      shadowLight.style.opacity = "0";
      shadowLight.style.position = "fixed";
      shadowLight.style.left = `${
        holeRect.x + curEyeHoleSize / 2 - shadowLightSize / 2
      }px`;
      shadowLight.style.top = `${
        holeRect.y + curEyeHoleSize / 2 - shadowLightSize / 2
      }px`;
      shadowLight.style.transition = "0.3s all ease";
      shadowLight.style.background = "red";
      shadowLight.style.zIndex = "1000";
      // shadowLight.style.width = `${curEyeHoleSize}px`;
      // shadowLight.style.height = `${curEyeHoleSize}px`;
      // shadowLight.style.borderRadius = `${curEyeHoleSize}px`;
      shadowLight.style.borderRadius = `${shadowLightSize}px`;
      shadowLight.style.width = `${shadowLightSize}px`;
      shadowLight.style.height = `${shadowLightSize}px`;
      app?.appendChild(shadowLight); 
      shadowLight.style.opacity = "0.6";
      setTimeout(() => {
        shadowLight.style.opacity = "0";
        shadowLight.style.width = `0`;
        shadowLight.style.height = `0`;
        setTimeout(() => {
          ball?.removeChild(shadowLight);
        }, 100);
      }, 100);
    }
  }
};
</script>
<template>
  <div class="Icon2">
    <div :id="`IconView${iconId}`" class="view">
      <div :id="`IconWhite${iconId}`" class="eyeWhite"></div>
      <div :id="`IconLight${iconId}`" class="eyeLight"></div>
      <div :id="`IconBall${iconId}`" class="ball" :style="eyeBallStyle">
        <div
          :id="`IconHole${iconId}`"
          class="eyeHole"
          :style="eyeHoleStyle"
        ></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Icon2 {
  opacity: 0.8;
  // background: radial-gradient(circle at 10px 10px, #b22222, #708090);
  .view {
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: #e0e0e0;
    // transform: rotate(45deg);
    .eyeLight {
      position: absolute;
      width: 0px;
      height: 0px;
      z-index: 2;
      border-radius: 1px;
      left: 70%;
      top: 32%;
      transform: translate(-50%, -50%) rotate(60deg);
    }
    .eyeWhite {
      box-shadow: #000 0 0 0 100vh;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(60deg);
      z-index: 3;
    }
    .ball {
      @include flex();
      position: absolute;
      overflow: hidden;
      z-index: 1;
      .eyeHole {
        background-color: #000;
        border-radius: 100%;
      }
    }
  }
}
</style>