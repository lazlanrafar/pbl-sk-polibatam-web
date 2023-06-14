<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form Publish Pengajuan</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label class="mb-2 fs-14">File Document</label>
            <v-file-input
              placeholder="File"
              v-model="filepath"
              filled
              dense
              :rules="[(v) => !!v || 'File Document is required']"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fs-14">Tanggal SK</label>
            <date-picker v-model="date" />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fs-14">No SK</label>
            <v-text-field
              placeholder="No SK"
              v-model="name"
              outlined
              dense
              :rules="[(v) => !!v || 'No SK is required']"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fs-14">Nama SK</label>
            <v-text-field
              placeholder="Nama SK"
              v-model="remarks"
              outlined
              dense
              :rules="[(v) => !!v || 'No Surat is required']"
            />
          </div>
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

        <div class="card mb-5 border-top-0 rounded-0">
          <div :class="tab_active == 'Tag Group' ? '' : 'd-none'">
            <InputTableTagGroup v-model="details" />
          </div>
          <div :class="tab_active == 'Pegawai' ? '' : 'd-none'">
            <InputTablePegawai v-model="data_pegawai" />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-end">
          <button class="mr-5 text-muted" type="button" @click="handleClose">
            Kembali
          </button>
          <button
            class="btn bg-darkblue text-white"
            type="submit"
            :disabled="isLoading"
          >
            Publish
          </button>
        </div>
      </div>
    </v-card>
  </v-form>
</template>

<script>
import DatePicker from "@/components/atoms/date-picker.vue";

export default {
  name: "PengajuanPublishForm",
  components: {
    InputTableTagGroup: () =>
      import("@/components/atoms/input-table-tag-group.vue"),
    InputTablePegawai: () =>
      import("@/components/atoms/input-table-pegawai.vue"),
    DatePicker,
  },
  data: () => ({
    tab_list: ["Tag Group", "Pegawai"],
    tab_active: "Tag Group",
  }),
  computed: {
    isLoading() {
      return this.$store.state.pengajuanSurat.isLoading;
    },
    isUpdate() {
      return this.$store.state.pengajuanSurat.isUpdate;
    },
    filepath: {
      get() {
        return this.$store.state.pengajuanSurat.form_publish.filepath;
      },
      set(value) {
        this.$store.commit("SET_FORM_PUBLISH_PENGAJUAN_SURAT", {
          key: "filepath",
          value,
        });
      },
    },
    date: {
      get() {
        return this.$store.state.pengajuanSurat.form_publish.date;
      },
      set(value) {
        this.$store.commit("SET_FORM_PUBLISH_PENGAJUAN_SURAT", {
          key: "date",
          value,
        });
      },
    },
    name: {
      get() {
        return this.$store.state.pengajuanSurat.form_publish.name;
      },
      set(value) {
        this.$store.commit("SET_FORM_PUBLISH_PENGAJUAN_SURAT", {
          key: "name",
          value,
        });
      },
    },
    remarks: {
      get() {
        return this.$store.state.pengajuanSurat.form_publish.remarks;
      },
      set(value) {
        this.$store.commit("SET_FORM_PUBLISH_PENGAJUAN_SURAT", {
          key: "remarks",
          value,
        });
      },
    },
    data_pegawai: {
      get() {
        return this.$store.state.pengajuanSurat.form_publish.data_pegawai;
      },
      set(value) {
        this.$store.commit("SET_FORM_PUBLISH_PENGAJUAN_SURAT", {
          key: "data_pegawai",
          value,
        });
      },
    },
    details: {
      get() {
        return this.$store.state.pengajuanSurat.form_publish.details;
      },
      set(value) {
        this.$store.commit("SET_FORM_PUBLISH_PENGAJUAN_SURAT", {
          key: "details",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("SET_IS_UPDATE_PENGAJUAN_SURAT", false);
      this.$store.commit("RESET_FORM_PUBLISH_PENGAJUAN_SURAT");

      this.$emit("handleModalFormPublish", false);
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        this.$store.dispatch("PublishPengajuan", this.isUpdate).then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
