// src/components/gateway/three/CameraRig.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Camera Rig (Delegate)
// Wraps CameraDirector. Adds mouse parallax for immersive depth.
// Exposes Earth group ref for tilt. Keeps backward compatibility.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import CameraDirector from "./CameraDirector";
import MouseParallax from "./MouseParallax";

const CameraRig = forwardRef(function CameraRig({ children, currentScene = 0, onSceneComplete }, ref) {
  const earthGroupRef = useRef(null);

  // ── Expose earth group ref to parent ──────────────────────────────────
  useImperativeHandle(ref, () => ({
    getEarthGroup: () => earthGroupRef.current,
    getCurrentScene: () => currentScene,
  }), [currentScene]);

  // ── Log for debugging ──────────────────────────────────────────────────
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`CameraRig: Scene ${currentScene} activated`);
    }
  }, [currentScene]);

  return (
    <>
      {/* Mouse parallax controller — blends with existing camera animation */}
      <MouseParallax earthGroupRef={earthGroupRef} />

      {/* CameraDirector handles cinematic scene transitions */}
      <CameraDirector currentScene={currentScene} onSceneComplete={onSceneComplete}>
        <group ref={earthGroupRef}>{children}</group>
      </CameraDirector>
    </>
  );
});

CameraRig.displayName = 'CameraRig';

export default CameraRig;