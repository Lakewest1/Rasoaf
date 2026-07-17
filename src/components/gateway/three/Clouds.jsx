// src/components/gateway/three/Clouds.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cloud Layer
// All hooks called unconditionally. Renders null when texture isn't ready.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SRGBColorSpace, LinearMipmapLinearFilter, LinearFilter } from "three";

const CLOUD_RADIUS = 2.55;
const CLOUD_SEGMENTS = 64;
const CLOUD_ROTATION_SPEED = 0.12;
const CLOUD_OPACITY = 0.28;

export default function Clouds({ texture }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // ── Hooks first, always ───────────────────────────────────────────────
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += CLOUD_ROTATION_SPEED * delta;
    }
  });

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry?.dispose();
    };
  }, []);

  // ── Early return AFTER hooks ──────────────────────────────────────────
  if (!texture) return null;

  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[CLOUD_RADIUS, CLOUD_SEGMENTS, CLOUD_SEGMENTS]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={CLOUD_OPACITY}
        depthWrite={false}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}