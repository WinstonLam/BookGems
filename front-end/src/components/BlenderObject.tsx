// src/components/BlenderObject.tsx
import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface BlenderObjectProps {
  modelPath: string;
}

const BlenderObject: React.FC<BlenderObjectProps> = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return <primitive object={gltf.scene} />;
};

export default BlenderObject;
