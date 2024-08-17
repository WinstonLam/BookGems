import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { createTextTexture } from "../helpers/global-helpers";





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

export default TexturedCube;