// src/components/gateway/three/EarthScene.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Production Earth Scene with Pre-Loading Pipeline
//
// Textures are pre-loaded BEFORE the Canvas mounts.
// Earth and Clouds receive textures as props — they render nothing until ready.
// Animated SunRig provides dynamic day/night cycle.
// Atmosphere receives sunDirection for reactive scattering.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace, TextureLoader, LoadingManager } from "three";
import Earth from "./Earth";
import Clouds from "./Clouds";
import Atmosphere from "./Atmosphere";
import Stars from "./Stars";
import SpaceDust from "./SpaceDust";
import GoldParticles from "./GoldParticles";
import CameraRig from "./CameraRig";
import FlightNetwork from "./FlightNetwork/FlightNetwork";
import ShootingStars from "./ShootingStars";
import Satellites from "./Satellites";
import SunRig from "./SunRig";


// ══════════════════════════════════════════════════════════════════════════
//  TEXTURE PRE-LOADING HOOK
// ══════════════════════════════════════════════════════════════════════════
function useEarthTextures() {
  const [state, setState] = useState({
    ready: false,
    progress: 0,
    textures: null,
    error: null,
  });

  useEffect(() => {
    const manager = new LoadingManager();
    const loader = new TextureLoader(manager);

    let progressMap = { day: false, bump: false, specular: false, clouds: false };

    const updateProgress = () => {
      const loaded = Object.values(progressMap).filter(Boolean).length;
      setState((prev) => ({ ...prev, progress: (loaded / 4) * 100 }));
    };

    const urls = {
      day: "/textures/earth-day.jpg",
      bump: "/textures/earth-bump.png",
      specular: "/textures/earth-specular.jpg",
      clouds: "/textures/earth-clouds.png",
    };

    const result = {};
    let cancelled = false;

    Promise.all(
      Object.entries(urls).map(([key, url]) => {
        return new Promise((resolve, reject) => {
          loader.load(
            url,
            (texture) => {
              result[key] = texture;
              progressMap[key] = true;
              updateProgress();
              resolve();
            },
            undefined,
            () => reject(new Error(`Failed to load: ${url}`))
          );
        });
      })
    )
      .then(() => {
        if (!cancelled) {
          setState({ ready: true, progress: 100, textures: result, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Texture loading failed:", err.message);
          setState({ ready: false, progress: 0, textures: null, error: err.message });
        }
      });

    return () => {
      cancelled = true;
      loader.dispose?.();
    };
  }, []);

  return state;
}

// ══════════════════════════════════════════════════════════════════════════
//  ERROR BOUNDARY
// ══════════════════════════════════════════════════════════════════════════
class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#071018",
            color: "#F7C948",
            fontFamily: "'Manrope', sans-serif",
            textAlign: "center",
            padding: "40px",
          }}
        >
          <div>
            <div style={{ fontSize: 56, marginBottom: 20 }}>✦</div>
            <p style={{ fontSize: 18, fontWeight: 600 }}>Loading Premium Experience</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 24,
                padding: "12px 28px",
                borderRadius: 50,
                border: "1px solid #C4972A",
                background: "transparent",
                color: "#C4972A",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  LOADING SCREEN
// ══════════════════════════════════════════════════════════════════════════
function LoadingScreen({ progress, error }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, #0d1a2a 0%, #071018 100%)",
        color: "#F7C948",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div style={{ position: "relative", width: 72, height: 72, marginBottom: 24 }}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            stroke="#C4972A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(progress / 100) * 188} 188`}
            transform="rotate(-90 36 36)"
            style={{ transition: "stroke-dasharray 0.4s ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
      <p style={{ fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 500, letterSpacing: "0.04em", margin: 0 }}>
        Preparing Your Journey
      </p>
      {error && (
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 12, maxWidth: 300, textAlign: "center" }}>
          Unable to load assets. Please check your connection and refresh.
        </p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  SCENE CONTENT
// ══════════════════════════════════════════════════════════════════════════
function Scene({ textures }) {
  const [sunDirection, setSunDirection] = useState(null);
  const [currentScene, setCurrentScene] = useState(0);

  const handleSunDirection = useCallback((dir) => {
    setSunDirection(dir);
  }, []);

  const handleSceneComplete = useCallback((completedSceneIndex) => {
    // Auto-advance to next scene
    setCurrentScene((prev) => Math.min(prev + 1, 4)); // 4 = CTA scene (last)
  }, []);

  return (
    <>
      <SunRig onSunDirectionChange={handleSunDirection} />

      <CameraRig currentScene={currentScene} onSceneComplete={handleSceneComplete}>
        <Earth textures={textures} />
        <Clouds texture={textures?.clouds} />
        <Atmosphere sunDirection={sunDirection} />
      </CameraRig>

      <FlightNetwork />
      <Stars />
      <SpaceDust />
      <GoldParticles />
      <ShootingStars />
      <Satellites />
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function EarthScene() {
  const { ready, progress, textures, error } = useEarthTextures();

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10, background: "#071018" }}>
      {!ready && <LoadingScreen progress={progress} error={error} />}

      <SceneErrorBoundary>
        <Canvas
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
            outputColorSpace: SRGBColorSpace,
          }}
          dpr={[1, 2]}
          camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 8] }}
          style={{
            width: "100%",
            height: "100%",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Suspense fallback={null}>
            <Scene textures={textures} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}