import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const form = {
  title: "",
  type: "",
  lampiran: "",
  pickup_plan: "",
  list_consider: [""],
  list_observe: [""],
  list_decide: [""],
};

const pengajuanSurat = {
  state: {
    isLoading: false,
    list_type: ["SK Honor", "SK Non-Honor", "Perdir"],
    list_lampiran: ["Ada", "Tidak Ada"],
    form: form,
  },
  mutations: {
    SET_IS_LOADING_PENGAJUAN_SURAT(state, payload) {
      state.isLoading = payload;
    },
    SET_FORM_PENGAJUAN_SURAT(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_PENGAJUAN_SURAT(state) {
      state.form = form;
    },
  },
  actions: {
    CreatePengajuan: async (context) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        // context.dispatch("GetAllTagGroup");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
  },
};

export default pengajuanSurat;
