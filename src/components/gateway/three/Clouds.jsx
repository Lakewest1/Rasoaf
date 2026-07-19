// src/components/gateway/three/Clouds.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cloud Layer
// All hooks called unconditionally. Renders null when texture isn't ready.
// Texture configuration runs once per texture change (useEffect), not on
// every render, and flags needsUpdate so filtering/colorSpace changes are
// actually re-uploaded to the GPU.
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

  // Configure the texture once when it changes, not on every render.
  useEffect(() => {
    if (!texture) return;
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;
    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;
    // Required after changing colorSpace/filtering, or the GPU may keep
    // serving the texture's previous upload state.
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry?.dispose();
    };
  }, []);

  // ── Early return AFTER hooks ──────────────────────────────────────────
  if (!texture) return null;

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