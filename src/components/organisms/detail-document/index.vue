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
                  { text: 'No Document', value: report.name },
                  {
                    text: 'Tanggal Document',
                    value: moment(report.date).format('DD MMMM YYYY'),
                  },
                  { text: 'Nama Document', value: report.remarks },
                  { text: 'Type', value: report.type },
                ]"
                style="line-height: 30px; vertical-align: top"
                :key="i"
              >
                <td style="min-width: 150px">{{ item.text }}</td>
                <td style="min-width: 20px">:</td>
                <td>{{ item.value }}</td>
              </tr>
              <tr style="line-height: 30px; vertical-align: top">
                <td>Document</td>
                <td>:</td>
                <td>
                  <a :href="handleDownload(report.filepath)" target="_blank">
                    Download Document
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <ul class="nav nav-tabs pl-0">
          <li class="nav-item" v-for="(item, i) in tab_list" :key="i">
            <a
              :class="`nav-link fs-14  ${
                item == tab_active ? 'fw-semibold active' : 'text-muted'
              }`"
              @click="tab_active = item"
              >{{ item }}</a
            >
          </li>
        </ul>

        <div class="card border-top-0 rounded-0">
          <div class="card-body" v-if="tab_active == 'Tag Group'">
            <v-data-table
              :items="report.details"
              :headers="[
                { text: 'Name', value: 'tag_group.name' },
                { text: 'Created By', value: 'tag_group.created_by' },
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
        </div>
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
    tab_list: ["Tag Group", "Pegawai"],
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
