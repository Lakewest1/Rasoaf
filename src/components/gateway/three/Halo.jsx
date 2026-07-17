// src/components/gateway/three/Halo.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Thin Outer Atmospheric Halo
//
// Very subtle. Outlines the planet with a faint blue-white rim.
// Brighter at sunrise/sunset. Almost invisible at noon. Present at night.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, Vector3, AdditiveBlending } from "three";
import { EARTH } from "../constants";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  uniform vec3 uSunDirection;
  uniform vec3 uHaloColor;
  uniform float uOpacity;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, 8.0);

    float sunDot = dot(vNormal, uSunDirection);
    float sunInfluence = smoothstep(-0.2, 0.3, sunDot);

    float alpha = fresnel * uOpacity * (0.3 + 0.7 * sunInfluence);

    float horizon = 1.0 - abs(sunDot);
    vec3 color = mix(uHaloColor, vec3(1.0, 0.7, 0.4), horizon * 0.25);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function Halo({ sunDirection }) {
  const meshRef = useRef(null);

  const haloRadius = EARTH.RADIUS * 1.15;

  const uniforms = useMemo(() => ({
    uSunDirection: { value: new Vector3(1, 0.5, 0.5) },
    uHaloColor: { value: new Color("#8CCBFF") },
    uOpacity: { value: 0.22 },
  }), []);

  useFrame(() => {
    if (!uniforms || !sunDirection) return;
    uniforms.uSunDirection.value.copy(sunDirection).normalize();
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[haloRadius, 96, 96]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={BackSide}
      />
    </mesh>
  );
}