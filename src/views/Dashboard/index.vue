<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ reports.totalSuratTugas }}</h3>
                <p>Surat Tugas</p>
              </div>
              <div class="icon">
                <i class="ion ion-document-text"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>{{ reports.totalSuratKeputusan }}</h3>
                <p>Surat Keputusan</p>
              </div>
              <div class="icon">
                <i class="ion ion-android-document"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>{{ reports.totalTagGroup }}</h3>
                <p>Document Group</p>
              </div>
              <div class="icon">
                <i class="ion ion-social-buffer"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>{{ reports.totalAdmin }}</h3>
                <p>Management User</p>
              </div>
              <div class="icon">
                <i class="ion ion-android-people"></i>
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
    </section>
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
  },
  created() {
    this.$store.dispatch("FetchDashboard");
  },
};
</script>
