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
                <button class="btn btn-primary">
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
                    <v-btn class="mr-2" icon @click="handleUpdate(item.id)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="handleDelete(item.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
  </div>
</template>

<script>
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "DocumentKeputusanPage",
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Deskripsi", value: "deskripsi" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Dokumen", value: "dokumen" },
      { text: "Aksi", value: "aksi", align: "right" },
    ],
    expanded: [],
    singleExpand: true,
    apiUrl,
  }),
  computed: {
    reports() {
      return this.$store.state.dokumenKeputusan.reports;
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
  created() {
    this.$store.dispatch("fetchAllDokumenKeputusan");
  },
};
</script>
