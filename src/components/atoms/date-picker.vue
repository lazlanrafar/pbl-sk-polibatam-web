<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="value"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        hide-details="true"
        readonly
        outlined
        dense
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker :value="value" @input="handleInput"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "AtomDatePicker",
  props: ["value", "label"],
  data() {
    return {
      menu: false,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e);
      this.menu = false;
    },
  },
};
</script>
