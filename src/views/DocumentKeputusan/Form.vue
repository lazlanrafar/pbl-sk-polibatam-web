<template>
  <v-card class="bg-white" :loading="isLoading">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">
          {{ isUpdate ? "Update" : "Create" }} Dokumen Keputusan
        </h5>
        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <v-form ref="initialForm" @submit.prevent="handleSubmit">
        <v-file-input
          :label="isUpdate ? 'Upload Dokumen untuk Update' : 'Dokumen'"
          outlined
          dense
          v-model="filePath"
          accept="application/pdf"
          required
        />
        <v-text-field label="Nama" outlined v-model="nama" dense />
        <v-select
          :items="listTagGroup"
          v-model="tagId"
          item-text="nama"
          item-value="id"
          label="Tag Group"
          outlined
          dense
        />

        <v-textarea v-model="deskripsi" outlined label="Deskripsi" />
        <div class="d-flex justify-content-between">
          <v-btn class="text-capitalize" color="secondary" @click="handleClose">
            Kembali
          </v-btn>
          <v-btn class="text-capitalize" color="primary" type="submit">
            {{ isUpdate ? "Update" : "Simpan" }}
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "DokumenKeputusanForm",
  computed: {
    isLoading() {
      return this.$store.state.dokumenKeputusan.isLoading;
    },
    listTagGroup() {
      return this.$store.state.dokumenKeputusan.listTagGroup;
    },
    isUpdate() {
      return this.$store.state.dokumenKeputusan.isUpdate;
    },
    nama: {
      get() {
        return this.$store.state.dokumenKeputusan.form.nama;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOKUMEN_KEPUTUSAN", {
          key: "nama",
          value,
        });
      },
    },
    filePath: {
      get() {
        return this.$store.state.dokumenKeputusan.form.filePath;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOKUMEN_KEPUTUSAN", {
          key: "filePath",
          value,
        });
      },
    },
    deskripsi: {
      get() {
        return this.$store.state.dokumenKeputusan.form.deskripsi;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOKUMEN_KEPUTUSAN", {
          key: "deskripsi",
          value,
        });
      },
    },
    tagId: {
      get() {
        return this.$store.state.dokumenKeputusan.form.tagId;
      },
      set(value) {
        this.$store.commit("SET_FORM_DOKUMEN_KEPUTUSAN", {
          key: "tagId",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$refs.initialForm.reset();
      this.$store.commit("SET_IS_UPDATE_DOKUMEN_KEPUTUSAN", false);
      this.$emit("modalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          await this.$store
            .dispatch("updateDokumenKeputusan", this.isUpdate)
            .then(() => {
              this.handleClose();
            });
        } else {
          await this.$store.dispatch("createDokumenKeputusan").then(() => {
            this.handleClose();
          });
        }
      }
    },
  },
};
</script>
