<template>
  <div
    class="main-menu menu-fixed menu-light menu-accordion menu-shadow"
    data-scroll-to-active="true"
  >
    <div class="navbar-header">
      <ul class="nav navbar-nav flex-row">
        <li class="nav-item mr-auto">
          <a class="navbar-brand" href="#">
            <div class="brand-logo"></div>
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
        <li class="nav-item" v-for="(item, i) in listSidebar" :key="i">
          <a :href="item.link"
            ><i :class="item.icon"></i
            ><span class="menu-title">{{ item.name }}</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      listSidebar: [
        {
          name: "Dashboard",
          icon: "feather icon-home",
          link: "",
        },
        {
          name: "Tugas",
          icon: "feather icon-book",
          link: "",
        },
        {
          name: "Keperluan",
          icon: "feather icon-mail",
          link: "",
        },
        {
          name: "Document Grup",
          icon: "feather icon-shopping-bag",
          link: "",
        },
        {
          name: "Manajemen User",
          icon: "feather icon-users",
          link: "",
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
