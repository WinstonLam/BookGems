// src/components/BlenderObjectCard.tsx
import React, { useState } from "react";

// styles
import styles from "../styles/BlenderObjectCardStyles";

// components
import BlenderObject from "./BookModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import InputField from "./InputField";

// Helper function to convert degrees to radians
const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

const BookCard: React.FC = () => {
  const [userText, setUserText] = useState<string>("");

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

      <div style={styles.canvasContainer}>
        <Canvas>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 1, 2]} />
          <BlenderObject text={userText} />
          <OrbitControls
            minDistance={1.5}
            maxDistance={1.5}
            enableZoom={false}
            minPolarAngle={degreesToRadians(60)} // Convert 60 degrees to radians
            maxPolarAngle={degreesToRadians(120)} // Convert 120 degrees to radians
            minAzimuthAngle={degreesToRadians(-45)} // Convert -45 degrees to radians
            maxAzimuthAngle={degreesToRadians(45)} // Convert 45 degrees to radians
          />
        </Canvas>
      </div>
    </div>
  );
};

export default BookCard;
