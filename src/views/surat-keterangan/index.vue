<template>
  <div>
    <HeaderTitle title="Home" subtitle="Surat Keputusan" />

    <div class="card mt-5 mt-sm-10">
      <div class="card-body">
        <button
          class="btn bg-darkblue text-white fs-14 mb-3 mb-sm-0"
          @click="handleModalForm(true)"
          v-if="isAdmin"
        >
          <i class="fa fa-plus"></i>
          Add New
        </button>
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
          :items="reports"
          :options.sync="optionsTable"
          :search="optionsTable.search"
          :loading="isLoading"
        >
          <template v-slot:[`item.remarks`]="{ item }">
            <div v-if="item.remarks.length > 25">
              {{ item.remarks.substring(0, 50) + "..." }}
            </div>
            <div v-else>{{ item.remarks }}</div>
          </template>
          <template v-slot:[`item.date`]="{ item }">
            {{ moment(item.date).format("DD MMMM YYYY") }}
          </template>
          <template v-slot:[`item.filepath`]="{ item }">
            <a :href="handleDownload(item.filepath)" target="_blank">
              Download Document
            </a>
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
                <v-list-item @click="handleModalDetail(true, item.id)">
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fa-regular fa-eye small mr-2"></i>
                    <span>Detail</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleEdit(item.id)">
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fas fa-edit small mr-2"></i>
                    <span>Edit</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleDelete(item.id)">
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fas fa-trash small mr-2"></i>
                    <span>Delete</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </div>
    </div>

    <v-dialog v-if="modalForm" v-model="modalForm" max-width="1200" persistent>
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
    <v-dialog v-model="modalDetail" max-width="1200" persistent>
      <Detail @handleModalDetail="handleModalDetail" />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "SuratKeteranganPage",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
    Form: () => import("@/components/organisms/form-document/index.vue"),
    Detail: () => import("@/components/organisms/detail-document/index.vue"),
  },
  data() {
    return {
      moment,
      headers: [
        { text: "No", value: "no" },
        { text: "No SK", value: "name" },
        { text: "Judul SK", value: "remarks" },
        { text: "Tanggal", value: "date" },
        { text: "Document", value: "filepath" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
      modalDetail: false,
    };
  },
  computed: {
    reports() {
      return this.$store.state.suratKeterangan.reports;
    },
    isLoading() {
      return this.$store.state.suratKeterangan.isLoading;
    },
    isAdmin() {
      return this.$store.state.app.user.isAdmin;
    },
    optionsTable: {
      get() {
        return this.$store.state.suratKeterangan.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_SURAT_KETERANGAN", value);
      },
    },
  },
  methods: {
    async handleModalForm(value) {
      this.modalForm = value;
      if (value) {
        this.$store.dispatch("GetAllTagGroup");

        await this.$store.dispatch("GetFilterPegawai").then(() => {
          this.$store.dispatch("GetAllPegawai");
        });

        this.$store.commit("SET_FORM_DOCUMENT", {
          key: "type",
          value: "Surat Keterangan",
        });
      }
    },
    handleDownload(filename) {
      return apiUrl.split("/api")[0] + "/documents/" + filename;
    },
    handleModalDetail(value, id) {
      if (value) this.$store.dispatch("GetDetailDocument", id);
      this.modalDetail = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormDocumentUpdate", id);
      this.$store.commit("SET_IS_UPDATE_DOCUMENT", id);
      this.handleModalForm(true);
    },
    handleDelete(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("DeleteDocument", id);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("GetAllSuratKeterangan");
  },
};
</script>
