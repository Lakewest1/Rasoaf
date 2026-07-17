// src/components/gateway/three/CameraDirector.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cinematic Camera Director
//
// Orchestrates camera movement through predefined scenes.
// Each scene transitions smoothly using easing curves.
// Micro-motion keeps the camera alive even while "paused".
// Renders children (Earth, Clouds, Atmosphere) inside the camera group.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { SCENES, lerpCamera, easeValue, MICRO_MOTION } from "./cameraKeyframes";

export default function CameraDirector({ children, currentScene = 0, onSceneComplete }) {
  const groupRef = useRef(null);
  const { camera } = useThree();
  const progressRef = useRef(0);
  const elapsedRef = useRef(0);
  const currentSceneRef = useRef(currentScene);
  const sceneStartTimeRef = useRef(performance.now() * 0.001);
  const basePositionRef = useRef({ position: [0, 0, 8], target: [0, 0, 0] });

  // ── Update when scene changes ──────────────────────────────────────────
  useEffect(() => {
    currentSceneRef.current = currentScene;
    progressRef.current = 0;
    sceneStartTimeRef.current = performance.now() * 0.001;
  }, [currentScene]);

  // ── Notify parent when a scene completes ────────────────────────────────
  const handleSceneComplete = useCallback(() => {
    if (onSceneComplete && currentSceneRef.current < SCENES.length - 1) {
      onSceneComplete(currentSceneRef.current);
    }
  }, [onSceneComplete]);

  // ── Main camera loop ────────────────────────────────────────────────────
  useFrame(() => {
    const scene = SCENES[currentSceneRef.current];
    if (!scene) return;

    const now = performance.now() * 0.001;
    const sceneElapsed = now - sceneStartTimeRef.current;

    // Calculate progress through current scene (0 to 1)
    let progress;
    if (scene.duration > 0) {
      progress = Math.min(sceneElapsed / scene.duration, 1.0);
    } else {
      // Scene with duration 0 holds indefinitely
      progress = 0;
    }

    progressRef.current = progress;

    // Ease the progress
    const easedProgress = easeValue(progress, scene.camera.easing);

    // Interpolate camera position and target
    const interpolated = lerpCamera(scene.camera.start, scene.camera.end, easedProgress);

    // ── Apply micro-motion (always active) ──────────────────────────────
    const microTime = now;
    const breathZ = Math.sin(microTime * ((2 * Math.PI) / MICRO_MOTION.BREATH_PERIOD)) * MICRO_MOTION.BREATH_AMPLITUDE;
    const driftX = Math.sin(microTime * ((2 * Math.PI) / MICRO_MOTION.DRIFT_PERIOD_X)) * MICRO_MOTION.DRIFT_AMPLITUDE_X;
    const driftY = Math.cos(microTime * ((2 * Math.PI) / MICRO_MOTION.DRIFT_PERIOD_Y)) * MICRO_MOTION.DRIFT_AMPLITUDE_Y;

    // Apply to camera
    camera.position.set(
      interpolated.position[0] + driftX,
      interpolated.position[1] + driftY,
      interpolated.position[2] + breathZ
    );

    // Look at target
    camera.lookAt(
      interpolated.target[0],
      interpolated.target[1],
      interpolated.target[2]
    );

    // ── Slow orbit on the group ──────────────────────────────────────────
    if (groupRef.current) {
      groupRef.current.rotation.y += MICRO_MOTION.ORBIT_SPEED * 0.016;
    }

    // ── Scene complete ───────────────────────────────────────────────────
    if (progress >= 1.0 && scene.duration > 0) {
      handleSceneComplete();
    }
  });

  // ── Reset camera on unmount ─────────────────────────────────────────────
  useEffect(() => {
    return () => {
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
  }, [camera]);

  return <group ref={groupRef}>{children}</group>;
}