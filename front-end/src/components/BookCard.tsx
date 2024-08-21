import React, { useState } from "react";

// styles

// components
import BookModel from "../models/Book";
import { Canvas } from "@react-three/fiber";

const BookCard: React.FC = () => {
  const BooksData = {
    0: {
      title: "Can't Hurt Me",
      author: "David Goggins",
      coverImage: "https://covers.openlibrary.org/b/id/8305903-L.jpg",
      color: "#1c1c84",
    },
  };
  return (
    <>
      <Canvas camera={{ position: [5, 0, -2], fov: 30 }}>
        <ambientLight intensity={3} />
        <pointLight position={[1, 1, 1]} />
        {/* <BookModel
          ref={bookModelRef}
          text={{ title, author }}
          color={color}
          rotation={rotation}
          coverImage={coverImage}
          setLoading={setLoading}
        /> */}
      </Canvas>
    </>
  );
};

export default BookCard;
