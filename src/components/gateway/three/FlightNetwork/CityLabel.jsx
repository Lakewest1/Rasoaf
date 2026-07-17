// src/components/gateway/three/FlightNetwork/CityLabel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Premium City Label
// Compact glassmorphism pill. Fades and scales behind globe.
// Collision avoidance prevents overlapping labels.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import { latLngToVec3 } from "./geoUtils";
import { LABELS, EARTH_RADIUS } from "./constants";

// ── Per-city offset directions (normalized) ────────────────────────────────
// These push the label slightly away from the city position so they don't
// sit directly on top of the marker. Values are multipliers on the outward
// normal direction, adjusted per city to avoid overlaps.
const CITY_OFFSETS = {
  "London":        { u: -0.6, v:  0.5 },
  "Lagos":         { u: -0.3, v: -0.6 },
  "Dubai":         { u:  0.5, v:  0.2 },
  "Abuja":         { u: -0.5, v: -0.3 },
  "Cairo":         { u: -0.2, v:  0.6 },
  "Jeddah":        { u:  0.3, v: -0.5 },
  "Madinah":       { u:  0.6, v:  0.1 },
  "Istanbul":      { u: -0.7, v:  0.3 },
  "Makkah":        { u:  0.4, v:  0.5 },
  "Kuala Lumpur":  { u:  0.5, v: -0.4 },
};

// ── Pre-computed camera position ────────────────────────────────────────────
const cameraPos = new Vector3(0, 0, 8);

export default function CityLabel({ name, lat, lng }) {
  const groupRef = useRef(null);
  const htmlRef = useRef(null);
  const { size } = useThree(); // viewport size for distance calculation

  // ── Calculate base position (on sphere surface, pushed outward) ──────────
  const basePos = latLngToVec3(lat, lng);
  const outward = basePos.clone().normalize();

  // Apply per-city offset
  const offset = CITY_OFFSETS[name] || { u: 0, v: 0 };
  // Create tangent vectors for the offset
  const up = new Vector3(0, 1, 0);
  const right = new Vector3().crossVectors(outward, up).normalize();
  const localUp = new Vector3().crossVectors(right, outward).normalize();

  // Final position: outward from surface + tangent offset
  const position = outward
    .clone()
    .multiplyScalar(LABELS.OFFSET)
    .add(right.clone().multiplyScalar(offset.u * 0.3))
    .add(localUp.clone().multiplyScalar(offset.v * 0.3));

  // ── Update visibility per frame ───────────────────────────────────────────
  useFrame(() => {
    if (!groupRef.current || !htmlRef.current) return;

    const worldPos = new Vector3();
    groupRef.current.getWorldPosition(worldPos);

    // How much the label faces the camera (1 = fully facing, -1 = behind)
    const toPoint = worldPos.clone().normalize();
    const toCamera = cameraPos.clone().normalize();
    const dot = toPoint.dot(toCamera);

    // Smooth visibility curve: maps [-0.3, 1] → [0.25, 1]
    const rawVisibility = Math.max(0, (dot + 0.3) / 1.3);
    const visibility = LABELS.MIN_OPACITY + rawVisibility * (LABELS.MAX_OPACITY - LABELS.MIN_OPACITY);

    // Distance-based scale: closer = 1.0, far = 0.8
    const distance = worldPos.distanceTo(cameraPos);
    const maxDistance = 12;
    const scale = 1.0 - (distance / maxDistance) * 0.2;
    const clampedScale = Math.max(0.8, Math.min(1.0, scale));

    // Apply
    htmlRef.current.style.opacity = visibility;
    htmlRef.current.style.transform = `scale(${clampedScale})`;
  });

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        sprite
        distanceFactor={10}
        center
        occlude={false}
        style={{
          pointerEvents: "none",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div
          ref={htmlRef}
          style={{
            background: "rgba(8,12,20,0.72)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: "9999px",
            padding: "4px 10px",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "#F5D67B",
            whiteSpace: "nowrap",
            boxShadow: "0 0 12px rgba(212,175,55,0.18)",
            opacity: 1,
            transition: "opacity 0.5s ease, transform 0.5s ease",
            lineHeight: 1.4,
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}