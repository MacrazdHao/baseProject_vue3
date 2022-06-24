<script setup lang="ts">
import Lodash, { random } from "lodash";
import { onBeforeUnmount, onMounted, ref } from "vue-demi";

const props = defineProps({
  size: { type: Number, default: 140 },
  color: { type: String, default: "red" },
  shadow: { type: Boolean, default: true },
  xielun: { type: Boolean, default: false },
  realEye: { type: Boolean, default: false },
});
const iconId = Lodash.uniqueId();
const eyeSize = props.size;
const eyeBallSize = eyeSize / 2;
const eyeHoleSize = eyeBallSize / 4;
const minEyeHoleSize = eyeBallSize / 8;
const eyeBallStyle = ref<any>({});
const eyeHoleStyle = ref<any>({});
const eyeWhiteStyle = ref<any>({});
const eyeColors = <any>{
  red: "#b22222, #d2691e",
  brown: "#362616, #4e341c",
  xielun: "#b22222, #f01d1d",
};

const app = document.getElementById("app");
onBeforeUnmount(() => {
  app?.removeEventListener("mousemove", moveBall);
});

onMounted(() => {
  app?.addEventListener("mousemove", moveBall);
  moveBall({ pageX: 500, pageY: 500 });
  let eye = document.getElementById(`EyeView${iconId}`);
  let eyeWhite = document.getElementById(`EyeWhite${iconId}`);
  let eyeLight = document.getElementById(`EyeLight${iconId}`);
  if (eye && eyeWhite && eyeLight) {
    eye.style.width = `${eyeSize}px`;
    eye.style.height = `${eyeSize}px`;
    eye.style.borderRadius = `${eyeSize}px`;
    eyeWhite.style.width = `${eyeSize / 1.4}px`;
    eyeWhite.style.height = `${eyeSize / 1.4}px`;
    eyeWhite.style.borderTopLeftRadius = `${eyeSize * 1.2}px`;
    eyeWhite.style.borderBottomRightRadius = `${eyeSize}px`;
    eyeLight.style.boxShadow = `${eyeSize / 20}px ${eyeSize / 20}px ${
      eyeSize / 7
    }px ${eyeSize / 10}px #f0f0f080`;
  }
  let eyeHole = document.getElementById(`EyeHole${iconId}`);
  if (eyeHole) {
    eyeHole.style.width = `${eyeHoleSize}px`;
    eyeHole.style.height = `${eyeHoleSize}px`;
    eyeHole.style.borderRadius = `${eyeHoleSize}px`;
    if (props.realEye) {
      eyeHole.style.transition = " 0.1s all";
    }
  }
  let ball = document.getElementById(`EyeBall${iconId}`);
  if (ball) {
    ball.style.width = `${eyeBallSize}px`;
    ball.style.height = `${eyeBallSize}px`;
    ball.style.borderRadius = `${eyeBallSize}px`;
    ball.style.boxShadow = `rgba(0,0,0,0.15) 0px 0px ${eyeSize / 10}px ${
      eyeSize / 25
    }px`;
    if (props.realEye) {
      ball.style.transition = " 0.1s all";
    }
  }
  let insetBox = document.getElementById(`InsetBox${iconId}`);
  if (insetBox) {
    insetBox.style.boxShadow = `inset rgba(0, 0, 0, 0.6) 0 0 ${
      eyeSize / 10
    }px 0px`;
  }
});

