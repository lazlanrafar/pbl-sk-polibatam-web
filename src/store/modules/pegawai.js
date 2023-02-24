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
    list_unit: [],
    unit_active: "",
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
    SET_LIST_UNIT(state, payload) {
      state.list_unit = payload;
    },
    SET_UNIT_ACTIVE(state, payload) {
      state.unit_active = payload;
    },
    SET_REPORTS_PEGAWAI(state, payload) {
      state.reports = payload;
    },
    SET_DETAIL_PEGAWAI(state, payload) {
      state.report = payload;
    },
  },
  actions: {
    GetFilterPegawai: async (context) => {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const unit = await axios({
          url: `${apiUrl}/pegawai/unit`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        if (unit.data.data === "") {
          return;
        }

        context.commit("SET_LIST_UNIT", unit.data.data);
        context.commit("SET_UNIT_ACTIVE", unit.data.data[0].ID);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PEGAWAI", false);
      }
    },
    GetAllPegawai: async (context) => {
      context.commit("SET_IS_LOADING_PEGAWAI", true);

      try {
        const result = await axios({
          url: `${apiUrl}/pegawai?unit=${context.state.unit_active}`,
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
