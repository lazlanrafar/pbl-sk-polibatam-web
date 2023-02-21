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
        <label class="mb-2 fw-medium fs-14">Nama</label>
        <v-text-field
          placeholder="Nama"
          outlined
          dense
          :rules="[(v) => !!v || 'Nama is required']"
        />

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
          <div class="card-body">
            <div class="row justify-content-end">
              <div class="col-12 col-md-6">
                <v-text-field
                  outlined
                  dense
                  prepend-inner-icon="mdi-magnify"
                  placeholder="Cari..."
                />
              </div>
            </div>
            <v-data-table
              :headers="[
                { text: 'Nrp', value: 'NRP' },
                { text: 'Nama', value: 'NAMA' },
                { text: 'Kelas', value: 'KELAS' },
                { text: 'Jurusan', value: 'JURUSAN' },
              ]"
              items-per-page="5"
              :items="list_mahasiswa"
              show-select
            ></v-data-table>
            <!-- <label class="mb-2 fw-medium fs-14">Mahasiswa</label> -->
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
  name: "TagGroupForm",
  data: () => ({
    tab_list: ["Mahasiswa", "Pegawai"],
    tab_active: "Mahasiswa",
  }),
  computed: {
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    list_mahasiswa() {
      return this.$store.state.userManagement.list_mahasiswa;
    },
  },
  methods: {
    handleClose() {
      this.$refs.initialForm.reset();
      this.$emit("handleModalForm", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        console.log("submit");
      }
    },
  },
};
</script>
