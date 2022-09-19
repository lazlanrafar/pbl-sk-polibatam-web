<template>
  <div>
    <div class="login-box">
      <div class="login-logo">
        <a href="../../index2.html"><b>Admin</b>LTE</a>
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
                <button type="submit" class="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
              <!-- /.col -->
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- /.login-box -->
    <!-- <div class="col-xl-8 col-11 d-flex justify-content-center">
      <div class="card bg-authentication rounded-0 mb-0">
        <div class="row m-0">
          <div
            class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0"
          >
            <img src="/app-assets/images/pages/login.png" alt="branding logo" />
          </div>
          <div class="col-lg-6 col-12 p-0">
            <div class="card rounded-0 px-2">
              <div class="card-header pb-1">
                <div class="card-title">
                  <h4 class="mb-0">Login</h4>
                </div>
              </div>
              <p class="px-2">Welcome back, please login to your account.</p>
              <div class="card-content">
                <div class="card-body pt-1">
                  <form @submit.prevent="handleSubmit">
                    <fieldset
                      class="form-label-group form-group position-relative has-icon-left"
                    >
                      <input
                        type="text"
                        class="form-control"
                        id="user-name"
                        placeholder="Username"
                        :value="username"
                        @change="username = $event.target.value"
                        required
                      />
                      <div class="form-control-position">
                        <i class="feather icon-user"></i>
                      </div>
                      <label for="user-name">Username</label>
                    </fieldset>

                    <fieldset
                      class="form-label-group position-relative has-icon-left"
                    >
                      <input
                        type="password"
                        class="form-control"
                        id="user-password"
                        placeholder="Password"
                        :value="password"
                        @change="password = $event.target.value"
                        required
                      />
                      <div class="form-control-position">
                        <i class="feather icon-lock"></i>
                      </div>
                      <label for="user-password">Password</label>
                    </fieldset>

                    <button
                      type="submit"
                      class="btn btn-primary text-white float-right"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
