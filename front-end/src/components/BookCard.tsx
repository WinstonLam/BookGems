import React, { useState, useRef } from "react";

import { fetchBookCover, searchBooks } from "../api"; // Import the API functions

// styles
import styles from "../styles/BlenderObjectCardStyles";

// components
import BookModel from "../models/Book";
import { Canvas } from "@react-three/fiber";
import InputField from "./InputField";
import { HexColorPicker } from "react-colorful";

const BookCard: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [color, setColor] = useState<string>("#282844");
  const [rotation, setRotation] = useState<number[]>([0, 0, 0]);
  const [coverImage, setCoverImage] = useState<string | null>(null); // State for the cover image
  const bookModelRef = useRef<any>(null); // Reference to BookModel component

  const handleSearch = async () => {
    if (search) {
      // Step 1: Search for the book by title or author
      const bookData = await searchBooks(search);

      if (bookData && bookData.docs && bookData.docs.length > 0) {
        // Step 2: Use the first result's ISBN or OLID to fetch the cover
        const book = bookData.docs[0];
        const isbn = book.isbn ? book.isbn[0] : null;
        const olid = book.cover_edition_key ? book.cover_edition_key : null;
        console.log(isbn, olid);
        if (isbn || olid) {
          const cover = await fetchBookCover(isbn || olid);
          console.log(cover);
          setCoverImage(cover);
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = event;
    const { offsetWidth, offsetHeight } = currentTarget as HTMLElement;

    const rotationX = (clientY / offsetHeight - 0.5) * 0.5;
    const rotationY = (clientX / offsetWidth - 0.5) * 0.5;
    const rotationZ = ((clientX - offsetWidth / 2) / offsetWidth) * 0.5;

    setRotation([rotationX, rotationY, rotationZ]);
  };

  const handleAnimate = () => {
    if (bookModelRef.current) {
      bookModelRef.current.triggerAnimation();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.form}>
          <style>
            {`
          * {
            box-sizing: border-box;
          }
        `}
          </style>
          <div style={styles.searchbar}>
            <InputField
              value={search}
              onChange={setSearch}
              label="Search by Title or Author"
              id="text"
              required={true}
              onKeyDown={handleKeyDown} // Listen for the Enter key
            />
            <button onClick={handleSearch}>Search</button> {/* Search button */}
          </div>

          <div style={styles.manual}>
            <InputField
              value={title}
              onChange={setTitle}
              label="Enter Title"
              id="text"
              required={true}
            />

            <InputField
              value={author}
              onChange={setAuthor}
              label="Enter Author"
              id="text"
              required={true}
            />

            <div style={styles.colorPickerContainer}>
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          </div>

          <div style={styles.actions}></div>
        </div>
        <div style={styles.canvasContainer} onMouseMove={handleMouseMove}>
          <Canvas camera={{ position: [5, 0, -2], fov: 30 }}>
            <ambientLight intensity={3} />
            <pointLight position={[1, 1, 1]} />
            <BookModel
              ref={bookModelRef}
              text={title}
              color={color}
              rotation={rotation}
              // coverImage={coverImage}
            />
          </Canvas>
          <button onClick={handleAnimate}>Flip</button>
        </div>
        {coverImage && (
          <img src={coverImage} alt="Book Cover" style={styles.coverImage} />
        )}
      </div>
    </div>
  );
};

export default BookCard;
