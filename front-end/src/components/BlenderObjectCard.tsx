// src/components/BlenderObjectCard.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import BlenderObject from "./BlenderObject";
import "../styles/BlenderObjectCard.css";

interface BlenderObjectCardProps {
  modelPath: string;
}

const BlenderObjectCard: React.FC<BlenderObjectCardProps> = ({ modelPath }) => {
  return (
    <div className="card">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <BlenderObject modelPath={modelPath} />
      </Canvas>
    </div>
  );
};

export default BlenderObjectCard;
