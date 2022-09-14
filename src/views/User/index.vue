<template>
  <div class="row">
    <div class="col-12">
      <v-card class="card h-100">
        <div class="card-body">
          <h3>Manajemen User</h3>
          <ul class="nav pl-0">
            <li class="nav-item" v-for="item in listTab" :key="item">
              <a
                :class="
                  tabActive == item
                    ? 'nav-link font-weight-bold pl-0 mr-3 active'
                    : 'nav-link pl-0 mr-3'
                "
                @click="tabActive = item"
                >{{ item }}</a
              >
            </li>
          </ul>
          <hr />

          <Mahasiswa v-if="tabActive == 'Mahasiswa'" />
          <Dosen v-if="tabActive == 'Dosen'" />
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Mahasiswa from "./Tab/Mahasiswa.vue";
import Dosen from "./Tab/Dosen.vue";
export default {
  name: "UserPage",
  components: { Mahasiswa, Dosen },
  data: () => ({
    listTab: ["Mahasiswa", "Dosen"],
    tabActive: "Mahasiswa",
  }),
};
</script>
