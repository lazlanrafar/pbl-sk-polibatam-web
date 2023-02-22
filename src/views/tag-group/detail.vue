<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Detail Tag Group - {{ report.name }}
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
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

        <div class="card border-top-0 rounded-0">
          <div class="card-body" v-if="tab_active == 'Mahasiswa'">
            <v-data-table
              :items="report.data_mahasiswa"
              :headers="[
                { text: 'Nrp', value: 'NRP' },
                { text: 'Nama', value: 'NAMA' },
                { text: 'Agama', value: 'AGAMA' },
                { text: 'Kelas', value: 'KELAS' },
                { text: 'Jurusan', value: 'JURUSAN' },
                { text: 'Status', value: 'STATUS' },
              ]"
            ></v-data-table>
          </div>
          <div class="card-body" v-if="tab_active == 'Pegawai'">
            <v-data-table
              :items="report.data_pegawai"
              :headers="[
                { text: 'NIK', value: 'NIK' },
                { text: 'Nama', value: 'NAMA' },
                { text: 'Staff', value: 'STAFF' },
                { text: 'Unit', value: 'UNIT' },
              ]"
            >
              <template v-slot:[`item.NAMA`]="{ item }">
                <span> {{ item.GELAR_DPN }} </span>
                <span> {{ item.NAMA }}</span>
                <span> {{ item.GELAR_BLK }}</span>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "TagGroupDetail",
  data: () => ({
    tab_list: ["Mahasiswa", "Pegawai"],
    tab_active: "Mahasiswa",
  }),
  computed: {
    isLoading() {
      return this.$store.state.tagGroup.isLoading;
    },
    report() {
      return this.$store.state.tagGroup.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
  },
};
</script>
