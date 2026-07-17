// src/components/gateway/three/Stars.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Premium Starfield
// Procedural — zero textures required. Renders immediately.
// Variable sizes, colors (white/blue/gold), additive blending for glow.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color } from "three";

const STAR_COUNT = 3000;
const STAR_SPREAD = 80;

export default function Stars() {
  const pointsRef = useRef(null);

  // Generate stars once — stable, never recreated
  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const siz = new Float32Array(STAR_COUNT);
    const col = new Float32Array(STAR_COUNT * 3);

    const white = new Color("#ffffff");
    const blue = new Color("#aaccff");
    const gold = new Color("#ffeecc");
    const palette = [white, white, white, white, blue, blue, gold];

    for (let i = 0; i < STAR_COUNT; i++) {
      // Random position on a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = STAR_SPREAD * (0.3 + Math.random() * 0.7);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Variable size — 0.03 to 0.15
      siz[i] = 0.03 + Math.random() * 0.12;

      // Random color from palette
      const chosen = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }

    return { positions: pos, sizes: siz, colors: col };
  }, []);

  // Extremely slow rotation
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003 * delta;
      pointsRef.current.rotation.x += 0.001 * delta;
    }
  });

  // GPU cleanup
  useEffect(() => {
    return () => {
      pointsRef.current?.geometry?.dispose();
      pointsRef.current?.material?.dispose();
    };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={STAR_COUNT}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={STAR_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}