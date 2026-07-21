// src/components/travel/HeroEarthBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Hero Earth Background
// Reuses gateway/three/ Earth pipeline with cinematic zooming camera
// No duplication — same Earth, same textures, same shaders as Gateway
// ─────────────────────────────────────────────────────────────────────────────

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Reuse the EXACT same components from gateway/three ──────────────────
import Earth from "../gateway/three/Earth";
import Clouds from "../gateway/three/Clouds";
import Atmosphere from "../gateway/three/Atmosphere";
import Halo from "../gateway/three/Halo";
import Stars from "../gateway/three/Stars";
import SpaceDust from "../gateway/three/SpaceDust";
import GoldParticles from "../gateway/three/GoldParticles";
import ShootingStars from "../gateway/three/ShootingStars";
import Satellites from "../gateway/three/Satellites";
import SunRig from "../gateway/three/SunRig";

// ══════════════════════════════════════════════════════════════════════════
//  TEXTURE LOADER — Same URLs as Gateway's useEarthTextures
// ══════════════════════════════════════════════════════════════════════════
function useHeroTextures() {
  const [state, setState] = useState({ ready: false, textures: null });

  useEffect(() => {
    let cancelled = false;
    import("three").then(({ TextureLoader, LoadingManager }) => {
      if (cancelled) return;
      const manager = new LoadingManager();
      const loader = new TextureLoader(manager);

      const urls = {
        day: "/textures/earth-day.jpg",
        bump: "/textures/earth-bump.png",
        specular: "/textures/earth-specular.jpg",
        clouds: "/textures/earth-clouds.png",
      };

      const result = {};
      const total = Object.keys(urls).length;
      let loaded = 0;

      Object.entries(urls).forEach(([key, url]) => {
        loader.load(
          url,
          (texture) => { result[key] = texture; loaded++; if (loaded === total && !cancelled) setState({ ready: true, textures: result }); },
          undefined,
          () => { loaded++; if (loaded === total && !cancelled) setState({ ready: true, textures: result }); }
        );
      });
    });
    return () => { cancelled = true; };
  }, []);

  return state;
}

// ══════════════════════════════════════════════════════════════════════════
//  CINEMATIC HERO CAMERA — 3-Phase Zoom Sequence
//  Phase 1 (0-3.5s): Rapid approach — Earth zooms from far to filling screen
//  Phase 2 (3.5-6s): Hold — Earth massive, slowly rotating
//  Phase 3 (6-8s):   Slow drift back
//  After 8s:         Breathing loop — Earth stays large
// ══════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════
//  CINEMATIC HERO CAMERA — Very close orbit, Earth fills screen
//  Starts close, stays close, gentle breathing, continuous rotation
//  Completely independent from Gateway camera
// ══════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════
//  CINEMATIC HERO CAMERA — Already in orbit, Earth massive, subtle breathing
//  Starts close · Holds · Gentle pull back · Push forward · Loop
//  Earth occupies 75-85% viewport · Never zooms · Never becomes small
// ══════════════════════════════════════════════════════════════════════════
function HeroCamera({ reducedMotion = false }) {
  const { camera } = useThree();
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (reducedMotion) {
      // Static frame — Earth close, filling viewport
      camera.position.set(0, 0.02, 2.4);
      camera.lookAt(0, 0.05, 0);
      camera.fov = 42;
      camera.updateProjectionMatrix();
      return;
    }

    const elapsed = (Date.now() - startTime.current) / 1000;
    const cycleDuration = 16; // Full cycle in seconds

    // Position in the cycle (0 → 1, loops infinitely)
    const t = (elapsed % cycleDuration) / cycleDuration;

    // ═══════════════════════════════════════════════════════════
    //  CINEMATIC BREATHING PATTERN
    //  Close hold → slight pull back → hold → gentle push → hold
    // ═══════════════════════════════════════════════════════════

    // Base Z: 2.3 (Earth at ~78% viewport)
    // Range: ±0.25 (Earth stays between 72-84%)

    let zOffset;

    if (t < 0.25) {
      // Phase 1: Close hold (0-25%) — stay very close
      zOffset = Math.sin(t / 0.25 * Math.PI * 0.5) * 0.04;
    } else if (t < 0.4) {
      // Phase 2: Gentle pull back (25-40%) — move back slightly
      const phase = (t - 0.25) / 0.15;
      const eased = phase < 0.5
        ? 2 * phase * phase
        : 1 - Math.pow(-2 * phase + 2, 2) / 2; // ease-in-out
      zOffset = 0.04 + eased * 0.22;
    } else if (t < 0.6) {
      // Phase 3: Hold farther (40-60%) — stay at slight distance
      const phase = (t - 0.4) / 0.2;
      zOffset = 0.26 + Math.sin(phase * Math.PI) * 0.02;
    } else if (t < 0.75) {
      // Phase 4: Gentle push forward (60-75%) — return close
      const phase = (t - 0.6) / 0.15;
      const eased = phase < 0.5
        ? 2 * phase * phase
        : 1 - Math.pow(-2 * phase + 2, 2) / 2; // ease-in-out
      zOffset = 0.26 - eased * 0.22;
    } else {
      // Phase 5: Close hold (75-100%) — stay very close
      const phase = (t - 0.75) / 0.25;
      zOffset = 0.04 + Math.sin(phase * Math.PI * 0.5) * 0.04;
    }

    const z = 2.3 + zOffset; // Range: 2.3 ↔ 2.56

    // ── Micro orbital drift — almost imperceptible ────────────
    const driftX = Math.sin(elapsed * 0.025) * 0.2;
    const driftY = Math.cos(elapsed * 0.02) * 0.12 + 0.02;

    camera.position.set(driftX, driftY, z);
    camera.lookAt(0, 0.05, 0);

    // ── FOV breathes subtly ───────────────────────────────────
    camera.fov = 42 + Math.sin(elapsed * 0.06) * 1.5;
    camera.updateProjectionMatrix();
  });

  return null;
}

