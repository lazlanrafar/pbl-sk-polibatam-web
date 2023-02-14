import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import home from "./modules/home";
import userManagement from "./modules/user-management";

export default new Vuex.Store({
  modules: {
    app,
    home,
    userManagement,
  },
});
