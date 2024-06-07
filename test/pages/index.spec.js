import { createPinia, setActivePinia } from "pinia";
import { getCatFact, getCatImages } from "~/services/api";
import { jest } from "@jest/globals";

jest.mock("~/services/api");

describe("ParentComponent.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders CatFact component", async () => {
    getCatFact.mockResolvedValue("Test Cat Fact");
    getCatImages.mockResolvedValue([
      { url: "https://example.com/cat1.jpg" },
      { url: "https://example.com/cat2.jpg" },
      { url: "https://example.com/cat3.jpg" },
    ]);

  });
});
