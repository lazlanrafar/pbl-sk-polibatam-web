import Vue from "vue";
import Vuex from "vuex";

import app from "./App";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
  },
});
