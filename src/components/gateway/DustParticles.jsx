// src/components/gateway/DustParticles.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Ambient Floating Dust Particles
// Generated once at module scope. Zero runtime allocations.
// Each particle memoized independently. GPU accelerated.
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";
import { COLORS, PARTICLES } from "./constants";

// ── Generate stable particles at module level ──────────────────────────────
function createParticles(count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push({
      id: i,
      left:   `${5 + Math.random() * 90}%`,
      top:    `${5 + Math.random() * 90}%`,
      size:   PARTICLES.MIN_SIZE + Math.random() * PARTICLES.SIZE_RANGE,
      opacity: PARTICLES.MIN_OPACITY + Math.random() * PARTICLES.OPACITY_RANGE,
      duration: PARTICLES.MIN_DURATION + Math.random() * PARTICLES.DURATION_RANGE,
      delay:   Math.random() * PARTICLES.MAX_DELAY,
    });
  }
  return items;
}

const PARTICLES_DATA = createParticles(PARTICLES.COUNT);

// ── Static styles ───────────────────────────────────────────────────────────
const CONTAINER_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  pointerEvents: "none",
};

// ── Individual particle — memoized, zero-rerender leaf ──────────────────────
const ParticleDot = memo(function ParticleDot({ particle }) {
  const style = {
    position: "absolute",
    left: particle.left,
    top: particle.top,
    width: particle.size,
    height: particle.size,
    borderRadius: "50%",
    background: COLORS.DUST_COLOR,
    opacity: particle.opacity,
    willChange: "transform, opacity",
    animation: `gw-dust-float ${particle.duration}s ease-in-out infinite`,
    animationDelay: `${particle.delay}s`,
  };

  return <div aria-hidden="true" style={style} />;
});

// ── Main container ──────────────────────────────────────────────────────────
const DustParticles = memo(function DustParticles() {
  return (
    <div style={CONTAINER_STYLE} aria-hidden="true">
      {PARTICLES_DATA.map((p) => (
        <ParticleDot key={p.id} particle={p} />
      ))}
    </div>
  );
});

export default DustParticles;