import { createApp } from "vue";
import { toggle } from "./data";
import Loading from "./index.vue";

interface OptionsType {
  [key: string]: any | Function;
}

export const LoadingPlugin = {
  install: function (app: any) {
    const div = document.createElement("div");
    div.id = "LoadingBox";
    document.getElementById("app")?.append(div);
    createApp(Loading).mount("#LoadingBox");
    const LoadingMain = {
      show(options?: OptionsType) {
        if (options && options.tips) toggle(true, options.tips);
        else toggle(true);
      },
      hide() {
        toggle(false);
      },
    };
    app.config.globalProperties.$loading = LoadingMain;
  },
};
