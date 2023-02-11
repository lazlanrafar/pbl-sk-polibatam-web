<template>
  <nav
    class="navbar navbar-expand-md border-bottom"
    style="background: #181824"
  >
    <div class="container py-0">
      <button
        class="navbar-toggler mx-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav pl-0">
          <li
            v-for="(nav, index) in navItems"
            :key="index"
            class="nav-item mr-sm-7"
          >
            <router-link class="nav-link text-muted" :to="nav.path">
              <i :class="nav.icon"></i>
              <span class="ms-2">{{ nav.title }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppTopbarNavigation",
  data() {
    return {
      navItems: [
        {
          title: "Home",
          path: "/",
          icon: "fa-solid fa-house",
        },
        {
          title: "Barang",
          path: "/barang",
          icon: "fa-solid fa-boxes-stacked",
        },
        {
          title: "User",
          path: "/user",
          icon: "fa-solid fa-users",
        },
        {
          title: "Riwayat",
          path: "/history",
          icon: "fa-solid fa-clock-rotate-left",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.router-link-exact-active {
  color: #000 !important;
  font-weight: 500 !important;
}
</style>
