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
        { text: 'NIK', value: 'NIK' },
        { text: 'NIP', value: 'NIP' },
        { text: 'Nama', value: 'NAMA' },
        { text: 'Staff', value: 'STAFF' },
        { text: 'Unit', value: 'UNIT' },
      ]"
      :items="list_mahasiswa"
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
  computed: {
    list_mahasiswa() {
      return this.$store.state.userManagement.list_pegawai;
    },
    isLoading() {
      return this.$store.state.userManagement.isLoading;
    },
    optionsTable: {
      get() {
        return this.$store.state.userManagement.optionsTablePegawai;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_PEGAWAI_USER_MANAGAMENT", value);
      },
    },
    data_pegawai: {
      get() {
        return this.$store.state.tagGroup.form.data_pegawai;
      },
      set(value) {
        this.$store.commit("SET_FORM_TAG_GROUP", {
          key: "data_pegawai",
          value,
        });
      },
    },
  },
};
</script>
