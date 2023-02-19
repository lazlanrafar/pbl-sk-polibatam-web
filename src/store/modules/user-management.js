import axios from "axios";
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
    list_pegawai: [],
  },
  mutations: {
    SET_IS_LOADING_USER_MANAGEMENT(state, payload) {
      state.isLoading[payload.key] = payload.value;
    },
    SET_OPTIONS_TABLE_MAHASISWA_USER_MANAGAMENT(state, payload) {
      state.optionsTableMahasiswa = Object.assign({}, payload);
    },
    SET_OPTIONS_TABLE_PEGAWAI_USER_MANAGAMENT(state, payload) {
      state.optionsTablePegawai = Object.assign({}, payload);
    },
    SET_LIST_MAHASISWA_USER_MANAGEMENT(state, payload) {
      state.list_mahasiswa = payload;
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

        context.commit("SET_LIST_MAHASISWA_USER_MANAGEMENT", result.data.data);
      } catch (error) {
        console.log(error);
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
