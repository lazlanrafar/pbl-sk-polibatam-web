import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const pegawai = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 5,
      search: "",
    },
    reports: [],
    report: {},
  },
  mutations: {
    SET_IS_LOADING_PEGAWAI(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_PEGAWAI(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_PEGAWAI(state, payload) {
      state.reports = payload;
    },
    SET_DETAIL_PEGAWAI(state, payload) {
      state.report = payload;
    },
  },
  actions: {
    GetAllPegawai: async (context) => {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/pegawai`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        if (result.data.data === "") {
          return;
        }

        result.data.data.forEach((item, index) => {
          item.NO = index + 1;
        });

        context.commit("SET_REPORTS_PEGAWAI", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PEGAWAI", false);
      }
    },
    GetPegawaiByNIP: async (context, nip) => {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/pegawai/${nip}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        let entries = Object.entries(result.data.data);
        let data = [];
        entries.forEach((item) => {
          data.push({
            key: item[0],
            value: item[1],
          });
        });

        context.commit("SET_DETAIL_PEGAWAI", data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PEGAWAI", false);
      }
    },
  },
};

export default pegawai;
