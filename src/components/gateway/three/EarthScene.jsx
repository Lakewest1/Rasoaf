// src/components/gateway/three/EarthScene.jsx (SIMPLIFIED)
import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
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

function SceneContent() {
  // Load textures directly with useLoader
  const textures = useLoader(TextureLoader, [
    '/textures/earth-day.jpg',
    '/textures/earth-bump.png', 
    '/textures/earth-specular.jpg',
    '/textures/earth-clouds.png'
  ]);

  const [day, bump, specular, clouds] = textures;

  return (
    <>
      <SunRig />
      <CameraRig>
        <Earth textures={{ day, bump, specular }} />
        <Clouds texture={clouds} />
        <Atmosphere />
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

export default function EarthScene() {
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
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}