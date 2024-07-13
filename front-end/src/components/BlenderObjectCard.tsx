// src/components/BlenderObjectCard.tsx

import { Canvas } from "@react-three/fiber";
import BlenderObject from "./BlenderObject";
import { OrbitControls } from "@react-three/drei";


import "../styles/BlenderObjectCard.css";




const BlenderObjectCard = () => {
  return (
    <div className="card">
      <Canvas>
        <ambientLight />
        <OrbitControls />
        <pointLight position={[10, 10, 10]} />
        <BlenderObject />
      </Canvas>
    </div>
  );
};

export default BlenderObjectCard;
