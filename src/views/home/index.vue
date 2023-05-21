<template>
  <div>
    <div class="d-flex flex-column flex-sm-row gap-2 gap-md-3">
      <CardBarang type="Surat Tugas" :value="length_st" />
      <CardBarang type="Surat Keterangan" :value="length_sk" />
    </div>

    <div class="card mt-5 mt-sm-10">
      <div class="card-header py-3 bg-darkblue">
        <span class="text-white">Riwayat</span>
      </div>
      <div class="card-body">
        <v-data-table
          :headers="headers"
          :loading="isLoading"
          :items="recent"
          hide-default-footer
        >
          <template v-slot:[`item.remarks`]="{ item }">
            <div v-if="item.remarks.length > 40">
              {{ item.remarks.substring(0, 40) + "..." }}
            </div>
            <div v-else>{{ item.remarks }}</div>
          </template>
          <template v-slot:[`item.created_at`]="{ item }">
            {{ moment(item.created_at).format("DD MMMM YYYY | HH:mm") }}
          </template>
          <template v-slot:[`item.filepath`]="{ item }">
            <a :href="handleDownload(item.filepath)" target="_blank">
              Download Document
            </a>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
const apiUrl = process.env.VUE_APP_API_URL;
import moment from "moment";

export default {
  name: "Home",
  components: {
    CardBarang: () => import("@/components/molecules/card-barang/index.vue"),
  },
  data() {
    return {
      headers: [
        { text: "No Document", value: "name" },
        { text: "Nama Document", value: "remarks" },
        { text: "Dibuat Pada", value: "created_at" },
        { text: "Document", value: "filepath" },
      ],
      moment,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.home.isLoading;
    },
    length_sk() {
      return this.$store.state.home.length_sk;
    },
    length_st() {
      return this.$store.state.home.length_st;
    },
    recent() {
      return this.$store.state.home.recent;
    },
  },
  methods: {
    handleDownload(filename) {
      return apiUrl.split("/api")[0] + "/documents/" + filename;
    },
  },
  mounted() {
    this.$store.dispatch("GetHome");
  },
};
</script>
