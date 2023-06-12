import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";
import moment from "moment";

const form = {
  type: "",
  date: moment().format("YYYY-MM-DD"),
  filepath: "",
  name: "",
  remarks: "",
  data_pegawai: [],
  details: [],
};

const document = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    form: { ...form },
    detail: "",
    isUpdate: "",
  },
  mutations: {
    SET_IS_LOADING_DOCUMENT(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_DOCUMENT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_FORM_DOCUMENT(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_DOCUMENT(state) {
      state.form = { ...form };
    },
    SET_DETAIL_DOCUMENT(state, payload) {
      state.detail = payload;
    },
    SET_IS_UPDATE_DOCUMENT(state, payload) {
      state.isUpdate = payload;
    },
  },
  actions: {
    CreateDocument: async (context) => {
      context.commit("SET_IS_LOADING_DOCUMENT", true);

      try {
        const payload = context.state.form;
        payload.data_pegawai = JSON.stringify(payload.data_pegawai);

        const result = await axios({
          url: `${apiUrl}/document`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
            "Content-Type": "multipart/form-data",
          },
          data: payload,
        });

        Swal.fire({
          title: "Success",
          text: result.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        context.dispatch("GetAllSuratKeterangan");
        context.dispatch("GetAllSuratTugas");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        context.commit("SET_IS_LOADING_DOCUMENT", false);
      }
    },
    GetDetailDocument: async (context, id) => {
      context.commit("SET_IS_LOADING_DOCUMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/document/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_DETAIL_DOCUMENT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DOCUMENT", false);
      }
    },
    SetFormDocumentUpdate: async (context, id) => {
      context.commit("SET_IS_LOADING_DOCUMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/document/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        let data_tag_group = [];
        result.data.data.details.forEach((item) => {
          delete item.data_pegawai;
          data_tag_group.push(item.tag_group);
        });

        context.state.form = {
          type: result.data.data.type,
          filepath: "",
          name: result.data.data.name,
          date: moment(result.data.data.date).format("YYYY-MM-DD"),
          remarks: result.data.data.remarks,
          data_pegawai: result.data.data.data_pegawai,
          details: data_tag_group,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_DOCUMENT", false);
      }
    },
    UpdateDocument: async (context, id) => {
      context.commit("SET_IS_LOADING_DOCUMENT", true);

      try {
        const payload = context.state.form;
        payload.data_pegawai = JSON.stringify(payload.data_pegawai);

        const result = await axios({
          url: `${apiUrl}/document/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
            "Content-Type": "multipart/form-data",
          },
          data: payload,
        });

        Swal.fire({
          title: "Success",
          text: result.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        context.dispatch("GetAllSuratKeterangan");
        context.dispatch("GetAllSuratTugas");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        context.commit("SET_IS_LOADING_DOCUMENT", false);
      }
    },
    DeleteDocument: async (context, id) => {
      context.commit("SET_IS_LOADING_DOCUMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/document/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        Swal.fire({
          title: "Success",
          text: result.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

        context.dispatch("GetAllSuratKeterangan");
        context.dispatch("GetAllSuratTugas");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          title: "Error",
          text: error.response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        context.commit("SET_IS_LOADING_DOCUMENT", false);
      }
    },
  },
};

export default document;
