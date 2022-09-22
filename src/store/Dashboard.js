import axios from "axios";
const apiUrl = process.env.VUE_APP_API_URL;

const dashboard = {
  state: {
    isLoading: false,
    reports: [],
  },
  mutations: {
    SET_LOADING_DASHBOARD(state, payload) {
      state.isLoading = payload;
    },
    SET_REPORTS_DASHBOARD(state, payload) {
      state.reports = payload;
    },
  },
  actions: {
    async FetchDashboard(context) {
      try {
        context.commit("SET_LOADING_DASHBOARD", true);
        const result = await axios({
          url: `${apiUrl}/dashboard`,
          method: "GET",
        });

        context.commit("SET_REPORTS_DASHBOARD", result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        context.commit("SET_LOADING_DASHBOARD", false);
      }
    },
  },
};

export default dashboard;
