<template>
  <div>
    <app-topbar />
    <app-sidebar />

    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-header row"></div>
        <div class="content-body">
          <v-app></v-app>
        </div>
      </div>
    </div>

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from "./components/app/appFooter.vue";
import AppSidebar from "./components/app/appSidebar.vue";
import AppTopbar from "./components/app/appTopbar.vue";
export default {
  name: "App",
  components: { AppSidebar, AppTopbar, AppFooter },
  data: () => ({
    //
  }),
};
</script>

<style>
.v-application--wrap {
  background: transparent;
  min-height: 0;
}
</style>
