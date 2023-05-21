<template>
  <div class="card-body">
    <div class="row justify-content-end">
      <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
        <label class="fw-medium fs-14 mb-3">Serach</label>
        <v-text-field
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          placeholder="Cari..."
          v-model="optionsTable.search"
        />
      </div>
    </div>
    <v-data-table
      :headers="[
        { text: 'Name', value: 'name' },
        { text: 'Created By', value: 'created_by' },
      ]"
      :items="reports"
      :options.sync="optionsTable"
      :search="optionsTable.search"
      :loading="isLoading"
      :value="value"
      @input="handleInput"
      item-key="id"
      show-select
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "InputTableTagGroup",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      optionsTable: {
        search: "",
        page: 1,
        itemsPerPage: 5,
      },
    };
  },
  computed: {
    reports() {
      return this.$store.state.tagGroup.reports;
    },
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>
