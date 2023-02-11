<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12 col-sm-7 col-md-5 col-lg-3 col-xxl-2">
      <div class="card">
        <div class="card-body py-10">
          <div class="d-flex align-items-center justify-content-center mb-3">
            <img src="@/assets/logo.svg" width="60" alt="logo" />
            <h1 class="mb-0 h5 ml-3 fs-26 fw-bold text-black">
              <span style="color: #183a64">P</span>
              <span style="color: #de7520">o</span>
              <span style="color: #183a64">li</span>
              <span style="color: #a5bbc6">batam</span>
            </h1>
          </div>
          <p class="small text-muted text-center mb-10">
            Aplikasi Distribusi SK dan Surat Tugas
          </p>
          <div class="row">
            <div class="col-12">
              <v-text-field
                outlined
                dense
                placeholder="Email Address / NPWP"
                prepend-icon="mdi-account"
                hide-details="auto"
              />
            </div>
            <div class="col-12">
              <v-text-field
                outlined
                dense
                placeholder="Password"
                prepend-icon="mdi-lock"
                hide-details="auto"
                :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="isShowPassword ? 'text' : 'password'"
                @click:append="isShowPassword = !isShowPassword"
              />
            </div>
            <div class="col-12">
              <v-btn class="btn w-100 bg-orange text-white">Login</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isShowPassword: false,
    };
  },
  methods: {
    //
  },
  mounted() {
    this.$store.commit("SET_LAYOUT_APP", "auth");
  },
  destroyed() {
    this.$store.commit("SET_LAYOUT_APP", "app");
  },
};
</script>
