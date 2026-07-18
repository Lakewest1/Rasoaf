// src/components/gateway/TransitionController.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Exit Transition Controller
//
// When user clicks a destination, plays a cinematic camera move
// (1-2 seconds) before navigating. Camera rotates toward the
// relevant region based on the selected service.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { easeValue } from "./three/cameraKeyframes";

// ── Target positions for exit animations ────────────────────────────────────
const EXIT_TARGETS = {
  hajj: {
    position: [0.2, 0.6, 6.5],
    target: [0.4, 0.1, 0.3],
    duration: 0.5,
  },
  travel: {
    position: [-0.5, 0.4, 6.8],
    target: [-0.3, 0.3, 0.1],
    duration: 1.8,
  },
};

// ══════════════════════════════════════════════════════════════════════════
export function useTransitionController() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef(null);

  // ── Begin transition ────────────────────────────────────────────────────
  const startTransition = useCallback((destination) => {
    if (isTransitioning) return;

    const target = EXIT_TARGETS[destination];
    if (!target) {
      // Fallback: navigate immediately
      navigate(destination === "hajj" ? "/hajj" : "/travel");
      return;
    }

    setIsTransitioning(true);

    // Store transition data
    transitionRef.current = {
      destination,
      target,
      startTime: performance.now(),
      startCamera: null, // Will be captured by the hook below
    };
  }, [isTransitioning, navigate]);

  // ── Reset after navigation ──────────────────────────────────────────────
  useEffect(() => {
    if (!isTransitioning) return;

    const transition = transitionRef.current;
    if (!transition) return;

    const duration = transition.target.duration * 1000;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      navigate(
        transition.destination === "hajj" ? "/hajj" : "/travel"
      );
    }, duration);

    return () => clearTimeout(timer);
  }, [isTransitioning, navigate]);

  return { isTransitioning, startTransition, transitionRef };
}

// ══════════════════════════════════════════════════════════════════════════
//  Camera Transition Component — animates the camera during exit
// ══════════════════════════════════════════════════════════════════════════
export function TransitionCamera({ isTransitioning, transitionRef }) {
  const { camera } = useThree();
  const startCameraRef = useRef(null);

  useThree(({ camera }) => {
    // Capture starting camera state when transition begins
    if (isTransitioning && !startCameraRef.current) {
      startCameraRef.current = {
        position: camera.position.clone(),
        target: new Vector3(0, 0, 0), // We track lookAt via the camera director
      };
    }

    if (!isTransitioning) {
      startCameraRef.current = null;
    }
  });

  // This component doesn't render anything — it just hooks into the frame loop
  return null;
}