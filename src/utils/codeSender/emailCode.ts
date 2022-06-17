// import Vue from 'vue'
import store from "@/store";
// import {i18n} from '@/lang'

let secondsCount = 60;
const EmailVCodeTimestampKey = "evcode";
let emailVCodeTimer: any = null;

initEmailVCodeTimer();
// 邮箱
// 发送验证码
export function sendEmailVCode(
  data: any,
  callback = (res: any) => {},
  errorCallback = (err: any) => {}
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
export function initEmailVCodeTimer(initSecondsCount = 60) {
  // console.log(getEmailVCodeTimestamp());
  secondsCount = initSecondsCount;
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
  return localStorage.getItem(EmailVCodeTimestampKey) || "";
}
// 设置localStorage中的时间戳
function setEmailVCodeTimeStamp(seconds: number) {
  removeEmailVCodeTimestamp();
  return localStorage.setItem(EmailVCodeTimestampKey, `${seconds}`);
}
// 清空localStorage中的时间戳
function removeEmailVCodeTimestamp() {
  return localStorage.removeItem(EmailVCodeTimestampKey);
}
