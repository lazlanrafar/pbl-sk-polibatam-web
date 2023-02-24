<template>
  <div class="card border-top-0 rounded-t-0">
    <div class="card-body py-5">
      <div class="row justify-content-end">
        <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
          <label class="fw-medium fs-14 mb-3">Unit</label>
          <v-autocomplete
            outlined
            dense
            v-model="unit_active"
            :items="list_unit"
            item-text="UNIT"
            item-value="ID"
            @input="handleFetch"
            :loading="isLoading"
          />
        </div>
        <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
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
        :headers="headers"
        :items="reports"
        :loading="isLoading"
        :options.sync="optionsTable"
        :search="optionsTable.search"
      >
        <template v-slot:[`item.NAMA`]="{ item }">
          <span> {{ item.GELAR_DPN }} </span>
          <span> {{ item.NAMA }}</span>
          <span> {{ item.GELAR_BLK }}</span>
        </template>
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
              <v-list-item @click="handleModalDetail(true, item.NIP)">
                <v-list-item-title class="text-primary fs-12">
                  <i class="fa-regular fa-eye small mr-2"></i>
                  <span>Detail</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="setIsAdmin(item.NIP)" v-if="!item.isAdmin">
                <v-list-item-title class="text-primary fs-12">
                  <i class="fa-regular fa-eye small mr-2"></i>
                  <span>Set to Admin</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="setIsNotAdmin(item.NIP)" v-if="item.isAdmin">
                <v-list-item-title class="text-primary fs-12">
                  <i class="fa-regular fa-eye small mr-2"></i>
                  <span>Set to Not Admin</span>
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
  name: "UMPegawai",
  components: {
    Detail: () => import("./detail.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "NO" },
        { text: "NIK", value: "NIK" },
        { text: "NIP", value: "NIP" },
        { text: "Nama", value: "NAMA" },
        { text: "Staff", value: "STAFF" },
        { text: "Unit", value: "UNIT" },
        { text: "Is Admin", value: "isAdmin" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalDetail: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.pegawai.isLoading;
    },
    list_unit() {
      return this.$store.state.pegawai.list_unit;
    },
    reports() {
      return this.$store.state.pegawai.reports;
    },
    optionsTable: {
      get() {
        return this.$store.state.pegawai.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_PEGAWAI", value);
      },
    },
    unit_active: {
      get() {
        return this.$store.state.pegawai.unit_active;
      },
      set(value) {
        this.$store.commit("SET_UNIT_ACTIVE", value);
      },
    },
  },
  methods: {
    handleModalDetail(value, nip) {
      if (value) this.$store.dispatch("GetPegawaiByNIP", nip);
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
          this.$store.dispatch("SetIsAdminUM", uid).then(() => {
            this.handleFetch();
          });
        }
      });
    },
    setIsNotAdmin(uid) {
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
          this.$store.dispatch("SetIsNotAdminUM", uid).then(() => {
            this.handleFetch();
          });
        }
      });
    },
    handleFetch() {
      this.$store.dispatch("GetAllPegawai");
    },
  },
  mounted() {
    this.$store.dispatch("GetFilterPegawai").then(() => {
      this.handleFetch();
    });
  },
};
</script>
