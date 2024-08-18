import React, { useEffect } from 'react';
import InputField from './InputField';
import styles from "../styles/OpenLibSearch";

import { OpenLibSearchProps } from '../interfaces/global-interfaces';
import SearchSvg from '../icons/Search';
import { BookData } from '../interfaces/global-interfaces';

import { fetchBookCover, searchBooks } from "../api"; // Import the API functions

const OpenLibSearch: React.FC<OpenLibSearchProps> = ({
    search,
    setSearch,
}) => {
    const [searchData, setSearchData] = React.useState<any[]>([]);
    const [selectedBook, setSelectedBook] = React.useState<BookData | null>(null);
    const [coverImage, setCoverImage] = React.useState<string | null>(null);


    const extractData = (book: any) => {
        if (book) {
            return {
                title: book.title,
                author: book.author_name,
                publishDate: book.publish_date,
                isbn: book.isbn,
                olid: book.cover_edition_key,

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
            // Step 1: Search for the book by title or author
            const res = await searchBooks(search);
            const bookData = res.docs;

            if (bookData && bookData.length > 0) {
                // Step 2: Extract data for each book and set it in state
                const extractedData = bookData.map((book: any) => extractData(book));
                setSearchData(extractedData);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedBook) {
                const res = await fetchBookCover(selectedBook.isbn || selectedBook.olid);
                setCoverImage(res);

            }
        };
        fetchData();

    }, [selectedBook]);


    console.log(coverImage)

    return (
        <>
            <div style={styles.searchBar}>
                <InputField
                    value={search}
                    onChange={setSearch}
                    label="Search by Title or Author"
                    id="text"
                    required={true}
                    onKeyDown={handleKeyDown} // Listen for the Enter key
                />
            </div>
            <div style={styles.iconContainer} onClick={handleSearch}>
                <SearchSvg className='icon' style={styles.icon} />
            </div>
            {searchData.length > 0 && (
                <div style={styles.results}>
                    {searchData.map((book, index) => (
                        <div onClick={() => setSelectedBook(book)} key={index} style={styles.book}>
                            <div style={styles.bookTitle}>Title: {book.title}</div>
                            <div style={styles.bookAuthor}>Author: {book.author}</div>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
            {coverImage && (
                <div style={styles.coverImageContainer}>
                    <img src={coverImage} style={styles.coverImage} alt="Book Cover" />


                </div>
            )}
        </>
    );
}

export default OpenLibSearch;
