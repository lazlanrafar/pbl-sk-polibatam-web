import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const tagGroup = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    form: {
      name: "",
      data_mahasiswa: [],
      data_pegawai: [],
    },
  },
  mutations: {
    SET_IS_LOADING_TAG_GROUP(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_TAG_GROUP(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_TAG_GROUP(state, payload) {
      state.reports = payload;
    },
    SET_FORM_TAG_GROUP(state, payload) {
      state.form[payload.key] = payload.value;
    },
  },
  actions: {
    GetAllTagGroup: async (context) => {
      context.commit("SET_IS_LOADING_TAG_GROUP", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tag-group`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });

        context.commit("SET_REPORTS_TAG_GROUP", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_TAG_GROUP", false);
      }
    },
    CreateTagGroup: async (context) => {
      context.commit("SET_IS_LOADING_TAG_GROUP", true);

      try {
        const result = await axios({
          url: `${apiUrl}/tag-group`,
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

        context.state.form = {
          name: "",
          data_mahasiswa: [],
          data_pegawai: [],
        };

        context.dispatch("GetAllTagGroup");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_TAG_GROUP", false);
      }
    },
  },
};

export default tagGroup;
