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
              v-model="name"
              outlined
              dense
              :rules="[(v) => !!v || 'File Document is required']"
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
            />
          </div>
          <div class="col-12">
            <label class="mb-2 fw-medium">remarks</label>
            <v-textarea
              placeholder="remarks"
              v-model="name"
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
          <SelectTagGroup v-if="tab_active == 'Tag Group'" />
          <SelectMahasiswa v-if="tab_active == 'Mahasiswa'" />
          <SelectPegawai v-if="tab_active == 'Pegawai'" />
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
  name: "TagGroupForm",
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
      return this.$store.state.tagGroup.isLoading;
    },
    isUpdate() {
      return this.$store.state.tagGroup.isUpdate;
    },
    name: {
      get() {
        return this.$store.state.tagGroup.form.name;
      },
      set(value) {
        this.$store.commit("SET_FORM_TAG_GROUP", {
          key: "name",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$refs.initialForm.reset();
      this.$store.commit("SET_IS_UPDATE_TAG_GROUP", "");

      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdateTagGroup", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreateTagGroup").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
