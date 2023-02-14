<template>
  <div>
    <HeaderTitle title="Setup" subtitle="User Management" />
    <div class="card">
      <div class="card-body py-5">
        <div class="row justify-content-end">
          <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
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
          :headers="headers"
          :items="list_mahasiswa"
          :loading="isLoading"
          :options.sync="optionsTable"
          :search="optionsTable.search"
        >
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "NO" },
        { text: "Nrp", value: "NRP" },
        { text: "Nama", value: "NAMA" },
        { text: "Jenis Kelamin", value: "JENIS_KELAMIN" },
        { text: "Agama", value: "AGAMA" },
        { text: "Kelas", value: "KELAS" },
        { text: "Jurusan", value: "JURUSAN" },
        { text: "Status", value: "STATUS" },
      ],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.userManagement.isLoading;
    },
    list_mahasiswa() {
      return this.$store.state.userManagement.list_mahasiswa;
    },
    optionsTable: {
      get() {
        return this.$store.state.userManagement.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_USER_MANAGAMENT", value);
      },
    },
  },
  methods: {
    click() {
      console.log("click");
    },
  },
  mounted() {
    this.$store.dispatch("GetAllMahasiswa");
  },
};
</script>
