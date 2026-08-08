// src/components/gateway/three/EarthScene.jsx
import { Suspense } from "react";
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

function getAdaptiveDPR() {
  if (typeof window === "undefined") return [1, 1.5];
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  if (width < 768) return [1, 1];
  if (width < 1024) return [1, 1.2];
  return [1, Math.min(dpr, 2)];
}

export default function EarthScene() {
  const dpr = getAdaptiveDPR();

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10, background: "#071018" }}>
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: SRGBColorSpace,
        }}
        dpr={dpr}
        camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 8] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SunRig />
          <CameraRig>
            <Earth />
            <Clouds />
            <Atmosphere />
          </CameraRig>
          <FlightNetwork />
          <Stars />
          <SpaceDust />
          <GoldParticles />
          <ShootingStars />
          <Satellites />
        </Suspense>
      </Canvas>
    </div>
  );
}