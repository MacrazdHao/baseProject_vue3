import router from "@/router";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/request/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const getMessages = () => {
  if ((<any>window).msgTimeout) clearInterval((<any>window).msgTimeout);
  // console.log('正在执行')
  // 获取系统消息列表
  store.dispatch("user/getUnreadNum");
  // 设置系统消息定时任务
  (<any>window).msgTimeout = setInterval(() => {
    store.dispatch("user/getUnreadNum");
  }, 1000 * 30);
};

router.beforeEach(async (to, from, next) => {
  const query = to.query;
  NProgress.start();
  const hasToken = getToken();
  // console.log(hasToken)
  if ((<any>window).msgTimeout) clearInterval((<any>window).msgTimeout);
  // 是否存在token（已登录）
  if (hasToken) {
    // 已登录
    const hasGetUserInfo = !!store.state.user.userinfo;
    // console.log(hasGetUserInfo)
    // 是否以获取用户信息
    if (hasGetUserInfo) {
      // 已获取用户信息
      getMessages();
      next();
    } else {
      // 未获取用户信息
      // 获取用户信息
      store
        .dispatch("user/getUserinfo")
        .then((res: any) => {
          next();
        })
        .catch(async (err: any) => {
          // 清空Token（重置user.state）
          store.dispatch("user/resetToken").then(next);
        });
    }
    // }
  } else {
    // 未登录
    if ((<any>window).msgTimeout) clearInterval((<any>window).msgTimeout);
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
