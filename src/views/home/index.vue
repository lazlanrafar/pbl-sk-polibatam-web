<template>
  <div>
    <div class="d-flex flex-column flex-sm-row gap-2 gap-md-3">
      <CardBarang type="pemasukan" value="202" />
      <CardBarang type="pengeluaran" value="102" />
    </div>

    <div class="card mt-5 mt-sm-10">
      <div class="card-header py-3">
        <span class="font-weight-medium">Riwayat</span>
      </div>
      <div class="card-body">
        <v-data-table
          :headers="headers"
          :items="[]"
          :options.sync="optionsTable"
        >
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    CardBarang: () => import("@/components/molecules/card-barang/index.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "name" },
        { text: "No Dokumen", value: "calories" },
        { text: "Nama Barang", value: "calories" },
        { text: "Type", value: "fat" },
        { text: "Quantity Sebelum", value: "carbs" },
        { text: "Quantity Sesudah", value: "protein" },
        { text: "Dokumen", value: "iron" },
      ],
    };
  },
  computed: {
    optionsTable: {
      get() {
        return this.$store.state.home.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_HOME", value);
      },
    },
  },
};
</script>
