// src/components/BlenderObject.tsx
import React, { Suspense, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

// helper imports
import { wrapText } from "../helpers/global-helpers";

// Function to wrap text and create a texture with text
const createTextTexture = (
  text: string,
  maxWidth: number = 200
): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return new THREE.CanvasTexture(canvas);

  const size = 256;
  canvas.width = size;
  canvas.height = size;

  // Set background color
  context.fillStyle = "white";
  context.fillRect(0, 0, size, size);
  // Set text properties
  context.fillStyle = "black";
  context.font = "25px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";

  const lineHeight = 30;
  const x = size / 2;
  const y = size / 4;
  wrapText(context, text, x, y, maxWidth, lineHeight);

  console.log(
    `Created texture with text: "${text}" on a ${size}x${size} canvas.`
  );

  return new THREE.CanvasTexture(canvas);
};

// Cube with Dynamic Text on One Side
const TexturedCube: React.FC<{ text: string }> = ({ text }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createTextTexture(text), [text]);

  useEffect(() => {
    if (meshRef.current) {
      // Ensure the scale is reset
      meshRef.current.scale.set(1, 1, 1);
      console.log("Mesh scale reset to:", meshRef.current.scale);
    }
  }, [text]);

  // Create materials for each side of the cube
  const materials = [
    new THREE.MeshStandardMaterial({ color: "white" }), // right face
    new THREE.MeshStandardMaterial({ color: "white" }), // left face
    new THREE.MeshStandardMaterial({ color: "white" }), // top face
    new THREE.MeshStandardMaterial({ color: "white" }), // bottom face
    new THREE.MeshStandardMaterial({ map: texture }), // front face (with text)
    new THREE.MeshStandardMaterial({ color: "white" }), // back face
  ];

  return (
    <mesh ref={meshRef} material={materials}>
      <boxGeometry />
    </mesh>
  );
};

const BookModel: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Suspense fallback={null}>
      <TexturedCube text={text} />
    </Suspense>
  );
};

export default BookModel;
