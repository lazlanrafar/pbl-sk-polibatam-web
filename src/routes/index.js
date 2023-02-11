import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/home/index.vue";
import Barang from "@/views/barang/index.vue";
import User from "@/views/user/index.vue";
import History from "@/views/history/index.vue";

import Login from "@/views/auth/login.vue";
import ForgotPassword from "@/views/auth/forgot-password.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/",
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
  base: process.env.BASE_URL,
  routes,
});

export default router;
