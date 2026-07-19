// src/components/common/HeroCamera.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Hero Camera
// Far away, slow push-in, Earth visible in lower portion of frame
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function HeroCamera({ reducedMotion = false }) {
  const { camera } = useThree();
  const startTime = useRef(Date.now());
  const duration = 18; // seconds for full push-in

  useEffect(() => {
    // Start: far away, angled down
    camera.position.set(1.2, -4.5, 18);
    camera.lookAt(0, -2, 0);
    camera.fov = 28;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    if (reducedMotion) return;

    const elapsed = (Date.now() - startTime.current) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic — fast start, slow settle
    const eased = 1 - Math.pow(1 - progress, 3);

    // Slowly push in
    const startZ = 18;
    const endZ = 14;
    const z = startZ + (endZ - startZ) * eased;

    // Subtle horizontal drift
    const x = 1.2 + Math.sin(elapsed * 0.05) * 0.6;

    // Slight upward drift
    const startY = -4.5;
    const endY = -3.5;
    const y = startY + (endY - startY) * eased;

    camera.position.set(x, y, z);
    // Keep looking at Earth
    camera.lookAt(0, -2, 0);
  });

  return null;
}