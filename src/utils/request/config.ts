import CookiesKeys from "@/utils/global/cookiesKeys";
const baseURL = "https://vianstats.net/mini";
const baseOssURL = "https://vianstats.net/io";
const baseWebSocketURL = "ws://vianstats.net/mini";
const mockURL = "http://192.168.0.104:3001/mock/11";
const testURL = "http://192.168.0.104:9080";
const testURL2 = "http://192.168.0.104:8050";
const luohuanURL = "http://192.168.1.117:9080";
const luohuanURL2 = "http://192.168.1.87:8050";
const doudouURL = "http://192.168.1.87:8054";
const wenjieURL = "http://192.168.1.36:8050";
const chuangxin = "http://192.168.1.132:8050";
const ossURL = "http://192.168.0.104:32747";
const wenjieWebSocketURL = "ws://192.168.1.36:9080";
const yapi = "http://yapi.vianstats.com/mock/15";
const localData = "LocalData";

const _URL =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.RequestURLKey) || localData
    : baseURL;
const _ossURL =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.OssURLKey) || ossURL
    : baseOssURL;
const _webSocketURL =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.WebSocketURLKey) || wenjieWebSocketURL
    : baseWebSocketURL;

export default {
  URL: _URL,
  ossURL: _ossURL,
  webSocketURL: _webSocketURL,
  getEnv: () => {
    return process.env.NODE_ENV;
  },
  getFullVersion: () => {
    return process.env.GIT_COMMIT_VERSION;
  },
  getShortVersion: () => {
    return process.env.GIT_COMMIT_VERSION.substring(5, 13);
  },
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
    testURL2,
    luohuanURL,
    luohuanURL2,
    doudouURL,
    wenjieURL,
    chuangxin,
    ossURL,
    yapi,
    localData,
    baseWebSocketURL,
    wenjieWebSocketURL,
  },
};
