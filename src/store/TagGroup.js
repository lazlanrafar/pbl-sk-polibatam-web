import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const tagGroup = {
  state: {
    isLoading: false,
    optionsTableTagGroup: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    listMahasiswa: [],
    form: {
      nama: "",
      tag: "",
      createdBy: "",
    },
    isUpdate: false,
  },
  mutations: {
    SET_LOADING_TAG_GROUP(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_TAG_GROUP(state, payload) {
      state.optionsTableTagGroup = Object.assign({}, payload);
    },
    SET_REPORTS_TAG_GROUPS(state, payload) {
      state.reports = payload;
    },
    SET_LIST_MAHASISWA_TAG_GROUP(state, payload) {
      state.listMahasiswa = payload;
    },
    SET_FORM_TAG_GROUP(state, payload) {
      state.form[payload.key] = payload.value;
    },
    SET_IS_UPDATE_TAG_GROUP(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async fetchAllTagGroup(context) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);
        const result = await axios({
          url: `${apiUrl}/tag-group`,
          method: "GET",
        });

        let data = [];
        for (const iterator of result.data.data) {
          data.push({
            ...iterator,
            tag: JSON.parse(iterator.tag),
          });
        }
        context.commit("SET_REPORTS_TAG_GROUPS", data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
    async fetchBeforeForm(context) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);
        const result = await axios({
          url: `${apiUrl}/polibatam/mahasiswa`,
          method: "GET",
        });
        context.commit("SET_LIST_MAHASISWA_TAG_GROUP", result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
    async createTagGroup(context) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);

        const payload = {
          nama: context.state.form.nama,
          tag: JSON.stringify(context.state.form.tag),
          createdBy: context.rootState.app.user.nim_nik_unit,
        };

        await axios({
          url: `${apiUrl}/tag-group`,
          method: "POST",
          data: payload,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil disimpan",
        });
        context.dispatch("fetchAllTagGroup");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
    async setFormTagGroup(context, id) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);
        const result = await axios({
          url: `${apiUrl}/tag-group/${id}`,
          method: "GET",
        });

        context.commit("SET_FORM_TAG_GROUP", {
          key: "nama",
          value: result.data.data.nama,
        });
        context.commit("SET_FORM_TAG_GROUP", {
          key: "tag",
          value: JSON.parse(result.data.data.tag),
        });
        context.commit("SET_FORM_TAG_GROUP", {
          key: "createdBy",
          value: result.data.data.createdBy,
        });
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
    async updateTagGroup(context, id) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);

        const payload = {
          ...context.state.form,
          tag: JSON.stringify(context.state.form.tag),
        };

        await axios({
          url: `${apiUrl}/tag-group/${id}`,
          method: "PUT",
          data: payload,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diubah",
        });
        context.dispatch("fetchAllTagGroup");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
    async deleteTagGroup(context, id) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);
        await axios({
          url: `${apiUrl}/tag-group/${id}`,
          method: "DELETE",
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus",
        });
        context.dispatch("fetchAllTagGroup");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
  },
};

export default tagGroup;
