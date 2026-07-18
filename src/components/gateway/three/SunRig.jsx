// src/components/gateway/three/SunRig.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Animated Sun Rig
// Orbits a directional light around the Earth over ~75 seconds.
// Color and intensity interpolate through morning → noon → sunset → night.
// Controls the scene's key light, fill light, and rim light.
// Exposes sunDirection for atmosphere scattering reactivity.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Color } from "three";

// ── Sun orbit configuration ─────────────────────────────────────────────────
const ORBIT_RADIUS = 12;
const ORBIT_DURATION = 75; // seconds for one complete orbit
const ORBIT_HEIGHT = 3;    // tilt the orbit slightly for seasonal variation

// ── Color stops for the day/night cycle ─────────────────────────────────────
const SUN_COLORS = {
  NOON:      new Color("#FFF8F0"),
  MORNING:   new Color("#FFD27A"),
  SUNSET:    new Color("#FFB35A"),
  NIGHT:     new Color("#334477"),
};

const RIM_COLORS = {
  DAY:       new Color("#ccaa44"),
  SUNRISE:   new Color("#eebb55"),
  SUNSET:    new Color("#dd9944"),
  NIGHT:     new Color("#223355"),
};

const FILL_COLORS = {
  DAY:       new Color("#334477"),
  NIGHT:     new Color("#1a2a4a"),
};

// ── Helper: smooth interpolation between colors ─────────────────────────────
function lerpColor(a, b, t) {
  return new Color(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t
  );
}

/**
 * Given the sun's angle (0 = overhead, PI = behind Earth),
 * return the interpolated sun color, intensity, rim color, and fill color.
 */
function getLightingState(angle) {
  const a = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const dayFactor = (Math.cos(a) + 1) / 2;
  const sinA = Math.sin(a);
  const morningFactor = Math.max(0, sinA) * (1 - Math.abs(Math.cos(a)));
  const sunsetFactor = Math.max(0, -sinA) * (1 - Math.abs(Math.cos(a)));

  // Sun color
  let sunColor;
  if (dayFactor > 0.7) {
    sunColor = lerpColor(SUN_COLORS.MORNING, SUN_COLORS.NOON, (dayFactor - 0.7) / 0.3);
  } else if (dayFactor > 0.3) {
    sunColor = lerpColor(SUN_COLORS.NIGHT, SUN_COLORS.MORNING, (dayFactor - 0.3) / 0.4);
  } else {
    sunColor = SUN_COLORS.NIGHT.clone();
  }

  if (morningFactor > 0.3) sunColor.lerp(SUN_COLORS.MORNING, morningFactor * 0.4);
  if (sunsetFactor > 0.3) sunColor.lerp(SUN_COLORS.SUNSET, sunsetFactor * 0.5);

  // Sun intensity
  const intensity = 0.3 + dayFactor * 2.2;

  // Rim light color
  let rimColor;
  if (morningFactor > 0.2) {
    rimColor = lerpColor(RIM_COLORS.DAY, RIM_COLORS.SUNRISE, Math.min(1, morningFactor * 2));
  } else if (sunsetFactor > 0.2) {
    rimColor = lerpColor(RIM_COLORS.DAY, RIM_COLORS.SUNSET, Math.min(1, sunsetFactor * 2));
  } else if (dayFactor < 0.2) {
    rimColor = RIM_COLORS.NIGHT.clone();
  } else {
    rimColor = RIM_COLORS.DAY.clone();
  }

  // Rim intensity
  const rimIntensity = 0.4 + morningFactor * 0.5 + sunsetFactor * 0.5;

  // Fill light
  const fillColor = lerpColor(FILL_COLORS.NIGHT, FILL_COLORS.DAY, dayFactor);
  const fillIntensity = 0.25 + dayFactor * 0.25;

  return { sunColor, intensity, rimColor, rimIntensity, fillColor, fillIntensity };
}

// ══════════════════════════════════════════════════════════════════════════
export default function SunRig({ onSunDirectionChange }) {
  const sunRef = useRef(null);
  const rimRef = useRef(null);
  const fillRef = useRef(null);
  const ambientRef = useRef(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Pre-allocated vectors — no garbage collection
  const sunDirRef = useRef(new Vector3());

  const orbitAxis = useMemo(() => new Vector3(0, ORBIT_HEIGHT, 0).normalize(), []);

  useFrame((_, delta) => {
    angleRef.current += (delta / ORBIT_DURATION) * Math.PI * 2;
    const angle = angleRef.current;

    // Sun position on orbit
    const sunX = Math.cos(angle) * ORBIT_RADIUS;
    const sunZ = Math.sin(angle) * ORBIT_RADIUS;
    const sunY = Math.sin(angle) * ORBIT_HEIGHT;

    // Update sun direction (points from sun position toward Earth center)
    sunDirRef.current.set(-sunX, -sunY, -sunZ).normalize();

    // Notify parent of sun direction for atmosphere reactivity
    if (onSunDirectionChange) {
      onSunDirectionChange(sunDirRef.current);
    }

    const lighting = getLightingState(angle);

    // ── Update sun (key light) ──────────────────────────────────────────
    if (sunRef.current) {
      sunRef.current.position.set(sunX, sunY, sunZ);
      sunRef.current.color.copy(lighting.sunColor);
      sunRef.current.intensity = lighting.intensity;
    }

    // ── Update rim light ────────────────────────────────────────────────
    if (rimRef.current) {
      rimRef.current.position.set(-sunX * 0.6, -sunY * 0.5, -sunZ * 0.6);
      rimRef.current.color.copy(lighting.rimColor);
      rimRef.current.intensity = lighting.rimIntensity;
    }

    // ── Update fill light ───────────────────────────────────────────────
    if (fillRef.current) {
      fillRef.current.position.set(-sunX * 0.4, -1, -sunZ * 0.4);
      fillRef.current.color.copy(lighting.fillColor);
      fillRef.current.intensity = lighting.fillIntensity;
    }
  });

  return (
    <>
      {/* Sun — directional key light */}
      <directionalLight
        ref={sunRef}
        position={[8, 3, 5]}
        intensity={2.2}
        color="#fff8e7"
        castShadow
      />

      {/* Rim light — warm edge glow */}
      <directionalLight
        ref={rimRef}
        position={[-3, 2, -6]}
        intensity={0.7}
        color="#ccaa44"
      />

      {/* Fill light — subtle ambient bounce */}
      <directionalLight
        ref={fillRef}
        position={[-6, -1, -4]}
        intensity={0.5}
        color="#334477"
      />

      {/* Ambient — increased for night-side visibility */}
      <ambientLight
        ref={ambientRef}
        color="#2a3a5a"
        intensity={0.45}
      />

      {/* Hemisphere light — sky/ground indirect bounce */}
      <hemisphereLight
        color="#4466aa"
        groundColor="#1a1a2e"
        intensity={0.25}
      />
    </>
  );
}