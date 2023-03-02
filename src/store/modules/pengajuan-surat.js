import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const pengajuanSurat = {
  state: {
    isLoading: false,
    list_type: ["SK Honor", "SK Non-Honor", "Perdir"],
    list_lampiran: [
      {
        key: "Ada",
        value: true,
      },
      {
        key: "Tidak Ada",
        value: false,
      },
    ],
    form: {
      title: "",
      type: "",
      is_lampiran: false,
      filepath_lampiran: "",
      pickup_plan: "",
      list_consider: [""],
      list_observe: [""],
      list_decide: [""],
    },
    optionsTable: {
      page: 1,
      itemsPerPage: 5,
      search: "",
    },
    reports: [],
    report: {},
    isUpdate: false,
    form_approve: {
      id_pengajuan: "",
      data_mahasiswa: [],
      data_pegawai: [],
      details: [],
    },
    form_reject: {
      id_pengajuan: "",
      remarks: "",
    },
  },
  mutations: {
    SET_IS_LOADING_PENGAJUAN_SURAT(state, payload) {
      state.isLoading = payload;
    },
    SET_FORM_PENGAJUAN_SURAT(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_PENGAJUAN_SURAT(state) {
      state.form = {
        title: "",
        type: "",
        is_lampiran: false,
        filepath_lampiran: "",
        pickup_plan: "",
        list_consider: [""],
        list_observe: [""],
        list_decide: [""],
      };
    },
    SET_OPTIONS_TABLE_PENGAJUAN_SURAT(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_REPORTS_PENGAJUAN_SURAT(state, payload) {
      state.reports = payload;
    },
    SET_REPORT_PENGAJUAN_SURAT(state, payload) {
      state.report = payload;
    },
    SET_IS_UPDATE_PENGAJUAN_SURAT(state, payload) {
      state.isUpdate = payload;
    },
    SET_FORM_APPROVE_PENGAJUAN_SURAT(state, payload) {
      state.form_approve[payload.key] = payload.value;
    },
    RESET_FORM_APPROVE_PENGAJUAN_SURAT(state) {
      state.form_approve = {
        id_pengajuan: "",
        data_mahasiswa: [],
        data_pegawai: [],
        details: [],
      };
    },
    SET_FORM_REJECT_PENGAJUAN_SURAT(state, payload) {
      state.form_reject[payload.key] = payload.value;
    },
    RESET_FORM_REJECT_PENGAJUAN_SURAT(state) {
      state.form_reject = {
        id_pengajuan: "",
        remarks: "",
      };
    },
  },
  actions: {
    GetAllPengajuan: async (context) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        result.data.data.forEach((item, i) => {
          item.no = i + 1;
        });

        context.commit("SET_REPORTS_PENGAJUAN_SURAT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    GetDetailPengajuan: async (context, id) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_REPORT_PENGAJUAN_SURAT", result.data.data);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    CreatePengajuan: async (context) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);

      try {
        const formData = new FormData();
        const form = context.state.form;

        formData.append("title", form.title);
        formData.append("type", form.type);
        formData.append("is_lampiran", form.is_lampiran);
        formData.append("filepath_lampiran", form.filepath_lampiran);
        formData.append("pickup_plan", form.pickup_plan);
        formData.append("list_consider", JSON.stringify(form.list_consider));
        formData.append("list_observe", JSON.stringify(form.list_observe));
        formData.append("list_decide", JSON.stringify(form.list_decide));

        const result = await axios({
          url: `${apiUrl}/pengajuan`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: formData,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllPengajuan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    SetFormUpdatePengajuan: async (context, id) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.state.form = {
          title: result.data.data.title,
          type: result.data.data.type,
          is_lampiran: result.data.data.is_lampiran,
          filepath_lampiran: "",
          pickup_plan: result.data.data.pickup_plan,
          list_consider: result.data.data.list_consider,
          list_observe: result.data.data.list_observe,
          list_decide: result.data.data.list_decide,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    UpdatePengajuan: async (context, id) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);

      try {
        const formData = new FormData();
        const form = context.state.form;

        formData.append("title", form.title);
        formData.append("type", form.type);
        formData.append("is_lampiran", form.is_lampiran);
        formData.append("filepath_lampiran", form.filepath_lampiran);
        formData.append("pickup_plan", form.pickup_plan);
        formData.append("list_consider", JSON.stringify(form.list_consider));
        formData.append("list_observe", JSON.stringify(form.list_observe));
        formData.append("list_decide", JSON.stringify(form.list_decide));

        const result = await axios({
          url: `${apiUrl}/pengajuan/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: formData,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllPengajuan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    DeletePengajuan: async (context, id) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllPengajuan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    ApprovePengajuan: async (context) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan/approve`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_approve,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllPengajuan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    RejectPengajuan: async (context) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan/reject`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: context.state.form_reject,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });

        context.dispatch("GetAllPengajuan");
        return true;
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
  },
};

export default pengajuanSurat;
