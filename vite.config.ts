import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/vlength.scss";@import "@/styles/theme.scss";@import "@/styles/mixins.scss";'
      }
    }
  },
  plugins: [vue()],
  server: {
    port: 8083,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
