import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { createTextTexture } from "../helpers/global-helpers";
import { BookModelProps } from "../interfaces/global-interfaces";
import { Suspense } from "react";

// Component to load and display the book model with dynamic text
const BookModel = forwardRef<any, BookModelProps>(
  ({ text, color, rotation }, ref) => {
    const groupRef = useRef<THREE.Group>(null); // Reference to the group containing meshes
    const bookPivotRef = useRef<THREE.Group>(null); // Pivot group reference
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);

    const [flipped, setFlipped] = useState<boolean>(false);

    // Load the GLTF model
    const gltf = useLoader(GLTFLoader, "/NewBook.gltf");

    const texture = useMemo(() => createTextTexture(text), [text]);

    useEffect(() => {
      if (groupRef.current && bookPivotRef.current) {
        // Center the book model in the pivot group
        const boundingBox = new THREE.Box3().setFromObject(groupRef.current);
        const center = boundingBox.getCenter(new THREE.Vector3());
        groupRef.current.position.sub(center); // Move the book to the pivot's center

        // Optionally adjust position here
        bookPivotRef.current.position.set(0, 0, 0); // Ensure pivot is at the center

        // Traverse the group to find and apply texture and color to the appropriate meshes
        groupRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            // Handle case where mesh.material is an array
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material) => {
                if (material.name === "Cover.001" && "map" in material) {
                  (material as THREE.MeshStandardMaterial).map = texture; // Apply texture to the correct material
                  (material as THREE.MeshStandardMaterial).color.set(color); // Set the color
                  material.needsUpdate = true; // Ensure material is updated
                }
              });
            } else if (mesh.material) {
              // Handle case where mesh.material is a single material
              if (
                (mesh.name === "Cube" || mesh.material.name === "Cover.001") &&
                "map" in mesh.material
              ) {
                (mesh.material as THREE.MeshStandardMaterial).map = texture; // Apply texture to the correct material
                (mesh.material as THREE.MeshStandardMaterial).color.set(color); // Set the color
                mesh.material.needsUpdate = true; // Ensure material is updated
              }
            }
          }
        });

        // Initialize the AnimationMixer and prepare the specified animation
        mixerRef.current = new THREE.AnimationMixer(groupRef.current);
        const actionClip = gltf.animations.find(
          (clip) => clip.name === "CubeAction.001"
        );

        if (actionClip) {
          const action = mixerRef.current.clipAction(actionClip);
          action.clampWhenFinished = true;
          action.loop = THREE.LoopOnce;
        } else {
          console.warn("Animation 'CubeAction.001' not found");
        }
      }
    }, [gltf, texture, color]);

    useFrame((state, delta) => {
      if (bookPivotRef.current) {
        bookPivotRef.current.rotation.x = rotation[0];
        bookPivotRef.current.rotation.y = rotation[1];
        bookPivotRef.current.rotation.z = rotation[2];
      }
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
    });

    // Expose a method to trigger the animation
    useImperativeHandle(ref, () => ({
      triggerAnimation: () => {
        if (mixerRef.current) {
          const actionClip = gltf.animations.find(
            (clip) => clip.name === "CubeAction.001"
          );

          if (actionClip) {
            const action = mixerRef.current.clipAction(actionClip);

            if (flipped) {
              action.reset();
              action.timeScale = -1; // Reverse the animation
              action.time = action.getClip().duration; // Start at the end
              action.play();
              setFlipped(false);
            } else {
              action.reset();
              action.timeScale = 1; // Play the animation normally
              action.time = 0; // Start from the beginning
              action.play();
              setFlipped(true);
            }
          } else {
            console.warn("Animation 'CubeAction.001' not found");
          }
        }
      },
    }));

    return (
      <Suspense fallback={null}>
        <group ref={bookPivotRef}>
          <primitive ref={groupRef} object={gltf.scene} />
        </group>
      </Suspense>
    );
  }
);

export default BookModel;
