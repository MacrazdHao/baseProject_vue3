import CookiesKeys from "@/utils/global/cookiesKeys";
const baseURL = process.env.VITE_API_DOMAIN || "";
const baseOssURL = process.env.VITE_API_DOMAIN;
const baseWebSocketURL = process.env.VITE_API_DOMAIN;
const mockURL = "http://mock.net/";
const testURL = "http://testUrl.net";
const yapi = "http://yapi.com/mock/15";
const localData = "LocalData";

const _URL =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.RequestURLKey) || baseURL
    : baseURL;
const _ossURL =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.OssURLKey) || baseOssURL
    : baseOssURL;
const _webSocketURL =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.WebSocketURLKey) || baseWebSocketURL
    : baseWebSocketURL;

export default {
  URL: _URL,
  ossURL: _ossURL,
  webSocketURL: _webSocketURL,
  // getEnv: () => {
  //   return process.env.NODE_ENV;
  // },
  // getFullVersion: () => {
  //   return process.env.VERSION;
  // },
  // getShortVersion: () => {
  //   return process.env.VERSION.substring(5, 18);
  // },
  setURL: (url: string) => {
    localStorage.setItem(CookiesKeys.RequestURLKey, url);
    window.location.reload();
  },
  setOSSURL: (url: string) => {
    localStorage.setItem(CookiesKeys.OssURLKey, url);
    window.location.reload();
  },
  setWebSocketURL: (url: string) => {
    localStorage.setItem(CookiesKeys.WebSocketURLKey, url);
    window.location.reload();
  },
  urls: {
    baseURL,
    mockURL,
    testURL,
    yapi,
    localData,
    baseWebSocketURL,
  },
};
