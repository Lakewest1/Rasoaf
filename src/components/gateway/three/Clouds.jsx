// src/components/gateway/three/Clouds.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cloud Layer
// Robust texture loading + Three.js optimization
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  SRGBColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
} from "three";

// ═════════════════════════════════════════════════════════════════════════════
// Configuration
// ═════════════════════════════════════════════════════════════════════════════

const CLOUD_RADIUS = 2.55;
const CLOUD_SEGMENTS = 64;
const CLOUD_ROTATION_SPEED = 0.12;
const CLOUD_OPACITY = 0.28;

// Increase this whenever replacing the cloud texture.
const TEXTURE_VERSION = "v3";

// ═════════════════════════════════════════════════════════════════════════════
// Cloud Component
// ═════════════════════════════════════════════════════════════════════════════

export default function Clouds() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // ─────────────────────────────────────────────────────────────────────────
  // Load cloud texture with cache-busting
  // ─────────────────────────────────────────────────────────────────────────

  const texture = useTexture(
    `/textures/earth-clouds.png?${TEXTURE_VERSION}`
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Configure texture
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!texture) return;

    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 4;

    texture.minFilter = LinearMipmapLinearFilter;
    texture.magFilter = LinearFilter;

    texture.generateMipmaps = true;
    texture.needsUpdate = true;

    return () => {
      texture.dispose();
    };
  }, [texture]);

  // ─────────────────────────────────────────────────────────────────────────
  // Cloud rotation
  // ─────────────────────────────────────────────────────────────────────────

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += CLOUD_ROTATION_SPEED * delta;
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <mesh
      ref={meshRef}
      scale={[1, 1, 1]}
      renderOrder={1}
    >
      <sphereGeometry
        args={[
          CLOUD_RADIUS,
          CLOUD_SEGMENTS,
          CLOUD_SEGMENTS,
        ]}
      />

      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={CLOUD_OPACITY}
        depthWrite={false}
        depthTest={true}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}