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
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="handleDetail(item)">
              <v-list-item-title>Detail</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleSetAdmin(item)" v-if="!item.isAdmin">
              <v-list-item-title>Set Admin</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleUnsetAdmin(item)" v-else>
              <v-list-item-title>Unset Admin</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-dialog v-model="modalDetail" max-width="700" style="z-index: 9999">
      <MahasiswaDetail @modalDetail="modalDetail = false" />
    </v-dialog>
  </div>
</template>

<script>
import MahasiswaDetail from "./MahasiswaDetail.vue";
import Swal from "sweetalert2";

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
    handleSetAdmin(item) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan mengubah status admin dari mahasiswa ini",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, ubah!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("setAdminByNIM", item.nim_nik_unit);
        }
      });
    },
    handleUnsetAdmin(item) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan mengubah status admin dari mahasiswa ini",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, ubah!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("unsetAdminByNIM", item.nim_nik_unit);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("getAllMahasiswa");
  },
};
</script>
