// src/components/gateway/EarthBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Persistent Earth Background (v2.0)
// Optimized: GPU composited · Prefetched · Zero layout shifts
// ─────────────────────────────────────────────────────────────────────────────

import { memo, Suspense, lazy } from "react";

// Lazy-load with prefetch hint for faster subsequent loads
const EarthScene = lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "earth-scene" */
    "./three/EarthScene"
  )
);

// ══════════════════════════════════════════════════════════════════════════
// Loading Fallback — Memoized, GPU composited
// ══════════════════════════════════════════════════════════════════════════
const FALLBACK_STYLE = Object.freeze({
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(ellipse at center, #0d1a2a 0%, #071018 100%)",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
});

const Fallback = memo(function Fallback() {
  return <div style={FALLBACK_STYLE} />;
});
Fallback.displayName = "Fallback";

// ══════════════════════════════════════════════════════════════════════════
// Container Styles — Module scope, frozen, GPU composited
// ══════════════════════════════════════════════════════════════════════════
const CONTAINER_STYLE = Object.freeze({
  position: "fixed",
  inset: 0,
  zIndex: 1,
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
});

// ══════════════════════════════════════════════════════════════════════════
// EarthBackground — Memoized, never re-renders
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
EarthBackground.displayName = "EarthBackground";

export default EarthBackground;