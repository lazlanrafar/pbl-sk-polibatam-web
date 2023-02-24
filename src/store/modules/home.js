import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;

const home = {
  state: {
    isLoading: false,
    length_sk: 0,
    length_st: 0,
    recent: [],
  },
  mutations: {
    SET_IS_LOADING_HOME(state, payload) {
      state.isLoading = payload;
    },
    SET_LENGTH_SK(state, payload) {
      state.length_sk = payload;
    },
    SET_LENGTH_ST(state, payload) {
      state.length_st = payload;
    },
    SET_RECENT(state, payload) {
      state.recent = payload;
    },
  },
  actions: {
    GetHome: async (context) => {
      context.commit("SET_IS_LOADING_HOME", true);

      try {
        const result = await axios({
          url: `${apiUrl}/dashboard`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
        });

        context.commit("SET_LENGTH_SK", result.data.data.length_sk);
        context.commit("SET_LENGTH_ST", result.data.data.length_st);
        context.commit("SET_RECENT", result.data.data.recent);
      } catch (error) {
        catchUnauthorized(error);
      } finally {
        context.commit("SET_IS_LOADING_HOME", false);
      }
    },
  },
};

export default home;
