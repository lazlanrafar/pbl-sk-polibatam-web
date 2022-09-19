import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const dokumenKeputusan = {
  state: {
    isLoading: false,
    optionsTableDokumenKeputusan: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
    listTagGroup: [],
    form: {
      nama: "",
      filePath: "",
      deskripsi: "",
      tagId: "",
      createdBy: "",
    },
    isUpdate: false,
  },
  mutations: {
    SET_LOADING_DOKUMEN_KEPUTUSAN(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_DOKUMEN_KEPUTUSAN(state, payload) {
      state.optionsTableDokumenKeputusan = Object.assign({}, payload);
    },
    SET_REPORTS_DOKUMEN_KEPUTUSAN(state, payload) {
      state.reports = payload;
    },
    SET_LIST_TAG_GROUP_DOKUMEN_KEPUTUSAN(state, payload) {
      state.listTagGroup = payload;
    },
    SET_FORM_DOKUMEN_KEPUTUSAN(state, payload) {
      state.form[payload.key] = payload.value;
    },
    SET_IS_UPDATE_DOKUMEN_KEPUTUSAN(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    async fetchAllDokumenKeputusan(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_KEPUTUSAN", true);
        const result = await axios({
          url: `${apiUrl}/surat-keputusan`,
          method: "GET",
        });

        let data = result.data.data;
        for (const iterator of data) {
          iterator.TagGroup.tag = JSON.parse(iterator.TagGroup.tag);
        }
        context.commit("SET_REPORTS_DOKUMEN_KEPUTUSAN", data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_KEPUTUSAN", false);
      }
    },
    async fetchFormDokumenKeputusan(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_KEPUTUSAN", true);
        const result = await axios({
          url: `${apiUrl}/tag-group`,
          method: "GET",
        });
        context.commit(
          "SET_LIST_TAG_GROUP_DOKUMEN_KEPUTUSAN",
          result.data.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_KEPUTUSAN", false);
      }
    },
    async createDokumenKeputusan(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_KEPUTUSAN", true);

        let formData = new FormData();
        formData.append("nama", context.state.form.nama);
        formData.append("filePath", context.state.form.filePath);
        formData.append("deskripsi", context.state.form.deskripsi);
        formData.append("tagId", context.state.form.tagId);
        formData.append("createdBy", context.rootState.app.user.nim_nik_unit);

        const result = await axios({
          url: `${apiUrl}/surat-keputusan`,
          method: "POST",
          data: formData,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("fetchAllDokumenKeputusan");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_KEPUTUSAN", false);
      }
    },
  },
};

export default dokumenKeputusan;
