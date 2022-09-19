<template>
  <div>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <router-link to="/" class="brand-link">
        <img
          src="@/assets/logo.svg"
          alt="Logo"
          class=""
          width="45"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">AdminLTE 3</span>
      </router-link>

      <!-- Sidebar -->
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
    </aside>
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
          icon: "nav-icon fas fa-tachometer-alt",
          link: "/",
        },
        {
          name: "Document Tugas",
          icon: "nav-icon fa fa-book",
          link: "/document-tugas",
        },
        {
          name: "Keputusan",
          icon: "nav-icon fa fa-book",
          link: "/document-keputusan",
        },
        {
          name: "Tag Group",
          icon: "nav-icon fa fa-tags",
          link: "/tag-group",
        },
        {
          name: "Manajemen User",
          icon: "nav-icon fa fa-users",
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
