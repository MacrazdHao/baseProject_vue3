/*

  该验证码发送函数的js文件，为保留的旧版本

*/

// import Vue from 'vue'
import store from "../../store";
// import i18n from "@/lang";

const secondsCount = 60;
const phoneVCodeTimestamp = "pvcode";
const emailVCodeTimestamp = "evcode";
let phoneVCodeTimer: any = null;
let emailVCodeTimer: any = null;

initPhoneVCodeTimer();
initEmailVCodeTimer();

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
function initPhoneVCodeTimer() {
  // console.log(getPhoneVCodeTimestamp());
  let before = +getPhoneVCodeTimestamp();
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
    removePhoneVCodeTimestamp();
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
function getPhoneVCodeTimestamp() {
  return localStorage.getItem(phoneVCodeTimestamp) || "0";
}
// 设置localStorage中的时间戳
function setPhoneVCodeTimeStamp(seconds: number) {
  removePhoneVCodeTimestamp();
  return localStorage.setItem(phoneVCodeTimestamp, `${seconds}`);
}
// 清空localStorage中的时间戳
function removePhoneVCodeTimestamp() {
  return localStorage.removeItem(phoneVCodeTimestamp);
}

// 邮箱
// 发送验证码
export function sendEmailVCode(
  data: any,
  callback = (res: any) => {},
  errorCallback = (res: any) => {}
) {
  const seconds = getEmailSecondsState();
  if (seconds > 0) {
    // Vue.prototype.$message.warning({ text: i18n.global.t('global.vcode.sendTooFastTips', { seconds }) })
    return;
  }
  store
    .dispatch("user/sendEmailVCode", data)
    .then((res: any) => {
      createEmailVCodeTimer(secondsCount);
      callback(res);
    })
    .catch((err: any) => {
      // console.log(err);
      // Vue.prototype.$message.error({ text: err || i18n.global.t('global.vcode.errorTips') })
      errorCallback(err);
    });
}
// 生成计时器
function createEmailVCodeTimer(seconds: number) {
  clearInterval(emailVCodeTimer);
  if (seconds >= secondsCount) setEmailVCodeTimeStamp(new Date().getTime());
  updateEmailSecondsState(seconds);
  emailVCodeTimer = setInterval(() => {
    const nowSeconds = getEmailSecondsState() - 1;
    // console.log(nowSeconds);
    if (nowSeconds <= 0) {
      clearInterval(emailVCodeTimer);
    }
    updateEmailSecondsState(nowSeconds);
  }, 1000);
}
// 初始化验证码计时器
function initEmailVCodeTimer() {
  // console.log(getEmailVCodeTimestamp());
  let before = +getEmailVCodeTimestamp();
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
    removeEmailVCodeTimestamp();
  } else {
    updateEmailSecondsState(seconds);
    createEmailVCodeTimer(seconds);
  }
}
// 获取vuex中存储的秒数
function getEmailSecondsState() {
  return store.state.global.emailVCodeSeconds;
}
// 更新vuex中存储的秒数
function updateEmailSecondsState(seconds: number) {
  store.dispatch("global/setEmailVCodeSeconds", seconds);
}
// 获取localStorage中的时间戳
function getEmailVCodeTimestamp() {
  return localStorage.getItem(emailVCodeTimestamp) || "";
}
// 设置localStorage中的时间戳
function setEmailVCodeTimeStamp(seconds: number) {
  removeEmailVCodeTimestamp();
  return localStorage.setItem(emailVCodeTimestamp, `${seconds}`);
}
// 清空localStorage中的时间戳
function removeEmailVCodeTimestamp() {
  return localStorage.removeItem(emailVCodeTimestamp);
}
