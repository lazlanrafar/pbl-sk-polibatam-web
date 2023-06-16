<template>
  <layout-auth>
    <div class="d-flex justify-content-center align-items-center h-100">
      <div class="w-100" style="max-width: 400px">
        <div class="card">
          <v-form
            class="card-body py-10"
            ref="initialReport"
            @submit.prevent="handleSubmit"
          >
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
            <div class="">
              <div class="">
                <v-text-field
                  outlined
                  dense
                  placeholder="Username"
                  prepend-icon="mdi-account"
                  v-model="username"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(value, 'Username');
                    },
                  ]"
                />
              </div>
              <div class="">
                <v-text-field
                  outlined
                  dense
                  placeholder="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isShowPassword ? 'text' : 'password'"
                  @click:append="isShowPassword = !isShowPassword"
                  v-model="password"
                  :rules="[
                    (value) => {
                      return genericRequiredRule(value, 'Password');
                    },
                  ]"
                />
              </div>
              <div class="">
                <v-btn
                  class="btn w-100 bg-darkblue text-white"
                  type="submit"
                  :loading="isLoading"
                >
                  Login
                </v-btn>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </layout-auth>
</template>

<script>
import { ValidationRules } from "@/mixins/validation-rules.js";
import layoutAuth from "../../layouts/layout-auth.vue";

export default {
  components: { layoutAuth },
  name: "LoginPage",
  mixins: [ValidationRules],
  data() {
    return {
      isShowPassword: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading;
    },
    username: {
      get() {
        return this.$store.state.app.login.username;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "username",
          value,
        });
      },
    },
    password: {
      get() {
        return this.$store.state.app.login.password;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN_APP", {
          key: "password",
          value,
        });
      },
    },
  },
  methods: {
    handleSubmit() {
      if (this.$refs.initialReport.validate()) {
        this.$store.dispatch("Login").then((response) => {
          if (response) {
            this.$refs.initialReport.reset();
          }
        });
      }
    },
  },
};
</script>