const moveBall = (e: any) => {
  let view = document.getElementById(`EyeView${iconId}`);
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
    }px, ${eyeColors[props.xielun ? "xielun" : props.color]})`,
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

  const maxYDist = axisScope.y - viewPos.y;
  const curYDist = mousePos.y - viewPos.y;
  let upTrans: any = {};
  let curEyeWhiteSize = eyeBallSize * (1.8 - curYDist / maxYDist);
  if (curYDist <= 0) {
    curEyeWhiteSize = Math.max(
      eyeBallSize * 0.9,
      eyeBallSize * (0.9 + curYDist / maxYDist)
    );
  }
  if (mousePos.y < eyeSize * 2) {
    upTrans = {
      transition: "0.15s all",
    };
  }
  if (curYDist > eyeSize * 2) {
    upTrans = {
      transition: "0.15s all",
      // borderTopLeftRadius: `${curEyeWhiteSize * 1.6}px`,
      borderTopLeftRadius: `${curEyeWhiteSize * 1.6}px`,
      // borderBottomRightRadius: `${curEyeWhiteSize * 1.2}px`,
    };
  }
  eyeWhiteStyle.value = {
    borderTopLeftRadius: `${curEyeWhiteSize * 1.2}px`,
    borderBottomRightRadius: `${curEyeWhiteSize * 1.2}px`,
    ...upTrans,
  };

  if (props.shadow && !props.realEye) {
    let ball = document.getElementById(`EyeBall${iconId}`);
    let hole = document.getElementById(`EyeHole${iconId}`);
    let shadowLightSize = minEyeHoleSize / 3;
    if (ball && hole) {
      let holeRect = hole.getBoundingClientRect();
      const shadowLight = document.createElement("div");
      shadowLight.id = `shadowLight${Lodash.uniqueId(
        `${iconId}-`
      )}${new Date().getTime()}`;
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
        shadowLight.style.top = `${
          holeRect.y +
          curEyeHoleSize / 2 -
          shadowLightSize / 2 -
          eyeBallSize / 10
        }px`;
        setTimeout(() => {
          app?.removeChild(shadowLight);
        }, 100);
      }, 100);
    }
  }
};

const getRandomLine = () => {
  return Math.max(
    (Lodash.random(true) * eyeBallSize) / 4,
    (0.8 * eyeBallSize) / 4
  );
};
</script>
<template>
  <div class="Eye">
    <div :id="`EyeView${iconId}`" class="view">
      <div
        :id="`EyeWhite${iconId}`"
        class="eyeWhite"
        :style="eyeWhiteStyle"
      ></div>
      <div :id="`EyeLight${iconId}`" class="eyeLight"></div>
      <div class="eyeMeat"></div>
      <div :id="`EyeBall${iconId}`" class="ball" :style="eyeBallStyle">
        <div
          class="eyeLine"
          :style="{
            paddingBottom: `8px`,
            height: `${getRandomLine()}px`,
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -180%) rotate(${
              360 * (index / (eyeBallSize / 2))
            }deg)`,
          }"
          v-for="(item, index) in eyeBallSize / 2"
          :key="index"
        ></div>
        <div :id="`InsetBox${iconId}`" class="insetBox">
          <div class="gous" v-if="props.xielun">
            <div
              class="gou d1"
              :style="{
                width: `${eyeHoleSize / 2}px`,
                height: `${eyeHoleSize / 2}px`,
                boxShadow: `inset #000 ${eyeHoleSize / 6}px -${
                  eyeHoleSize / 50
                }px 0`,
              }"
            >
              <div
                :style="{
                  width: `${(eyeHoleSize * 0.6) / 2}px`,
                  height: `${(eyeHoleSize * 0.6) / 2}px`,
                  left: `${(eyeHoleSize * 0.6) / 6}px`,
                }"
              ></div>
            </div>
            <div
              class="gou d2"
              :style="{
                width: `${eyeHoleSize / 2}px`,
                height: `${eyeHoleSize / 2}px`,
                boxShadow: `inset #000 ${eyeHoleSize / 6}px -${
                  eyeHoleSize / 50
                }px 0`,
              }"
            >
              <div
                :style="{
                  width: `${(eyeHoleSize * 0.6) / 2}px`,
                  height: `${(eyeHoleSize * 0.6) / 2}px`,
                  left: `${(eyeHoleSize * 0.6) / 6}px`,
                }"
              ></div>
            </div>
            <div
              class="gou d3"
              :style="{
                width: `${eyeHoleSize / 2}px`,
                height: `${eyeHoleSize / 2}px`,
                boxShadow: `inset #000 ${eyeHoleSize / 6}px -${
                  eyeHoleSize / 50
                }px 0`,
              }"
            >
              <div
                :style="{
                  width: `${(eyeHoleSize * 0.6) / 2}px`,
                  height: `${(eyeHoleSize * 0.6) / 2}px`,
                  left: `${(eyeHoleSize * 0.6) / 6}px`,
                }"
              ></div>
            </div>
          </div>
        </div>
        <div
          :id="`EyeHole${iconId}`"
          class="eyeHole"
          :style="eyeHoleStyle"
        ></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.Eye {
  opacity: 0.8;
  .view {
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: #e0e0e0;
    .eyeLight {
      position: absolute;
      width: 10px;
      height: 0px;
      z-index: 2;
      border-radius: 8px;
      left: 66%;
      top: 32%;
      transform: translate(-50%, -50%) rotate(30deg);
    }
    .eyeWhite {
      box-shadow: #000 0 0 0 100vh;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(60deg);
      z-index: 3;
    }
    .eyeMeat {
      position: absolute;
      left: 94%;
      background: #ff5151;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      top: 20%;
      z-index: 2;
    }
    .ball {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      overflow: hidden;
      z-index: 1;
      // transition: 0.1s all;
      .insetBox {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 3;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 100%;
        .gous {
          position: relative;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          .gou {
            border-radius: 100%;
            position: absolute;
            box-shadow: inset #000 5px -2px 0;
            overflow: hidden;
            div {
              position: absolute;
              background-color: #000;
              border-radius: 100%;
            }
          }
          .d1 {
            left: 28%;
            top: 28%;
            transform: translate(-50%, -50%) rotate(140deg);
          }
          .d2 {
            right: 12%;
            top: 28%;
            transform: translate(-50%, -50%) rotate(200deg);
          }
          .d3 {
            left: 50%;
            bottom: 6%;
            transform: translate(-50%, -50%) rotate(0);
          }
        }
      }
      .eyeLine {
        position: absolute;
        width: 1px;
        background: linear-gradient(#00000000, #000000, #00000000);
        opacity: 0.3;
        transform-origin: 0% 180%;
      }
      .eyeHole {
        background-color: #000;
        border-radius: 100%;
        // transition: 0.1s all;
        box-shadow: #000 0 0 13px 2px;
      }
    }
  }
}
</style>
