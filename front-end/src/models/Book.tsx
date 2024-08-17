import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import { createTextTexture } from "../helpers/global-helpers";
import { BookModelProps } from "../interfaces/global-interfaces";
import { Suspense } from "react";

// Component to load and display the book model with dynamic text
const BookModel = forwardRef<any, BookModelProps>(({ text }, ref) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);

    // Load the GLTF model
    const gltf = useLoader(GLTFLoader, "/NewBook.gltf");

    const texture = useMemo(() => createTextTexture(text), [text]);

    useEffect(() => {
        if (meshRef.current) {
            // Ensure the scale is reset
            meshRef.current.scale.set(1, 1, 1);
            console.log("Mesh scale reset to:", meshRef.current.scale);
        }

        if (gltf.scene) {
            // Optionally adjust position here
            gltf.scene.position.set(0, -1, 0);  // Adjust x, y, z as needed

            // Apply the texture to the desired part of the book model (e.g., cover)
            gltf.scene.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    if (mesh.name === "CoverL" || mesh.name === "CoverR") {
                        // Replace the material or map on the book cover
                        mesh.material = new THREE.MeshStandardMaterial({ map: texture });
                    }
                }
            });

            // Initialize the AnimationMixer and prepare the specified animation
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const actionClip = gltf.animations.find(clip => clip.name === "CubeAction.001");

            if (actionClip) {
                const action = mixerRef.current.clipAction(actionClip);
                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
            } else {
                console.warn("Animation 'CubeAction.001' not found");
            }
        }
    }, [gltf, texture]);

    useFrame((state, delta) => {
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }
    });

    // Expose a method to trigger the animation
    useImperativeHandle(ref, () => ({
        triggerAnimation: () => {
            if (mixerRef.current) {
                const actionClip = gltf.animations.find(clip => clip.name === "CubeAction.001");

                if (actionClip) {
                    const action = mixerRef.current.clipAction(actionClip);
                    action.reset().play();  // Reset and play the animation
                } else {
                    console.warn("Animation 'CubeAction.001' not found");
                }
            }
        }
    }));

    return (
        <Suspense fallback={null}>
            <primitive ref={meshRef} object={gltf.scene} />
        </Suspense>
    );
});

export default BookModel;
