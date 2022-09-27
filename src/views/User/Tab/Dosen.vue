<template>
  <div>
    <div class="row justify-content-end">
      <div class="col-md-3">
        <v-text-field
          label="Cari"
          prepend-inner-icon="mdi-magnify"
          v-model="optionsTableDosen.search"
          outlined
          dense
        />
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="dataDosen"
      :search="optionsTableDosen.search"
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
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "UserDosen",
  components: {},
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "name" },
      { text: "Jabatan", value: "jabatan" },
      { text: "Email", value: "email" },
      { text: "NIM / NIK / UNIT", value: "nim_nik_unit" },
      { text: "Is Admin", value: "isAdmin", align: "center" },
      { text: "Aksi", value: "aksi", align: "center" },
    ],
  }),
  computed: {
    isLoading() {
      return this.$store.state.manajemenUser.isLoading;
    },
    dataDosen() {
      return this.$store.state.manajemenUser.dataDosen;
    },
    optionsTableDosen: {
      get() {
        return this.$store.state.manajemenUser.optionsTableDosen;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_TABLE_DOSEN", val);
      },
    },
  },
  methods: {
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
  created() {
    this.$store.dispatch("getAllDosen");
  },
};
</script>
