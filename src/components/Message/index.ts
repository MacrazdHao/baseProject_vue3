import { createApp } from "vue";
import { pushMsg } from "./data";
import MessageList from "./index.vue";
import Lodash from "lodash";

interface OptionsType {
  [key: string]: any | Function;
}

const defaultOptions = {
  text: "",
  theme: "blue",
  duration: 2000,
};

export const MessagePlugin = {
  install: function (app: any) {
    const div = document.createElement("div");
    div.id = "MessagesBox";
    document.getElementById("app")?.append(div);
    createApp(MessageList).mount("#MessagesBox");
    const MessageMain = {
      showMessage(options: OptionsType) {
        const _options = { ...defaultOptions, ...options };
        pushMsg({
          id: Lodash.uniqueId("Message"),
          text: _options.text,
          theme: _options.theme,
          visible: true,
          duration: _options.duration,
        });
      },
      message(options: OptionsType) {
        this.showMessage({ ...options, theme: "blue" });
      },
      success(options: OptionsType) {
        this.showMessage({ ...options, theme: "green" });
      },
      warning(options: OptionsType) {
        this.showMessage({ ...options, theme: "yellow" });
      },
      error(options: OptionsType) {
        this.showMessage({ ...options, theme: "red" });
      },
    };
    app.config.globalProperties.$message = MessageMain;
  },
};
