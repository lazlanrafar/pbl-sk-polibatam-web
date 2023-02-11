<template>
  <div>
    <HeaderTitle title="History" subtitle="History" />
    <div class="card">
      <div class="card-body py-5">
        <div class="row justify-content-end">
          <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
            <v-text-field
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              placeholder="Cari Barang"
              v-model="optionsTable.search"
            />
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :items="[]"
          :loading="isLoading"
          :options.sync="optionsTable"
          :search="optionsTable.search"
        >
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "History Page",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
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
    isLoading() {
      return this.$store.state.history.isLoading;
    },
    optionsTable: {
      get() {
        return this.$store.state.history.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_HISTORY", value);
      },
    },
  },
  methods: {
    click() {
      console.log("click");
    },
  },
};
</script>
