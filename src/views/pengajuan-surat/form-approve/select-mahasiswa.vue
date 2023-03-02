<template>
  <div class="card-body">
    <div class="row justify-content-end">
      <div class="col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
        <label class="fw-medium fs-14 mb-3">Prodi</label>
        <v-autocomplete
          outlined
          dense
          v-model="prodi_active"
          :items="list_prodi"
          item-text="JURUSAN"
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
    list_mahasiswa() {
      return this.$store.state.mahasiswa.reports;
    },
    isLoading() {
      return this.$store.state.mahasiswa.isLoading;
    },
    list_prodi() {
      return this.$store.state.mahasiswa.list_prodi;
    },
    prodi_active: {
      get() {
        return this.$store.state.mahasiswa.prodi_active;
      },
      set(value) {
        this.$store.commit("SET_PRODI_ACTIVE", value);
      },
    },
    data_mahasiswa: {
      get() {
        return this.$store.state.document.form.data_mahasiswa;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOCUMENT", {
          key: "data_mahasiswa",
          value,
        });
      },
    },
  },
  methods: {
    handleFetch() {
      this.$store.dispatch("GetAllMahasiswa");
    },
  },
};
</script>
