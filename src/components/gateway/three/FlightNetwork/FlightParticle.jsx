// src/components/gateway/three/FlightNetwork/FlightParticle.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Single Traveling Particle
// Travels origin → destination. Pulses on arrival.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createFlightArc, getArcPoint } from "./geoUtils";
import { PARTICLES } from "./constants";

export default function FlightParticle({ start, end, opacity = 1, state = "traveling", index = 0 }) {
  const meshRef = useRef(null);
  const glowRef = useRef(null);
  const curveRef = useRef(null);
  const speedRef = useRef(null);
  const arrivalPulseRef = useRef(0);

  if (!curveRef.current) {
    curveRef.current = createFlightArc(start, end);
    speedRef.current =
      PARTICLES.MIN_DURATION + Math.random() * (PARTICLES.MAX_DURATION - PARTICLES.MIN_DURATION);

    const initialProgress = 0;
    const point = getArcPoint(curveRef.current, initialProgress);
    if (meshRef.current) {
      meshRef.current.position.copy(point);
      if (glowRef.current) glowRef.current.position.copy(point);
    }
  }

  useFrame((_, delta) => {
    if (!curveRef.current || !meshRef.current) return;

    const curve = curveRef.current;
    const speed = speedRef.current;

    if (state === "traveling" || state === "fadingIn") {
      // Move from origin (0) to destination (1)
      const elapsed = (performance.now() * 0.001) / speed;
      const t = Math.min(elapsed, 1.0);
      const point = getArcPoint(curve, t);
      meshRef.current.position.copy(point);
      if (glowRef.current) glowRef.current.position.copy(point);
    }

    if (state === "arriving") {
      // Hold at destination with pulse
      arrivalPulseRef.current += delta;
      const pulse = 1 + Math.sin(arrivalPulseRef.current * 8) * 0.4;
      const scale = pulse;
      meshRef.current.scale.setScalar(scale);
      if (glowRef.current) glowRef.current.scale.setScalar(scale * 1.3);
    }

    if (state === "holding" || state === "fadingOut") {
      // Stay at destination, subtle glow
      meshRef.current.scale.setScalar(0.9);
      if (glowRef.current) glowRef.current.scale.setScalar(0.9 * 1.3);
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[PARTICLES.SIZE, 6, 6]} />
        <meshBasicMaterial
          color={PARTICLES.COLOR}
          transparent
          opacity={PARTICLES.GLOW_OPACITY * opacity}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[PARTICLES.SIZE, 8, 8]} />
        <meshBasicMaterial
          color={PARTICLES.COLOR}
          transparent
          opacity={PARTICLES.OPACITY * opacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}