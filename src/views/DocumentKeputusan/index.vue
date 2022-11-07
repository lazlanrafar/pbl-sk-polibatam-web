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
                <div class="row align-items-center mb-3">
                  <div class="col-4 col-md-2 col-lg-1">
                    <button
                      class="btn btn-primary w-100"
                      @click="handleModalForm"
                      v-if="isAdmin"
                    >
                      <i class="fa fa-plus"></i>
                      Tambah
                    </button>
                  </div>
                  <div class="col-4 col-md-2 col-lg-1">
                    <download-excel
                      name="Dokumen-Keputusan"
                      type="xls"
                      :data="reports"
                      :fields="fieldsExport"
                    >
                      <button
                        class="btn btn-secondary d-flex align-items-center w-100"
                      >
                        <i class="fa fa-file-excel mr-1"></i>
                        Export
                      </button>
                    </download-excel>
                  </div>
                  <div class="col-4 col-md-2 col-lg-1">
                    <div class="file-input">
                      <input
                        type="file"
                        class="file-input__input"
                        @change="onFileChange"
                      />
                      <span>Import</span>
                    </div>
                  </div>
                </div>

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
                  <template v-slot:[`item.dokumen`]="{ item }">
                    <a
                      :href="`${apiUrl}/documents/${item.filePath}`"
                      target="_BLANK"
                      >Download</a
                    >
                  </template>
                  <template v-slot:[`item.aksi`]="{ item }">
                    <v-menu offset-y :nudge-width="100">
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
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
    <v-dialog
      v-model="jsonImport"
      max-width="1000"
      persistent
      style="z-index: 9999"
    >
      <form-import />
    </v-dialog>
  </div>
</template>

<script>
import Form from "./Form.vue";
import FormImport from "./FormImport.vue";
const apiUrl = process.env.VUE_APP_API_URL;
import Swal from "sweetalert2";
const XLSX = require("xlsx");

export default {
  name: "DocumentKeputusanPage",
  components: { Form, FormImport },
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Deskripsi", value: "deskripsi" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Dokumen", value: "dokumen" },
    ],
    fieldsExport: {
      No: "no",
      Nama: "nama",
      Deskripsi: "deskripsi",
      "Dibuat Oleh": "createdBy",
      "Nama Tag": "TagGroup.nama",
      Dokumen: {
        field: "filePath",
        callback: (value) => `${apiUrl}/documents/${value}`,
      },
    },
    expanded: [],
    singleExpand: true,
    apiUrl,
    modalForm: false,
  }),
  computed: {
    reports() {
      return this.$store.state.dokumenKeputusan.reports;
    },
    jsonImport() {
      return this.$store.state.dokumenKeputusan.jsonImport;
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
    onFileChange(e) {
      var files = e.target.files,
        f = files[0];
      var reader = new FileReader();

      const commit = this.$store.commit;
      reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        /* DO SOMETHING WITH workbook HERE */
        let worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);

        // handle commit inside filereader onload vue
        commit("SET_JSON_IMPORT_DOKUMEN_KEPUTUSAN", json);
      };
      reader.readAsArrayBuffer(f);
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

<style scoped>
.file-input {
  position: relative;
  overflow: hidden;
  background-color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  color: white;
}

.file-input input[type="file"] {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
