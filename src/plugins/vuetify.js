import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import {
  VDataTable,
  VApp,
  VMain,
  VTextField,
  VSelect,
  VDialog,
  VTimeline,
  VTimelineItem,
  VFileInput,
  VTextarea,
} from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  components: {
    VDataTable,
    VApp,
    VMain,
    VTextField,
    VSelect,
    VDialog,
    VTimeline,
    VTimelineItem,
    VFileInput,
    VTextarea,
  },
});
