<template>
  <div>
    <!-- <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <router-link to="/" class="brand-link">
        <img
          src="@/assets/logo.svg"
          alt="Logo"
          class="brand-image"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">SK TUGAS</span>
      </router-link>

      <div class="sidebar">
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li
              class="nav-item"
              v-for="(item, index) in listSidebar"
              :key="index"
            >
              <router-link
                :to="item.link"
                :class="tabActive == item.name ? 'nav-link active' : 'nav-link'"
              >
                <i :class="item.icon"></i>
                <p>{{ item.name }}</p>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </aside> -->
    <div
      class="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
      data-scroll-to-active="true"
    >
      <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item mr-auto">
            <router-link class="navbar-brand" to="/">
              <div class="brand-logo"></div>
              <h2 class="brand-text mb-0">Vuexy</h2>
            </router-link>
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
            :class="tabActive == 'Dashboard' ? 'nav-item active' : 'nav-item'"
          >
            <router-link to="/">
              <i class="feather icon-home"></i>
              <span class="menu-title" data-i18n="Email">Dashboard</span>
            </router-link>
          </li>
          <li class="navigation-header"><span>Apps</span></li>
          <li
            v-for="(item, index) in listSidebar"
            :key="index"
            :class="tabActive == item.name ? 'nav-item active' : 'nav-item'"
          >
            <router-link :to="item.link">
              <i :class="item.icon"></i>
              <span class="menu-title" :data-i18n="item.name">
                {{ item.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
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
    isAdmin() {
      return this.$store.state.app.user.isAdmin;
    },
  },
  watch: {
    isAdmin() {
      if (!this.isAdmin) {
        this.listSidebar = this.listSidebar.filter((item) => !item.isAdmin);
      }
    },
  },
  data() {
    return {
      listSidebar: [
        {
          name: "Document Tugas",
          icon: "feather icon-file-minus",
          link: "/document-tugas",
          isAdmin: false,
        },
        {
          name: "Keputusan",
          icon: "feather icon-file",
          link: "/document-keputusan",
          isAdmin: false,
        },
        {
          name: "Tag Group",
          icon: "feather icon-box",
          link: "/tag-group",
          isAdmin: true,
        },
        {
          name: "Manajemen User",
          icon: "feather icon-users",
          link: "/user",
          isAdmin: true,
        },
      ],
    };
  },
  mounted() {
    if (!this.isAdmin) {
      this.listSidebar = this.listSidebar.filter((item) => !item.isAdmin);
    }
  },
};
</script>

<style scoped>
.menu-title {
  font-size: 1rem;
}
</style>
