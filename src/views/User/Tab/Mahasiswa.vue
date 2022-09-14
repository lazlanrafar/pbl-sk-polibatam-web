<template>
  <div>
    <div class="card border">
      <div class="card-body">
        <div class="row justify-content-end">
          <div class="col-md-3">
            <v-text-field
              label="Cari"
              prepend-inner-icon="mdi-magnify"
              v-model="optionsTableMahasiswa.search"
              outlined
              dense
            />
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :items="dataMahasiswa"
          :search="optionsTableMahasiswa.search"
        >
          <template v-slot:[`item.no`]="props">
            {{ (props.index += 1) }}
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMahasiswa",
  components: {},
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "name" },
      { text: "Username", value: "username" },
      { text: "NIM", value: "nim_nik_unit" },
      { text: "Status", value: "jabatan" },
    ],
  }),
  computed: {
    dataMahasiswa() {
      return this.$store.state.manajemenUser.dataMahasiswa;
    },
    optionsTableMahasiswa: {
      get() {
        return this.$store.state.manajemenUser.optionsTableMahasiswa;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_TABLE_MAHASISWA", val);
      },
    },
  },
  mounted() {
    this.$store.dispatch("getAllMahasiswa");
  },
};
</script>
