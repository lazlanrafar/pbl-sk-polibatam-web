<template>
  <div>
    <HeaderTitle title="Setup" subtitle="User Management" />

    <ul class="nav nav-pills mb-5 pl-0">
      <li class="nav-item" v-for="(item, i) in tab_list" :key="i">
        <a
          :class="`nav-link ${
            item === tab_active
              ? 'bg-orange text-white fw-medium'
              : 'text-muted'
          }`"
          href="#"
          @click="() => (tab_active = item)"
        >
          {{ item }}
        </a>
      </li>
    </ul>

    <v-card class="shadow-none">
      <PageMahasiswa v-if="tab_active === 'Mahasiswa'" />
      <PagePegawai v-if="tab_active === 'Pegawai'" />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "UserManagement",
  components: {
    HeaderTitle: () => import("@/components/molecules/header-title"),
    PageMahasiswa: () => import("./mahasiswa/index.vue"),
    PagePegawai: () => import("./pegawai/index.vue"),
  },
  data() {
    return {
      tab_list: ["Mahasiswa", "Pegawai"],
      tab_active: "Mahasiswa",
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.userManagement.isLoading;
    },
  },
};
</script>
