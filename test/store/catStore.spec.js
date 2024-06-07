import { setActivePinia, createPinia } from "pinia";
import { useCatStore } from "~/store/catStore";
import { getCatFact, getCatImages } from "~/services/api";

jest.mock("~/services/api");

describe("Cat Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("fetches initial cat facts and updates the store", async () => {
    getCatFact.mockResolvedValueOnce("Fact 1");
    getCatFact.mockResolvedValueOnce("Fact 2");
    getCatFact.mockResolvedValueOnce("Fact 3");

    const store = useCatStore();

    await store.fetchCatFact();

    expect(store.facts).toHaveLength(3);
    expect(store.facts).toEqual(["Fact 1", "Fact 2", "Fact 3"]);
    expect(store.currentFactIndex).toBe(2);
    expect(store.currentFact).toBe("Fact 3");
  });

  it("fetches additional cat fact when currentFactIndex is at the end", async () => {
    const store = useCatStore();
    store.facts = ["Fact A", "Fact B", "Fact C"];
    store.currentFactIndex = 2;

    getCatFact.mockResolvedValueOnce("Fact D");

    await store.fetchCatFact();

    expect(store.facts).toHaveLength(4);
    expect(store.facts).toEqual(["Fact A", "Fact B", "Fact C", "Fact D"]);
    expect(store.currentFactIndex).toBe(3);
    expect(store.currentFact).toBe("Fact D");
  });

  it("fetches next cat fact when currentFactIndex is not at the end", async () => {
    const store = useCatStore();
    store.facts = ["Fact A", "Fact B", "Fact C"];
    store.currentFactIndex = 1;

    await store.fetchCatFact();

    expect(store.currentFactIndex).toBe(2);
    expect(store.currentFact).toBe("Fact C");
  });

  it("fetches cat images and updates the store", async () => {
    const mockImages = [
      { url: "https://example.com/cat1.jpg" },
      { url: "https://example.com/cat2.jpg" },
      { url: "https://example.com/cat3.jpg" },
    ];
    getCatImages.mockResolvedValueOnce(mockImages);

    const store = useCatStore();

    await store.fetchCatImages();

    expect(store.images).toHaveLength(3);
    expect(store.images).toEqual(mockImages);
  });

  it("gets the current fact correctly", async () => {
    const store = useCatStore();
    store.facts = ["Fact A", "Fact B", "Fact C"];
    store.currentFactIndex = 1;

    expect(store.currentFact).toBe("Fact B");
  });

  it("handles no cat facts available", async () => {
    const store = useCatStore();

    expect(store.currentFact).toBe("No cat fact available.");
  });
});
