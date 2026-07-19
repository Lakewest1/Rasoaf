// src/components/common/EarthScene.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Unified Earth Scene
// variant="gateway" → Full interactive Gateway experience (untouched)
// variant="hero"    → Close-orbit cinematic Earth for Travel Hero
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense, useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ══════════════════════════════════════════════════════════════════════════
//  GATEWAY MODE — Completely untouched
// ══════════════════════════════════════════════════════════════════════════
const GatewayEarthBackground = lazy(() => import("../gateway/EarthBackground"));

function GatewayFallback() {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse at center, #0d1a2a 0%, #071018 100%)",
    }} />
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  HERO MODE — Same gateway/three components, close-orbit breathing camera
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

function useHeroComponents() {
  const [comps, setComps] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("../gateway/three/Earth"),
      import("../gateway/three/Clouds"),
      import("../gateway/three/Atmosphere"),
      import("../gateway/three/Halo"),
      import("../gateway/three/Stars"),
      import("../gateway/three/SpaceDust"),
      import("../gateway/three/GoldParticles"),
      import("../gateway/three/ShootingStars"),
      import("../gateway/three/Satellites"),
      import("../gateway/three/SunRig"),
    ]).then((mods) => {
      if (!cancelled) {
        setComps({
          Earth: mods[0].default,
          Clouds: mods[1].default,
          Atmosphere: mods[2].default,
          Halo: mods[3].default,
          Stars: mods[4].default,
          SpaceDust: mods[5].default,
          GoldParticles: mods[6].default,
          ShootingStars: mods[7].default,
          Satellites: mods[8].default,
          SunRig: mods[9].default,
        });
      }
    });
    return () => { cancelled = true; };
  }, []);

  return comps;
}

// ══════════════════════════════════════════════════════════════════════════
//  HERO CAMERA — Close orbit · Earth big · Gentle breathing · NO ZOOM
// ══════════════════════════════════════════════════════════════════════════
function HeroCamera({ reducedMotion = false }) {
  const { camera } = useThree();
  const startTime = useRef(Date.now());

  useFrame(() => {
    if (reducedMotion) {
      camera.position.set(0, 0.02, 2.45);
      camera.lookAt(0, 0.05, 0);
      camera.fov = 42;
      camera.updateProjectionMatrix();
      return;
    }

    const elapsed = (Date.now() - startTime.current) / 1000;
    const cycleDuration = 16;
    const t = (elapsed % cycleDuration) / cycleDuration;

    let zOffset;

    if (t < 0.25) {
      zOffset = Math.sin(t / 0.25 * Math.PI * 0.5) * 0.04;
    } else if (t < 0.4) {
      const phase = (t - 0.25) / 0.15;
      const eased = phase < 0.5 ? 2 * phase * phase : 1 - Math.pow(-2 * phase + 2, 2) / 2;
      zOffset = 0.04 + eased * 0.22;
    } else if (t < 0.6) {
      const phase = (t - 0.4) / 0.2;
      zOffset = 0.26 + Math.sin(phase * Math.PI) * 0.02;
    } else if (t < 0.75) {
      const phase = (t - 0.6) / 0.15;
      const eased = phase < 0.5 ? 2 * phase * phase : 1 - Math.pow(-2 * phase + 2, 2) / 2;
      zOffset = 0.26 - eased * 0.22;
    } else {
      const phase = (t - 0.75) / 0.25;
      zOffset = 0.04 + Math.sin(phase * Math.PI * 0.5) * 0.04;
    }

    const z = 2.45 + zOffset;

    const driftX = Math.sin(elapsed * 0.025) * 0.2;
    const driftY = Math.cos(elapsed * 0.02) * 0.12 + 0.02;

    camera.position.set(driftX, driftY, z);
    camera.lookAt(0, 0.05, 0);

    camera.fov = 42 + Math.sin(elapsed * 0.06) * 1.5;
    camera.updateProjectionMatrix();
  });

  return null;
}

// ══════════════════════════════════════════════════════════════════════════
//  ATMOSPHERIC BLOOM
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
function HeroSceneContent({ components, textures, reducedMotion }) {
  const {
    Earth, Clouds, Atmosphere, Halo, Stars, SpaceDust,
    GoldParticles, ShootingStars, Satellites, SunRig,
  } = components;

  return (
    <>
      <SunRig onSunDirectionChange={() => {}} />
      <HeroCamera reducedMotion={reducedMotion} />

      <group position={[0, 0.05, 0]}>
        <Earth textures={textures} />
        <Clouds texture={textures?.clouds} />
        <Atmosphere sunDirection={null} />
        <Halo />
        <AtmosphericBloom />
      </group>

      <Stars />
      <SpaceDust />
      <GoldParticles />
      <ShootingStars />
      <Satellites />

      <fog attach="fog" args={["#010612", 5, 16]} />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  SCROLL TRACKER — Earth opacity + overlay based on scroll position
// ══════════════════════════════════════════════════════════════════════════
function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // scrollProgress: 0 = top of page, 1 = one full viewport scrolled
  const scrollProgress = Math.min(scrollY / viewportHeight, 1);

  // Earth visibility: 100% at top → 20% after 1 viewport scroll
  const earthOpacity = 1 - scrollProgress * 0.8;

  // Overlay darkness: 20% at top → 70% after 1 viewport scroll
  const overlayOpacity = 0.2 + scrollProgress * 0.5;

  return { scrollProgress, earthOpacity, overlayOpacity };
}

// ══════════════════════════════════════════════════════════════════════════
//  HERO EARTH SCENE
// ══════════════════════════════════════════════════════════════════════════
function HeroEarthScene({ onReady }) {
  const { ready: texturesReady, textures } = useHeroTextures();
  const components = useHeroComponents();
  const [reducedMotion, setReducedMotion] = useState(false);
  const { earthOpacity, overlayOpacity } = useScrollProgress();
  const containerRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (texturesReady && components && onReady) onReady();
  }, [texturesReady, components, onReady]);

  const showCanvas = components && texturesReady;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "#010612",
        opacity: earthOpacity,
        transition: reducedMotion ? "none" : "opacity 0.3s ease-out",
      }}
    >
      {/* Dynamic overlay — darkens as user scrolls */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background: `rgba(1, 6, 18, ${overlayOpacity})`,
          transition: reducedMotion ? "none" : "background 0.3s ease-out",
        }}
      />

      {showCanvas && (
        <Canvas
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          dpr={[1, 1.5]}
          camera={{ fov: 42, near: 0.1, far: 60, position: [0, 0.02, 2.45] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <HeroSceneContent
              components={components}
              textures={textures}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════
export default function EarthScene({
  variant = "gateway",
  className = "",
  style = {},
  onReady,
}) {
  if (variant === "hero") {
    return (
      <div className={className} style={{ position: "absolute", inset: 0, ...style }} aria-hidden="true">
        <HeroEarthScene onReady={onReady} />
      </div>
    );
  }

  return (
    <div className={className} style={{ position: "fixed", inset: 0, zIndex: 1, ...style }} aria-hidden="true">
      <Suspense fallback={<GatewayFallback />}>
        <GatewayEarthBackground />
      </Suspense>
    </div>
  );
}