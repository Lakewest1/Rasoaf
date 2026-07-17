// src/components/gateway/three/CameraRig.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Camera Rig (Delegate)
// Wraps CameraDirector. Keeps backward compatibility.
// ─────────────────────────────────────────────────────────────────────────────

import CameraDirector from "./CameraDirector";

export default function CameraRig({ children, currentScene, onSceneComplete }) {
  return (
    <CameraDirector currentScene={currentScene} onSceneComplete={onSceneComplete}>
      {children}
    </CameraDirector>
  );
}