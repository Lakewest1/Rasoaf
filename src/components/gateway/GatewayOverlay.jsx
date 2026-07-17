// src/components/gateway/GatewayOverlay.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cinematic Dark Overlay
//
// Subtle gradient overlay that improves text readability
// while keeping the Earth clearly visible underneath.
// 20-35% opacity range. Radial gradient — darker at edges.
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";

const OVERLAY_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: 2,
  pointerEvents: "none",
  background: `
    radial-gradient(
      ellipse 80% 60% at 50% 50%,
      rgba(0,0,0,0.15) 0%,
      rgba(0,0,0,0.28) 60%,
      rgba(0,0,0,0.42) 100%
    )
  `,
};

const GatewayOverlay = memo(function GatewayOverlay() {
  return <div style={OVERLAY_STYLE} aria-hidden="true" />;
});

export default GatewayOverlay;