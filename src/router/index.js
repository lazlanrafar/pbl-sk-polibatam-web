import Vue from "vue";
import vueRouter from "vue-router";
import store from "../store/index.js";

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

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.app.isLogin) next({ name: "Login" });
  if (to.name === "Login" && store.state.app.isLogin) next({ name: "Home" });
  else next();
});

export default router;
