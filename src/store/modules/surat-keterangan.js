import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const suratKeterangan = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
  },
  mutations: {
    SET_IS_LOADING_SURAT_KETERANGAN(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_SURAT_KETERANGAN(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_SURAT_KETERANGAN(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    GetAllSuratKeterangan: async (context) => {
      context.commit("SET_IS_LOADING_SURAT_KETERANGAN", true);

      try {
        const result = await axios({
          url: `${apiUrl}/document?type=Surat Keputusan&year=${context.rootState.app.filter_year}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });
        context.commit("SET_REPORTS_SURAT_KETERANGAN", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SURAT_KETERANGAN", false);
      }
    },
  },
};

export default suratKeterangan;
