import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getToken } from "@/utils/request/auth";
import { toggle } from "@/components/Loading/data";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    alias: "/login",
    component: () => import("@/pages/Login/index.vue"),
    beforeEnter: (to, from, next) => {
      if (getToken()) next("/index");
      else next();
    },
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/pages/index.vue"),
    beforeEnter: (to, from, next) => {
      if (!getToken()) next("/");
      else next();
    },
    children: [
      {
        path: "",
        redirect: "/index/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/pages/Dashboard/index.vue"),
        meta: {
          titleKey: "dashboard",
        },
      },
      {
        path: "machinesManagement",
        name: "MachinesManagement",
        component: () => import("@/pages/MachinesList/index.vue"),
        meta: {
          titleKey: "machinesManagement",
        },
        children: [
          {
            path: "/",
            redirect: "/index/machinesManagement/machinesList",
          },
          {
            path: "machinesList",
            name: "MachinesList",
            component: () => import("@/pages/MachinesList/pages/list.vue"),
            meta: {
              titleKey: "machinesList",
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  toggle(false);
});
export default router;
