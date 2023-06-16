import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const suratTugas = {
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
    SET_IS_LOADING_SURAT_TUGAS(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_SURAT_TUGAS(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_SURAT_TUGAS(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    GetAllSuratTugas: async (context) => {
      context.commit("SET_IS_LOADING_SURAT_TUGAS", true);

      try {
        const result = await axios({
          url: `${apiUrl}/document?type=Surat Tugas&year=${context.rootState.app.filter_year}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.no = index + 1;
        });
        context.commit("SET_REPORTS_SURAT_TUGAS", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_SURAT_TUGAS", false);
      }
    },
  },
};

export default suratTugas;
