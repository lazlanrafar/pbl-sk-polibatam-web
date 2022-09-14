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
    path: "/user",
    name: "ManajemenUser",
    component: () => import("../views/User/index.vue"),
  },
];

const router = new vueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
