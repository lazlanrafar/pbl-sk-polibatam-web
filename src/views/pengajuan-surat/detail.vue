<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Detail Pengajuan</p>
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
                  {
                    text: 'Judul Surat Keputusan/Peraturan',
                    value: report.title,
                  },
                  { text: 'Jenis Surat', value: report.type },
                  { text: 'Rencana Pengambilan', value: report.pickup_plan },
                  { text: 'Lampiran', value: report.filepath_lampiran },
                ]"
                style="line-height: 30px; vertical-align: top"
                :key="i"
              >
                <td class="fw-medium" style="min-width: 270px">
                  {{ item.text }}
                </td>
                <td style="min-width: 20px">:</td>
                <td v-if="item.text !== 'Lampiran'">{{ item.value }}</td>
                <td v-else>
                  <span v-if="!report.is_lampiran">Tidak Ada</span>
                  <a v-else :href="handleDownload(item.value)" target="_blank">
                    {{ item.value }}
                  </a>
                </td>
              </tr>
              <tr v-if="report.filepath">
                <td class="fw-medium">Document</td>
                <td>:</td>
                <td>
                  <a :href="handleDownload(report.filepath)" target="_blank">
                    {{ report.filepath }}
                  </a>
                </td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="mb-5 fs-14">
              <tr
                v-for="(item, i) in [
                  {
                    text: 'Dibuat Pada',
                    value: moment(report.created_at).format('DD MMMM YYYY'),
                  },
                  { text: 'Dibuat Oleh', value: report.created_by },
                ]"
                style="line-height: 30px; vertical-align: top"
                :key="i"
              >
                <td class="fw-medium" style="min-width: 270px">
                  {{ item.text }}
                </td>
                <td style="min-width: 20px">:</td>
                <td>{{ item.value }}</td>
              </tr>
            </table>
          </div>
        </div>
        <hr />
        <div class="fs-14">
          <p class="fw-medium">Menimbang</p>

          <ol>
            <li v-for="(item, i) in report.list_consider" :key="i">
              {{ item }}
            </li>
          </ol>
        </div>
        <hr />
        <div class="fs-14">
          <p class="fw-medium">Memperhatikan</p>

          <ol>
            <li v-for="(item, i) in report.list_observe" :key="i">
              {{ item }}
            </li>
          </ol>
        </div>
        <hr />
        <div class="fs-14">
          <p class="fw-medium">Memutuskan</p>

          <ol>
            <li v-for="(item, i) in report.list_decide" :key="i">
              {{ item }}
            </li>
          </ol>
        </div>
        <br />

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
              :headers="[{ text: 'Name', value: 'tag_group.name' }]"
            ></v-data-table>
          </div>
          <div class="card-body" v-if="tab_active == 'Pegawai'">
            <v-data-table
              :items="report.data_pegawai"
              :headers="[
                { text: 'NIP', value: 'NIP' },
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
      <div class="card-footer mt-5">
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button class="btn bg-darkblue text-white" @click="handleApprove">
            Approve
          </button>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import moment from "moment";
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "PengajuanDetail",
  data: () => ({
    moment,
    tab_list: ["Tag Group", "Pegawai"],
    tab_active: "Tag Group",
  }),
  computed: {
    isLoading() {
      return this.$store.state.pengajuanSurat.isLoading;
    },
    report() {
      return this.$store.state.pengajuanSurat.report;
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleModalDetail", false);
    },
    handleApprove() {
      this.$emit("handleModalFormApprove", true, this.report.id);

      this.handleClose();
    },
    handleDownload(filename) {
      return apiUrl.split("/api")[0] + "/documents/" + filename;
    },
  },
};
</script>
