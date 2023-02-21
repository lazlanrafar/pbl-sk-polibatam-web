<template>
  <div class="card-body">
    <div class="row justify-content-end">
      <div class="col-12 col-md-6">
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
        { text: 'Nrp', value: 'NRP' },
        { text: 'Nama', value: 'NAMA' },
        { text: 'Kelas', value: 'KELAS' },
        { text: 'Jurusan', value: 'JURUSAN' },
      ]"
      :items="list_mahasiswa"
      :options.sync="optionsTable"
      :search="optionsTable.search"
      :loading="isLoading"
      v-model="data_mahasiswa"
      item-key="NRP"
      show-select
    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "FormTagGroupMahasiswa",
  computed: {
    list_mahasiswa() {
      return this.$store.state.userManagement.list_mahasiswa;
    },
    isLoading() {
      return this.$store.state.userManagement.isLoading;
    },
    optionsTable: {
      get() {
        return this.$store.state.userManagement.optionsTableMahasiswa;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_MAHASISWA_UM", value);
      },
    },
    data_mahasiswa: {
      get() {
        return this.$store.state.tagGroup.form.data_mahasiswa;
      },
      set(value) {
        this.$store.commit("SET_FORM_TAG_GROUP", {
          key: "data_mahasiswa",
          value,
        });
      },
    },
  },
};
</script>
