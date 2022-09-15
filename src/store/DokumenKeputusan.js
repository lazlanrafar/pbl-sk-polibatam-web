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
  actions: {},
};

export default dokumenKeputusan;
