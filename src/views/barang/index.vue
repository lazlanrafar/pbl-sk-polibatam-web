<template>
  <div>
    <div class="d-flex flex-column flex-sm-row justify-content-between">
      <HeaderTitle title="Data Barang" subtitle="Data Barang" />

      <div class="mb-5 mb-sm-0">
        <v-btn class="btn btn-primary" @click="handleModalForm">
          <i class="fa-solid fa-plus"></i>
          Tambah
        </v-btn>
      </div>
    </div>
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
          :items="[{}]"
          :loading="isLoading"
          :options.sync="optionsTable"
          :search="optionsTable.search"
        >
          <template v-slot:[`item.action`]="{}">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="btn btn-outline-primary" v-bind="attrs" v-on="on">
                  <span class="fw-light">Action</span>
                  <i class="fa-solid fa-chevron-down small"></i>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="handleModalForm">
                  <v-list-item-title class="text-primary text-opacity-75">
                    <i class="fa-regular fa-pen-to-square small mr-2"></i>
                    <span class="small">Edit</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleModalFormUpdateStock">
                  <v-list-item-title class="text-primary text-opacity-75">
                    <i class="fa-solid fa-plus-minus small mr-2"></i>
                    <span class="small">Tambah / Kurangi Stock</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleModalHistory">
                  <v-list-item-title class="text-primary text-opacity-75">
                    <i class="fa-solid fa-clock-rotate-left small mr-2"></i>
                    <span class="small">History</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="click">
                  <v-list-item-title class="text-primary text-opacity-75">
                    <i class="fa-regular fa-trash-can small mr-2"></i>
                    <span class="small">Hapus</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </div>
    </div>

    <v-dialog v-model="modalForm" persistent max-width="700">
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>

    <v-dialog v-model="modalFormUpdateStock" persistent max-width="500">
      <FormUpdateStock
        @handleModalFormUpdateStock="handleModalFormUpdateStock"
      />
    </v-dialog>

    <v-dialog v-model="modalHistory" persistent max-width="800">
      <History @handleModalHistory="handleModalHistory" />
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Barang Page",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
    Form: () => import("./form.vue"),
    FormUpdateStock: () =>
      import("@/components/organisms/barang-form-update-stock"),
    History: () => import("@/components/organisms/barang-history"),
  },
  data() {
    return {
      headers: [
        { text: "No", value: "name" },
        { text: "No Dokumen", value: "name" },
        { text: "Customer", value: "calories" },
        { text: "Tanggal", value: "fat" },
        { text: "Nama Barang", value: "carbs" },
        { text: "Stock", value: "protein" },
        { text: "Satuan Kemasan", value: "iron" },
        { text: "Action", value: "action" },
      ],
      modalForm: false,
      modalFormUpdateStock: false,
      modalHistory: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.barang.isLoading;
    },
    optionsTable: {
      get() {
        return this.$store.state.barang.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_BARANG", value);
      },
    },
  },
  methods: {
    handleModalForm() {
      this.modalForm = !this.modalForm;
    },
    handleModalFormUpdateStock() {
      this.modalFormUpdateStock = !this.modalFormUpdateStock;
    },
    handleModalHistory() {
      this.modalHistory = !this.modalHistory;
    },
    click() {
      console.log("click");
    },
  },
};
</script>
