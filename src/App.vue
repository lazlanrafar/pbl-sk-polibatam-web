<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // AppLayout: () => import("@/layouts/layout-app.vue"),
    // AuthLayout: () => import("@/layouts/layout-auth.vue"),
  },
  computed: {
    token() {
      return this.$store.state.app.token;
    },
  },
  created() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      this.$store.commit("SET_TOKEN_APP", token);
      this.$store.commit("SET_USER_APP", JSON.parse(user));
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
