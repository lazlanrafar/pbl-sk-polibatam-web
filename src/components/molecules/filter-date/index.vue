<template>
  <div class="max-w-input mb-5">
    <v-menu v-model="showMenu" :close-on-content-click="false" max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="computedDateFormatted"
          clearable
          outlined
          dense
          readonly
          prepend-inner-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          @click:clear="date = null"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" @change="showMenu = false"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "FilterDate",
  data: () => ({
    date: moment().format("YYYY-MM-DD"),
    showMenu: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.date ? moment(this.date).format("MMMM YYYY") : "";
    },
  },
};
</script>
