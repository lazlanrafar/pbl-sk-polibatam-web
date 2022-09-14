import axios from "axios";
import Swal from "sweetalert2";
const apiUrl = process.env.VUE_APP_API_URL;
import router from "@/router";

const app = {
  state: {
    user: "",
    login: {
      username: "azlan.3312101024",
      password: "Kertayasam4",
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_FORM_LOGIN(state, payload) {
      state.login[payload.key] = payload.value;
    },
  },
  actions: {
    async Login(context) {
      try {
        const result = await axios({
          url: `${apiUrl}/polibatam/login`,
          method: "POST",
          data: context.state.login,
        });

        context.commit("SET_USER", result.data.data);
        localStorage.setItem("user", JSON.stringify(result.data.data));

        router.push("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    },
  },
};

export default app;
