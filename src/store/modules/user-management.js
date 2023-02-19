import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const userManagement = {
  state: {
    isLoading: {
      mahasiswa: false,
      pegawai: false,
    },
    optionsTableMahasiswa: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    optionsTablePegawai: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    list_mahasiswa: [],
    detail_mahasiswa: "",
    list_pegawai: [],
  },
  mutations: {
    SET_IS_LOADING_USER_MANAGEMENT(state, payload) {
      state.isLoading[payload.key] = payload.value;
    },
    SET_OPTIONS_TABLE_MAHASISWA_UM(state, payload) {
      state.optionsTableMahasiswa = Object.assign({}, payload);
    },
    SET_OPTIONS_TABLE_PEGAWAI_USER_MANAGAMENT(state, payload) {
      state.optionsTablePegawai = Object.assign({}, payload);
    },
    SET_LIST_MAHASISWA_UM(state, payload) {
      state.list_mahasiswa = payload;
    },
    SET_DETAIL_MAHASISWA_UM(state, payload) {
      state.detail_mahasiswa = payload;
    },
  },
  actions: {
    GetAllMahasiswa: async (context) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
        key: "mahasiswa",
        value: true,
      });

      try {
        const result = await axios({
          url: `${apiUrl}/user/mahasiswa`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.NO = index + 1;
        });

        context.commit("SET_LIST_MAHASISWA_UM", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
          key: "mahasiswa",
          value: false,
        });
      }
    },
    GetMahasiswaByNIM: async (context, nim) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
        key: "mahasiswa",
        value: true,
      });

      try {
        const result = await axios({
          url: `${apiUrl}/user/mahasiswa/${nim}`,
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

        context.commit("SET_DETAIL_MAHASISWA_UM", data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", {
          key: "mahasiswa",
          value: false,
        });
      }
    },
  },
};

export default userManagement;
