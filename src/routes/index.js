import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/home/index.vue";
import Barang from "@/views/barang/index.vue";
import User from "@/views/user/index.vue";
import History from "@/views/history/index.vue";

import Login from "@/views/auth/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/barang",
    name: "Barang",
    component: Barang,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  // linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") return next("/home");
  return next();
});

export default router;
