<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import modules from "@/store/index";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Lodash from "lodash";
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const menus =
  router.options.routes[1].children?.filter((item, index) => index > 0) || [];
const showingParent = ref<Array<string>>([]);
const curRouteName = ref<string>("");
const childrenStyle = ref<any>({});

const childrenShowStyle = (toggle: boolean, length: number) => {
  if (length < 0) return {};
  return {
    marginTop: toggle ? "8px" : 0,
    height: toggle ? `${length * 36}px` : 0,
    opacity: toggle ? 1 : 0,
  };
};

onMounted(() => {
  const curParentName =
    router.currentRoute.value.matched[1].name?.toString() ||
    `notFound-${new Date().getTime()}`;
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].children) {
      const length = (menus[i].children?.length || 0) - 1;
      const routeName =
        menus[i].name?.toString() || `notFound-${new Date().getTime()}`;
      const isShowing = curParentName == routeName;
      childrenStyle.value[routeName] = childrenShowStyle(isShowing, length);
      if (isShowing) showingParent.value.push(routeName);
    }
  }
});

watchEffect(() => {
  curRouteName.value =
    route.name?.toString() || `notFound-${new Date().getTime()}`;
});

const jumpTo = (to: RouteRecordRaw | undefined, fromPath: boolean = false) => {
  if (!to) {
    router.push({ name: "Dashboard" });
    return;
  }
  if (route.name == to.name) return;
  if (to.children && !fromPath) {
    const routeName = to.name?.toString() || `notFound-${new Date().getTime()}`;
    // 开关
    const length = to.children.length - 1;
    if (showingParent.value.includes(routeName)) {
      childrenStyle.value[routeName] = childrenShowStyle(false, length);
      showingParent.value = showingParent.value.filter(
        (item) => item != routeName
      );
    } else {
      showingParent.value.push(routeName);
      childrenStyle.value[routeName] = childrenShowStyle(true, length);
    }
    return;
  } else if (to.children && fromPath) {
    router.push({ path: to.children[1].path });
    return;
  }
  router.push({ name: to.name == "Index" ? "Dashboard" : to.name });
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
          <template v-for="(item, index) in menus" :key="`menu-${index}`">
            <div
              class="menuList-itemBox"
              v-if="item.meta && item.meta.showInMenu"
            >
              <div
                :class="[
                  'menuList-itemBox-parent',
                  route.name === item.name || showingParent.includes(item.name)
                    ? 'menuList-itemBox-parent--selected'
                    : '',
                ]"
                @click="jumpTo(item)"
              >
                <div class="childTipsIcon"></div>
                <p class="menuList-itemBox-parent-title">
                  {{
                    item.meta.titleKey
                      ? t(`routes.${item.meta.titleKey}`)
                      : item.meta.title || ""
                  }}
                </p>
                <div class="childTipsIcon">
                  <div class="lineIcon" v-if="item.children">
                    <div class="upline"></div>
                    <div class="bottomline"></div>
                  </div>
                </div>
              </div>
              <!-- <transition name="slide-drawer"> -->
              <div
                class="menuList-itemBox-children"
                :style="childrenStyle[item.name]"
                v-if="item.children"
              >
                <template
                  v-for="(child, childIndex) in item.children"
                  :key="`menu-child-${childIndex}`"
                >
                  <div
                    :class="[
                      'menuList-itemBox-children-item',
                      route.name === child.name
                        ? 'menuList-itemBox-children-item--selected'
                        : '',
                    ]"
                    v-if="child.meta && child.meta.showInMenu"
                    @click="jumpTo(child)"
                  >
                    <p class="menuList-itemBox-children-item-title">
                      {{
                        child.meta.titleKey
                          ? t(`routes.${child.meta.titleKey}`)
                          : child.meta.title || ""
                      }}
                    </p>
                    <div class="bottomLine"></div>
                  </div>
                </template>
              </div>
              <!-- </transition> -->
            </div>
          </template>
        </div>
      </div>
      <div class="pageBox">
        <div class="header">
          <div class="routePathBox">
            <div class="routeImgBox" @click="jumpTo()">
              <img class="routeImg" src="@/assets/home.svg" />
            </div>
            <div class="routePathContent">
              <div class="routePath">
                <template
                  v-for="(item, index) in router.currentRoute.value.matched"
                  :key="index"
                >
                  <div class="routeItem" v-if="index > 0">
                    <p class="slash">/</p>
                    <p
                      :class="[
                        'routeTitle',
                        route.name == item.name ? 'routeTitle--current' : '',
                      ]"
                      @click="jumpTo(item, true)"
                    >
                      {{
                        item.meta.titleKey
                          ? t(`routes.${item.meta.titleKey}`)
                          : item.meta.title || ""
                      }}
                    </p>
                  </div>
                </template>
              </div>
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
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <component class="pageView" :is="Component" />
            </transition>
          </router-view>
        </div>
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
        transition: 0.2s all;
        &-itemBox {
          @include flex();
          width: 100%;
          transition: 0.2s all;
          &-parent {
            @include flex(row, space-between);
            width: 100%;
            height: 48px;
            padding: 0 8px;
            background-color: $buttonColor_Black;
            cursor: pointer;
            border-radius: 4px;
            margin-top: 12px;
            transition: 0.2s all;
            &-title {
              @include userSelect();
              @include ellipsis(calc(100% - 34px));
              color: $fontColor_M5;
              transition: 0.2s all;
            }
            .childTipsIcon {
              @include flex();
              width: 6px;
              // height: 100%;
              height: calc(100% - 28px);
              .lineIcon {
                @include flex(column, space-between);
                @include fullSize();
                div {
                  width: 4px;
                  border-radius: 4px;
                  transition: 0.3s all ease;
                  background-color: $fontColor_M5;
                }
                .upline {
                  height: 4px;
                }
                .bottomline {
                  height: calc(100% - 8px);
                }
              }
            }
          }
          &-parent:hover {
            background-color: $buttonColor_Black_hover;
            .menuList-itemBox-parent-title {
              color: $fontColor_M7 !important;
            }
            .childTipsIcon {
              .lineIcon {
                div {
                  background-color: $fontColor_M7;
                }
              }
            }
          }
          &-parent:active {
            background-color: $buttonColor_Black_active;
            .menuList-itemBox-parent-title {
              color: $fontColor_M8 !important;
            }
            .childTipsIcon {
              .lineIcon {
                div {
                  background-color: $fontColor_M8;
                }
              }
            }
          }
          &-parent--selected {
            background-color: $buttonColor_Black_active !important;
            .menuList-itemBox-parent-title {
              color: $fontColor_M8 !important;
              text-shadow: 0 0 6px $backgroundColor_M11;
            }
            .childTipsIcon {
              .lineIcon {
                div {
                  background-color: $fontColor_M8;
                }
                .upline {
                  height: calc(100% - 8px);
                }
                .bottomline {
                  height: 4px;
                }
              }
            }
          }
          &-children {
            width: 100%;
            transition: 0.3s all;
            overflow: hidden;
            &-item {
              @include flex(column, center, flex-end);
              width: 100%;
              height: 36px;
              &-title {
                @include userSelect();
                @include ellipsis(calc(100% - 34px));
                width: fit-content;
                color: $fontColor_M5;
                transition: 0.2s all;
                text-align: end;
                cursor: pointer;
              }
              .bottomLine {
                width: 0;
                height: 1px;
                background-color: none;
                transition: 0.3s all ease;
                margin-top: 8px;
              }
              @keyframes test-easeOutBounce {
                0% {
                  width: 0%;
                }

                12% {
                  width: 10.89%;
                }

                24% {
                  width: 43.56%;
                }

                36% {
                  width: 98.01%;
                }

                54% {
                  width: 75.02%;
                }

                74% {
                  width: 98.37%;
                }

                82% {
                  width: 93.75%;
                }

                92% {
                  width: 99.34%;
                }

                96% {
                  width: 98.46%;
                }

                100% {
                  width: 100%;
                }
              }
            }
            &-item--selected {
              .menuList-itemBox-children-item-title {
                color: $fontColor_M8 !important;
                text-shadow: 0 0 6px $shadowColor_Gray4;
              }
              .bottomLine {
                width: 100%;
                animation: test-easeOutBounce 0.6s linear;
                background-color: $fontColor_M8;
                box-shadow: 0 0 6px $shadowColor_Gray4;
              }
            }
          }
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
        .routePathBox {
          @include flex(row, flex-start, flex-start);
          width: calc(100% - 260px);
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
          .routePathContent {
            @include flex(row-reverse, flex-start);
            width: fit-content;
            max-width: calc(100% - 42px);
            overflow: auto;
            padding-bottom: 6px;
            .routePath {
              @include flex(row, flex-start);
              width: fit-content;
              .routeItem {
                @include flex(row);
                p {
                  color: $fontColor_M8;
                  font-size: var(--fontSize_Regular_medium);
                }
                .slash {
                  width: 12px;
                  margin: 0 6px;
                }
                .routeTitle--current {
                  background-color: $buttonColor_Black_active;
                  text-shadow: 0 0 6px $shadowColor_Gray4;
                }
                .routeTitle {
                  @include flex();
                  @include ellipsis(120px);
                  // margin-left: 6px;
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
          }
        }
        .toolBox {
          @include flex(row, space-between);
          .userMenu {
            @include flex(row);
            cursor: pointer;
            .avatar {
              width: 20px;
              border-radius: 20px;
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
      .content {
        @include flex();
        position: relative;
        height: 100%;
        width: 100%;
        .pageView {
          @include flex();
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
