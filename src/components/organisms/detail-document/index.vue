<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Detail Document</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <table class="mb-5 fs-14">
              <tr
                v-for="(item, i) in [
                  { text: 'Name', value: report.name },
                  { text: 'Type', value: report.type },
                  { text: 'Document', value: report.filepath },
                ]"
                style="line-height: 30px; vertical-align: top"
                :key="i"
              >
                <td style="min-width: 150px">{{ item.text }}</td>
                <td style="min-width: 20px">:</td>
                <td v-if="item.text !== 'Document'">{{ item.value }}</td>
                <td v-else>
                  <a :href="handleDownload(item.value)" target="_blank">
                    {{ item.value }}
                  </a>
                </td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="mb-5 fs-14">
              <tr
                v-for="(item, i) in [
                  { text: 'Created By', value: report.created_by },
                  {
                    text: 'Created At',
                    value: moment(report.created_at).format('DD MMMM YYYY'),
                  },
                ]"
                style="line-height: 30px; vertical-align: top"
                :key="i"
              >
                <td style="min-width: 150px">{{ item.text }}</td>
                <td style="min-width: 20px">:</td>
                <td>{{ item.value }}</td>
              </tr>
            </table>
          </div>
        </div>
        <table class="mb-5 fs-14">
          <tr
            v-for="(item, i) in [{ text: 'Remarks', value: report.remarks }]"
            style="line-height: 30px; vertical-align: top"
            :key="i"
          >
            <td style="min-width: 150px">{{ item.text }}</td>
            <td style="min-width: 20px">:</td>
            <td>{{ item.value }}</td>
          </tr>
        </table>

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

        <!-- <div class="card border-top-0 rounded-0">
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
                { text: 'NIP', value: 'NIP' },
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
        </div> -->
      </div>
    </v-card>
  </v-form>
</template>

<script>
import moment from "moment";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "DocumentDetail",
  data: () => ({
    tab_list: ["Tag Group", "Mahasiswa", "Pegawai"],
    tab_active: "Tag Group",
    moment,
  }),
  computed: {
    isLoading() {
      return this.$store.state.document.isLoading;
    },
    report() {
      return this.$store.state.document.detail;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
    handleDownload(filename) {
      return apiUrl.split("/api")[0] + "/documents/" + filename;
    },
  },
};
</script>
