import { useFetch } from "@nuxt/http";

export default async ({ app }, inject) => {
  inject("meowFacts", {
    async getFact() {
      const { data } = await useFetch("https://meowfacts.herokuapp.com/");
      return data.value.data[0];
    },
    async getImages(limit = 3) {
      const { data } = await useFetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}`
      );
      return data.value;
    },
  });
};
