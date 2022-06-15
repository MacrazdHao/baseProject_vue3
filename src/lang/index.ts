import { createI18n } from "vue-i18n";
import cookie from "js-cookie";
import CookiesKeys from "@/utils/global/cookiesKeys";

interface FilesType {
  [path: string]: any;
}

interface LanguagesType {
  [key: string]: string;
}
interface ContentType {
  [key: string]: any;
}

// 翻译文案中的key不要使用和语言key相同的字符串，否则会引起测试工具中的语言文案筛选工具的生成结果
const languages: Array<LanguagesType> = [
  { value: "zh", cname: "中文" },
  { value: "en", cname: "英语" },
];

const messages = (() => {
  const result: ContentType = {};
  for (let i = 0; i < languages.length; i++) {
    result[languages[i].value] = {};
  }
  return result;
})();

const files: FilesType = import.meta.globEager(`./**/*.ts`);
// 遍历引入本文件夹内的所有js文件数据
Object.keys(files).forEach((key: string) => {
  // 过滤本身
  if (key === "./index.ts") return;
  // 提取文件名作为key
  const temp = key.replace("./", "").replace(".ts", "").split("/");
  const count = temp.length;
  // 如果有子文件夹，导入文件夹及index.js内的内容
  // 排除子文件夹内的非index文件
  if (count > 1 && temp[count - 1] !== "index") return;
  // 读取js文件内的数据
  const config = files[key].default;
  const tempKey = temp[count > 1 ? count - 2 : count - 1];
  messages.zh[tempKey] = config.zh;
  messages.en[tempKey] = config.en;
});

export const content = messages;

export function getLocale() {
  const result = cookie.get(CookiesKeys.LanguageKey);
  return result || "zh";
}

export const i18n = createI18n({
  locale: getLocale(),
  messages,
});
