<template>
  <v-card class="bg-white" :loading="isLoading">
    <div class="card-header py-3">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">Form Tag Group</h5>
        <v-btn icon @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="card-body">
      <v-form>
        <v-text-field label="Nama" outlined v-model="nama" dense />
        <v-combobox
          v-model="tag"
          :items="listMahasiswa"
          :search-input.sync="search"
          item-text="nim_nik_unit"
          item-value="nim_nik_unit"
          hide-selected
          label="Add some tags"
          multiple
          persistent-hint
          small-chips
          outlined
        >
        </v-combobox>
        <div class="d-flex justify-content-between">
          <v-btn
            class="btn btn-secondary text-capitalize text-white"
            @click="handleClose"
          >
            Kembali
          </v-btn>
          <v-btn
            class="btn btn-primary text-capitalize text-white"
            type="submit"
          >
            Simpan
          </v-btn>
        </div>
      </v-form>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "TagGroupForm",
  data: () => ({
    search: null,
  }),
  computed: {
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    listMahasiswa() {
      return this.$store.state.tagGroup.listMahasiswa;
    },
    nama: {
      get() {
        return this.$store.state.tagGroup.form.nama;
      },
      set(value) {
        this.$store.commit("SET_FORM_TAG_GROUP", {
          key: "nama",
          value,
        });
      },
    },
    tag: {
      get() {
        return this.$store.state.tagGroup.form.tag;
      },
      set(value) {
        this.$store.commit("SET_FORM_TAG_GROUP", {
          key: "tag",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$emit("modalForm", false);
    },
  },
};
</script>
