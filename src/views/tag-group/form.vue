<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Tag Group</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label class="mb-2 fw-medium fs-14">Nama</label>
            <v-text-field
              placeholder="Nama"
              v-model="name"
              outlined
              dense
              :rules="[(v) => !!v || 'Nama is required']"
            />
          </div>
        </div>

        <InputTablePegawai v-model="data_pegawai" />
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
    InputTablePegawai: () =>
      import("@/components/atoms/input-table-pegawai.vue"),
  },
  data: () => ({}),
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
    data_pegawai: {
      get() {
        return this.$store.state.tagGroup.form.data_pegawai;
      },
      set(value) {
        this.$store.commit("SET_FORM_TAG_GROUP", {
          key: "data_pegawai",
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
