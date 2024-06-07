import { getCatFact, getCatImages } from "~/services/api";

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    const fact = await getCatFact();
    const images = await getCatImages(3);
    return { fact, images };
  }
});
