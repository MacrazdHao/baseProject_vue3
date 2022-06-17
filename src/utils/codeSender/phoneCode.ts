// import Vue from 'vue'
import store from "@/store";
// import {i18n} from '../language'

let secondsCount = 60;
const PhoneVCodeTimestampKey = "pvcode";
let phoneVCodeTimer: string | number | NodeJS.Timeout | undefined;

initPhoneVCodeTimer();

// 手机
// 发送验证码
export function sendPhoneVCode(
  data: any,
  callback = (res: any) => {},
  errorCallback = (err: any) => {}
) {
  const seconds = getPhoneSecondsState();
  if (seconds > 0) {
    // Vue.prototype.$message.warning({ text: i18n.global.t('global.vcode.sendTooFastTips', { seconds }) })
    return;
  }
  store
    .dispatch("user/sendPhoneVCode", data)
    .then((res: any) => {
      // Vue.prototype.$message.message({ text: i18n.global.t('global.vcode.sendSuccessTips') })
      createPhoneVCodeTimer(secondsCount);
      callback(res);
    })
    .catch((err: any) => {
      // Vue.prototype.$message.error({ text: err || i18n.global.t('global.vcode.errorTips') })
      errorCallback(err);
    });
}
// 生成计时器
function createPhoneVCodeTimer(seconds: number) {
  clearInterval(phoneVCodeTimer);
  if (seconds >= secondsCount) setPhoneVCodeTimeStamp(new Date().getTime());
  updatePhoneSecondsState(seconds);
  phoneVCodeTimer = setInterval(() => {
    const nowSeconds = getPhoneSecondsState() - 1;
    // console.log(nowSeconds);
    if (nowSeconds <= 0) {
      clearInterval(phoneVCodeTimer);
    }
    updatePhoneSecondsState(nowSeconds);
  }, 1000);
}
// 初始化验证码计时器
export function initPhoneVCodeTimer(initSecondsCount = 60) {
  secondsCount = initSecondsCount;
  // console.log(getPhoneVCodeTimestampKey());
  let before = +getPhoneVCodeTimestampKey();
  let now = new Date().getTime();
  let seconds = 0;
  if (!before) {
    seconds = 0;
  } else {
    if (before.toString().length === 10) before = before * 1000;
    if (now.toString().length === 10) now = now * 1000;
    seconds = +(secondsCount - (now - before) / 1000).toFixed(0);
  }
  // console.log(before, now, seconds);
  if (seconds >= secondsCount) {
    removePhoneVCodeTimestampKey();
  } else {
    updatePhoneSecondsState(seconds);
    createPhoneVCodeTimer(seconds);
  }
}
// 获取vuex中存储的秒数
function getPhoneSecondsState() {
  return store.state.global.phoneVCodeSeconds;
}
// 更新vuex中存储的秒数
function updatePhoneSecondsState(seconds: number) {
  store.dispatch("global/setPhoneVCodeSeconds", seconds);
}
// 获取localStorage中的时间戳
function getPhoneVCodeTimestampKey() {
  return localStorage.getItem(PhoneVCodeTimestampKey) || "";
}
// 设置localStorage中的时间戳
function setPhoneVCodeTimeStamp(seconds: number) {
  removePhoneVCodeTimestampKey();
  return localStorage.setItem(PhoneVCodeTimestampKey, `${seconds}`);
}
// 清空localStorage中的时间戳
function removePhoneVCodeTimestampKey() {
  return localStorage.removeItem(PhoneVCodeTimestampKey);
}
