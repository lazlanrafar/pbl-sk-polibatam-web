<template>
  <!-- <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>

    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown user user-menu">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            class="user-image img-circle"
            alt="User Image"
          />
          <span class="hidden-xs" style="color: black">{{ user.name }}</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <button
            type="submit"
            class="dropdown-item text-danger"
            @click="handleLogout"
          >
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      </li>
    </ul>
  </nav> -->
  <nav
    class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow"
  >
    <div class="navbar-wrapper">
      <div class="navbar-container content">
        <div class="navbar-collapse" id="navbar-mobile">
          <div
            class="mr-auto float-left bookmark-wrapper d-flex align-items-center"
          >
            <ul class="nav navbar-nav">
              <li class="nav-item mobile-menu d-xl-none mr-auto">
                <a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"
                  ><i class="ficon feather icon-menu"></i
                ></a>
              </li>
            </ul>
          </div>
          <ul class="nav navbar-nav float-right">
            <li class="nav-item d-none d-lg-block">
              <a class="nav-link nav-link-expand"
                ><i class="ficon feather icon-maximize"></i
              ></a>
            </li>
            <li class="dropdown dropdown-user nav-item">
              <a
                class="dropdown-toggle nav-link dropdown-user-link h-100"
                href="#"
                data-toggle="dropdown"
              >
                <div class="user-nav d-sm-flex d-none">
                  <span class="user-name text-bold-600">John Doe</span
                  ><span class="user-status">Available</span>
                </div>
                <span
                  ><img
                    class="round"
                    src="/app-assets/images/portrait/small/avatar-s-11.jpg"
                    alt="avatar"
                    height="40"
                    width="40"
                /></span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <!-- <div class="dropdown-divider"></div> -->
                <a class="dropdown-item" @click="handleLogout"
                  ><i class="feather icon-power"></i> Logout</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppTopbar",
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$store.commit("SET_USER", "");
      this.$router.push("/login");
    },
  },
};
</script>
