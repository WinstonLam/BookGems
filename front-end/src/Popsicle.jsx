/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 Popsicle.gltf --typescript 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/Popsicle.gltf')
  return (
    <group {...props} dispose={null}>
      {/* <mesh geometry={nodes.cake_pop_grp.geometry} material={materials['cake_pop_mat.001']} position={[0, -2, 2]} /> */}
      <mesh >
        <boxGeometry />
        <meshStandardMaterial color={"blue"}/>

      </mesh>
    </group>
  )
}

useGLTF.preload('/Popsicle.gltf')
