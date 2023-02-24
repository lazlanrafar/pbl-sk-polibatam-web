<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Document</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label class="mb-2 fw-medium">File Document</label>
            <v-file-input
              placeholder="File"
              v-model="filepath"
              outlined
              dense
              :rules="[(v) => !!v || 'File Document is required']"
              hide-details="auto"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium">Name</label>
            <v-text-field
              placeholder="Name"
              v-model="name"
              outlined
              dense
              :rules="[(v) => !!v || 'Name is required']"
              hide-details="auto"
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium">Catatan</label>
            <v-textarea
              placeholder="remarks"
              v-model="remarks"
              outlined
              dense
              rows="3"
            />
          </div>
        </div>

        <ul class="nav nav-tabs pl-0">
          <li class="nav-item" v-for="(item, i) in tab_list" :key="i">
            <a
              :class="`nav-link  ${
                item == tab_active ? 'fw-semibold active' : 'text-muted'
              }`"
              @click="tab_active = item"
              >{{ item }}</a
            >
          </li>
        </ul>

        <div class="card mb-5 border-top-0 rounded-0">
          <div :class="tab_active == 'Tag Group' ? '' : 'd-none'">
            <SelectTagGroup />
          </div>
          <div :class="tab_active == 'Mahasiswa' ? '' : 'd-none'">
            <SelectMahasiswa />
          </div>
          <div :class="tab_active == 'Pegawai' ? '' : 'd-none'">
            <SelectPegawai />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button class="btn bg-darkblue text-white" type="submit">
            Simpan
          </button>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "DocumentForm",
  components: {
    SelectTagGroup: () => import("./select-tag-group.vue"),
    SelectMahasiswa: () => import("./select-mahasiswa.vue"),
    SelectPegawai: () => import("./select-pegawai.vue"),
  },
  data: () => ({
    tab_list: ["Tag Group", "Mahasiswa", "Pegawai"],
    tab_active: "Tag Group",
  }),
  computed: {
    isLoading() {
      return this.$store.state.document.isLoading;
    },
    isUpdate() {
      return this.$store.state.document.isUpdate;
    },
    filepath: {
      get() {
        return this.$store.state.document.form.filepath;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOCUMENT", {
          key: "filepath",
          value,
        });
      },
    },
    name: {
      get() {
        return this.$store.state.document.form.name;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOCUMENT", {
          key: "name",
          value,
        });
      },
    },
    remarks: {
      get() {
        return this.$store.state.document.form.remarks;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOCUMENT", {
          key: "remarks",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$refs.initialForm.reset();
      this.$store.commit("SET_FORM_DOCUMENT", {
        key: "type",
        value: "",
      });

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        // if (this.isUpdate) {
        //   this.$store.dispatch("UpdateTagGroup", this.isUpdate).then((res) => {
        //     if (res) {
        //       this.handleClose();
        //     }
        //   });
        //   return;
        // }
        this.$store.dispatch("CreateDocument").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
