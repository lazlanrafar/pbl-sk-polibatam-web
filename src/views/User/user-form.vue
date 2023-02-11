<template>
  <div class="card">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-medium">Form User</span>
        <v-btn icon class="" @click="handleClose">
          <i class="fa-solid fa-xmark"></i>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <div class="row mt-3">
        <div class="col-12">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            placeholder="Nama Perusahaan"
          />
        </div>
        <div class="col-12">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            placeholder="Email Address"
          />
        </div>
        <div class="col-12">
          <v-text-field outlined dense hide-details="auto" placeholder="NPWP" />
        </div>
        <div class="col-12">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            placeholder="Password"
            type="password"
          />
        </div>
        <div class="col-12">
          <v-textarea outlined dense hide-details="auto" placeholder="Alamat" />
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
export default {
  name: "BarangForm",
  data() {
    return {
      //
    };
  },
  methods: {
    handleClose() {
      this.$emit("handleModalForm");
    },
  },
};
</script>
