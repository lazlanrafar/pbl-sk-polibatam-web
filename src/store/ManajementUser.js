import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

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
    dataMahasiswaDetail: {},
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
    SET_DATA_MAHASISWA_DETAIL(state, payload) {
      state.dataMahasiswaDetail = payload;
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
    async getMahasiswaByNIM(context, nim) {
      try {
        context.commit("SET_LOADING_MANAJEMEN_USER", true);
        const result = await axios({
          url: `${apiUrl}/polibatam/mahasiswa/${nim}`,
          method: "GET",
        });
        let entries = Object.entries(result.data.data);
        let data = [];
        entries.forEach((item) => {
          data.push({
            key: item[0],
            value: item[1],
          });
        });

        context.commit("SET_DATA_MAHASISWA_DETAIL", data);
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
    async setAdminByNIM(context, nim) {
      try {
        context.commit("SET_LOADING_MANAJEMEN_USER", true);
        const result = await axios({
          url: `${apiUrl}/polibatam/setAdmin/${nim}`,
          method: "POST",
        });
        context.dispatch("getAllMahasiswa");
        context.dispatch("getAllDosen");

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_LOADING_MANAJEMEN_USER", false);
      }
    },
    async unsetAdminByNIM(context, nim) {
      try {
        context.commit("SET_LOADING_MANAJEMEN_USER", true);
        const result = await axios({
          url: `${apiUrl}/polibatam/unsetAdmin/${nim}`,
          method: "DELETE",
        });
        context.dispatch("getAllMahasiswa");
        context.dispatch("getAllDosen");

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_LOADING_MANAJEMEN_USER", false);
      }
    },
  },
};

export default manajemenUser;
