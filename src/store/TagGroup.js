import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

const tagGroup = {
  state: {
    isLoading: false,
    optionsTableTagGroup: {
      page: 1,
      itemsPerPage: 10,
      search: "",
    },
    reports: [],
  },
  mutations: {
    SET_LOADING_TAG_GROUP(state, payload) {
      state.isLoading = payload;
    },
    SET_OPTIONS_TABLE_TAG_GROUP(state, payload) {
      state.optionsTableTagGroup = Object.assign({}, payload);
    },
    SET_REPORTS_TAG_GROUPS(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    async fetchAllTagGroup(context) {
      try {
        context.commit("SET_LOADING_TAG_GROUP", true);
        const result = await axios({
          url: `${apiUrl}/tag-group`,
          method: "GET",
        });
        context.commit("SET_REPORTS_TAG_GROUPS", result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_TAG_GROUP", false);
      }
    },
  },
};

export default tagGroup;
