import CookiesKeys from "@/utils/global/cookiesKeys";
const hasLoginMode = "HasLoginMode";
const noLoginMode = "NoLoginMode";

const loginMode =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.LoginModeKey) || hasLoginMode
    : hasLoginMode;

export default {
  loginModeSetting: {
    loginModes: { hasLoginMode, noLoginMode },
    getLoginMode: () => {
      return loginMode;
    },
    setLoginMode: (_mode: string) => {
      localStorage.setItem(CookiesKeys.LoginModeKey, _mode);
      window.location.reload();
    },
  },
};
