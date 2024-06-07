import { getCatFact, getCatImages } from "@/services/api";

describe("API Service", () => {
  let consoleErrorMock;

  beforeEach(() => {
    global.fetch = jest.fn();
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.resetAllMocks();
    consoleErrorMock.mockRestore();
  });

  test("fetches cat fact", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: ["Test Cat Fact"] }),
    });

    const fact = await getCatFact();
    expect(fact).toBe("Test Cat Fact");
  });

  test("handles error when fetching cat fact", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    const fact = await getCatFact();
    expect(fact).toBe("Unable to fetch cat fact at the moment.");
  });

  test("fetches cat images", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          { url: "test-image-url-1" },
          { url: "test-image-url-2" },
          { url: "test-image-url-3" },
        ]),
    });

    const images = await getCatImages();
    expect(images.length).toBe(3);
    expect(images[0].url).toBe("test-image-url-1");
  });

  test("handles error when fetching cat images", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    const images = await getCatImages();
    expect(images).toEqual([]);
  });

  test("handles network error when fetching cat fact", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const fact = await getCatFact();
    expect(fact).toBe("Unable to fetch cat fact at the moment.");
  });

  test("handles network error when fetching cat images", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const images = await getCatImages();
    expect(images).toEqual([]);
  });
});
