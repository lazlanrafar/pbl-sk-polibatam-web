const history = {
  state: {
    isLoading: false,
    optionsTable: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
  },
  mutations: {
    SET_OPTIONS_TABLE_HISTORY(state, payload) {
      state.optionsTable = Object.assign({}, payload);
    },
  },
};

export default history;
