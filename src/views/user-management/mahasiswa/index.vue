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
        <template v-slot:[`item.isAdmin`]="{ item }">
          <v-chip
            :color="item.isAdmin ? 'success' : 'error'"
            :text-color="item.isAdmin ? 'white' : 'white'"
            small
          >
            <span v-if="item.isAdmin">Admin</span>
            <span v-else>Tidak Admin</span>
          </v-chip>
        </template>
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
              <v-list-item @click="handleModalDetail(true, item.NRP)">
                <v-list-item-title class="text-primary fs-12">
                  <i class="fa-regular fa-eye small mr-2"></i>
                  <span>Detail</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="setIsAdmin(item.NRP)">
                <v-list-item-title class="text-primary fs-12">
                  <i class="fa-regular fa-eye small mr-2"></i>
                  <span>Set to Admin</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </div>

    <v-dialog v-model="modalDetail" persistent max-width="800">
      <Detail @handleModalDetail="handleModalDetail" />
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "UMMahasiswa",
  components: {
    Detail: () => import("@/views/user-management/mahasiswa/detail.vue"),
  },
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
        { text: "Is Admin", value: "isAdmin" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalDetail: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.userManagement.isLoading.mahasiswa;
    },
    list_mahasiswa() {
      return this.$store.state.userManagement.list_mahasiswa;
    },
    optionsTable: {
      get() {
        return this.$store.state.userManagement.optionsTableMahasiswa;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_MAHASISWA_UM", value);
      },
    },
  },
  methods: {
    handleModalDetail(value, nim) {
      if (value) this.$store.dispatch("GetMahasiswaByNIM", nim);
      this.modalDetail = value;
    },
    setIsAdmin(uid) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Anda akan mengubah status admin user ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, ubah!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("SetIsAdminMahasiswaUM", uid);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetAllMahasiswa");
  },
};
</script>
