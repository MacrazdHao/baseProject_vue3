import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index";
import { createPinia } from "pinia";

import { getLocale, i18n } from "@/lang/index";
import "@/styles/globalStyle.scss";
import "@/styles/transitions.css";
import { MessagePlugin } from "@/components/Message/index";
import { LoadingPlugin } from "@/components/Loading/index";

const lang = getLocale();
let langGlobalStyle =
  lang === "zh"
    ? "./styles/globalStyle_cn.scss"
    : "./styles/globalStyle_en.scss";
import(/* @vite-ignore */ langGlobalStyle).then(() => {
  console.log("加载全局语言样式完成");
});

setTimeout(() => {
  import("./styles/font.css").then(() => {
    console.log("通用字体完成");
  });
  if (lang === "zh") {
    import("./styles/font_cn.css").then(() => {
      console.log("语言字体完成");
    });
  } else {
    import("./styles/font_en.css").then(() => {
      console.log("语言字体完成");
    });
  }
});

let app = createApp(App);
app.use(router).use(i18n).use(createPinia()).mount("#app");
app.use(MessagePlugin).use(LoadingPlugin);
app.config.globalProperties.test = 123;
