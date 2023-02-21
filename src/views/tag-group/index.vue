<template>
  <div>
    <HeaderTitle title="Setup" subtitle="Tag Group" />

    <div class="card mt-5 mt-sm-10">
      <div class="card-body">
        <button
          class="btn bg-darkblue text-white fs-14"
          @click="handleModalForm(true)"
        >
          <i class="fa fa-plus"></i>
          Add New
        </button>
        <div class="row justify-content-end">
          <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
            <v-text-field
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              placeholder="Cari..."
              v-model="optionsTable.search"
            />
          </div>
        </div>
        <v-data-table
          :headers="headers"
          :items="[]"
          :options.sync="optionsTable"
        >
        </v-data-table>
      </div>
    </div>

    <v-dialog v-model="modalForm" max-width="1200" persistent>
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "TagGroup",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
    Form: () => import("./form.vue"),
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
      modalForm: false,
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
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("GetAllMahasiswa");
      if (value) this.$store.dispatch("GetAllPegawai");
      this.modalForm = value;
    },
  },
};
</script>
