import axios from "axios";
import Swal from "sweetalert2";
const apiUrl = process.env.VUE_APP_API_URL;
import router from "../../routes/index";

const app = {
  state: {
    isLoading: false,
    login: {
      username: "",
      password: "",
    },
    user: "",
    token: "",
  },
  mutations: {
    SET_IS_LOADING_APP(state, payload) {
      state.isLoading = payload;
    },
    SET_FORM_LOGIN_APP(state, payload) {
      state.login[payload.key] = payload.value;
    },
    SET_USER_APP(state, payload) {
      state.user = payload;
    },
    SET_TOKEN_APP(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async Login(context) {
      context.commit("SET_IS_LOADING_APP", true);

      try {
        const result = await axios({
          url: `${apiUrl}/login`,
          method: "POST",
          data: context.state.login,
        });

        context.commit("SET_USER_APP", result.data.data.user);
        localStorage.setItem("user", JSON.stringify(result.data.data.user));

        context.commit("SET_TOKEN_APP", result.data.data.token);
        localStorage.setItem("token", result.data.data.token);

        context.state.login = {
          username: "",
          password: "",
        };

        router.push("/");

        return true;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_APP", false);
      }
    },
  },
};

export default app;
