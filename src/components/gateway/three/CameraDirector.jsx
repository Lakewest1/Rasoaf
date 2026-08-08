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
  const isCompleteRef = useRef(false);

  // ── Update when scene changes ──────────────────────────────────────────
  useEffect(() => {
    currentSceneRef.current = currentScene;
    progressRef.current = 0;
    isCompleteRef.current = false;
    sceneStartTimeRef.current = performance.now() * 0.001;
    
    // Safety: Ensure we have a valid scene
    if (currentScene >= SCENES.length) {
      console.warn(`Scene ${currentScene} not found, using scene 0`);
      currentSceneRef.current = 0;
    }
  }, [currentScene]);

  // ── Notify parent when a scene completes ──────────────────────────────
  const handleSceneComplete = useCallback(() => {
    if (isCompleteRef.current) return;
    isCompleteRef.current = true;
    
    if (onSceneComplete && currentSceneRef.current < SCENES.length - 1) {
      onSceneComplete(currentSceneRef.current);
    }
  }, [onSceneComplete]);

  // ── Main camera loop ────────────────────────────────────────────────────
  useFrame(() => {
    // Safety check: ensure scene exists
    const sceneIndex = Math.min(currentSceneRef.current, SCENES.length - 1);
    const scene = SCENES[sceneIndex];
    if (!scene) {
      // Fallback: position camera at default
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      return;
    }

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
    const easedProgress = easeValue(progress, scene.camera?.easing || 'easeInOutCubic');

    // Interpolate camera position and target
    const interpolated = lerpCamera(scene.camera.start, scene.camera.end, easedProgress);

    // ── Apply micro-motion (always active) ──────────────────────────────
    const microTime = now;
    const breathZ = Math.sin(microTime * ((2 * Math.PI) / MICRO_MOTION.BREATH_PERIOD)) * MICRO_MOTION.BREATH_AMPLITUDE;
    const driftX = Math.sin(microTime * ((2 * Math.PI) / MICRO_MOTION.DRIFT_PERIOD_X)) * MICRO_MOTION.DRIFT_AMPLITUDE_X;
    const driftY = Math.cos(microTime * ((2 * Math.PI) / MICRO_MOTION.DRIFT_PERIOD_Y)) * MICRO_MOTION.DRIFT_AMPLITUDE_Y;

    // Apply to camera with safety checks
    const posX = interpolated.position?.[0] ?? 0;
    const posY = interpolated.position?.[1] ?? 0;
    const posZ = interpolated.position?.[2] ?? 8;
    const targetX = interpolated.target?.[0] ?? 0;
    const targetY = interpolated.target?.[1] ?? 0;
    const targetZ = interpolated.target?.[2] ?? 0;

    camera.position.set(
      posX + driftX,
      posY + driftY,
      posZ + breathZ
    );

    // Look at target
    camera.lookAt(targetX, targetY, targetZ);
    camera.updateProjectionMatrix();

    // ── Slow orbit on the group ──────────────────────────────────────────
    if (groupRef.current) {
      groupRef.current.rotation.y += MICRO_MOTION.ORBIT_SPEED * 0.016;
    }

    // ── Scene complete ───────────────────────────────────────────────────
    if (progress >= 1.0 && scene.duration > 0 && !isCompleteRef.current) {
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