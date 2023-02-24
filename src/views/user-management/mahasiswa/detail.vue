<template>
  <v-card class="card" :loading="isLoading">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <span class="font-weight-medium">Detail Mahasiswa</span>
        <v-btn icon class="" @click="handleClose">
          <i class="fa-solid fa-xmark"></i>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-striped">
        <tr class="" v-for="(item, i) in report" :key="i">
          <td style="min-width: 200px">{{ item.key }}</td>
          <td style="min-width: 20px">:</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MahasiswaDetail",
  data() {
    return {};
  },
  computed: {
    report() {
      return this.$store.state.mahasiswa.report;
    },
    isLoading() {
      return this.$store.state.mahasiswa.isLoading;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
