import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/home/index.vue";

import Login from "../views/Auth/login.vue";

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
