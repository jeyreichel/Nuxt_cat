import { config } from "@vue/test-utils";
import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
config.global = config.global || {};
config.global.plugins = config.global.plugins || [];
config.global.plugins.push(createPinia());

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: ["Test Cat Fact"] }),
  })
);
