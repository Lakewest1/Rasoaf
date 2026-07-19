// src/components/gateway/three/CameraRig.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Camera Rig (Delegate)
// Wraps CameraDirector. Adds mouse parallax for immersive depth.
// Exposes Earth group ref for tilt. Keeps backward compatibility.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, forwardRef, useImperativeHandle } from "react";
import CameraDirector from "./CameraDirector";
import MouseParallax from "./MouseParallax";

const CameraRig = forwardRef(function CameraRig({ children, currentScene, onSceneComplete }, ref) {
  const earthGroupRef = useRef(null);

  // earthGroupRef is a stable ref object for the lifetime of this component,
  // so the imperative handle only needs to be built once — the empty deps
  // array avoids recreating the handle object on every render.
  useImperativeHandle(ref, () => ({
    getEarthGroup: () => earthGroupRef.current,
  }), []);

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

export default CameraRig;