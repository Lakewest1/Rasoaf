// src/components/gateway/three/CameraRig.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cinematic Camera Rig
// Three.js r0.185.1 compatible. No deprecated APIs used.
// Breathing zoom, micro-orbit, cinematic drift, subtle handheld feel.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CAMERA } from "../constants";

export default function CameraRig({ children }) {
  const groupRef = useRef(null);
  const { camera } = useThree();
  const elapsedRef = useRef(0);

  // Memoize initial position to avoid recreating the array
  const initialPos = useMemo(() => [...CAMERA.INITIAL_POSITION], []);

  // Set camera once
  camera.position.set(initialPos[0], initialPos[1], initialPos[2]);
  camera.fov = CAMERA.FOV;
  camera.near = CAMERA.NEAR;
  camera.far = CAMERA.FAR;
  camera.updateProjectionMatrix();

  // Reset on unmount
  useEffect(() => {
    return () => {
      camera.position.set(0, 0, 8);
      camera.fov = 45;
      camera.updateProjectionMatrix();
    };
  }, [camera]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    // Breathing zoom on camera Z
    camera.position.z = initialPos[2] +
      Math.sin(t * ((2 * Math.PI) / CAMERA.BREATH_PERIOD)) * CAMERA.BREATH_AMPLITUDE;

    // Cinematic drift
    camera.position.x = initialPos[0] +
      Math.sin(t * ((2 * Math.PI) / CAMERA.DRIFT_PERIOD_X)) * CAMERA.DRIFT_AMPLITUDE_X;
    camera.position.y = initialPos[1] +
      Math.cos(t * ((2 * Math.PI) / CAMERA.DRIFT_PERIOD_Y)) * CAMERA.DRIFT_AMPLITUDE_Y;

    // Micro orbit on the group
    groupRef.current.rotation.y += CAMERA.ORBIT_SPEED * delta;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.015;
  });

  return <group ref={groupRef}>{children}</group>;
}