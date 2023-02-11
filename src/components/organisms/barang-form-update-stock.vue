<template>
  <div class="card">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-medium"
          >Update Stock (Disini Nama Barang)</span
        >
        <v-btn icon class="" @click="handleClose">
          <i class="fa-solid fa-xmark"></i>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <div class="row mt-3">
        <div class="col-12">
          <v-file-input outlined dense placeholder="Dokumen" />
        </div>

        <div class="col-12">
          <v-select
            outlined
            dense
            placeholder="Pilih Jenis"
            :items="['Pemasukan', 'Pengeluaran']"
            v-model="type"
          />
        </div>
        <div class="col-12" v-if="type == 'Pengeluaran'">
          <v-text-field outlined dense placeholder="Tujuan" />
        </div>
        <div class="col-12" v-if="type">
          <v-text-field
            outlined
            dense
            placeholder="0"
            type="number"
            v-model="qty"
            :messages="`${type == 'Pemasukan' ? '+' : '-'}  
            ${format3Digit(qty)}`"
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
  name: "BarangFormUpdateStock",
  data() {
    return {
      format3Digit,
      qty: "",
      type: "",
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleModalFormUpdateStock");
    },
  },
};
</script>
