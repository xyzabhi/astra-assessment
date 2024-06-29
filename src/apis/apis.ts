import { STAR_WARS_API_BASE_URL } from "@/lib/constants";

export const fetchStarWarsData = async (resourceType: string) => {
  const url = `${STAR_WARS_API_BASE_URL}${resourceType}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Failed to fetch data from ${resourceType}:`, error);
    throw error;
  }
};

const fetchEntitySinleItem = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error);
    throw error;
  }
};
