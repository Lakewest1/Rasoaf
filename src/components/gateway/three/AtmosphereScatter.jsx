// src/components/gateway/three/AtmosphereScatter.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Fresnel-Based Atmospheric Scattering
//
// Renders a translucent shell slightly larger than Earth.
// Opacity increases at grazing angles (edges) via a custom shader.
// Color shifts with sun position: cool blue at noon, gold at sunrise/sunset.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, Vector3, AdditiveBlending } from "three";
import { EARTH } from "../constants";

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  uniform vec3 uSunDirection;
  uniform vec3 uAtmosphereColor;
  uniform float uFresnelPower;
  uniform float uOpacity;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    float fresnel = 1.0 - abs(dot(viewDir, vNormal));
    fresnel = pow(fresnel, uFresnelPower);

    float sunDot = dot(vNormal, uSunDirection);
    float sunInfluence = smoothstep(-0.3, 0.5, sunDot);

    float alpha = fresnel * uOpacity * (0.6 + 0.4 * sunInfluence);

    vec3 color = uAtmosphereColor;
    float horizonFactor = 1.0 - abs(sunDot);
    vec3 warmColor = mix(color, vec3(1.0, 0.65, 0.3), horizonFactor * 0.3);
    color = mix(color, warmColor, smoothstep(0.0, 0.4, horizonFactor));

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function AtmosphereScatter({ sunDirection }) {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  const atmosphereRadius = EARTH.RADIUS * 1.08;

  const uniforms = useMemo(() => ({
    uSunDirection: { value: new Vector3(1, 0.5, 0.5) },
    uAtmosphereColor: { value: new Color("#65AFFF") },
    uFresnelPower: { value: 3.5 },
    uOpacity: { value: 0.45 },
  }), []);

  useFrame(() => {
    if (!uniforms || !sunDirection) return;
    uniforms.uSunDirection.value.copy(sunDirection).normalize();
  });

  // The shader material and sphere geometry are created by R3F via JSX, but
  // this cleanup is kept explicit and consistent with Earth.jsx/Clouds.jsx
  // so disposal behavior for this "shell" family of meshes doesn't depend
  // on which auto-dispose defaults R3F happens to apply.
  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
      meshRef.current?.geometry?.dispose();
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[atmosphereRadius, 96, 96]} />
      <shaderMaterial
        ref={materialRef}
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