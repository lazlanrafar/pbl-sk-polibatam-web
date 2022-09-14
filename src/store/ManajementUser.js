import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

const manajemenUser = {
  state: {
    isLoading: false,
    optionsTableMahasiswa: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    dataMahasiswa: [],
  },
  mutations: {
    SET_LOADING_MANAJEMEN_USER(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_MAHASISWA(state, payload) {
      state.optionsTableMahasiswa = Object.assign({}, payload);
    },
    SET_DATA_MAHASISWA(state, payload) {
      state.dataMahasiswa = payload;
    },
  },
  actions: {
    async getAllMahasiswa(context) {
      try {
        context.commit("SET_LOADING_MANAJEMEN_USER", true);
        const result = await axios({
          url: `${apiUrl}/polibatam/mahasiswa`,
          method: "GET",
        });
        context.commit("SET_DATA_MAHASISWA", result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_MANAJEMEN_USER", false);
      }
    },
  },
};

export default manajemenUser;
