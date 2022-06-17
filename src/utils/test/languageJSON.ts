import { i18n } from "@/lang";
const files = require.context("../language", true, /\.js$/);
// import allText from "@/language.json";

interface ObjectType {
  [key: string]: any;
}

let languageJSON: ObjectType = {};

const languages = i18n.global.availableLocales;

const keys2 = files.keys();

async function getJSON(language: Array<string> | string) {
  // return new Promise(async (resolve, reject) => {
  // console.log(keys2, keys2.length)
  for (let i = 0; i < keys2.length; i++) {
    const key = keys2[i];
    // console.log(key);
    if (key === "./index.ts") continue;
    const temp = key.replace("./", "").replace(".ts", "").split("/");
    const index = temp.length - 1;
    await import(`../language/${temp}`)
      .then((res) => {
        if (language instanceof Array) {
          languageJSON[temp[index]] = convertAllLanguage(res.default, language);
        } else if (typeof language === "string") {
          if (JSON.stringify(res.default[language]) === "{}") return;
          languageJSON[temp[index]] = res.default[language];
        } else {
          throw new Error("language unavalible");
        }
      })
      .catch((err) => {
        console.log(err);
        throw new Error();
      });
  }
  return languageJSON;
  // resolve(languageJSON)
  // })
}

function convertAllLanguage(data: any, languages: Array<string>) {
  const result: ObjectType = {};
  for (let i = 0; i < languages.length; i++) {
    for (const key in data[languages[i]]) {
      if (result[key]) continue;
      if (typeof data[languages[i]][key] === "object") {
        const childItems: ObjectType = {};
        for (let j = 0; j < languages.length; j++) {
          childItems[languages[j]] = data[languages[j]][key];
        }
        const child = convertAllLanguage(childItems, languages);
        result[key] = child;
      } else {
        result[key] = (() => {
          const resTmp: ObjectType = {};
          for (let j = 0; j < languages.length; j++) {
            const itemTmp = data[languages[j]][key];
            resTmp[languages[j]] = itemTmp || "none";
          }
          return resTmp;
        })();
      }
    }
  }
  return result;
}

let duplicate: ObjectType = {};
function getDuplicate(options: ObjectType) {
  let { data, path, withPath, checkLang, standardLang, noRepeat } = options;
  path = path || [];
  withPath = withPath || false;
  checkLang = checkLang || "en";
  standardLang = standardLang || "zh";
  noRepeat = noRepeat || false;
  for (const key in data) {
    const pathTmp = [...path, key];
    switch (key) {
      case standardLang:
        if (!withPath) {
          if (!duplicate[data[standardLang]]) {
            duplicate[data[standardLang]] = [data[checkLang]];
          } else {
            if (
              !noRepeat ||
              duplicate[data[standardLang]].indexOf(data[checkLang]) === -1
            ) {
              duplicate[data[standardLang]].push(data[checkLang]);
            }
          }
        } else {
          if (!duplicate[data[standardLang]]) {
            duplicate[data[standardLang]] = [
              { text: data[checkLang], path: path.join(".") },
            ];
          } else {
            let exist = false;
            for (let i = 0; i < duplicate[data[standardLang]].length; i++) {
              if (duplicate[data[standardLang]][i].text === data[checkLang]) {
                exist = true;
                break;
              }
            }
            if (!noRepeat || !exist) {
              duplicate[data[standardLang]].push({
                text: data[checkLang],
                path: path.join("."),
              });
            }
          }
        }
        break;
      case checkLang:
        break;
      default:
        getDuplicate({
          data: data[key],
          path: pathTmp,
          withPath,
          checkLang,
          standardLang,
          noRepeat,
        });
        break;
    }
  }
}
function getTwoVersionDuplicate() {
  const result = { ...duplicate };
  for (const key in result) {
    if (result[key].length < 2) {
      delete result[key];
    }
  }
  return result;
}

