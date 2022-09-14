import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

const manajemenUser = {
  state: {
    isLoading: false,
    /**
     * Data Mahasiswa
     */
    optionsTableMahasiswa: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    dataMahasiswa: [],
    /**
     * Data Dosen
     */
    optionsTableDosen: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    dataDosen: [],
  },
  mutations: {
    SET_LOADING_MANAJEMEN_USER(state, payload) {
      state.isLoading = payload;
    },
    /**
     * Data Mahasiswa
     */
    SET_OPTIONS_TABLE_MAHASISWA(state, payload) {
      state.optionsTableMahasiswa = Object.assign({}, payload);
    },
    SET_DATA_MAHASISWA(state, payload) {
      state.dataMahasiswa = payload;
    },
    /**
     * Data Dosen
     */
    SET_OPTIONS_TABLE_DOSEN(state, payload) {
      state.optionsTableDosen = Object.assign({}, payload);
    },
    SET_DATA_DOSEN(state, payload) {
      state.dataDosen = payload;
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
    async getAllDosen(context) {
      try {
        context.commit("SET_LOADING_MANAJEMEN_USER", true);
        const result = await axios({
          url: `${apiUrl}/polibatam/dosen`,
          method: "GET",
        });
        context.commit("SET_DATA_DOSEN", result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_MANAJEMEN_USER", false);
      }
    },
  },
};

export default manajemenUser;
