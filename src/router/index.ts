import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getToken } from "@/utils/request/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    alias: "/login",
    component: () => import("../pages/Login/index.vue"),
    beforeEnter: (to, from, next) => {
      if (getToken()) next("/index");
      else next();
    },
  },
  // {
  //   path: "/",
  //   component: () => import("../pages/HelloWorld.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
