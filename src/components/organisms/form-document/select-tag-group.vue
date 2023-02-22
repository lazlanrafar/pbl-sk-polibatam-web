<template>
  <div class="card-body">
    <div class="row justify-content-end">
      <div class="col-12 col-md-6 col-xl-4">
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
      item-key="id"
      show-select
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "FormDocumentTagGroup",
  computed: {
    reports() {
      return this.$store.state.tagGroup.reports;
    },
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    optionsTable: {
      get() {
        return this.$store.state.tagGroup.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_TAG_GROUP", value);
      },
    },
  },
};
</script>