// ══════════════════════════════════════════════════════════════════════════
//  ATMOSPHERIC BLOOM — Premium edge glow layers around Earth's limb
// ══════════════════════════════════════════════════════════════════════════
function AtmosphericBloom() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.children.forEach((child, i) => {
        if (child.material?.uniforms?.uTime) {
          child.material.uniforms.uTime.value = t + i * 0.5;
        }
      });
    }
  });

  return (
    <group ref={meshRef}>
      {/* Blue atmospheric scatter — visible edge glow */}
      <mesh scale={1.12} renderOrder={1}>
        <sphereGeometry args={[1, 72, 72]} />
        <shaderMaterial
          transparent depthWrite={false} blending={THREE.AdditiveBlending}
          uniforms={{ uColor: { value: new THREE.Color("#4488CC") }, uTime: { value: 0 } }}
          vertexShader={`
            varying vec3 vNormal; varying vec3 vPosition;
            void main() {
              vec4 wp = modelMatrix * vec4(position,1.0);
              vNormal = normalize(mat3(modelMatrix) * normal);
              vPosition = wp.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vPosition;
            uniform vec3 uColor; uniform float uTime;
            void main() {
              vec3 vd = normalize(cameraPosition - vPosition);
              float f = 1.0 - abs(dot(vd, vNormal));
              f = pow(f, 3.8);
              float pulse = 1.0 + sin(uTime * 0.25) * 0.06;
              gl_FragColor = vec4(uColor, f * 0.3 * pulse);
            }
          `}
        />
      </mesh>

      {/* Gold sunrise rim — warm edge where sunlight hits */}
      <mesh scale={1.11} renderOrder={2}>
        <sphereGeometry args={[1, 72, 72]} />
        <shaderMaterial
          transparent depthWrite={false} blending={THREE.AdditiveBlending}
          uniforms={{ uColor: { value: new THREE.Color("#F7C948") }, uTime: { value: 0 } }}
          vertexShader={`
            varying vec3 vNormal; varying vec3 vPosition;
            void main() {
              vec4 wp = modelMatrix * vec4(position,1.0);
              vNormal = normalize(mat3(modelMatrix) * normal);
              vPosition = wp.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vPosition;
            uniform vec3 uColor; uniform float uTime;
            void main() {
              vec3 ld = normalize(vec3(1.0,0.25,0.7));
              vec3 vd = normalize(cameraPosition - vPosition);
              float f = 1.0 - abs(dot(vd, vNormal));
              f = pow(f, 3.2);
              float rim = f * max(0.0, dot(vNormal, ld));
              rim = pow(rim, 2.0);
              float pulse = 1.0 + sin(uTime * 0.2 + 1.5) * 0.08;
              gl_FragColor = vec4(uColor, rim * 0.25 * pulse);
            }
          `}
        />
      </mesh>

      {/* Outer halo — very subtle scattered light */}
      <mesh scale={1.2} renderOrder={0}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          transparent depthWrite={false} blending={THREE.AdditiveBlending}
          uniforms={{ uColor: { value: new THREE.Color("#3366AA") }, uTime: { value: 0 } }}
          vertexShader={`
            varying vec3 vNormal; varying vec3 vPosition;
            void main() {
              vec4 wp = modelMatrix * vec4(position,1.0);
              vNormal = normalize(mat3(modelMatrix) * normal);
              vPosition = wp.xyz;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal; varying vec3 vPosition;
            uniform vec3 uColor; uniform float uTime;
            void main() {
              vec3 vd = normalize(cameraPosition - vPosition);
              float f = 1.0 - abs(dot(vd, vNormal));
              f = pow(f, 6.0);
              float pulse = 1.0 + sin(uTime * 0.15) * 0.05;
              gl_FragColor = vec4(uColor, f * 0.08 * pulse);
            }
          `}
        />
      </mesh>
    </group>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  HERO SCENE CONTENT
// ══════════════════════════════════════════════════════════════════════════
function HeroSceneContent({ textures, reducedMotion }) {
  return (
    <>
      {/* Same SunRig lighting as Gateway */}
      <SunRig onSunDirectionChange={() => {}} />

      {/* Cinematic 3-phase zooming camera */}
      <HeroCamera reducedMotion={reducedMotion} />

      {/* Earth group — all Gateway components */}
      <group position={[0, 0.05, 0]}>
        <Earth textures={textures} />
        <Clouds texture={textures?.clouds} />
        <Atmosphere sunDirection={null} />
        <Halo />
        <AtmosphericBloom />
      </group>

      {/* Space atmosphere layers */}
      <Stars />
      <SpaceDust />
      <GoldParticles />
      <ShootingStars />
      <Satellites />

      {/* Volumetric depth fog */}
      <fog attach="fog" args={["#010612", 6, 20]} />

      {/* NO FlightNetwork, NO CameraRig, NO OrbitControls, NO MouseParallax */}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN HERO EARTH BACKGROUND
// ══════════════════════════════════════════════════════════════════════════
export default function HeroEarthBackground({
  reducedMotion: reducedMotionProp = false,
  className = "",
}) {
  const { ready, textures } = useHeroTextures();
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const reducedMotion = reducedMotionProp || prefersReduced;

  return (
    <div
      className={className}
      style={{ position: "absolute", inset: 0, zIndex: 0, background: "#010612" }}
    >
      {ready && (
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          dpr={[1, 1.5]}
          camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0.02, 2.2] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <HeroSceneContent textures={textures} reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}