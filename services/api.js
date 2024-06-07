export const getCatFact = async () => {
  try {
    const response = await fetch("https://meowfacts.herokuapp.com/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Error fetching cat fact:", error);
    return "Unable to fetch cat fact at the moment.";
  }
};

export const getCatImages = async (limit = 3) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cat images:", error);
    return [];
  }
};
