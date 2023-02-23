import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";

import home from "./modules/home";
import document from "./modules/document";
import suratKeterangan from "./modules/surat-keterangan";
import tagGroup from "./modules/tag-group";
import userManagement from "./modules/user-management";

export default new Vuex.Store({
  modules: {
    app,
    home,
    document,
    suratKeterangan,
    tagGroup,
    userManagement,
  },
});
