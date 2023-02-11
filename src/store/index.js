import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import home from "./modules/home";
import barang from "./modules/barang";
import user from "./modules/user";
import history from "./modules/history";

export default new Vuex.Store({
  modules: {
    app,
    home,
    barang,
    user,
    history,
  },
});
