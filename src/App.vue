<template>
  <div>
    <div>
      <app-topbar v-if="user" />
      <app-sidebar v-if="user" />

      <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
          <div class="content-header row"></div>
          <div class="content-body">
            <router-view v-if="user" />

            <Login v-else />
          </div>
        </div>
      </div>

      <div class="sidenav-overlay"></div>
      <div class="drag-target"></div>
      <app-footer v-if="user" />
    </div>
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
  data: () => ({}),
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  watch: {
    user() {
      if (this.user) {
        document.body.classList.remove("blank-page");
        document.body.classList.remove("blank-page");
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

<style></style>
