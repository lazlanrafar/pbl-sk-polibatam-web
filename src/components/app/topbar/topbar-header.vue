<template>
  <nav class="navbar" style="background: #183a64">
    <div class="container py-1">
      <div class="navbar-brand">
        <router-link to="/" class="d-flex align-items-center text-black">
          <img src="@/assets/logo.svg" width="50" alt="logo" />
          <div>
            <h1 class="mb-0 h5 ml-3 fw-semibold text-white">Polibatam</h1>
            <p class="mb-0 ml-3 text-white fw-normal fs-14">
              Aplikasi Ditribusi Sk dan Surat Tugas
            </p>
          </div>
        </router-link>
      </div>

      <div class="dropdown my-auto">
        <a
          class="flex text-decoration-none"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <div class="d-flex align-items-center">
            <img
              src="https://avatars.githubusercontent.com/u/52142835?v=4"
              width="40"
              height="40"
              alt="pp"
              class="rounded-circle mr-3"
            />
            <div class="d-none d-sm-block">
              <p class="mb-0 text-white font-weight-medium">L Azlan Rafar</p>
              <p class="mb-0 text-white-50 small">Mahasiswa</p>
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
            <router-link class="dropdown-item text-danger small" to="/login">
              <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>
              Logout
            </router-link>
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
};
</script>
