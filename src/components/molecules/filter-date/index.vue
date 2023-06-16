<template>
  <div class="d-flex">
    <v-select
      outlined
      dense
      class="max-w-input"
      :items="list_year"
      v-model="filter_year"
    />
  </div>
</template>

<script>
export default {
  name: "FilterDate",
  data: () => ({}),
  watch: {
    filter_year() {
      this.$store.dispatch("GetAllSuratKeterangan");
      this.$store.dispatch("GetAllSuratTugas");
    },
  },
  computed: {
    list_year() {
      return this.$store.state.app.list_year;
    },
    filter_year: {
      get() {
        return this.$store.state.app.filter_year;
      },
      set(value) {
        this.$store.commit("SET_FILTER_YEAR", value);
      },
    },
  },
};
</script>
