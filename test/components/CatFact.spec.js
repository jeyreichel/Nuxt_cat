import { createPinia, setActivePinia } from "pinia";
import { useCatStore } from "~/store/catStore";
import { getCatFact, getCatImages } from "~/services/api";
import { jest } from "@jest/globals";

jest.mock("~/services/api");


describe("CatFact.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders cat fact page correctly", async () => {
    getCatFact.mockResolvedValue("Test Cat Fact");
    getCatImages.mockResolvedValue([
      { url: "https://example.com/cat1.jpg" },
      { url: "https://example.com/cat2.jpg" },
      { url: "https://example.com/cat3.jpg" },
    ]);

    const store = useCatStore();
    store.facts = ["Test Cat Fact"];
    store.images = [
      { url: "https://example.com/cat1.jpg" },
      { url: "https://example.com/cat2.jpg" },
      { url: "https://example.com/cat3.jpg" },
    ];
  });

  it("fetches new cat fact and images on button click", async () => {
    const store = useCatStore();
    store.facts = ["Initial Fact"];
    store.images = [
      { url: "https://example.com/initial1.jpg" },
      { url: "https://example.com/initial2.jpg" },
      { url: "https://example.com/initial3.jpg" },
    ];

    getCatFact.mockResolvedValue("New Cat Fact");
    getCatImages.mockResolvedValue([
      { url: "https://example.com/new1.jpg" },
      { url: "https://example.com/new2.jpg" },
      { url: "https://example.com/new3.jpg" },
    ]);


    expect(store.currentFact).toBe("Initial Fact");
    expect(store.images[0].url).toBe("https://example.com/initial1.jpg");
    expect(store.images[1].url).toBe("https://example.com/initial2.jpg");
    expect(store.images[2].url).toBe("https://example.com/initial3.jpg");
  });
});
