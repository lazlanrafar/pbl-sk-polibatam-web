<template>
  <div class="row h-100 justify-content-center align-items-center">
    <div class="col-12 col-sm-7 col-md-5 col-lg-3">
      <div class="card">
        <div class="card-body py-10">
          <router-link
            to="/"
            class="d-flex align-items-center justify-content-center mb-10"
          >
            <img src="@/assets/logo.svg" width="40" alt="logo" />
            <h1 class="mb-0 h5 ml-3 fw-bold">IT Inventory</h1>
          </router-link>
          <div class="row">
            <div class="col-12">
              <label class="mb-3 small">Masukan email address</label>
              <v-text-field
                outlined
                dense
                placeholder="Email Address"
                type="email"
                hide-details="auto"
              />
            </div>
            <div class="col-12">
              <div class="text-right small">
                <router-link to="/login">Sudah punya akun?</router-link>
              </div>
            </div>
            <div class="col-12">
              <v-btn class="btn btn-primary w-100">Konfirmasi</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {};
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
