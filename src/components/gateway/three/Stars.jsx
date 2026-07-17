// src/components/gateway/three/Stars.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Multi-Layer Starfield
// Three depth layers rotating at different speeds for parallax depth.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color } from "three";

const LAYERS = [
  { count: 800,  spread: 100, size: 0.04, speed: 0.001,  opacity: 0.6, color: "#aaccff" },
  { count: 1500, spread: 70,  size: 0.06, speed: 0.0025, opacity: 0.75, color: "#ffffff" },
  { count: 600,  spread: 45,  size: 0.09, speed: 0.005,  opacity: 0.9, color: "#ffeecc" },
];

function StarLayer({ count, spread, size, speed, opacity, color }) {
  const pointsRef = useRef(null);

  const { positions, sizes, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const baseColor = new Color(color);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = spread * (0.5 + Math.random() * 0.5);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      siz[i] = size * (0.3 + Math.random() * 0.7);

      const variation = 0.7 + Math.random() * 0.3;
      col[i * 3] = baseColor.r * variation;
      col[i * 3 + 1] = baseColor.g * variation;
      col[i * 3 + 2] = baseColor.b * variation;
    }

    return { positions: pos, sizes: siz, colors: col };
  }, [count, spread, size, color]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += speed * delta;
      pointsRef.current.rotation.x += speed * 0.4 * delta;
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
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export default function Stars() {
  return (
    <group>
      {LAYERS.map((layer, i) => (
        <StarLayer key={i} {...layer} />
      ))}
    </group>
  );
}