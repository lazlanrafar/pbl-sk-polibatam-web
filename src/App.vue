<template>
  <div class="wrapper">
    <app-topbar v-if="user" />
    <app-sidebar v-if="user" />

    <div class="content-wrapper">
      <v-app v-if="user">
        <router-view />
      </v-app>

      <Login v-else />
    </div>

    <app-footer v-if="user" />
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
  created() {
    const user = localStorage.getItem("user");
    if (user) {
      this.$store.commit("SET_USER", JSON.parse(user));
    }
  },
};
</script>

<style>
.v-application--wrap {
  background: transparent;
  min-height: 0;
}
</style>
