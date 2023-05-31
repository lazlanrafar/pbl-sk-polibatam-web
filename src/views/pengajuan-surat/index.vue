<template>
  <div>
    <HeaderTitle title="Home" subtitle="Pengajuan SK" />
    <!-- 
    <button
      class="btn bg-darkblue text-white fs-14 mb-3 mb-sm-0"
      @click="handleModalForm(true)"
      v-if="!isAdmin"
    >
      <i class="fa fa-plus"></i>
      Ajukan SK
    </button> -->

    <button
      class="btn bg-darkblue text-white fs-14 mb-3 mb-sm-0"
      @click="handleModalForm(true)"
    >
      <i class="fa fa-plus"></i>
      Ajukan SK
    </button>

    <ul class="nav nav-tabs pl-0 mt-10">
      <li class="nav-item" v-for="(item, i) in tab_list" :key="i">
        <a
          :class="`nav-link fs-14  ${
            item.type == tab_active
              ? 'fw-semibold text-darkblue active'
              : 'text-muted'
          }`"
          @click="tab_active = item.type"
        >
          <span>{{ item.type }}</span>
          <span class="badge bg-darkblue text-white ml-2">
            {{ item.length }}
          </span>
        </a>
      </li>
    </ul>
    <div class="card border-top-0 rounded-t-0">
      <div class="card-body">
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
          :items="handleReportsTab()"
          :options.sync="optionsTable"
          :search="optionsTable.search"
          :loading="isLoading"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            {{ moment(item.created_at).format("DD MMMM YYYY | HH:mm") }}
          </template>
          <template v-slot:[`item.filepath_lampiran`]="{ item }">
            <a
              v-if="item.filepath_lampiran"
              :href="handleDownload(item.filepath_lampiran)"
              target="_blank"
            >
              Download Lampiran
            </a>
          </template>
          <template v-slot:[`item.filepath`]="{ item }">
            <a
              v-if="item.filepath"
              :href="handleDownload(item.filepath)"
              target="_blank"
            >
              Download
            </a>
          </template>
          <template v-slot:[`item.is_lampiran`]="{ item }">
            <span v-if="item.is_lampiran">Ada</span>
            <span v-else>Tidak Ada</span>
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
                <v-list-item
                  @click="handleModalFormApprove(true, item.id)"
                  v-if="item.status == 'POSTED' && isAdmin"
                >
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fas fa-check small mr-2"></i>
                    <span>Approve</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="handleModalFormReject(true, item.id)"
                  v-if="item.status == 'POSTED' && isAdmin"
                >
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fas fa-x small mr-2"></i>
                    <span>Reject</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="handleEdit(item.id)"
                  v-if="item.status != 'APPROVED'"
                >
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fas fa-edit small mr-2"></i>
                    <span>Edit</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="handleDelete(item.id)"
                  v-if="item.status != 'APPROVED'"
                >
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
    <v-dialog
      v-if="modalDetail"
      v-model="modalDetail"
      max-width="1200"
      persistent
    >
      <Detail
        @handleModalDetail="handleModalDetail"
        @handleModalFormApprove="handleModalFormApprove"
      />
    </v-dialog>
    <v-dialog
      v-if="modalFormApprove"
      v-model="modalFormApprove"
      max-width="1200"
      persistent
    >
      <FormApprove @handleModalFormApprove="handleModalFormApprove" />
    </v-dialog>
    <v-dialog
      v-if="modalFormReject"
      v-model="modalFormReject"
      max-width="1200"
      persistent
    >
      <FormReject @handleModalFormReject="handleModalFormReject" />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "pengajuanSuratPage",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
    Form: () => import("./form.vue"),
    Detail: () => import("./detail.vue"),
    FormApprove: () => import("./form-approve/index.vue"),
    FormReject: () => import("./form-reject/index.vue"),
  },
  data() {
    return {
      moment,
      headers: [
        { text: "Title", value: "title" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" },
        { text: "Dibuat Pada", value: "created_at" },
        { text: "Diajukan Oleh", value: "created_by" },
        { text: "Lampiran", value: "filepath_lampiran" },
        { text: "Dokumen", value: "filepath" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
      modalDetail: false,
      modalFormApprove: false,
      modalFormReject: false,
      tab_list: [
        {
          type: "Posted",
          length: 0,
        },
        {
          type: "Approved",
          length: 0,
        },
        {
          type: "Rejected",
          length: 0,
        },
        {
          type: "All",
          length: 0,
        },
      ],
      tab_active: "Posted",
    };
  },
  computed: {
    reports() {
      return this.$store.state.pengajuanSurat.reports;
    },
    isLoading() {
      return this.$store.state.pengajuanSurat.isLoading;
    },
    isAdmin() {
      return this.$store.state.app.user.isAdmin;
    },
    optionsTable: {
      get() {
        return this.$store.state.pengajuanSurat.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_PENGAJUAN_SURAT", value);
      },
    },
  },
  watch: {
    reports() {
      this.handleLengthTab();
    },
  },
  methods: {
    async handleModalForm(value) {
      if (value) {
        this.$store.dispatch("GetAllTagGroup");

        await this.$store.dispatch("GetFilterPegawai").then(() => {
          this.$store.dispatch("GetAllPegawai");
        });
      }
      this.modalForm = value;
    },
    handleDownload(filename) {
      return apiUrl.split("/api")[0] + "/documents/" + filename;
    },
    handleModalDetail(value, id) {
      if (value) this.$store.dispatch("GetDetailPengajuan", id);
      this.modalDetail = value;
    },
    handleEdit(id) {
      this.$store.dispatch("SetFormUpdatePengajuan", id);
      this.$store.commit("SET_IS_UPDATE_PENGAJUAN_SURAT", id);
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
          this.$store.dispatch("DeletePengajuan", id);
        }
      });
    },
    async handleModalFormApprove(value, id) {
      this.modalFormApprove = value;

      if (value) {
        this.$store.dispatch("GetDetailPengajuan", id);

        this.$store.commit("SET_FORM_APPROVE_PENGAJUAN_SURAT", {
          key: "id_pengajuan",
          value: id,
        });

        this.$store.dispatch("GetAllTagGroup");
        await this.$store.dispatch("GetFilterPegawai").then(() => {
          this.$store.dispatch("GetAllPegawai");
        });
      }
    },
    handleModalFormReject(value, id) {
      this.modalFormReject = value;

      if (value) {
        this.$store.dispatch("GetDetailPengajuan", id);

        this.$store.commit("SET_FORM_REJECT_PENGAJUAN_SURAT", {
          key: "id_pengajuan",
          value: id,
        });
      }
    },
    handleReportsTab() {
      if (this.tab_active === "Posted") {
        return this.reports.filter((item) => item.status === "POSTED");
      } else if (this.tab_active === "Approved") {
        return this.reports.filter((item) => item.status === "APPROVED");
      } else if (this.tab_active === "Rejected") {
        return this.reports.filter((item) => item.status === "REJECTED");
      } else {
        return this.reports;
      }
    },
    handleLengthTab() {
      this.tab_list[0].length = this.reports.filter(
        (item) => item.status === "POSTED"
      ).length;
      this.tab_list[1].length = this.reports.filter(
        (item) => item.status === "APPROVED"
      ).length;
      this.tab_list[2].length = this.reports.filter(
        (item) => item.status === "REJECTED"
      ).length;
      this.tab_list[3].length = this.reports.length;
    },
  },
  async mounted() {
    await this.$store.dispatch("GetAllPengajuan");

    this.handleLengthTab();
  },
};
</script>
