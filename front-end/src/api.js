import axios from "axios";

const COVER_BASE_URL = "https://covers.openlibrary.org";
const SEARCH_BASE_URL = "https://openlibrary.org/search.json";

export const fetchBookCover = async (searchTerm, size = "L") => {
  try {
    // Attempt to treat the searchTerm as an ISBN first
    const url = `${COVER_BASE_URL}/b/isbn/${searchTerm}-${size}.jpg`;
    const response = await axios.get(url, { responseType: "blob" });

    // Create an object URL for the fetched image
    const imageUrl = URL.createObjectURL(response.data);

    return imageUrl; // Return the image URL
  } catch (error) {
    console.error("Error fetching book cover:", error);
    return null; // Return null if no cover is found
  }
};

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
