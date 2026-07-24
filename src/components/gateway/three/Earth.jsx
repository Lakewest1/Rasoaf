// src/components/gateway/three/Earth.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Photorealistic Earth (v2.0)
// Optimized: Stable frame callback · Memoized geometry · Proper cleanup
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  SRGBColorSpace,
  NoColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
  SphereGeometry,
} from "three";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope
// ══════════════════════════════════════════════════════════════════════════
const EARTH_RADIUS = 2.5;
const EARTH_SEGMENTS = 128;
const EARTH_ROTATION_SPEED = 0.08;
const INITIAL_ROTATION = 3.8;

// ══════════════════════════════════════════════════════════════════════════
// Shared texture configuration — applied once per texture set
// ══════════════════════════════════════════════════════════════════════════
function configureTexture(texture, colorSpace) {
  if (!texture) return;
  texture.colorSpace = colorSpace;
  texture.anisotropy = 8;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  // Required after changing colorSpace/filtering — triggers GPU re-upload
  texture.needsUpdate = true;
}

// ══════════════════════════════════════════════════════════════════════════
// Earth Component
// ══════════════════════════════════════════════════════════════════════════
export default function Earth({ textures }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // ── Memoized geometry — created once, shared across renders ──────────
  const geometry = useMemo(
    () => new SphereGeometry(EARTH_RADIUS, EARTH_SEGMENTS, EARTH_SEGMENTS),
    []
  );

  // ── Stable rotation speed ref — avoids recreating useFrame callback ──
  const rotationSpeedRef = useRef(EARTH_ROTATION_SPEED);

  // Update rotation speed ref if constant ever changes (hot-reload safety)
  useEffect(() => {
    rotationSpeedRef.current = EARTH_ROTATION_SPEED;
  }, []);

  // ── Stable useFrame callback — never recreated ───────────────────────
  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += rotationSpeedRef.current * delta;
    }
  });

  // ── Configure textures once when texture set changes ──────────────────
  useEffect(() => {
    if (!textures) return;
    configureTexture(textures.day, SRGBColorSpace);
    configureTexture(textures.bump, NoColorSpace);
    configureTexture(textures.specular, NoColorSpace);
  }, [textures]);

  // ── Cleanup — dispose geometry + material (textures managed by parent) ─
  useEffect(() => {
    const material = materialRef.current;
    const mesh = meshRef.current;

    return () => {
      material?.dispose();
      mesh?.geometry?.dispose();
      // Dispose the memoized geometry if mesh already cleaned up
      geometry.dispose();
    };
  }, [geometry]);

  // ── Early return AFTER all hooks — never conditional ──────────────────
  if (!textures?.day || !textures?.bump || !textures?.specular) return null;

  const { day, bump, specular } = textures;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[0, INITIAL_ROTATION, 0]}
      castShadow
      receiveShadow
    >
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