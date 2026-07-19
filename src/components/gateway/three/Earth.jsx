// src/components/gateway/three/Earth.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Photorealistic Earth
// All hooks called unconditionally. Renders null when textures aren't ready,
// but hooks always execute in the same order.
// Texture configuration runs ONCE per texture set (useEffect), not on every
// render — mutating filter/colorSpace and flagging needsUpdate every render
// forces the renderer to re-upload the texture to the GPU every time this
// component re-renders (e.g. whenever a sibling like SunRig updates state),
// which is unnecessary and can visibly hitch on lower-end devices.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SRGBColorSpace, NoColorSpace, LinearMipmapLinearFilter, LinearFilter } from "three";

const EARTH_RADIUS = 2.5;
const EARTH_SEGMENTS = 128;
const EARTH_ROTATION_SPEED = 0.08;
const INITIAL_ROTATION = 3.8;

// Shared filter/anisotropy config applied to every Earth texture map.
function configureTexture(texture, colorSpace) {
  if (!texture) return;
  texture.colorSpace = colorSpace;
  texture.anisotropy = 8;
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = true;
  // Required after changing colorSpace/filtering — without this the GPU
  // keeps using the texture's previous upload state until something else
  // happens to trigger a re-upload.
  texture.needsUpdate = true;
}

export default function Earth({ textures }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  // ── Hooks must always be called — never conditional ───────────────────
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += EARTH_ROTATION_SPEED * delta;
    }
  });

  // Configure textures once, when the texture set changes — not on every
  // render of this component.
  useEffect(() => {
    if (!textures) return;
    configureTexture(textures.day, SRGBColorSpace);
    configureTexture(textures.bump, NoColorSpace);
    configureTexture(textures.specular, NoColorSpace);
  }, [textures]);

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry?.dispose();
    };
  }, []);

  // ── Early return AFTER all hooks ──────────────────────────────────────
  // Guard each map individually — a partially-populated textures object
  // (e.g. one failed load that didn't throw) shouldn't render a mesh with
  // undefined maps.
  if (!textures?.day || !textures?.bump || !textures?.specular) return null;

  const { day, bump, specular } = textures;

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