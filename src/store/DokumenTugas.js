const dokumenTugas = {
  state: {
    isLoading: false,
    optionsTableDokumenTugas: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
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
  },
  actions: {},
};

export default dokumenTugas;