let noTranslate: ObjectType = {};
function getNoTranslate(options: ObjectType) {
  let { data, path, standardLang, checkLang, getAll } = options;
  path = path || [];
  standardLang = standardLang || "zh";
  checkLang = checkLang || "en";
  getAll = getAll || false;
  // 找出两边字符串一样的，或只有一边是有内容，或只有一边是有该字段的
  switch (getAll) {
    case false:
      for (const key in data) {
        const pathTmp = [...path, key];
        switch (key) {
          case standardLang:
            if (data[standardLang] === data[checkLang] || !data[checkLang]) {
              noTranslate[data[standardLang]] = [
                ...(noTranslate[data[standardLang]] || []),
                {
                  text: data[checkLang] || null,
                  path: path.join("."),
                },
              ];
            }
            break;
          case checkLang:
            break;
          default:
            getNoTranslate({
              data: data[key],
              path: pathTmp,
              standardLang,
              checkLang,
              getAll,
            });
            break;
        }
      }
      break;
    case true:
      for (const key in data) {
        const pathTmp = [...path, key];
        if (key === standardLang) {
          for (let i = 0; i < languages.length; i++) {
            console.log(languages[i]);
            if (languages[i] === standardLang) continue;
            else {
              const _checkLang = languages[i];
              if (
                data[standardLang] === data[_checkLang] ||
                !data[_checkLang]
              ) {
                noTranslate[data[standardLang]] = [
                  ...(noTranslate[data[standardLang]] || []),
                  {
                    lang: languages[i],
                    text: data[_checkLang] || null,
                    path: path.join("."),
                  },
                ];
              }
            }
          }
        } else if (languages.indexOf(key) === -1) {
          getNoTranslate({
            data: data[key],
            path: pathTmp,
            standardLang,
            checkLang,
            getAll,
          });
        }
      }
  }
}

export function getNoTranslateJSONFile(
  options: ObjectType,
  callback: Function
) {
  languageJSON = {};
  getJSON(
    options.checkLang === "allLang"
      ? languages
      : [options.standardLang, options.checkLang]
  ).then((res) => {
    noTranslate = {};
    let { checkLang, getAll } = options;
    // let standardLang = options.standardLang || 'zh'
    checkLang = checkLang || "en";
    getAll = checkLang === "allLang";
    console.log(checkLang);
    console.log(getAll);
    getNoTranslate({ ...options, getAll, data: res });
    const str = JSON.stringify(noTranslate);
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    const downLink = document.createElement("a");
    downLink.download = "noTranslate.json";
    downLink.href = URL.createObjectURL(blob);
    document.body.appendChild(downLink);
    downLink.click();
    document.body.removeChild(downLink);
    callback();
    return true;
  });
}

export function getDuplicateJSONFile(options: ObjectType, callback: Function) {
  languageJSON = {};
  getJSON([options.standardLang, options.checkLang]).then((res) => {
    duplicate = {};
    let { checkLang, withPath, twoVersionFilter, noRepeat } = options;
    checkLang = checkLang || "en";
    // let standardLang = options.standardLang || 'zh'
    withPath = withPath || false;
    twoVersionFilter = twoVersionFilter || false;
    noRepeat = noRepeat || false;
    getDuplicate({ data: res, withPath, checkLang, noRepeat });
    const str = JSON.stringify(
      twoVersionFilter ? getTwoVersionDuplicate() : duplicate
    );
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    const downLink = document.createElement("a");
    downLink.download = "duplicate.json";
    downLink.href = URL.createObjectURL(blob);
    document.body.appendChild(downLink);
    downLink.click();
    document.body.removeChild(downLink);
    callback();
    return true;
  });
}

export function getLanguageJSONFile(language: Array<string> | string) {
  languageJSON = {};
  getJSON(language)
    .then((data) => {
      const str = JSON.stringify(data);
      const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
      console.log(data);
      const downLink = document.createElement("a");
      downLink.download = "language.json";
      downLink.href = URL.createObjectURL(blob);
      document.body.appendChild(downLink);
      downLink.click();
      document.body.removeChild(downLink);
    })
    .catch((err) => {
      alert("没有这个语言" + err);
    });
}
