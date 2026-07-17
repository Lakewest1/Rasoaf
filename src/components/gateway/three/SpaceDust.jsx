// src/components/gateway/three/SpaceDust.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Solar Dust Field
// Extremely subtle floating particles. Almost invisible.
// Only visible when catching light. Adds subconscious depth.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";

const COUNT = 800;
const SPREAD = 25;
const OPACITY = 0.06;

export default function SpaceDust() {
  const pointsRef = useRef(null);
  const initialPositions = useRef(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const init = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = SPREAD * (0.4 + Math.random() * 0.6);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
    }
    initialPositions.current = init;
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !initialPositions.current) return;
    const attr = pointsRef.current.geometry.attributes.position;
    const init = initialPositions.current;
    const time = performance.now() * 0.0001;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      attr.array[i3] = init[i3] + Math.sin(time + i * 0.3) * 0.5;
      attr.array[i3 + 1] = init[i3 + 1] + Math.cos(time * 0.7 + i * 0.4) * 0.4;
      attr.array[i3 + 2] = init[i3 + 2] + Math.sin(time * 0.5 + i * 0.35) * 0.45;
    }
    attr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.002 * delta;
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
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#eeddcc"
        transparent
        opacity={OPACITY}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}