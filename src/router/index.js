import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard/index.vue"),
  },
  {
    path: "/document-tugas",
    name: "Document Tugas",
    component: () => import("../views/DocumentTugas/index.vue"),
  },
  {
    path: "/document-keputusan",
    name: "Keputusan",
    component: () => import("../views/DocumentKeputusan/index.vue"),
  },
  {
    path: "/tag-group",
    name: "Tag Group",
    component: () => import("../views/TagGroup/index.vue"),
  },
  {
    path: "/user",
    name: "Manajemen User",
    component: () => import("../views/User/index.vue"),
  },
];

const router = new vueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
