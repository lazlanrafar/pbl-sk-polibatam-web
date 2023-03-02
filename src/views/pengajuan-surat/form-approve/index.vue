<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Approve Pengajuan - {{ report.title }}
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col">
            <table class="mb-5 fs-14">
              <tr
                v-for="(item, i) in [
                  {
                    text: 'Judul Surat Keputusan/Peraturan',
                    value: report.title,
                  },
                  { text: 'Jenis Surat', value: report.type },
                  {
                    text: 'Lampiran',
                    value: report.filepath_lampiran || 'Tidak Ada',
                  },
                  { text: 'Rencana Pengambilan', value: report.pickup_plan },
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
import moment from "moment";

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
    moment,
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
      this.$refs.initialForm.reset();
      this.$store.commit("RESET_FORM_DOCUMENT");

      this.$emit("handleModalFormApprove", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
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
