<template>
  <v-card class="bg-white">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Import Dokumen Tugas</h5>
        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <v-data-table :headers="headers" :items="jsonImport">
        <template v-slot:[`item.Dokumen`]="{ item }">
          <a :href="item.Dokumen" target="_BLANK">Lihat Dokumen</a>
        </template></v-data-table
      >
    </div>
    <div class="card-footer d-flex justify-content-end">
      <button class="btn btn-outline-secondary mr-3" @click="handleClose">
        Batal
      </button>
      <button class="btn btn-primary" @click="handleConfirm">Import</button>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "dokumenTugasFormImport",
  data() {
    return {
      headers: [
        { text: "No", value: "No" },
        { text: "Nama", value: "Nama" },
        { text: "Deskripsi", value: "Deskripsi" },
        { text: "Dibuat oleh", value: "Dibuat Oleh" },
        { text: "Nama Tag", value: "Nama Tag" },
        { text: "Dokumen", value: "Dokumen" },
      ],
    };
  },
  methods: {
    handleClose() {
      this.$store.commit("SET_JSON_IMPORT_DOKUMEN_TUGAS", null);
    },
    handleConfirm() {
      this.$store.dispatch("importDokumenTugas").then(() => {
        this.handleClose();
      });
    },
  },
  computed: {
    jsonImport() {
      return this.$store.state.dokumenTugas.jsonImport;
    },
  },
};
</script>
