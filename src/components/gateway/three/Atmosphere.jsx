// src/components/gateway/three/Atmosphere.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Multi-Layer Volumetric Atmosphere
// Three.js r0.185.1 compatible. All procedural — zero textures.
// Three glow shells: inner blue-white, sunrise gold, outer soft rim.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import { EARTH, ATMOSPHERE } from "../constants";

export default function Atmosphere() {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += EARTH.ROTATION_SPEED * delta;
    }
  });

  // GPU cleanup
  useEffect(() => {
    return () => {
      groupRef.current?.traverse((child) => {
        child.geometry?.dispose();
        child.material?.dispose();
      });
    };
  }, []);

  const innerRadius = EARTH.RADIUS * ATMOSPHERE.INNER_RADIUS;
  const sunriseRadius = EARTH.RADIUS * ATMOSPHERE.SUNRISE_RADIUS;
  const outerRadius = EARTH.RADIUS * ATMOSPHERE.OUTER_RADIUS;

  return (
    <group ref={groupRef}>
      {/* Inner blue-white scattering */}
      <mesh>
        <sphereGeometry args={[innerRadius, 64, 64]} />
        <meshStandardMaterial
          color={ATMOSPHERE.INNER_COLOR}
          transparent
          opacity={ATMOSPHERE.INNER_OPACITY}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Sunrise gold ring */}
      <mesh>
        <sphereGeometry args={[sunriseRadius, 64, 64]} />
        <meshStandardMaterial
          color={ATMOSPHERE.SUNRISE_COLOR}
          transparent
          opacity={ATMOSPHERE.SUNRISE_OPACITY}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer soft blue rim */}
      <mesh>
        <sphereGeometry args={[outerRadius, 64, 64]} />
        <meshStandardMaterial
          color={ATMOSPHERE.OUTER_COLOR}
          transparent
          opacity={ATMOSPHERE.OUTER_OPACITY}
          side={BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}