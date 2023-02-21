<template>
  <nav class="navbar navbar-expand-md border-0 bg-navbar">
    <div class="container py-0">
      <button
        class="ml-auto p-2 d-block d-sm-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i class="fa-solid fa-bars fs-20 text-white"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav pl-0">
          <li
            v-for="(nav, i) in navItems"
            :key="i"
            :class="`nav-item mr-sm-7 ${nav.children ? 'dropdown' : ''}`"
          >
            <router-link
              :class="`nav-link px-3 ${aClass}`"
              :to="nav.path"
              v-if="!nav.children"
            >
              <i :class="nav.icon"></i>
              <span class="ms-2">{{ nav.title }}</span>
            </router-link>

            <a
              :class="`nav-link dropdown-toggle px-3 ${aClass}`"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              :id="nav.title"
              v-if="nav.children"
            >
              <i :class="nav.icon"></i>
              {{ nav.title }}
            </a>
            <ul
              class="dropdown-menu pl-2 pr-2 shadow bg-darkblue"
              :aria-labelledby="nav.title"
            >
              <li v-for="(nav2, j) in nav.children" :key="j">
                <router-link
                  :to="nav2.path"
                  class="dropdown-item my-2 py-2 fs-14 fw-light text-white rounded"
                >
                  <i :class="nav2.icon"></i>
                  {{ nav2.title }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div
        class="offcanvas offcanvas-end d-block d-sm-none bg-darkblue"
        tabindex="-1"
        id="offcanvasRight"
        style="width: 300px"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">
            <!-- <div class="d-flex align-items-center text-black">
              <img src="@/assets/logo.svg" width="60" alt="logo" />
            </div> -->
          </h5>
          <button type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <i class="fa-solid fa-xmark fs-24 text-white"></i>
          </button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-unstyled pl-0">
            <li v-for="(nav, i) in navItems" :key="i">
              <router-link
                :class="`nav-link px-3 ${aClass} py-2 mb-1`"
                :to="nav.path"
                v-if="!nav.children"
              >
                <i :class="nav.icon"></i>
                <span class="ms-2">{{ nav.title }}</span>
              </router-link>

              <p
                v-if="nav.children"
                class="text-white fs-14 fw-semibold mt-2 mb-1"
              >
                {{ nav.title }}
              </p>

              <ul class="list-unstyled pl-0">
                <li v-for="(nav2, j) in nav.children" :key="j">
                  <router-link
                    :to="nav2.path"
                    :class="`nav-link px-3 ${aClass} py-2 mb-1`"
                  >
                    <i :class="nav2.icon"></i>
                    {{ nav2.title }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppTopbarNavigation",
  data() {
    return {
      aClass: "text-white fs-14 fw-light",
      navItems: [
        {
          title: "Home",
          path: "/home",
          icon: "fa-solid fa-house",
          children: false,
          adminOnly: false,
        },
        {
          title: "Surat Tugas",
          path: "/surat-tugas",
          icon: "fa-solid fa-file-alt",
          children: false,
          adminOnly: false,
        },
        {
          title: "Surat Keterangan",
          path: "/surat-keterangan",
          icon: "fa-solid fa-file-alt",
          children: false,
          adminOnly: false,
        },
        {
          title: "Setup",
          path: "/setup",
          icon: "fa-solid fa-tags",
          adminOnly: true,
          children: [
            {
              title: "Tag Group",
              path: "/tag-group",
              icon: "fa-solid fa-tags",
              children: false,
            },
            {
              title: "User Management",
              path: "/user-management",
              icon: "fa-solid fa-users",
              children: false,
            },
          ],
        },
      ],
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.app.user.isAdmin;
    },
  },
  mounted() {
    this.navItems = this.navItems.filter((item) => {
      if (item.adminOnly) {
        return this.isAdmin;
      } else {
        return true;
      }
    });
  },
};
</script>

<style lang="scss">
.router-link-exact-active {
  font-weight: 500 !important;
  background: #ff7f00;
  border-radius: 5px;
  color: white !important;
}
.dropdown-item {
  // reset background active and after bootstrap 5
  &:active,
  &:hover,
  &:after {
    background: transparent !important;
  }
}

.bg-navbar {
  background: linear-gradient(
    135deg,
    rgba(24, 58, 100, 1) 90%,
    rgba(173, 231, 247, 1) 90%,
    rgba(173, 231, 247, 1) 95%,
    #ff7f00 5%
  );
}
</style>
