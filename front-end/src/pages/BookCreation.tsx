import React, { useState, useRef } from "react";

// styles
import styles from "../styles/BookCreationStyles";

// components
import BookModel from "../models/Book";
import { Canvas } from "@react-three/fiber";
import InputField from "../components/InputField";
import { HexColorPicker } from "react-colorful";
import OpenLibSearch from "../components/OpenLibSearch";

const BookCreation: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [color, setColor] = useState<string>("#282844");
  const [rotation, setRotation] = useState<number[]>([0, 0, 0]);
  const [coverImage, setCoverImage] = useState<string | null>(null); // State for the cover image
  const [loading, setLoading] = useState<boolean>(false);
  const bookModelRef = useRef<any>(null); // Reference to BookModel component

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

  const handleCoverImage = (image: string | null) => {
    setLoading(true);
    console.log(image);
    setCoverImage(image);
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
          <div style={styles.openLib}>
            <OpenLibSearch setCoverImage={handleCoverImage} />
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
          {loading && <div>Loading...</div>}
          <Canvas camera={{ position: [5, 0, -2], fov: 30 }}>
            <ambientLight intensity={3} />
            <pointLight position={[1, 1, 1]} />
            <BookModel
              ref={bookModelRef}
              text={{ title, author }}
              color={color}
              rotation={rotation}
              coverImage={coverImage}
              setLoading={setLoading}
            />
          </Canvas>
        </div>
        <button onClick={handleAnimate}>Flip</button>
      </div>
    </div>
  );
};

export default BookCreation;
