const tagGroup = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    form: {
      name: "",
      data_mahasiswa: [],
      data_pegawai: [],
    },
  },
  mutations: {
    SET_OPTIONS_TABLE_TAG_GROUP(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
    SET_FORM_TAG_GROUP(state, payload) {
      state.form[payload.key] = payload.value;
    },
  },
};

export default tagGroup;
