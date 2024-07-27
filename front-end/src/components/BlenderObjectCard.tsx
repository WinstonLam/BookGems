// src/components/BlenderObjectCard.tsx

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import BlenderObject from "./BlenderObject";
import { OrbitControls } from "@react-three/drei";
import styles from "../styles/BlenderObjectCardStyles";

// Helper function to convert degrees to radians
const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

const BlenderObjectCard: React.FC = () => {
  const [userText, setUserText] = useState<string>("Hello World");

  return (
    <div style={styles.card}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }
        `}
      </style>
      <input
        type="text"
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
        placeholder="Enter text"
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

export default BlenderObjectCard;
