<template>
  <v-card>
    <v-card-title class="d-flex justify-content-between">
      <v-card-title class="text-h7">Detail Mahasiswa</v-card-title>
      <v-btn icon @click="handleClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-actions class="p-3 pt-0">
      <v-simple-table class="w-100">
        <tbody>
          <tr v-for="item in dataMahasiswaDetail" :key="item.key">
            <td>{{ item.key }}</td>
            <td>:</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "UserMahasiswaDetail",
  computed: {
    dataMahasiswaDetail() {
      return this.$store.state.manajemenUser.dataMahasiswaDetail;
    },
  },
  methods: {
    handleClose() {
      this.$emit("modalDetail", false);
    },
  },
};
</script>
