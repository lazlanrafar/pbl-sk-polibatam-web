<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Detail Tag Group ( {{ report.name }} )
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>

      <div class="card border-0">
        <div class="card-body">
          <div class="row justify-content-end">
            <div class="col-12 col-sm-5 col-lg-4">
              <v-text-field
                outlined
                dense
                prepend-inner-icon="mdi-magnify"
                placeholder="Cari..."
                v-model="search"
              />
            </div>
          </div>
          <v-data-table
            :items="report.data_pegawai"
            :search="search"
            :headers="[
              { text: 'NIP', value: 'NIP' },
              { text: 'NIK', value: 'NIK' },
              { text: 'Nama', value: 'NAMA' },
              { text: 'Staff', value: 'STAFF' },
              { text: 'Unit', value: 'UNIT' },
            ]"
          >
            <template v-slot:[`item.NAMA`]="{ item }">
              <span> {{ item.GELAR_DPN }} </span>
              <span> {{ item.NAMA }}</span>
              <span> {{ item.GELAR_BLK }}</span>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "TagGroupDetail",
  data: () => ({
    search: "",
  }),
  computed: {
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    report() {
      return this.$store.state.tagGroup.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
