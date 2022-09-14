import Vue from "vue";
import Vuex from "vuex";

import app from "./App";
import manajemenUser from "./ManajementUser";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    manajemenUser,
  },
});
