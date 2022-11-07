import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const dokumenTugas = {
  state: {
    isLoading: false,
    optionsTableDokumenTugas: {
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
    jsonImport: "",
  },
  mutations: {
    SET_LOADING_DOKUMEN_TUGAS(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_DOKUMEN_TUGAS(state, payload) {
      state.optionsTableDokumenTugas = Object.assign({}, payload);
    },
    SET_REPORTS_DOKUMEN_TUGAS(state, payload) {
      state.reports = payload;
    },
    SET_LIST_TAG_GROUP_DOKUMEN_TUGAS(state, payload) {
      state.listTagGroup = payload;
    },
    SET_FORM_DOKUMEN_TUGAS(state, payload) {
      state.form[payload.key] = payload.value;
    },
    SET_IS_UPDATE_DOKUMEN_TUGAS(state, payload) {
      state.isUpdate = payload;
    },
    SET_JSON_IMPORT_DOKUMEN_TUGAS(state, payload) {
      state.jsonImport = payload;
    },
  },
  actions: {
    async fetchAllDokumenTugas(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);

        const user = context.rootState.app.user;
        let url = user.isAdmin
          ? `${apiUrl}/surat-tugas`
          : `${apiUrl}/surat-tugas?nim=${user.nim_nik_unit}`;

        const result = await axios({
          url: url,
          method: "GET",
        });

        let data = result.data.data;

        let no = 1;
        for (const iterator of data) {
          iterator.no = no;
          iterator.TagGroup.tag = JSON.parse(iterator.TagGroup.tag);

          no++;
        }
        context.commit("SET_REPORTS_DOKUMEN_TUGAS", data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
    async fetchFormDokumenTugas(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);
        const result = await axios({
          url: `${apiUrl}/tag-group`,
          method: "GET",
        });
        context.commit("SET_LIST_TAG_GROUP_DOKUMEN_TUGAS", result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
    async createDokumenTugas(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);

        let formData = new FormData();
        formData.append("nama", context.state.form.nama);
        formData.append("filePath", context.state.form.filePath);
        formData.append("deskripsi", context.state.form.deskripsi);
        formData.append("tagId", context.state.form.tagId);
        formData.append("createdBy", context.rootState.app.user.nim_nik_unit);

        const result = await axios({
          url: `${apiUrl}/surat-tugas`,
          method: "POST",
          data: formData,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("fetchAllDokumenTugas");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
    async importDokumenTugas(context) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);
        const result = await axios({
          url: `${apiUrl}/surat-tugas/import`,
          method: "POST",
          data: context.state.jsonImport,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("fetchAllDokumenTugas");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
    async setFormDokumenTugas(context, id) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);
        const result = await axios({
          url: `${apiUrl}/surat-tugas/${id}`,
          method: "GET",
        });

        context.commit("SET_FORM_DOKUMEN_TUGAS", {
          key: "nama",
          value: result.data.data.nama,
        });
        context.commit("SET_FORM_DOKUMEN_TUGAS", {
          key: "deskripsi",
          value: result.data.data.deskripsi,
        });
        context.commit("SET_FORM_DOKUMEN_TUGAS", {
          key: "tagId",
          value: result.data.data.TagGroup.id,
        });
        context.commit("SET_FORM_DOKUMEN_TUGAS", {
          key: "createdBy",
          value: result.data.data.createdBy,
        });
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
    async updateDokumenTugas(context, id) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);

        let formData = new FormData();
        formData.append("nama", context.state.form.nama);
        formData.append("deskripsi", context.state.form.deskripsi);
        formData.append("tagId", context.state.form.tagId);
        formData.append("updatedBy", context.rootState.app.user.nim_nik_unit);

        if (context.state.form.filePath) {
          formData.append("filePath", context.state.form.filePath);
        }

        const result = await axios({
          url: `${apiUrl}/surat-tugas/${id}`,
          method: "PUT",
          data: formData,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("fetchAllDokumenTugas");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
    async deleteDokumenTugas(context, id) {
      try {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", true);
        const result = await axios({
          url: `${apiUrl}/surat-tugas/${id}`,
          method: "DELETE",
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("fetchAllDokumenTugas");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DOKUMEN_TUGAS", false);
      }
    },
  },
};

export default dokumenTugas;
