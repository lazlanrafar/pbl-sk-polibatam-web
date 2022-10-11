<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dokumen Keputusan</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <button
                  class="btn btn-primary"
                  @click="handleModalForm"
                  v-if="isAdmin"
                >
                  <i class="fa fa-plus"></i>
                  Tambah
                </button>
                <div class="row justify-content-end">
                  <div class="col-md-3">
                    <v-text-field
                      label="Cari"
                      prepend-inner-icon="mdi-magnify"
                      v-model="optionsTableDokumenKeputusan.search"
                      outlined
                      dense
                    />
                  </div>
                </div>
                <v-data-table
                  :headers="headers"
                  :items="reports"
                  :search="optionsTableDokumenKeputusan.search"
                  :single-expand="singleExpand"
                  :expanded.sync="expanded"
                  show-expand
                >
                  <template v-slot:[`item.no`]="props">
                    {{ (props.index += 1) }}
                  </template>
                  <template v-slot:[`item.dokumen`]="{ item }">
                    <a
                      :href="`${apiUrl}/documents/${item.filePath}`"
                      target="_BLANK"
                      >Download</a
                    >
                  </template>
                  <template v-slot:[`item.aksi`]="{ item }">
                    <!-- <v-btn class="mr-2" icon @click="handleUpdate(item.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="handleDelete(item.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn> -->
                    <v-menu offset-y :nudge-width="100">
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="handleExport()">
                          <v-list-item-title>
                            <download-excel
                              :name="`${item.nama}.xls`"
                              :data="item.TagGroup.tag"
                            >
                              <i class="fa fa-file-excel w-25"></i>
                              Export
                            </download-excel>
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="handleUpdate(item.id)">
                          <v-list-item-title>
                            <i class="fa fa-edit w-25"></i>
                            Update
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="handleDelete(item.id)">
                          <v-list-item-title>
                            <i class="fa fa-trash w-25"></i>
                            Delete
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </template>
                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="collapsable">
                      <table class="table w-100">
                        <tr>
                          <th>No</th>
                          <th>Nama</th>
                          <th>Username</th>
                          <th>NIM</th>
                          <th>Status</th>
                        </tr>
                        <tr v-for="(x, i) in item.TagGroup.tag" :key="i">
                          <td>{{ i + 1 }}</td>
                          <td>{{ x.name }}</td>
                          <td>{{ x.username }}</td>
                          <td>{{ x.nim_nik_unit }}</td>
                          <td>{{ x.jabatan }}</td>
                        </tr>
                      </table>
                    </td>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="modalForm"
      max-width="500"
      persistent
      style="z-index: 9999"
    >
      <Form @modalForm="modalForm = false" />
    </v-dialog>
  </div>
</template>

<script>
import Form from "./Form.vue";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";

export default {
  name: "DocumentKeputusanPage",
  components: { Form },
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Deskripsi", value: "deskripsi" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Dokumen", value: "dokumen" },
    ],
    expanded: [],
    singleExpand: true,
    apiUrl,
    modalForm: false,
  }),
  computed: {
    reports() {
      return this.$store.state.dokumenKeputusan.reports;
    },
    isAdmin() {
      return this.$store.state.app.user.isAdmin;
    },
    optionsTableDokumenKeputusan: {
      get() {
        return this.$store.state.dokumenKeputusan.optionsTableDokumenKeputusan;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_TABLE_DOKUMEN_KEPUTUSAN", val);
      },
    },
  },
  methods: {
    handleModalForm() {
      this.$store.dispatch("fetchFormDokumenKeputusan");
      this.modalForm = !this.modalForm;
    },
    handleUpdate(id) {
      this.handleModalForm();
      this.$store.dispatch("setFormDokumenKeputusan", id);
      this.$store.commit("SET_IS_UPDATE_DOKUMEN_KEPUTUSAN", id);
    },
    handleDelete(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteDokumenKeputusan", id);
        }
      });
    },
  },
  created() {
    this.$store.dispatch("fetchAllDokumenKeputusan");

    if (this.isAdmin) {
      this.headers.push({ text: "Aksi", value: "aksi" });
    }
  },
};
</script>
