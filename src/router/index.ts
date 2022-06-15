import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../pages/HelloWorld.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
