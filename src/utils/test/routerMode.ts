import CookiesKeys from "@/utils/global/cookiesKeys";
const permissionMode = "PerMode";
const testMode = "TestMode";

const routerMode =
  process.env.NODE_ENV === "development"
    ? localStorage.getItem(CookiesKeys.RouterModeKey) || testMode
    : permissionMode;

export default {
  routerSetting: {
    routerModes: { permissionMode, testMode },
    getRouterMode: () => {
      return routerMode;
    },
    setRouterMode: (_mode: string) => {
      localStorage.setItem(CookiesKeys.RouterModeKey, _mode);
      window.location.reload();
    },
  },
};
