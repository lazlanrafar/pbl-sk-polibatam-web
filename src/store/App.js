import axios from "axios";
import Swal from "sweetalert2";
const apiUrl = process.env.VUE_APP_API_URL;
import router from "@/router";

const app = {
  state: {
    isLogin: false,
    login: {
      username: "azlan.3312101024",
      password: "Kertayasam4",
    },
  },
  mutations: {
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload;
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

        if (result.data.status === 200) {
          context.commit("SET_IS_LOGIN", true);
          localStorage.setItem("user", JSON.stringify(result.data.data));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.data.message,
          });
        }

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
