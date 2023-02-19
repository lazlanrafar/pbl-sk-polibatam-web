export default function catchUnauthorized(error) {
  if (error.response.status === 401) {
    localStorage.clear();
    this.$store.commit("SET_USER_APP", "");
    this.$store.commit("SET_TOKEN_APP", "");
    this.$router.push("/login");
  }
}
