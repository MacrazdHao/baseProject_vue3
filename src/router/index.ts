import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getToken } from "@/utils/request/auth";
import { toggle } from "@/components/Loading/data";

interface RouteMeta {
  titleKey?: string; // i18n中routes.ts的文案路径
  title?: string; // 无i18n时的备用标题字段
  showInMenu?: boolean; //  显示到子菜单中（仅用于/index的子路由中的首层children）
  [key: string]: any | RouteMeta;
}
// meta额外定义，提高代码可读性
const routesMeta = <RouteMeta>{
  Dashboard: <RouteMeta>{
    titleKey: "dashboard",
    showInMenu: true,
  },
  MachinesManagement: <RouteMeta>{
    titleKey: "machinesManagement",
    showInMenu: true,
    MachinesList: <RouteMeta>{
      titleKey: "machinesList",
      showInMenu: true,
    },
  },
};

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
          ...routesMeta["Dashboard"],
        },
      },
      {
        path: "machinesManagement",
        name: "MachinesManagement",
        component: () => import("@/pages/MachinesManagement/index.vue"),
        meta: {
          ...routesMeta["MachinesManagement"],
        },
        children: [
          {
            path: "",
            redirect: "/index/machinesManagement/machinesList",
          },
          {
            path: "machinesList",
            name: "MachinesList",
            component: () =>
              import("@/pages/MachinesManagement/pages/list.vue"),
            meta: {
              ...routesMeta["MachinesManagement"]["MachinesList"],
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
