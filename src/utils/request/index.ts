import axios from "axios";
import { getToken, removeToken } from "./auth";
import config from "./config";
import { i18n } from "@/lang";

console.log(config);
const service = axios.create({
  // baseURL: mockURL, // url = base url + request url
  baseURL: config.URL,
  timeout: 50000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    const { locale } = i18n.global;
    if (token && config.headers) {
      config.headers.Authorization = token;
      config.headers["Accept-Language"] = locale.value;
    }
    return config;
  },
  (error) => {
    if ((<any>window).loading) {
      (<any>window).loading.close();
      (<any>window).loading = null;
    }
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log(response);
    if ((<any>window).loading) {
      (<any>window).loading.close();
      (<any>window).loading = null;
    }
    if (res.code === 301 || res.code === 403) {
      // Vue.prototype.$message.error({ text: i18n.t("tips.loginExpire") });
      removeToken();
    }

    if (!res.success) {
      // Vue.prototype.$message.error({text: res[i18n.t('tips.msgKey')] || 'Error'})
      const { t } = i18n.global;
      return Promise.reject(new Error(res[t("tips.msgKey")] || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    if ((<any>window).loading) {
      (<any>window).loading.close();
      (<any>window).loading = null;
    }
    // Vue.prototype.$message.error({
    //   text: error.msg || i18n.global.t("tips.requestTimeout"),
    // });
    return Promise.reject(error);
  }
);

interface ObjectMapType {
  [key: string]: any | Function;
}

(<ObjectMapType>service).custom = { url: config.URL, ossUrl: config.ossURL };

export default service;
