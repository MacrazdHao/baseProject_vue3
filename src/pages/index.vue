<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const menus = router.options.routes[1].children?.filter(
  (item, index) => index > 0
);

const curMenu = ref(route.name);
// const menuPath = ref(router.currentRoute.value.matched)
watch(router.currentRoute, () => {
  console.log(router.currentRoute.value);
});

const jumpTo = (route: RouteRecordRaw) => {
  // if (route.children) {

  //   return;
  // }
  console.log(route);
  router.push({ name: route.name == "Index" ? "Dashboard" : route.name });
};
</script>

<template>
  <div class="Index">
    <div class="indexBox">
      <div class="menu">
        <div class="logoBox">
          <img class="logo" src="@/assets/logo.svg" />
        </div>
        <div class="menuList">
          <div
            :class="[
              'menuList-item',
              route.name === item.name ? 'menuList-item--selected' : '',
            ]"
            v-for="(item, index) in menus"
            :key="`menu-${index}`"
            @click="jumpTo(item)"
          >
            <p>{{ t(`routes.${item.meta.titleKey}`) }}</p>
          </div>
        </div>
      </div>
      <div class="pageBox">
        <div class="header">
          <div class="routePath">
            <div
              class="routeItem"
              v-for="(item, index) in router.currentRoute.value.matched"
              :key="index"
            >
              <div class="routeImgBox" v-if="index == 0" @click="jumpTo(item)">
                <img class="routeImg" src="@/assets/home.svg" />
              </div>
              <p
                :class="[
                  'routeTitle',
                  route.name == item.name ? 'routeTitle--current' : '',
                ]"
                v-else
                @click="jumpTo(item)"
              >
                {{ t(`routes.${item.meta.titleKey}`) }}
              </p>
            </div>
          </div>
          <div class="toolBox">
            <div class="userMenu">
              <img class="avatar" src="@/assets/avatar.svg" />
              <p class="nickname">昵称昵称昵称昵称昵称昵称昵称昵称昵称昵称</p>
            </div>
            <div class="langMenu">
              <p class="langText">{{ t(`global.${locale}`) }}</p>
            </div>
          </div>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component class="pageView" :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Index {
  .indexBox {
    @include flex(row, space-between);
    @include fullSize();
    padding: 12px 12px;
    .menu {
      @include flex(column, flex-start);
      width: 200px;
      height: 100%;
      .logoBox {
        @include flex();
        margin-bottom: 12px;
        width: 100%;
        height: fit-content;
        .logo {
          width: auto;
          height: 120px;
        }
      }
      .menuList {
        width: 100%;
        height: calc(100% - 132px);
        padding-right: 12px;
        overflow: auto;
        &-item {
          @include flex();
          @include userSelect();
          width: 100%;
          height: 48px;
          background-color: $buttonColor_Black;
          color: $fontColor_M8;
          cursor: pointer;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 12px;
          transition: 0.2s all;
        }
        &-item:hover {
          background-color: $buttonColor_Black_hover;
        }
        &-item:active {
          background-color: $buttonColor_Black_active;
        }
        &-item--selected {
          background-color: $buttonColor_Black_active !important;
        }
      }
    }
    .pageBox {
      @include flex(column, space-between);
      width: calc(100% - 220px);
      height: 100%;
      position: relative;
      .header {
        @include flex(row, space-between, flex-start);
        width: 100%;
        padding-bottom: 6px;
        border-bottom: 1px solid $borderColor_M3;
        .routePath {
          @include flex(row);
          padding-bottom: 6px;
          overflow: auto;
          .routeItem {
            .routeImgBox {
              @include flex();
              transition: 0.2s all;
              width: 36px;
              height: 36px;
              border-radius: 36px;
              cursor: pointer;
              margin-right: 6px;
              .routeImg {
                width: 24px;
                height: auto;
              }
            }
            .routeImgBox:hover {
              background-color: $buttonColor_Black_hover;
            }
            .routeTitle--current {
              background-color: $buttonColor_Black_active;
            }
            .routeTitle {
              @include flex();
              @include ellipsis(120px);
              margin-left: 6px;
              color: $fontColor_M8;
              font-size: var(--fontSize_Regular_medium);
              cursor: pointer;
              transition: 0.2s all;
              border-radius: 4px;
              min-width: 80px;
              height: 36px;
              padding: 0 12px;
            }
            .routeTitle:hover {
              background-color: $buttonColor_Black_hover;
            }
          }
        }
        .toolBox {
          @include flex(row, space-between);
          .userMenu {
            @include flex(row);
            cursor: pointer;
            .avatar {
              width: 20px;
            }
            .nickname {
              @include ellipsis(120px);
              color: $fontColor_M8;
              margin-left: 12px;
            }
          }
          .langMenu {
            @include flex(row);
            .langText {
              @include userSelect();
              cursor: pointer;
              text-align: center;
              color: $fontColor_M8;
              margin-left: 12px;
              width: 80px;
              height: 36px;
              line-height: 36px;
            }
          }
        }
      }
      .pageView {
        @include flex();
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
