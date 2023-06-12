<template>
  <v-app>
    <AppTopbar />
    <v-main class="container mt-5 mt-md-10 px-3">
      <slot />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  name: "AppLayout",
  components: {
    AppTopbar: () => import("@/components/app/topbar/index.vue"),
    AppFooter: () => import("@/components/app/footer/index.vue"),
  },
  computed: {
    token() {
      return this.$store.state.app.token;
    },
  },
  created() {
    if (!this.token) {
      // reload
      window.location.reload();
    }
  },
};
</script>
