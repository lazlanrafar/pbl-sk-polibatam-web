<template>
  <div>
    <div v-if="user">
      <app-topbar />
      <app-sidebar />

      <div class="content-wrapper">
        <v-app>
          <!-- <router-view /> -->
        </v-app>
      </div>

      <app-footer />
    </div>
    <Login v-else />
  </div>
</template>

<script>
import AppFooter from "./components/app/appFooter.vue";
import AppSidebar from "./components/app/appSidebar.vue";
import AppTopbar from "./components/app/appTopbar.vue";
import Login from "./views/Auth/Login.vue";
export default {
  name: "App",
  components: { AppSidebar, AppTopbar, AppFooter, Login },
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  watch: {
    user() {
      if (this.user) {
        document.body.classList.remove("login-page");
        document.body.classList.remove("hold-transition");
      }
    },
  },
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$store.commit("SET_USER", JSON.parse(user));
    }
  },
};
</script>

<style>
.v-application--wrap,
.theme--light.v-application {
  background: transparent;
  min-height: 0;
  font-family: "Poppins", sans-serif;
}
label {
  font-weight: normal !important;
}
</style>
