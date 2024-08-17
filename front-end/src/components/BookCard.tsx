import React, { useState, useRef } from "react";

// styles
import styles from "../styles/BlenderObjectCardStyles";

// components
import BookModel from "../models/Book";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InputField from "./InputField";

// Helper function to convert degrees to radians
const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

const BookCard: React.FC = () => {
  const [userText, setUserText] = useState<string>("");
  const bookModelRef = useRef<any>(null); // Reference to BookModel component

  // Function to handle animation
  const handleAnimate = () => {
    if (bookModelRef.current) {
      bookModelRef.current.triggerAnimation(); // Trigger animation in BookModel
    }
  }

  return (
    <div style={styles.card}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }
        `}
      </style>

      <InputField
        value={userText}
        onChange={setUserText}
        label="Enter Title"
        id="text"
        required={true}
      />

      <button onClick={handleAnimate}>Play</button>

      <div style={styles.canvasContainer}>
        <Canvas camera={{ position: [180, 180, 0] }}>
          <ambientLight intensity={3} />
          <pointLight position={[1, 1, 1]} />
          <BookModel ref={bookModelRef} text={userText} /> {/* Pass ref to BookModel */}
          <OrbitControls
            minDistance={1.5}
            maxDistance={3.5}
            enableZoom={false}
            minPolarAngle={degreesToRadians(60)}
            maxPolarAngle={degreesToRadians(120)}
            minAzimuthAngle={degreesToRadians(-45)}
            maxAzimuthAngle={degreesToRadians(90)}
          />
        </Canvas>
      </div>

    </div>
  );
};

export default BookCard;
