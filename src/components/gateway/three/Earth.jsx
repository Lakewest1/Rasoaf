// src/components/gateway/three/Earth.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Photorealistic Earth
// All hooks called unconditionally. Renders null when textures aren't ready,
// but hooks always execute in the same order.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SRGBColorSpace, NoColorSpace, LinearMipmapLinearFilter, LinearFilter } from "three";

const EARTH_RADIUS = 2.5;
const EARTH_SEGMENTS = 128;
const EARTH_ROTATION_SPEED = 0.08;
const INITIAL_ROTATION = 3.8;

export default function Earth({ textures }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // ── Hooks must always be called — never conditional ───────────────────
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += EARTH_ROTATION_SPEED * delta;
    }
  });

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry?.dispose();
    };
  }, []);

  // ── Early return AFTER all hooks ──────────────────────────────────────
  if (!textures) return null;

  const { day, bump, specular } = textures;

  // Configure textures
  day.colorSpace = SRGBColorSpace;
  day.anisotropy = 8;
  day.minFilter = LinearMipmapLinearFilter;
  day.magFilter = LinearFilter;
  day.generateMipmaps = true;

  bump.colorSpace = NoColorSpace;
  bump.anisotropy = 8;
  bump.minFilter = LinearMipmapLinearFilter;
  bump.magFilter = LinearFilter;
  bump.generateMipmaps = true;

  specular.colorSpace = NoColorSpace;
  specular.anisotropy = 8;
  specular.minFilter = LinearMipmapLinearFilter;
  specular.magFilter = LinearFilter;
  specular.generateMipmaps = true;

  return (
    <mesh ref={meshRef} rotation={[0, INITIAL_ROTATION, 0]} castShadow receiveShadow>
      <sphereGeometry args={[EARTH_RADIUS, EARTH_SEGMENTS, EARTH_SEGMENTS]} />
      <meshPhysicalMaterial
        ref={materialRef}
        map={day}
        bumpMap={bump}
        bumpScale={0.06}
        roughnessMap={specular}
        roughness={0.6}
        metalness={0.02}
        clearcoat={0.05}
        clearcoatRoughness={0.4}
        reflectivity={0.5}
      />
    </mesh>
  );
}