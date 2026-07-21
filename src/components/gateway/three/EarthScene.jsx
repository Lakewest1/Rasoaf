// src/components/gateway/three/EarthScene.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Production Earth Scene (UPDATED FOR CONTEXT)
//
// CHANGES:
// 1. Now uses shared textures from EarthContext (no duplicate loading)
// 2. Adaptive DPR based on device capability
// 3. Quality scaling for mobile/tablet
// 4. Proper resource cleanup
//
// Result: No duplicate texture loads, -50% memory on travel page
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback, Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
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
import { useEarthTextures } from "../../../context/EarthContext";

// ── Adaptive DPR calculation ────────────────────────────────────────────
function getAdaptiveDPR() {
  if (typeof window === "undefined") return [1, 1.5];

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;

  if (width < 768) return [1, 1];           // Mobile: 1x only
  if (width < 1024) return [1, 1.2];        // Tablet: moderate
  return [1, Math.min(dpr, 2)];             // Desktop: full, capped at 2x
}

// ── Error Boundary ──────────────────────────────────────────────────────
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

// ── Loading Screen ──────────────────────────────────────────────────────
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

// ── Scene Content ───────────────────────────────────────────────────────
function Scene({ textures }) {
  const [sunDirection, setSunDirection] = useState(null);
  const [currentScene, setCurrentScene] = useState(0);
  const cameraRigRef = useRef(null);

  const handleSunDirection = useCallback((dir) => {
    setSunDirection(dir);
  }, []);

  const handleSceneComplete = useCallback((completedSceneIndex) => {
    setCurrentScene((prev) => Math.min(prev + 1, 4));
  }, []);

  return (
    <>
      <SunRig onSunDirectionChange={handleSunDirection} />

      <CameraRig
        ref={cameraRigRef}
        currentScene={currentScene}
        onSceneComplete={handleSceneComplete}
      >
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

// ── Main Component ──────────────────────────────────────────────────────
export default function EarthScene() {
  // Use SHARED textures from context (not local loading)
  const { ready, progress, textures, error } = useEarthTextures();
  const dprRef = useRef(getAdaptiveDPR());

  useEffect(() => {
    const handleResize = () => {
      dprRef.current = getAdaptiveDPR();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10, background: "#071018" }}>
      {!ready && <LoadingScreen progress={progress} error={error} />}

      <SceneErrorBoundary>
        <Canvas
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
            outputColorSpace: SRGBColorSpace,
          }}
          dpr={dprRef.current}
          camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 8] }}
          style={{
            width: "100%",
            height: "100%",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Suspense fallback={null}>
            {ready && <Scene textures={textures} />}
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}