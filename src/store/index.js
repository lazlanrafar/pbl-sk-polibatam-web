import Vue from "vue";
import Vuex from "vuex";

import app from "./App";
import dashboard from "./Dashboard";
import manajemenUser from "./ManajementUser";
import tagGroup from "./TagGroup";
import dokumenKeputusan from "./DokumenKeputusan";
import dokumenTugas from "./DokumenTugas";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    dashboard,
    manajemenUser,
    tagGroup,
    dokumenKeputusan,
    dokumenTugas,
  },
});
