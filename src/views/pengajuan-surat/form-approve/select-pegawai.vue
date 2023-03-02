<template>
  <div class="card-body">
    <div class="row justify-content-end">
      <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
        <label class="fw-medium fs-14 mb-3">Unit</label>
        <v-autocomplete
          outlined
          dense
          v-model="unit_active"
          :items="list_unit"
          item-text="UNIT"
          item-value="ID"
          @input="handleFetch"
          :loading="isLoading"
        />
      </div>
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
        { text: 'NIK', value: 'NIK' },
        { text: 'NIP', value: 'NIP' },
        { text: 'Nama', value: 'NAMA' },
        { text: 'Staff', value: 'STAFF' },
        { text: 'Unit', value: 'UNIT' },
      ]"
      :items="reports"
      :options.sync="optionsTable"
      :search="optionsTable.search"
      :loading="isLoading"
      v-model="data_pegawai"
      item-key="NIK"
      show-select
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "FormTagGroupPegawai",
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
      return this.$store.state.pegawai.reports;
    },
    isLoading() {
      return this.$store.state.pegawai.isLoading;
    },
    list_unit() {
      return this.$store.state.pegawai.list_unit;
    },
    unit_active: {
      get() {
        return this.$store.state.pegawai.unit_active;
      },
      set(value) {
        this.$store.commit("SET_UNIT_ACTIVE", value);
      },
    },
    data_pegawai: {
      get() {
        return this.$store.state.document.form.data_pegawai;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOCUMENT", {
          key: "data_pegawai",
          value,
        });
      },
    },
  },
  methods: {
    handleFetch() {
      this.$store.dispatch("GetAllPegawai");
    },
  },
};
</script>
