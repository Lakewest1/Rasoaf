// src/components/gateway/three/FlightNetwork/FloatingLabel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Single Floating Label
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import { latLngToVec3 } from "./geoUtils";
import { LABELS, LABEL_OFFSETS } from "./constants";

const cameraPos = new Vector3(0, 0, 8);

export default function FloatingLabel({ city }) {
  const groupRef = useRef(null);
  const htmlRef = useRef(null);
  const { name } = city;

  const surface = useMemo(() => latLngToVec3(city.lat, city.lng), [city.lat, city.lng]);

  const labelPos = useMemo(() => {
    const outward = surface.clone().normalize();
    const off = LABEL_OFFSETS[name] || { u: 0, v: 0 };
    const up = new Vector3(0, 1, 0);
    const right = new Vector3().crossVectors(outward, up).normalize();
    const localUp = new Vector3().crossVectors(right, outward).normalize();
    return outward.clone().multiplyScalar(LABELS.OFFSET)
      .add(right.clone().multiplyScalar(off.u * 0.3))
      .add(localUp.clone().multiplyScalar(off.v * 0.3));
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

  return (
    <group ref={groupRef}>
      <mesh position={surface}>
        <sphereGeometry args={[LABELS.MARKER_SIZE, 10, 10]} />
        <meshBasicMaterial color={LABELS.MARKER_COLOR} transparent opacity={LABELS.MARKER_OPACITY} depthWrite={false} />
      </mesh>
      <group position={labelPos}>
        <Html transform sprite distanceFactor={10} center occlude={false} style={{ pointerEvents: "none" }}>
          <span ref={htmlRef} style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "7px", fontWeight: 400, letterSpacing: "0.07em",
            color: "#E8C547", whiteSpace: "nowrap",
            textShadow: "0 0 5px rgba(212,175,55,0.15)",
            opacity: 1, transition: "opacity 0.6s ease", lineHeight: 1,
          }}>
            {name}
          </span>
        </Html>
      </group>
    </group>
  );
}