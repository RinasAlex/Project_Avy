/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Char01Idle.glb 
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei/native'
import { useStore } from '../helpers/useStore'

export default function Char01(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('./models/Char01/Char01Idle.glb')
  const idleAnimation = useGLTF('./models/Char01/Char01Idle.glb').animations
  const walkAnimation = useGLTF('./models/Char01/Char01Walk.glb').animations
  const jumpAnimation = useGLTF('./models/Char01/Char01Jump.glb').animations
  const danceAnimation = useGLTF('./models/Char01/Char01Dance.glb').animations
  const helloAnimation = useGLTF('./models/Char01/Char01Hello.glb').animations

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
          <skinnedMesh name="Object_2001" geometry={nodes.Object_2001.geometry} material={materials.palette} skeleton={nodes.Object_2001.skeleton} castShadow receiveShadow/>
        </group>
      </group>
    </group>
  )
}

// useGLTF.preload([
//   "./models/Char01/Char01Idle.glb", 
//   "./models/Char01/Char01Walk.glb", 
//   "./models/Char01/Char01Jump.glb", 
//   "./models/Char01/Char01Dance.glb",
//   "./models/Char01/Char01Hello.glb"
// ])