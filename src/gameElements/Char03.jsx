/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Char03Idle.glb 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei/native'
import { useStore } from '../helpers/useStore'

export default function Char03(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('./models/Char03/Char03Idle.glb')
  const idleAnimation = useGLTF('./models/Char03/Char03Idle.glb').animations
  const walkAnimation = useGLTF('./models/Char03/Char03Walk.glb').animations
  const jumpAnimation = useGLTF('./models/Char03/Char03Jump.glb').animations
  const danceAnimation = useGLTF('./models/Char03/Char03Dance.glb').animations
  const helloAnimation = useGLTF('./models/Char03/Char03Hello.glb').animations


  const { actions, mixer } = useStore((state) => state)

  useEffect(() => {
    actions['idle'] = mixer.clipAction(idleAnimation[0], ref.current)
    actions['walk'] = mixer.clipAction(walkAnimation[0], ref.current)
    actions['jump'] = mixer.clipAction(jumpAnimation[0], ref.current)
    actions['dance'] = mixer.clipAction(danceAnimation[0], ref.current)
    actions['hello'] = mixer.clipAction(helloAnimation[0], ref.current)
  }, [actions, mixer, idleAnimation, walkAnimation, jumpAnimation, danceAnimation, helloAnimation]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Object_2001" geometry={nodes.Object_2001.geometry} material={materials.palette} skeleton={nodes.Object_2001.skeleton}  castShadow receiveShadow/>
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload([
//   "./models/Char03/Char03Idle.glb", 
//   "./models/Char03/Char03Walk.glb", 
//   "./models/Char03/Char03Jump.glb", 
//   "./models/Char03/Char03Dance.glb",
//   "./models/Char03/Char03Hello.glb"
// ])