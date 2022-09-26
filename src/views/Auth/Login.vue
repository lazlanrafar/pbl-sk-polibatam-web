<template>
  <div>
    <div class="login-box">
      <div class="login-logo">
        <a href="/">
          <img src="@/assets/login.png" width="200" alt="" />
        </a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form @submit.prevent="handleSubmit">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                :value="username"
                @change="username = $event.target.value"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                :value="password"
                @change="password = $event.target.value"
              />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button
                  type="submit"
                  class="btn btn-primary btn-block text-white"
                >
                  Sign In
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  computed: {
    username: {
      get() {
        return this.$store.state.app.login.username;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN", {
          key: "username",
          value: value,
        });
      },
    },
    password: {
      get() {
        return this.$store.state.app.login.password;
      },
      set(value) {
        this.$store.commit("SET_FORM_LOGIN", {
          key: "password",
          value: value,
        });
      },
    },
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch("Login");
    },
  },
  mounted() {
    document.body.classList.add("login-page");
    document.body.classList.add("hold-transition");
  },
};
</script>
