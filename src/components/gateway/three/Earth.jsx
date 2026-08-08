// src/components/gateway/three/Earth.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Photorealistic Earth
// Robust texture loading + Three.js optimization
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, SphereGeometry } from "three";
import {
  SRGBColorSpace,
  NoColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
} from "three";

// ═════════════════════════════════════════════════════════════════════════════
// Configuration
// ═════════════════════════════════════════════════════════════════════════════

const EARTH_RADIUS = 2.5;
const EARTH_SEGMENTS = 128;
const EARTH_ROTATION_SPEED = 0.08;
const INITIAL_ROTATION = 3.8;

// Cache-busting version.
// Increase this number when replacing texture files.
const TEXTURE_VERSION = "v2";

// ═════════════════════════════════════════════════════════════════════════════
// Texture configuration
// ═════════════════════════════════════════════════════════════════════════════

function configureTexture(texture, colorSpace) {
  if (!texture) return;

  texture.colorSpace = colorSpace;

  // Better quality on angled surfaces
  texture.anisotropy = 8;

  // Filtering
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;

  // Generate mipmaps
  texture.generateMipmaps = true;

  texture.needsUpdate = true;
}

// ═════════════════════════════════════════════════════════════════════════════
// Earth Component
// ═════════════════════════════════════════════════════════════════════════════

export default function Earth() {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // ─────────────────────────────────────────────────────────────────────────
  // Load textures individually
  //
  // The ?v=2 prevents an old cached texture response from being reused.
  // ─────────────────────────────────────────────────────────────────────────

  const day = useLoader(
    TextureLoader,
    `/textures/earth-day.jpg?${TEXTURE_VERSION}`
  );

  const bump = useLoader(
    TextureLoader,
    `/textures/earth-bump.png?${TEXTURE_VERSION}`
  );

  const specular = useLoader(
    TextureLoader,
    `/textures/earth-specular.jpg?${TEXTURE_VERSION}`
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Create Earth geometry once
  // ─────────────────────────────────────────────────────────────────────────

  const geometry = useMemo(() => {
    return new SphereGeometry(
      EARTH_RADIUS,
      EARTH_SEGMENTS,
      EARTH_SEGMENTS
    );
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // Configure loaded textures
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    configureTexture(day, SRGBColorSpace);
    configureTexture(bump, NoColorSpace);
    configureTexture(specular, NoColorSpace);
  }, [day, bump, specular]);

  // ─────────────────────────────────────────────────────────────────────────
  // Earth rotation
  // ─────────────────────────────────────────────────────────────────────────

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += EARTH_ROTATION_SPEED * delta;
  });

  // ─────────────────────────────────────────────────────────────────────────
  // Cleanup
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      geometry.dispose();

      day?.dispose();
      bump?.dispose();
      specular?.dispose();
    };
  }, [geometry, day, bump, specular]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[0, INITIAL_ROTATION, 0]}
      castShadow
      receiveShadow
    >
      <meshPhongMaterial
        ref={materialRef}
        map={day}
        bumpMap={bump}
        bumpScale={0.035}
        specularMap={specular}
        specular={0x555555}
        shininess={15}
      />
    </mesh>
  );
}