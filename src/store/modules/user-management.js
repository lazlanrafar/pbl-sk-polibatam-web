import axios from "axios";
import catchUnauthorized from "../../utils/catch-unauthorized";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

const userManagement = {
  state: {
    isLoading: false,
  },
  mutations: {
    SET_IS_LOADING_USER_MANAGEMENT(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    SetIsAdminUM: async (context, uid) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);

      try {
        const result = await axios({
          url: `${apiUrl}/admin`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: {
            uid: uid,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
    SetIsNotAdminUM: async (context, uid) => {
      context.commit("SET_IS_LOADING_USER_MANAGEMENT", true);
      try {
        const result = await axios({
          url: `${apiUrl}/admin`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${context.rootState.app.token}`,
          },
          data: {
            uid: uid,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: result.data.message,
        });
      } catch (error) {
        catchUnauthorized(error);

        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.response.data.message,
        });
      } finally {
        context.commit("SET_IS_LOADING_USER_MANAGEMENT", false);
      }
    },
  },
};

export default userManagement;
