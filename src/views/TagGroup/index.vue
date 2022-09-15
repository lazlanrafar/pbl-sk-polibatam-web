<template>
  <div class="row">
    <div class="col">
      <v-card class="card h-100">
        <div class="card-body">
          <h3 class="font-weight-bold mb-10">Tag Group</h3>
          <div class="card border">
            <div class="card-body">
              <button class="btn btn-primary" @click="handleModalForm">
                <i class="fa fa-plus"></i>
                Tambah
              </button>
              <div class="row justify-content-end">
                <div class="col-md-3">
                  <v-text-field
                    label="Cari"
                    prepend-inner-icon="mdi-magnify"
                    v-model="optionsTableTagGroup.search"
                    outlined
                    dense
                  />
                </div>
              </div>
              <v-data-table
                :headers="headers"
                :items="reports"
                :search="optionsTableTagGroup.search"
                :loading="isLoading"
              >
                <template v-slot:[`item.no`]="props">
                  {{ (props.index += 1) }}
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <v-dialog v-model="modalForm" max-width="500" persistent>
      <Form @modalForm="modalForm = false" />
    </v-dialog>
  </div>
</template>

<script>
import Form from "./Form.vue";
export default {
  name: "DocumentGroupPage",
  components: { Form },
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Aksi", value: "aksi" },
    ],
    modalForm: false,
  }),
  computed: {
    reports() {
      return this.$store.state.tagGroup.reports;
    },
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    optionsTableTagGroup: {
      get() {
        return this.$store.state.tagGroup.optionsTableTagGroup;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_TABLE_TAG_GROUP", val);
      },
    },
  },
  methods: {
    async handleModalForm() {
      this.$store.dispatch("fetchBeforeForm");
      this.modalForm = !this.modalForm;
    },
  },
  created() {
    this.$store.dispatch("fetchAllTagGroup");
  },
};
</script>
