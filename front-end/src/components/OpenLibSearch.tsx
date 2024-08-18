import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import styles from "../styles/OpenLibSearch";
import { OpenLibSearchProps, BookData } from "../interfaces/global-interfaces";
import SearchSvg from "../icons/Search";
import { searchBooks } from "../api"; // Import the API functions

const OpenLibSearch: React.FC<OpenLibSearchProps> = ({
  search,
  setSearch,
  setCoverImage,
}) => {
  const [searchData, setSearchData] = useState<BookData[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);

  const extractData = (book: any): BookData | null => {
    if (book) {
      return {
        title: book.title,
        author: book.author_name?.join(", "),
        publishDate: book.first_publish_year,
        isbn: book.isbn ? book.isbn[0] : null, // Use the first ISBN if available
        olid: book.cover_edition_key || null,
        thumbnail: book.cover_i
          ? {
              small: `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`,
              large: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
            }
          : null, // Generate thumbnail URL if cover_i exists
      };
    }
    return null;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (search) {
      const res = await searchBooks(search);
      const bookData = res.docs;
      console.log("Book data:", bookData);

      if (bookData && bookData.length > 0) {
        const extractedData = bookData
          .map((book: any) => extractData(book))
          .filter((data: BookData | null) => data !== null) as BookData[];
        setSearchData(extractedData);
      }
    }
  };

  useEffect(() => {
    setCoverImage(selectedBook?.thumbnail?.large || null);
  }, [selectedBook]);

  return (
    <>
      <div className="searchBar" style={styles.searchBar}>
        <InputField
          value={search}
          onChange={setSearch}
          label="Search by Title or Author"
          id="text"
          required={true}
          onKeyDown={handleKeyDown} // Listen for the Enter key
        />
      </div>
      <div className="icon" style={styles.iconContainer} onClick={handleSearch}>
        <SearchSvg className="icon" style={styles.icon} />
      </div>
      {searchData.length > 0 && (
        <div className="searchDataContainer" style={styles.results}>
          {searchData.map((book, index) => (
            <div
              onClick={() => setSelectedBook(book)}
              key={index}
              style={styles.book}
            >
              <div style={styles.bookTitle}>Title: {book.title}</div>
              <div style={styles.bookAuthor}>Author: {book.author}</div>
              <div style={styles.bookThumbnail}>
                {" "}
                {book.thumbnail ? (
                  <img src={book.thumbnail.small} alt="Book Cover" />
                ) : (
                  // Display a placeholder if no thumbnail is available
                  <div style={styles.bookThumbnailPlaceholder}>No Cover</div>
                )}
              </div>

              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OpenLibSearch;
