<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>

    <!-- Right navbar links -->
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
