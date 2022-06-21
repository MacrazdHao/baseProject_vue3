import Cookies from "js-cookie";
import CookiesKeys from "@/utils/global/cookiesKeys";
import { ref } from "vue";

export const tokenRef = ref("");

export function getTmpToken() {
  return Cookies.get(CookiesKeys.TmpTokenKey);
}

export function setTmpToken(token: string) {
  removeTmpToken();
  return Cookies.set(CookiesKeys.TmpTokenKey, token);
}

export function removeTmpToken() {
  const res = Cookies.remove(CookiesKeys.TmpTokenKey);
  return res;
}

export function getToken() {
  const token = Cookies.get(CookiesKeys.TokenKey) || "";
  tokenRef.value = token;
  return token;
}

export function setToken(token: string) {
  removeToken();
  tokenRef.value = token;
  return Cookies.set(CookiesKeys.TokenKey, token);
}

export function removeToken() {
  const res = Cookies.remove(CookiesKeys.TokenKey);
  tokenRef.value = "";
  // window.location.reload();
  return res;
}

export function getUserType() {
  return Cookies.get(CookiesKeys.UsertypeKey);
}
