import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const userManagement = {
  state: {
    isLoading: false,
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
      state.isLoading = payload;
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
    SET_LIST_PEGAWAI_UM(state, payload) {
      state.list_pegawai = payload;
    },
  },
  actions: {
    GetAllMahasiswa: async (context) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

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
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
    GetAllPegawai: async (context) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user/pegawai`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, index) => {
          item.NO = index + 1;
        });

        context.commit("SET_LIST_PEGAWAI_UM", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
    GetMahasiswaByNIM: async (context, nim) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

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
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
    SetIsAdminMahasiswaUM: async (context, uid) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user/admin`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: {
            uid: uid,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllMahasiswa");
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
    SetIsNotAdminUM: async (context, uid) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/user/admin`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: {
            uid: uid,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllMahasiswa");
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
  },
};

export default userManagement;
