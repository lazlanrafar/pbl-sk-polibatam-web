<template>
  <div class="">
    <Header />
    <Navigation />
  </div>
</template>

<script>
export default {
  name: "AppTopbar",
  components: {
    Header: () => import("./topbar-header.vue"),
    Navigation: () => import("./topbar-navigation.vue"),
  },
  data() {
    return {
      //
    };
  },
};
</script>
