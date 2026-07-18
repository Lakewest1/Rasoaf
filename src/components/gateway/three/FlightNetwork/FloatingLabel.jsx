// src/components/gateway/three/FlightNetwork/FloatingLabel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Single Floating Label
// Per-country offsets prevent overlap. Fades behind globe.
// Responsive font size — smaller on mobile.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import { latLngToVec3 } from "./geoUtils";
import { LABELS } from "./constants";

// ── Per-country offsets — prevents overlapping labels ──────────────────────
const OFFSETS = {
  "United Kingdom":  { u: -0.65, v: 0.55 },
  "Nigeria":         { u: 0,     v: -0.7 },
  "Ghana":           { u: 0.2,   v: -0.7 },
  "Kenya":           { u: 0.4,   v: -0.65 },
  "South Africa":    { u: 0.35,  v: -0.8 },
  "Canada":          { u: -0.7,  v: -0.45 },
  "United States":   { u: -0.55, v: -0.65 },
  "UAE":             { u: 0.45,  v: -0.25 },
  "Qatar":           { u: 0.5,   v: -0.15 },
  "Turkey":          { u: 0.35,  v: 0.55 },
  "Saudi Arabia":    { u: 0.55,  v: 0.4 },
};

const cameraPos = new Vector3(0, 0, 8);

// ── Responsive font size ───────────────────────────────────────────────────
function getFontSize() {
  if (typeof window === "undefined") return "7px";
  const w = window.innerWidth;
  if (w <= 380) return "5px";
  if (w <= 600) return "5.5px";
  if (w <= 900) return "6px";
  return "7px";
}

export default function FloatingLabel({ city }) {
  const groupRef = useRef(null);
  const htmlRef = useRef(null);

  // ── Guard: don't render if city data is missing ────────────────────────
  if (!city || !city.name || city.lat === undefined || city.lng === undefined) {
    return null;
  }

  const { name } = city;

  const surface = useMemo(() => latLngToVec3(city.lat, city.lng), [city.lat, city.lng]);

  const labelPos = useMemo(() => {
    const outward = surface.clone().normalize();
    const off = OFFSETS[name] || { u: 0, v: 0 };
    const up = new Vector3(0, 1, 0);
    const right = new Vector3().crossVectors(outward, up).normalize();
    const localUp = new Vector3().crossVectors(right, outward).normalize();
    return outward
      .clone()
      .multiplyScalar(LABELS.OFFSET)
      .add(right.clone().multiplyScalar(off.u * 0.35))
      .add(localUp.clone().multiplyScalar(off.v * 0.35));
  }, [surface, name]);

  useFrame(() => {
    if (!groupRef.current || !htmlRef.current) return;
    const worldPos = new Vector3();
    groupRef.current.getWorldPosition(worldPos);
    const toPoint = worldPos.clone().normalize();
    const toCamera = cameraPos.clone().normalize();
    const dot = toPoint.dot(toCamera);
    const rawVis = Math.max(0, (dot + 0.15) / 1.15);
    const visibility = LABELS.MIN_OPACITY + rawVis * (LABELS.MAX_OPACITY - LABELS.MIN_OPACITY);
    htmlRef.current.style.opacity = visibility;
  });

  const fontSize = getFontSize();

  return (
    <group ref={groupRef}>
      <mesh position={surface}>
        <sphereGeometry args={[LABELS.MARKER_SIZE, 10, 10]} />
        <meshBasicMaterial color={LABELS.MARKER_COLOR} transparent opacity={LABELS.MARKER_OPACITY} depthWrite={false} />
      </mesh>
      <group position={labelPos}>
        <Html transform sprite distanceFactor={10} center occlude={false} style={{ pointerEvents: "none" }}>
          <span
            ref={htmlRef}
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: fontSize,
              fontWeight: 400,
              letterSpacing: "0.07em",
              color: "#E8C547",
              whiteSpace: "nowrap",
              textShadow: "0 0 5px rgba(212,175,55,0.15)",
              opacity: 1,
              transition: "opacity 0.6s ease",
              lineHeight: 1,
            }}
          >
            {name}
          </span>
        </Html>
      </group>
    </group>
  );
}