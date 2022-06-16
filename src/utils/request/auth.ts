import Cookies from "js-cookie";
import CookiesKeys from "@/utils/global/cookiesKeys";

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
  return Cookies.get(CookiesKeys.TokenKey);
}

export function setToken(token: string) {
  removeToken();
  return Cookies.set(CookiesKeys.TokenKey, token);
}

export function removeToken() {
  const res = Cookies.remove(CookiesKeys.TokenKey);
  window.location.reload();
  return res;
}

export function getUserType() {
  return Cookies.get(CookiesKeys.UsertypeKey);
}
