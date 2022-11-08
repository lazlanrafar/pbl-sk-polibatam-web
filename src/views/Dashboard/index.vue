<template>
  <div>
    <div class="row mb-2" v-if="!isAdmin">
      <div class="col-sm-6">
        <h1 class="m-0">Dashboard</h1>
      </div>
    </div>

    <div class="row" v-if="isAdmin">
      <div class="col-lg-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-header d-flex flex-column align-items-start pb-0">
            <div class="avatar bg-rgba-warning p-50 m-0">
              <div class="avatar-content">
                <i class="feather icon-file text-warning font-medium-5"></i>
              </div>
            </div>
            <h2 class="text-bold-700 mt-1">{{ reports.totalSuratTugas }}</h2>
            <p>Surat Tugas</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-header d-flex flex-column align-items-start pb-0">
            <div class="avatar bg-rgba-success p-50 m-0">
              <div class="avatar-content">
                <i
                  class="feather icon-file-minus text-success font-medium-5"
                ></i>
              </div>
            </div>
            <h2 class="text-bold-700 mt-1">
              {{ reports.totalSuratKeputusan }}
            </h2>
            <p>Surat Keputusan</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-header d-flex flex-column align-items-start pb-0">
            <div class="avatar bg-rgba-danger p-50 m-0">
              <div class="avatar-content">
                <i class="feather icon-folder text-danger font-medium-5"></i>
              </div>
            </div>
            <h2 class="text-bold-700 mt-1">{{ reports.totalTagGroup }}</h2>
            <p>Document Group</p>
          </div>
          <div class="card-content">
            <div id="line-area-chart-3"></div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12">
        <div class="card">
          <div class="card-header d-flex flex-column align-items-start pb-0">
            <div class="avatar bg-rgba-primary p-50 m-0">
              <div class="avatar-content">
                <i class="feather icon-users text-primary font-medium-5"></i>
              </div>
            </div>
            <h2 class="text-bold-700 mt-1">{{ reports.totalAdmin }}</h2>
            <p>Management User</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <div class="card-title">Recents File</div>
          </div>
          <div class="card-body">
            <v-data-table :headers="headers" :items="reports.recentFile">
              <template v-slot:[`item.no`]="props">
                {{ (props.index += 1) }}
              </template>
              <template v-slot:[`item.dokumen`]="{ item }">
                <a
                  :href="`${apiUrl}/documents/${item.filePath}`"
                  target="_BLANK"
                  >Download</a
                >
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "HomePage",
  components: {},
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Deskripsi", value: "deskripsi" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Dokumen", value: "dokumen" },
    ],
    apiUrl,
  }),
  computed: {
    isLoading() {
      return this.$store.state.dashboard.isLoading;
    },
    reports() {
      return this.$store.state.dashboard.reports;
    },
    isAdmin() {
      return this.$store.state.app.user.isAdmin;
    },
  },
  created() {
    this.$store.dispatch("FetchDashboard");
  },
};
</script>
