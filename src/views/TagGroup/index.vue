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
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                show-expand
              >
                <template v-slot:[`item.no`]="props">
                  {{ (props.index += 1) }}
                </template>
                <template v-slot:[`item.aksi`]="{ item }">
                  <v-btn class="mr-2" icon @click="handleUpdate(item.id)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="handleDelete(item.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="collapsable">
                    <table class="table w-100">
                      <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>NIM</th>
                        <th>Status</th>
                      </tr>
                      <tr v-for="(x, i) in item.tag" :key="i">
                        <td>{{ i + 1 }}</td>
                        <td>{{ x.name }}</td>
                        <td>{{ x.username }}</td>
                        <td>{{ x.nim_nik_unit }}</td>
                        <td>{{ x.jabatan }}</td>
                      </tr>
                    </table>
                  </td>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <v-dialog
      v-model="modalForm"
      max-width="500"
      persistent
      style="z-index: 9999"
    >
      <Form @modalForm="modalForm = false" />
    </v-dialog>
  </div>
</template>

<script>
import Form from "./Form.vue";
import Swal from "sweetalert2";
export default {
  name: "DocumentGroupPage",
  components: { Form },
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Aksi", value: "aksi", align: "right" },
    ],
    modalForm: false,
    expanded: [],
    singleExpand: true,
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
    handleUpdate(id) {
      this.$store.dispatch("setFormTagGroup", id);
      this.$store.commit("SET_IS_UPDATE_TAG_GROUP", id);
      this.handleModalForm();
    },
    handleDelete(id) {
      Swal.fire({
        title: "Apakah anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteTagGroup", id);
        }
      });
    },
  },
  created() {
    this.$store.dispatch("fetchAllTagGroup");
  },
};
</script>
