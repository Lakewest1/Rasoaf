// src/components/gateway/three/MouseParallax.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Premium Cinematic Mouse Parallax
//
// Smoothly moves the camera and tilts the Earth based on mouse position.
// Spring-like inertia with damping. No orbit controls. No gaming feel.
// Mobile: disabled. Tablet: 50% intensity. Desktop: full.
// Respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

// ── Configuration ───────────────────────────────────────────────────────────
const CONFIG = {
  // Maximum camera displacement from default position
  MAX_X: 0.4,
  MAX_Y: 0.25,

  // Maximum Earth tilt in radians (~2-3 degrees)
  MAX_TILT_X: 0.04,
  MAX_TILT_Y: 0.05,

  // Damping factor (0-1). Lower = smoother/slower, Higher = snappier
  DAMPING: 0.04,

  // How quickly the camera returns to center when mouse stops
  RETURN_SPEED: 0.02,

  // Tablet intensity multiplier
  TABLET_MULTIPLIER: 0.5,

  // Default camera position (from CameraRig)
  DEFAULT_X: -0.8,
  DEFAULT_Y: 0,
  DEFAULT_Z: 8,
};

// ══════════════════════════════════════════════════════════════════════════
export default function MouseParallax({ earthGroupRef }) {
  const { camera, gl } = useThree();
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isEnabledRef = useRef(true);
  const intensityRef = useRef(1);

  // ── Detect device and preferences ──────────────────────────────────────
  useEffect(() => {
    const checkCapabilities = () => {
      const width = window.innerWidth;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = width < 768;

      if (reducedMotion || isMobile) {
        isEnabledRef.current = false;
      } else {
        isEnabledRef.current = true;
        // Tablet: reduce intensity
        intensityRef.current = width < 1024 ? CONFIG.TABLET_MULTIPLIER : 1;
      }
    };

    checkCapabilities();
    window.addEventListener("resize", checkCapabilities);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => {
      if (e.matches) isEnabledRef.current = false;
      else checkCapabilities();
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkCapabilities);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // ── Track mouse position ───────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isEnabledRef.current) return;

      // Normalize mouse position to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRef.current.x = nx * CONFIG.MAX_X * intensityRef.current;
      targetRef.current.y = ny * CONFIG.MAX_Y * intensityRef.current;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Smooth interpolation each frame ────────────────────────────────────
  useFrame(() => {
    if (!isEnabledRef.current) return;

    // Smoothly interpolate current toward target (spring-like)
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * CONFIG.DAMPING;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * CONFIG.DAMPING;

    // Slowly return target to center when mouse is idle
    targetRef.current.x *= (1 - CONFIG.RETURN_SPEED);
    targetRef.current.y *= (1 - CONFIG.RETURN_SPEED);

    const cx = currentRef.current.x;
    const cy = currentRef.current.y;

    // ── Apply camera displacement ──────────────────────────────────────
    camera.position.x += cx * 0.02;
    camera.position.y += cy * 0.02;

    // Clamp camera position to prevent drift
    camera.position.x = Math.max(
      CONFIG.DEFAULT_X - CONFIG.MAX_X,
      Math.min(CONFIG.DEFAULT_X + CONFIG.MAX_X, camera.position.x)
    );
    camera.position.y = Math.max(
      CONFIG.DEFAULT_Y - CONFIG.MAX_Y,
      Math.min(CONFIG.DEFAULT_Y + CONFIG.MAX_Y, camera.position.y)
    );

    // ── Apply Earth tilt ───────────────────────────────────────────────
    if (earthGroupRef?.current) {
      const tiltX = cy * CONFIG.MAX_TILT_X;
      const tiltY = cx * CONFIG.MAX_TILT_Y;

      // Blend tilt with existing rotation (additive, not replacement)
      earthGroupRef.current.rotation.x +=
        (tiltX - earthGroupRef.current.rotation.x * 0.1) * CONFIG.DAMPING;
      earthGroupRef.current.rotation.z +=
        (tiltY - earthGroupRef.current.rotation.z * 0.1) * CONFIG.DAMPING;
    }
  });

  return null; // No visual output — purely a controller
}