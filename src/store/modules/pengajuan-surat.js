import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";
import moment from "moment/moment";

const form = {
  title: "",
  type: "",
  is_lampiran: false,
  filepath_lampiran: "",
  pickup_plan: moment().format("YYYY-MM-DD"),
  list_consider: [""],
  list_observe: [""],
  list_decide: [""],
  details: [],
  data_pegawai: [],
};

const form_publish = {
  type: "",
  date: moment().format("YYYY-MM-DD"),
  filepath: "",
  name: "",
  remarks: "",
  data_pegawai: [],
  details: [],
};

const pengajuanSurat = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 5,
      search: "",
    },
    list_type: ["SK Honor", "SK Non-Honor", "Perdir"],
    list_lampiran: [
      { key: "Ada", value: true },
      { key: "Tidak Ada", value: false },
    ],
    reports: [],
    report: {},
    form: { ...form },
    form_approve: { id_pengajuan: "", remarks: "" },
    form_reject: { id_pengajuan: "", remarks: "" },
    form_publish: { ...form_publish },
    isUpdate: false,
  },
  mutations: {
    SET_IS_LOADING_PENGAJUAN_SURAT(state, payload) {
      state.isLoading = payload;
    },
    SET_FORM_PENGAJUAN_SURAT(state, payload) {
      state.form[payload.key] = payload.value;
    },
    RESET_FORM_PENGAJUAN_SURAT(state) {
      state.form = { ...form };
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
      state.form_approve = { id_pengajuan: "", remarks: "" };
    },
    SET_FORM_REJECT_PENGAJUAN_SURAT(state, payload) {
      state.form_reject[payload.key] = payload.value;
    },
    RESET_FORM_REJECT_PENGAJUAN_SURAT(state) {
      state.form_reject = { id_pengajuan: "", remarks: "" };
    },
    SET_FORM_PUBLISH_PENGAJUAN_SURAT(state, payload) {
      state.form_publish[payload.key] = payload.value;
    },
    RESET_FORM_PUBLISH_PENGAJUAN_SURAT(state) {
      state.form_publish = { ...form_publish };
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
        formData.append("details", JSON.stringify(form.details));
        formData.append("data_pegawai", JSON.stringify(form.data_pegawai));

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

        let data_tag_group = [];
        result.data.data.details.forEach((item) => {
          delete item.data_pegawai;
          data_tag_group.push(item.tag_group);
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
          data_pegawai: result.data.data.data_pegawai,
          details: data_tag_group,
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
        formData.append("details", JSON.stringify(form.details));
        formData.append("data_pegawai", JSON.stringify(form.data_pegawai));

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
    SetFormPengajuanPublish: async (context, id) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/pengajuan/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        const data = result.data.data;

        let details = [];
        data.details.forEach((item) => {
          delete item.tag_group.data_pegawai;
          details.push({
            ...item.tag_group,
          });
        });

        context.state.form_publish = {
          type: "Surat Keterangan",
          date: moment().format("YYYY-MM-DD"),
          filepath: "",
          name: "",
          remarks: data.title,
          data_pegawai: data.data_pegawai,
          details: details,
        };
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", false);
      }
    },
    PublishPengajuan: async (context, id) => {
      context.commit("SET_IS_LOADING_PENGAJUAN_SURAT", true);
      try {
        const payload = context.state.form_publish;
        payload.data_pegawai = JSON.stringify(payload.data_pegawai);

        const result = await axios({
          url: `${apiUrl}/pengajuan/publish/${id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
            "Content-Type": "multipart/form-data",
          },
          data: payload,
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
