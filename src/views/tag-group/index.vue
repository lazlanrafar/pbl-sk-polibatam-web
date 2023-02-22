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
          :items="reports"
          :options.sync="optionsTable"
          :search="optionsTable.search"
          :loading="isLoading"
        >
          <template v-slot:[`item.created_at`]="{ item }">
            {{ moment(item.created_at).format("DD MMMM YYYY | HH:mm") }}
          </template>
          <template v-slot:[`item.action`]="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  class="btn btn-outline-primary py-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span class="fw-light mr-1">Action</span>
                  <i class="fa-solid fa-chevron-down small"></i>
                </v-btn>
              </template>
              <v-list min-width="150">
                <v-list-item @click="handleModalDetail(true, item.id)">
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fa-regular fa-eye small mr-2"></i>
                    <span>Detail</span>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleEdit(item.id)">
                  <v-list-item-title class="text-primary fs-12">
                    <i class="fas fa-edit small mr-2"></i>
                    <span>Edit</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </div>
    </div>

    <v-dialog v-model="modalForm" max-width="1200" persistent>
      <Form @handleModalForm="handleModalForm" />
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "TagGroup",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
    Form: () => import("./form.vue"),
  },
  data() {
    return {
      moment,
      headers: [
        { text: "No", value: "no" },
        { text: "Name", value: "name" },
        { text: "Created At", value: "created_at" },
        { text: "Created By", value: "created_by" },
        { text: "Action", value: "action", align: "right", sortable: false },
      ],
      modalForm: false,
    };
  },
  computed: {
    reports() {
      return this.$store.state.tagGroup.reports;
    },
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    optionsTable: {
      get() {
        return this.$store.state.tagGroup.optionsTable;
      },
      set(value) {
        this.$store.commit("SET_OPTIONS_TABLE_TAG_GROUP", value);
      },
    },
  },
  methods: {
    handleModalForm(value) {
      if (value) this.$store.dispatch("GetAllMahasiswa");
      if (value) this.$store.dispatch("GetAllPegawai");
      this.modalForm = value;
    },
    async handleEdit(id) {
      await this.handleModalForm(true);
      await this.$store.dispatch("SetFormUpdateTagGroup", id);
      await this.$store.commit("SET_IS_UPDATE_TAG_GROUP", id);
    },
  },
  mounted() {
    this.$store.dispatch("GetAllTagGroup");
  },
};
</script>
