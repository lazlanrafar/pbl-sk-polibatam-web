<template>
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
        <template v-slot:[`item.action`]="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                class="btn btn-outline-primary py-4"
                v-bind="attrs"
                v-on="on"
              >
                <span class="fw-light mr-1">Action</span>
                <i class="fa-solid fa-chevron-down small"></i>
              </v-btn>
            </template>
            <v-list min-width="150">
              <v-list-item @click="handleDetail(item.id)">
                <v-list-item-title class="text-primary fs-12">
                  <i class="fa-regular fa-eye small mr-2"></i>
                  <span>Detail</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "UMMahasiswa",
  components: {},
  data() {
    return {
      headers: [
        { text: "No", value: "NO" },
        { text: "Nrp", value: "NRP" },
        { text: "Nama", value: "NAMA" },
        { text: "Agama", value: "AGAMA" },
        { text: "Kelas", value: "KELAS" },
        { text: "Jurusan", value: "JURUSAN" },
        { text: "Status", value: "STATUS" },
        { text: "Action", value: "action", align: "right", sortable: false },
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
