// src/components/gateway/EarthBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Persistent Earth Background
//
// Wraps EarthScene as a fixed background layer.
// Earth runs continuously. Never unmounts. Never restarts.
// Respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────

import { memo, Suspense, lazy } from "react";

// Lazy-load the heavy Earth scene — only downloaded when needed
const EarthScene = lazy(() => import("./three/EarthScene"));

// ── Loading fallback while EarthScene downloads ─────────────────────────────
function Fallback() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(ellipse at center, #0d1a2a 0%, #071018 100%)",
      }}
    />
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────
const CONTAINER_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: 1,
};

// ══════════════════════════════════════════════════════════════════════════
const EarthBackground = memo(function EarthBackground() {
  return (
    <div style={CONTAINER_STYLE} aria-hidden="true">
      <Suspense fallback={<Fallback />}>
        <EarthScene />
      </Suspense>
    </div>
  );
});

export default EarthBackground;