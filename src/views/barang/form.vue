<template>
  <div class="card">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-medium">Form Data Barang</span>
        <v-btn icon class="" @click="handleClose">
          <i class="fa-solid fa-xmark"></i>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <div class="row mt-3">
        <div class="col-12">
          <v-file-input
            dense
            placeholder="Dokumen"
            prepend-icon="mdi-file-document"
          />
        </div>
        <div class="col-6">
          <v-text-field outlined dense placeholder="Nomor Dokumen" />
        </div>
        <div class="col-6">
          <v-text-field outlined dense placeholder="Tanggal Dokumen" />
        </div>
        <!-- <div class="col-6">
          <v-text-field outlined dense placeholder="Customer" />
        </div> -->
        <div class="col-6">
          <v-select
            outlined
            dense
            placeholder="Dari"
            :items="['LDP', 'KPB', 'LDP']"
          />
        </div>
        <div class="col-6">
          <v-text-field outlined dense placeholder="Nama Barang" />
        </div>
        <div class="col-6">
          <v-text-field outlined dense placeholder="Jenis Barang" />
        </div>
        <div class="col-6">
          <v-text-field
            outlined
            dense
            placeholder="Quantity"
            type="number"
            v-model="qty"
            :messages="format3Digit(qty)"
          />
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-end">
        <v-btn class="btn btn-secondary mr-2" @click="handleClose">
          Batal
        </v-btn>
        <v-btn class="btn btn-primary">Simpan</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import format3Digit from "../../utils/format-3digit";

export default {
  name: "BarangForm",
  data() {
    return {
      format3Digit,
      qty: "",
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm");
    },
  },
};
</script>
