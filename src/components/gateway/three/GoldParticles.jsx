// src/components/gateway/three/GoldParticles.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Floating Gold Particles
// Procedural. Animated via requestAnimationFrame in useFrame.
// Proper GPU disposal.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";
import { GOLD_PARTICLES } from "../constants";

export default function GoldParticles() {
  const pointsRef = useRef(null);
  const initialPositions = useRef(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(GOLD_PARTICLES.COUNT * 3);
    const init = new Float32Array(GOLD_PARTICLES.COUNT * 3);

    for (let i = 0; i < GOLD_PARTICLES.COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = GOLD_PARTICLES.SPREAD * (0.4 + Math.random() * 0.6);

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
    const geometry = pointsRef.current.geometry;
    const attr = geometry.attributes.position;
    const init = initialPositions.current;
    const time = performance.now() * 0.0003;

    for (let i = 0; i < GOLD_PARTICLES.COUNT; i++) {
      const i3 = i * 3;
      attr.array[i3] = init[i3] + Math.sin(time + i * 0.7) * 0.03;
      attr.array[i3 + 1] = init[i3 + 1] + Math.cos(time * 0.8 + i * 0.5) * 0.02;
      attr.array[i3 + 2] = init[i3 + 2] + Math.sin(time + i * 0.6) * 0.025;
    }
    attr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.003 * delta;
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
        <bufferAttribute attach="attributes-position" count={GOLD_PARTICLES.COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={GOLD_PARTICLES.COLOR}
        transparent
        opacity={GOLD_PARTICLES.OPACITY}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}