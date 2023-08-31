<template>
  <nav class="navbar border-0 border-bottom bg-darkblue">
    <div class="container py-1">
      <div class="navbar-brand">
        <div class="d-flex align-items-center text-black">
          <img src="@/assets/logo.svg" width="60" alt="logo" />
          <div class="d-none d-sm-block">
            <h1 class="mb-0 h5 ml-3 fw-semibold text-white">Polibatam</h1>
            <p class="mb-0 ml-3 text-white fw-normal fs-14">
              Aplikasi Ditribusi Sk dan Surat Tugas
            </p>
          </div>
        </div>
      </div>

      <div class="dropdown my-auto">
        <a
          class="flex text-decoration-none text-white"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="d-flex align-items-center">
            <img
              :src="`https://ui-avatars.com/api/${user.nama}?background=ade7f7`"
              width="40"
              height="40"
              alt="pp"
              class="rounded-circle mr-3"
            />
            <div class="d-none d-sm-block">
              <p class="mb-0 text-white font-weight-medium">{{ user.nama }}</p>
              <p class="mb-0 text-white-50 small">{{ user.role }}</p>
            </div>
          </div>
        </a>

        <ul class="dropdown-menu dropdown-menu-end pl-0">
          <li>
            <p class="dropdown-item text-black small disabled mb-0" href="#">
              <i class="fa-solid fa-circle text-success small mr-1"></i>
              Status Active
            </p>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <!-- <li>
            <a class="dropdown-item text-black small" href="#">
              <i class="fa-solid fa-lock mr-1"></i>
              Ganti Password
            </a>
          </li> -->
          <!-- <li><hr class="dropdown-divider" /></li> -->
          <li>
            <a class="dropdown-item text-danger small" @click="handleLogout">
              <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppTopbarHeader",
  data() {
    return {
      //
    };
  },
  computed: {
    user() {
      return this.$store.state.app.user;
    },
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$store.commit("SET_USER_APP", "");
      this.$store.commit("SET_TOKEN_APP", "");

      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped></style>
