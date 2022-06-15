interface FilesType {
  [path: string]: any;
}

let modules: FilesType = {};

const files: FilesType = import.meta.globEager(`./*/index.ts`);
Object.keys(files).forEach((key: string) => {
  // 过滤本身，及非模块index
  if (key === "./index.ts" || !key.includes("index.ts")) return;
  const temp = key.replace("./", "").replace(".ts", "").split("/");
  modules[temp[0]] = files[key].default;
});

export default modules;
