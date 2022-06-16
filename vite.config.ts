import { ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // git分支版本号
  let gitHEAD = fs.readFileSync(".git/HEAD", "utf-8").trim();
  let ref = gitHEAD.split(": ")[1];
  let develop = gitHEAD.split("/")[2];
  let getVersion = "";
  try {
    getVersion = fs.readFileSync(".git/" + ref, "utf-8").trim();
  } catch (err) {
    getVersion = "new";
  }
  let gitCommitVersion = develop + "-" + getVersion;

  // 运行环境配置参数
  let NODE_ENV = mode || process.env.NODE_ENV || "development";
  let envFiles = [];
  // if (command === "serve") envFiles = [".env"];
  envFiles = [".env", `.env.${NODE_ENV}`];
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/styles/vlength.scss";@import "@/styles/theme.scss";@import "@/styles/mixins.scss";',
        },
      },
    },
    plugins: [vue()],
    server: {
      host: process.env.VITE_HOST,
      port: +process.env.VITE_PORT,
      open: true,
      https: false,
      ssr: false,
      base: process.env.VITE_BASE_URL,
      outDir: process.env.VITE_OUTPUT_DIR,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      "process.env": {
        ...process.env,
        version: gitCommitVersion,
      },
    },
  };
});
