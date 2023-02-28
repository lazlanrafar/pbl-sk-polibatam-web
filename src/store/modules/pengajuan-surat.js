// import axios from "axios";
// import catchUnauthorized from "../../utils/catch-unauthorized";
// const apiUrl = process.env.VUE_APP_API_URL;

const pengajuanSurat = {
  state: {
    isLoading: false,
    list_type: ["SK Honor", "SK Non-Honor", "Perdir"],
    list_lampiran: ["Ada", "Tidak Ada"],
    form: {
      title: "",
      type: "",
      lampiran: "",
      pickup_plan: "",
      list_consider: [""],
      list_observe: [""],
      list_decide: [""],
    },
  },
  mutations: {
    SET_IS_LOADING_PENGAJUAN_SURAT(state, payload) {
      state.isLoading = payload;
    },
    SET_FORM_PENGAJUAN_SURAT(state, payload) {
      state.form[payload.key] = payload.value;
    },
  },
  actions: {},
};

export default pengajuanSurat;
