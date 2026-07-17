// src/components/gateway/three/Satellites.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Orbiting Satellite Points
// 2 tiny glowing dots orbiting at different heights. Very subtle.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending } from "three";

const SATELLITES = [
  { orbitRadius: 3.2, speed: 0.15, inclination: 0.3, color: "#aaccff", size: 0.02 },
  { orbitRadius: 3.6, speed: 0.10, inclination: -0.5, color: "#ffddaa", size: 0.018 },
];

function Satellite({ orbitRadius, speed, inclination, color, size }) {
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    angleRef.current += speed * delta;
    const x = Math.cos(angleRef.current) * orbitRadius;
    const z = Math.sin(angleRef.current) * orbitRadius;
    const y = Math.sin(angleRef.current) * inclination * orbitRadius * 0.3;

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 6, 6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function Satellites() {
  return (
    <group>
      {SATELLITES.map((sat, i) => (
        <Satellite key={i} {...sat} />
      ))}
    </group>
  );
}