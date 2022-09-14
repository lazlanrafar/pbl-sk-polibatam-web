<template>
  <div class="row">
    <div class="col">
      <v-card class="card h-100">
        <div class="card-body">
          <h3 class="font-weight-bold mb-10">Tag Group</h3>
          <div class="card border">
            <div class="card-body">
              <div class="row justify-content-end">
                <div class="col-md-3">
                  <v-text-field
                    label="Cari"
                    prepend-inner-icon="mdi-magnify"
                    v-model="optionsTableTagGroup.search"
                    outlined
                    dense
                  />
                </div>
              </div>
              <v-data-table
                :headers="headers"
                :items="reports"
                :search="optionsTableTagGroup.search"
              >
                <template v-slot:[`item.no`]="props">
                  {{ (props.index += 1) }}
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentGroupPage",
  data: () => ({
    headers: [
      { text: "No", value: "no" },
      { text: "Nama", value: "nama" },
      { text: "Dibuat oleh", value: "createdBy" },
      { text: "Aksi", value: "aksi" },
    ],
  }),
  computed: {
    reports() {
      return this.$store.state.tagGroup.reports;
    },
    optionsTableTagGroup: {
      get() {
        return this.$store.state.tagGroup.optionsTableTagGroup;
      },
      set(val) {
        this.$store.commit("SET_OPTIONS_TABLE_TAG_GROUP", val);
      },
    },
  },
  created() {
    this.$store.dispatch("fetchAllTagGroup");
  },
};
</script>
