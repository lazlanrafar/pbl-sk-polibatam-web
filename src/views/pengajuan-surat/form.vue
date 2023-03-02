<template>
  <v-form ref="initialForm" @submit.prevent="handleSubmit">
    <v-card class="card" :loading="isLoading">
      <div class="card-header py-3">
        <div class="d-flex justify-content-between align-items-center">
          <p class="card-title fw-medium mb-0">Form pengajuan Surat</p>
          <v-btn icon @click="handleClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <label class="mb-2 fw-medium">
              Judul Surat Keputusan/Peraturan
            </label>
            <v-text-field
              placeholder="Judul Surat Keputusan/Peraturan"
              outlined
              dense
              :rules="[(v) => !!v || 'Judul Surat  is required']"
              hide-details="auto"
              v-model="title"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium">Jenis Surat</label>
            <v-select
              placeholder="Jenis Surat"
              outlined
              dense
              :items="list_type"
              v-model="type"
              :rules="[(v) => !!v || 'Jenis Surat is required']"
              hide-details="auto"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium">Lampiran</label>
            <v-select
              placeholder="Lampiran"
              outlined
              dense
              :items="list_lampiran"
              v-model="is_lampiran"
              item-text="key"
              item-value="value"
              hide-details="auto"
            />
          </div>
          <div class="col-md-6">
            <label class="mb-2 fw-medium">Rencana Pengambilan</label>
            <v-text-field
              placeholder="Rencana Pengambilan"
              outlined
              dense
              hide-details="auto"
              v-model="pickup_plan"
            />
          </div>
          <div class="col-md-6" v-if="is_lampiran">
            <label class="mb-2 fw-medium">Lampiran</label>
            <v-file-input
              placeholder="Lampiran"
              outlined
              dense
              v-model="filepath_lampiran"
              messages="Upload lampiran untuk mengupdate data"
              hide-details="auto"
              v-if="isUpdate"
            />
            <v-file-input
              placeholder="Lampiran"
              outlined
              dense
              v-model="filepath_lampiran"
              :rules="[(v) => !!v || 'Lampiran is required']"
              hide-details="auto"
              v-else
            />
          </div>
          <div class="col-12">
            <label class="mb-3 fw-medium">Menimbang</label>
            <div class="row" v-for="(item, i) in list_consider" :key="i">
              <div class="col-11">
                <v-text-field
                  placeholder="......."
                  :prefix="`${i + 1} .`"
                  outlined
                  dense
                  v-model="list_consider[i]"
                  hide-details="auto"
                />
              </div>
              <div class="col-1">
                <v-btn
                  icon
                  v-if="i + 1 === list_consider.length"
                  @click="handleAdd('consider')"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-btn icon v-else @click="handleDelete('consider', i)">
                  <v-icon> mdi-trash-can-outline </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="col-12">
            <label class="mb-3 fw-medium">Memperhatikan</label>
            <div class="row" v-for="(item, i) in list_observe" :key="i">
              <div class="col-11">
                <v-text-field
                  placeholder="......."
                  :prefix="`${i + 1} .`"
                  outlined
                  dense
                  v-model="list_observe[i]"
                  hide-details="auto"
                />
              </div>
              <div class="col-1">
                <v-btn
                  icon
                  v-if="i + 1 === list_observe.length"
                  @click="handleAdd('observe')"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-btn icon v-else @click="handleDelete('observe', i)">
                  <v-icon> mdi-trash-can-outline </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div class="col-12">
            <label class="mb-3 fw-medium">Memutuskan</label>
            <div class="row" v-for="(item, i) in list_decide" :key="i">
              <div class="col-11">
                <v-text-field
                  placeholder="......."
                  :prefix="`${i + 1} .`"
                  outlined
                  dense
                  v-model="list_decide[i]"
                  hide-details="auto"
                />
              </div>
              <div class="col-1">
                <v-btn
                  icon
                  v-if="i + 1 === list_decide.length"
                  @click="handleAdd('decide')"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
                <v-btn icon v-else @click="handleDelete('decide', i)">
                  <v-icon> mdi-trash-can-outline </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer mt-5">
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
  name: "FormPengajuanSurat",
  components: {},
  data: () => ({}),
  computed: {
    isLoading() {
      return this.$store.state.pengajuanSurat.isLoading;
    },
    isUpdate() {
      return this.$store.state.pengajuanSurat.isUpdate;
    },
    list_type() {
      return this.$store.state.pengajuanSurat.list_type;
    },
    list_lampiran() {
      return this.$store.state.pengajuanSurat.list_lampiran;
    },
    title: {
      get() {
        return this.$store.state.pengajuanSurat.form.title;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "title",
          value,
        });
      },
    },
    type: {
      get() {
        return this.$store.state.pengajuanSurat.form.type;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "type",
          value,
        });
      },
    },
    is_lampiran: {
      get() {
        return this.$store.state.pengajuanSurat.form.is_lampiran;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "is_lampiran",
          value,
        });
      },
    },
    filepath_lampiran: {
      get() {
        return this.$store.state.pengajuanSurat.form.filepath_lampiran;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "filepath_lampiran",
          value,
        });
      },
    },
    pickup_plan: {
      get() {
        return this.$store.state.pengajuanSurat.form.pickup_plan;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "pickup_plan",
          value,
        });
      },
    },
    list_consider: {
      get() {
        return this.$store.state.pengajuanSurat.form.list_consider;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "list_consider",
          value,
        });
      },
    },
    list_observe: {
      get() {
        return this.$store.state.pengajuanSurat.form.list_observe;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "list_observe",
          value,
        });
      },
    },
    list_decide: {
      get() {
        return this.$store.state.pengajuanSurat.form.list_decide;
      },
      set(value) {
        this.$store.commit("SET_FORM_PENGAJUAN_SURAT", {
          key: "list_decide",
          value,
        });
      },
    },
  },
  methods: {
    handleClose() {
      this.$store.commit("RESET_FORM_PENGAJUAN_SURAT");
      this.$store.commit("SET_IS_UPDATE_PENGAJUAN_SURAT", false);
      this.$emit("handleModalForm", false);
    },
    handleAdd(params) {
      switch (params) {
        case "consider":
          this.list_consider.push("");
          break;
        case "observe":
          this.list_observe.push("");
          break;
        case "decide":
          this.list_decide.push("");
          break;
        default:
          break;
      }
    },
    handleDelete(params, index) {
      switch (params) {
        case "consider":
          this.list_consider.splice(index, 1);
          break;
        case "observe":
          this.list_observe.splice(index, 1);
          break;
        case "decide":
          this.list_decide.splice(index, 1);
          break;
        default:
          break;
      }
    },
    async handleSubmit() {
      if (this.$refs.initialForm.validate()) {
        if (this.isUpdate) {
          this.$store.dispatch("UpdatePengajuan", this.isUpdate).then((res) => {
            if (res) {
              this.handleClose();
            }
          });
          return;
        }
        this.$store.dispatch("CreatePengajuan").then((res) => {
          if (res) {
            this.handleClose();
          }
        });
      }
    },
  },
};
</script>
