<script setup lang="ts">
import { FixedMenuOptionsItemType } from "./componentsPropTypes";

export interface Props {
  options: Array<FixedMenuOptionsItemType>;
  show: boolean;
  [key: string]: any;
}

// const props = withDefaults(defineProps<Props>(), {
//   options: <Array<FixedMenuOptionsItemType>>,
//   show: false,
// });
</script>

<template>
  <div class="FixedMenu">
    <slot>
      <p>菜单</p>
    </slot>
    <div class="fixedMenuBox">
      <div class="fixedMenu">
        <div
          class="fixedMenu-item"
          v-for="(item, index) in availableLocales"
          :key="index"
        >
          <p class="fixedMenu-item-title">
            {{ t(`global.${item}`) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.FixedMenu {
  .fixedMenuBox {
    position: fixed;
    top: 60px;
    right: 0;
    padding-top: 10px;
    z-index: 1000;
    .fixedMenu {
      min-width: 100px;
      background: getThemeRgba($backgroundColor_M7, 0.9);
      box-shadow: 0 0 10px 0 $backgroundColor_M1;
      backdrop-filter: blur(1px);
      border-radius: 4px;
      overflow: hidden;
      &-item {
        cursor: pointer;
        padding: 6px 12px;
        transition: 0.3s all;
        &-title {
          text-align: center;
        }
      }
      &-item:hover {
        background: getThemeRgba($backgroundColor_M9, 0.6);
        .fixedMenu-item-title {
          color: $fontColor_M8;
          text-shadow: 0 0 6px $backgroundColor_M11;
        }
      }
    }
  }
}
</style>
