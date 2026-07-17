// src/components/gateway/three/SpaceDust.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Space Dust Field
// Procedural. No textures. Proper GPU disposal.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import { SPACE_DUST } from "../constants";

export default function SpaceDust() {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(SPACE_DUST.COUNT * 3);
    for (let i = 0; i < SPACE_DUST.COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = SPACE_DUST.SPREAD * (0.3 + Math.random() * 0.7);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.006 * delta;
      pointsRef.current.rotation.z += 0.003 * delta;
    }
  });

  useEffect(() => {
    return () => {
      pointsRef.current?.geometry?.dispose();
      pointsRef.current?.material?.dispose();
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={SPACE_DUST.COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#8888aa"
        transparent
        opacity={SPACE_DUST.OPACITY}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}