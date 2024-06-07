import Vue from "vue";
import { PiniaVuePlugin, createPinia } from "pinia";

Vue.use(PiniaVuePlugin);

export default ({ app }, inject) => {
  const pinia = createPinia();
  app.pinia = pinia;
  inject("pinia", pinia);
};
