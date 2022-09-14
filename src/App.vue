<template>
  <div>
    <div>
      <app-topbar v-if="isLogin" />
      <app-sidebar v-if="isLogin" />

      <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
          <div class="content-header row"></div>
          <div class="content-body">
            <v-app v-if="isLogin">
              <router-view />
            </v-app>
            <router-view v-else />
          </div>
        </div>
      </div>

      <div class="sidenav-overlay"></div>
      <div class="drag-target"></div>
      <app-footer v-if="isLogin" />
    </div>
  </div>
</template>

<script>
import AppFooter from "./components/app/appFooter.vue";
import AppSidebar from "./components/app/appSidebar.vue";
import AppTopbar from "./components/app/appTopbar.vue";
export default {
  name: "App",
  components: { AppSidebar, AppTopbar, AppFooter },
  data: () => ({}),
  computed: {
    isLogin() {
      return this.$store.state.app.isLogin;
    },
  },
};
</script>

<style>
.v-application--wrap {
  background: transparent;
  min-height: 0;
}
</style>
