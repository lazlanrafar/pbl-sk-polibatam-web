<template>
  <div>
    <AppLayout v-if="token" />
    <AuthLayout v-else />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    AppLayout: () => import("@/layouts/layout-app.vue"),
    AuthLayout: () => import("@/layouts/layout-auth.vue"),
  },
  data: () => ({
    token: true,
  }),
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
