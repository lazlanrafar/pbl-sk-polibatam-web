import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;
// import Swal from "sweetalert2";

const dokumenKeputusan = {
  state: {
    isLoading: false,
    optionsTableDokumenKeputusan: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
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
  },
};

export default dokumenKeputusan;
