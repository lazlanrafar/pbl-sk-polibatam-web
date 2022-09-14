<template>
  <section id="dashboard-analytics">
    <div class="row">
      <div class="col-12">
        <div class="card">
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
                  href="#"
                  >{{ item }}</a
                >
              </li>
            </ul>
            <hr />

            <Mahasiswa v-if="tabActive == 'Mahasiswa'" />
            <Dosen v-if="tabActive == 'Dosen'" />
          </div>
        </div>
      </div>
    </div>
  </section>
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
