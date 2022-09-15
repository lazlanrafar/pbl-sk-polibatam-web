<template>
  <div class="row">
    <div class="col">
      <v-card class="card h-100">
        <div class="card-body">
          <h3 class="font-weight-bold mb-10">Dokumen Tugas</h3>
          <div class="card border">
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
                    outlined
                    dense
                  />
                </div>
              </div>
              <v-data-table :headers="[]" :items="[]"> </v-data-table>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentTugasPage",
};
</script>
