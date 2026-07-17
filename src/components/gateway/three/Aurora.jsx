// src/components/gateway/three/Aurora.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Subtle Polar Aurora Borealis
//
// Two faint glowing rings near the poles.
// Colors shift slowly through cyan/teal/green/purple.
// Only visible on the night side. Wavy organic motion.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RingGeometry, Color, Vector3, AdditiveBlending, DoubleSide } from "three";
import { EARTH } from "../constants";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;

  uniform vec3 uSunDirection;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uOpacity;

  void main() {
    float sunDot = dot(normalize(vWorldPosition), uSunDirection);
    float nightFactor = smoothstep(0.0, -0.5, sunDot);
    if (nightFactor < 0.05) discard;

    float wave = sin(vUv.x * 12.0 + uTime * 0.3) * 0.5 + 0.5;
    wave += sin(vUv.x * 7.0 - uTime * 0.2) * 0.3;
    wave += cos(vUv.x * 19.0 + uTime * 0.15) * 0.2;
    wave = wave / 3.0 + 0.33;

    vec3 color = mix(uColor1, uColor2, wave);

    float edgeFade = smoothstep(0.0, 0.3, vUv.x) * (1.0 - smoothstep(0.7, 1.0, vUv.x));
    edgeFade *= smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.8, 1.0, vUv.y));

    float alpha = uOpacity * nightFactor * edgeFade * (0.6 + 0.4 * wave);

    gl_FragColor = vec4(color, alpha);
  }
`;

function AuroraRing({ sunDirection, position, color1, color2 }) {
  const meshRef = useRef(null);
  const ringRadius = EARTH.RADIUS * 1.04;

  const uniforms = useMemo(() => ({
    uSunDirection: { value: new Vector3(1, 0.5, 0.5) },
    uColor1: { value: new Color(color1) },
    uColor2: { value: new Color(color2) },
    uTime: { value: 0 },
    uOpacity: { value: 0.22 },
  }), [color1, color2]);

  const geometry = useMemo(() => {
    return new RingGeometry(ringRadius * 0.85, ringRadius * 1.05, 128, 1);
  }, [ringRadius]);

  useFrame((_, delta) => {
    if (!uniforms || !sunDirection) return;
    uniforms.uSunDirection.value.copy(sunDirection).normalize();
    uniforms.uTime.value += delta * 0.15;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
}

export default function Aurora({ sunDirection }) {
  return (
    <group>
      <AuroraRing
        sunDirection={sunDirection}
        position={[0, EARTH.RADIUS * 0.88, 0]}
        color1="#6EFFC6"
        color2="#69CFFF"
      />
      <AuroraRing
        sunDirection={sunDirection}
        position={[0, -EARTH.RADIUS * 0.88, 0]}
        color1="#8B7DFF"
        color2="#69CFFF"
      />
    </group>
  );
}