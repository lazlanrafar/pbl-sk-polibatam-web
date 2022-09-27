<template>
  <div>
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
      :loading="isLoading"
    >
      <template v-slot:[`item.no`]="props">
        {{ (props.index += 1) }}
      </template>
      <template v-slot:[`item.isAdmin`]="{ item }">
        <v-icon v-if="item.isAdmin" color="green">mdi-check</v-icon>
        <v-icon v-else color="red">mdi-close</v-icon>
      </template>
      <template v-slot:[`item.aksi`]="{ item }">
        <v-btn icon @click="handleDetail(item)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="modalDetail" max-width="700" style="z-index: 9999">
      <MahasiswaDetail @modalDetail="modalDetail = false" />
    </v-dialog>
  </div>
</template>

<script>
import MahasiswaDetail from "./MahasiswaDetail.vue";
export default {
  name: "UserMahasiswa",
  components: { MahasiswaDetail },
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "name" },
      { text: "Username", value: "username" },
      { text: "NIM", value: "nim_nik_unit" },
      { text: "Is Admin", value: "isAdmin", align: "center" },
      { text: "Aksi", value: "aksi" },
    ],
    modalDetail: false,
  }),
  computed: {
    isLoading() {
      return this.$store.state.manajemenUser.isLoading;
    },
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
  methods: {
    handleDetail(item) {
      this.$store.dispatch("getMahasiswaByNIM", item.nim_nik_unit);
      this.modalDetail = true;
    },
  },
  mounted() {
    this.$store.dispatch("getAllMahasiswa");
  },
};
</script>
