<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">
            Reject Pengajuan - {{ report.title }}
          </p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
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
          <div class="col-12">
            <label class="mb-2 fw-medium">Catatan</label>
            <v-textarea
              placeholder="remarks"
              v-model="remarks"
              outlined
              dense
              rows="3"
            />
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
    remarks: {
      get() {
        return this.$store.state.pengajuanSurat.form_reject.remarks;
      },
      set(value) {
        this.$store.commit("SET_FORM_REJECT_PENGAJUAN_SURAT", {
          key: "remarks",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_REJECT_PENGAJUAN_SURAT");

      this.$emit("handleModalFormReject", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        this.$store.dispatch("RejectPengajuan").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
