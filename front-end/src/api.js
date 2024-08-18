import axios from "axios";

const SEARCH_BASE_URL = "https://openlibrary.org/search.json";

export const searchBooks = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${SEARCH_BASE_URL}?q=${encodeURIComponent(searchTerm)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching books:", error);
    return null;
  }
};
