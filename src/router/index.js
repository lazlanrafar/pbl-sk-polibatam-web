import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Auth/Login.vue"),
  },
];

const router = new vueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
