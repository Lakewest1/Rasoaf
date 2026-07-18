// src/components/gateway/three/FlightNetwork/FlightArc.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Single Flight Arc
// Subtle dimming during hold phase. Smooth fade out.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TubeGeometry, CatmullRomCurve3 } from "three";
import { createFlightArc } from "./geoUtils";
import { FLIGHTS } from "./constants";

export default function FlightArc({ start, end, opacity = 1, state = "traveling", index = 0 }) {
  const mainRef = useRef(null);
  const glowRef = useRef(null);
  const elapsedRef = useRef(index * 1.5);

  const { mainGeo, glowGeo } = useMemo(() => {
    const curve = createFlightArc(start, end);
    const points = curve.getPoints(FLIGHTS.ARC_SEGMENTS);
    const catmullCurve = new CatmullRomCurve3(points);
    const main = new TubeGeometry(catmullCurve, FLIGHTS.TUBE_SEGMENTS, FLIGHTS.MAIN_TUBE_RADIUS, 6, false);
const glow = new TubeGeometry(catmullCurve, FLIGHTS.TUBE_SEGMENTS, FLIGHTS.GLOW_TUBE_RADIUS, 6, false);
    return { mainGeo: main, glowGeo: glow };
  }, [start, end]);

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    // Subtle pulse during travel, gentler during hold
    const pulseMultiplier = state === "holding" ? 0.5 : 1.0;
    const pulse = 1 + Math.sin(elapsedRef.current * ((2 * Math.PI) / FLIGHTS.PULSE_DURATION)) * FLIGHTS.PULSE_AMPLITUDE * pulseMultiplier;

    if (mainRef.current) {
      mainRef.current.material.opacity = opacity * FLIGHTS.ARC_OPACITY * (0.9 + 0.1 * pulse);
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = opacity * FLIGHTS.ARC_GLOW_OPACITY * (0.8 + 0.2 * pulse);
    }
  });

  return (
    <group>
      <mesh ref={glowRef} geometry={glowGeo}>
        <meshBasicMaterial color={FLIGHTS.ARC_GLOW_COLOR} transparent opacity={FLIGHTS.ARC_GLOW_OPACITY * opacity} depthWrite={false} />
      </mesh>
      <mesh ref={mainRef} geometry={mainGeo}>
        <meshBasicMaterial color={FLIGHTS.ARC_COLOR} transparent opacity={FLIGHTS.ARC_OPACITY * opacity} depthWrite={false} />
      </mesh>
    </group>
  );
}