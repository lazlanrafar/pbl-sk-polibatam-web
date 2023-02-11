<template>
  <div class="card">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-medium">Riwayat Barang</span>
        <v-btn icon class="" @click="handleClose">
          <i class="fa-solid fa-xmark"></i>
        </v-btn>
      </div>
    </div>
    <div class="card-body pr-10">
      <div>
        <p class="fw-bold h5 mb-0">Nama Barang</p>
        <p class="text-primary">Stock : 100.000</p>
      </div>
      <v-timeline dense clipped>
        <v-timeline-item
          class="mb-4"
          color="blue"
          icon-color="grey lighten-2"
          small
          fill-dot
          v-for="i in 3"
          :key="i"
        >
          <div class="row">
            <div class="col-12 col-sm-8">
              <p class="fw-bold text-muted mb-2">Pemasukan</p>
              <a href="#" class="small">
                <i class="fa-solid fa-download"></i>
                dokumen
              </a>
            </div>
            <div class="col-12 col-sm-4 text-sm-end small">
              <p class="mb-0">6-4-2022 | 2:36 PM</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-sm-6">
              <v-text-field
                outlined
                dense
                messages="Quantity Sebelum"
                class="rounded-pill"
                hide-details="auto"
                disabled
                value="100"
              />
            </div>
            <div class="col-12 col-sm-6">
              <v-text-field
                outlined
                dense
                messages="Quantity Sesudah"
                class="rounded-pill"
                hide-details="auto"
                disabled
                value="100.000"
              />
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "BarangHistory",
  data() {
    return {
      //
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleModalHistory");
    },
  },
};
</script>
