import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const document = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    form: {
      type: "",
      filepath: "",
      name: "",
      remarks: "",
      data_mahasiswa: [],
      data_pegawai: [],
      details: [],
    },
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
  },
  actions: {
    CreateDocument: async (context) => {
      context.commit("SET_IS_LOADING_DOCUMENT", true);

      try {
        const dataForm = new FormData();
        dataForm.append("type", context.state.form.type);
        dataForm.append("filepath", context.state.form.filepath);
        dataForm.append("name", context.state.form.name);
        dataForm.append("remarks", context.state.form.remarks);
        dataForm.append(
          "data_mahasiswa",
          JSON.stringify(context.state.form.data_mahasiswa)
        );
        dataForm.append(
          "data_pegawai",
          JSON.stringify(context.state.form.data_pegawai)
        );
        dataForm.append("details", JSON.stringify(context.state.form.details));

        const result = await axios({
          url: `${apiUrl}/document`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: dataForm,
        });

        Swal.fire({
          title: "Success",
          text: result.data.message,
          icon: "success",
          confirmButtonText: "OK",
        });

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
