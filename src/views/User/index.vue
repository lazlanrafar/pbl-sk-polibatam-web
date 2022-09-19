<template>
  <div>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Manajemen User</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <ul class="nav pl-0">
                  <li class="nav-item" v-for="item in listTab" :key="item">
                    <a
                      :class="
                        tabActive == item
                          ? 'nav-link font-weight-bold pl-0 mr-3 text-dark'
                          : 'nav-link pl-0 mr-3 text-dark'
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
            </div>
          </div>
        </div>
      </div>
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
