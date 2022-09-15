<template>
  <div
    class="main-menu menu-fixed menu-light menu-accordion menu-shadow"
    data-scroll-to-active="true"
    style="z-index: 200"
  >
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto">
          <a class="navbar-brand" href="#">
            <img src="@/assets/logo.svg" alt="Logo" width="45" />
            <h2 class="brand-text mb-0">Vuexy</h2>
          </a>
        </li>
        <li class="nav-item nav-toggle">
          <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"
            ><i
              class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"
            ></i
            ><i
              class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary"
              data-ticon="icon-disc"
            ></i
          ></a>
        </li>
      </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
      <ul
        class="navigation navigation-main"
        id="main-menu-navigation"
        data-menu="menu-navigation"
      >
        <li
          :class="tabActive == item.name ? 'nav-item active' : 'nav-item'"
          v-for="(item, i) in listSidebar"
          :key="i"
        >
          <router-link :to="item.link" @click="tabActive = item.name">
            <i :class="item.icon"></i>
            <span class="menu-title">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  computed: {
    tabActive() {
      return this.$route.name;
    },
  },
  data() {
    return {
      listSidebar: [
        {
          name: "Home",
          icon: "feather icon-home",
          link: "/",
        },
        {
          name: "Document Tugas",
          icon: "feather icon-book",
          link: "/document-tugas",
        },
        {
          name: "Keputusan",
          icon: "feather icon-mail",
          link: "/document-keputusan",
        },
        {
          name: "Tag Group",
          icon: "feather icon-shopping-bag",
          link: "/tag-group",
        },
        {
          name: "Manajemen User",
          icon: "feather icon-users",
          link: "/user",
        },
      ],
    };
  },
};
</script>

<style scoped>
.menu-title {
  font-size: 1rem;
}
</style>
