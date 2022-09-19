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
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "UserDosen",
  components: {},
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "name" },
      { text: "Username", value: "username" },
      { text: "Email", value: "email" },
      { text: "NIM / NIK / UNIT", value: "nim_nik_unit" },
      { text: "Jabatan", value: "jabatan" },
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
  created() {
    this.$store.dispatch("getAllDosen");
  },
};
</script>
