import Vue from "vue";
import VueRouter from "vue-router";

import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

import Login from "../views/auth/Login.vue";

import Home from "@/views/home/index.vue";

import SuratKeterangan from "@/views/surat-keterangan/index.vue";
import SuratTugas from "@/views/surat-tugas/index.vue";

import PengajuanSurat from "@/views/pengajuan-surat/index.vue";

import TagGroup from "@/views/tag-group/index.vue";
import UserManagement from "@/views/user-management/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/surat-keterangan",
    name: "Surat Keterangan",
    component: SuratKeterangan,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/surat-tugas",
    name: "Surat Tugas",
    component: SuratTugas,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/pengajuan-surat",
    name: "Pengajuan Surat",
    component: PengajuanSurat,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/setup/tag-group",
    name: "Tag Group",
    component: TagGroup,
    meta: {
      middleware: [auth],
    },
  },
  {
    path: "/setup/user-management",
    name: "User Management",
    component: UserManagement,
    meta: {
      middleware: [auth],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/") return next("/home");
  return next();
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
