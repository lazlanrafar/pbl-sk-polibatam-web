<template>
  <div class="app-content content">
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
      <div class="content-header row"></div>
      <div class="content-body">
        <section class="row flexbox-container">
          <div class="col-xl-8 col-11 d-flex justify-content-center">
            <div class="card bg-authentication rounded-0 mb-0">
              <div class="row m-0">
                <div
                  class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0"
                >
                  <img
                    src="/app-assets/images/pages/login.png"
                    alt="branding logo"
                  />
                </div>
                <div class="col-lg-6 col-12 p-0">
                  <div class="card rounded-0 mb-0 px-2">
                    <div class="card-header pb-1">
                      <div class="card-title">
                        <h4 class="mb-0">Login</h4>
                      </div>
                    </div>
                    <p class="px-2">
                      Welcome back, please login to your account.
                    </p>
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
                            class="btn btn-primary text-white float-right btn-inline"
                            :disabled="isLoading"
                          >
                            <!-- animation loading -->

                            <span v-if="isLoading">
                              <i class="fa fa-spinner fa-spin"></i> Loading...
                            </span>
                            <span v-else> Login </span>
                          </button>
                          <br />
                          <br />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  computed: {
    isLoading() {
      return this.$store.state.app.isLoading;
    },
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
    document.body.classList.add("bg-full-screen-image", "blank-page");
  },
  destroyed() {
    document.body.classList.remove("bg-full-screen-image", "blank-page");
  },
};
</script>
