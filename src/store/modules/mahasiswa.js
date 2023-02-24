import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const mahasiswa = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 5,
      search: "",
    },
    list_prodi: [],
    prodi_active: "",
    reports: [],
    report: {},
  },
  mutations: {
    SET_IS_LOADING_MAHASISWA(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_MAHASISWA(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_LIST_PRODI(state, payload) {
      state.list_prodi = payload;
    },
    SET_PRODI_ACTIVE(state, payload) {
      state.prodi_active = payload;
    },
    SET_REPORTS_MAHASISWA(state, payload) {
      state.reports = payload;
    },
    SET_DETAIL_MAHASISWA(state, payload) {
      state.report = payload;
    },
  },
  actions: {
    GetFilterMahasiswa: async (context) => {
      context.commit("SET_IS_LOADING_MAHASISWA", true);

      try {
        const prodi = await axios({
          url: `${apiUrl}/mahasiswa/prodi`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        if (prodi.data.data === "") {
          return;
        }

        context.commit("SET_LIST_PRODI", prodi.data.data);
        context.commit("SET_PRODI_ACTIVE", prodi.data.data[0].ID);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_MAHASISWA", false);
      }
    },
    GetAllMahasiswa: async (context) => {
      context.commit("SET_IS_LOADING_MAHASISWA", true);

      try {
        const result = await axios({
          url: `${apiUrl}/mahasiswa?prodi=${context.state.prodi_active}`,
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

        context.commit("SET_REPORTS_MAHASISWA", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_MAHASISWA", false);
      }
    },
    GetMahasiswaByNIM: async (context, nim) => {
      context.commit("SET_IS_LOADING_MAHASISWA", true);

      try {
        const result = await axios({
          url: `${apiUrl}/mahasiswa/${nim}`,
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

        context.commit("SET_DETAIL_MAHASISWA", data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_MAHASISWA", false);
      }
    },
  },
};

export default mahasiswa;
