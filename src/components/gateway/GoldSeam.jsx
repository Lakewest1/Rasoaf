// src/components/gateway/GoldSeam.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Luxury Center Gold Seam
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS, Z_INDEX } from "./constants";
import { transitions } from "./animations";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const CONTAINER_STYLE = {
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: 1,
  height: "100%",
  zIndex: Z_INDEX.SEAM,
  pointerEvents: "none",
};

const CORE_STYLE = {
  position: "absolute",
  inset: 0,
  background: GRADIENTS.SEAM_LINE,
  boxShadow: SHADOWS.SEAM,
};

const GLOW_STYLE_BASE = {
  position: "absolute",
  inset: 0,
  background: COLORS.GOLD_LIGHT,
  filter: "blur(6px)",
  willChange: "opacity",
};

const SHIMMER_STYLE_BASE = {
  position: "absolute",
  top: "-10%",
  left: 0,
  right: 0,
  height: "35%",
  background: GRADIENTS.SHIMMER,
  willChange: "top",
};

const GoldSeam = memo(function GoldSeam({ visible = true }) {
  const reducedMotion = usePrefersReducedMotion();

  // ── Memoize styles to prevent recreation ──────────────────────────────
  const glowStyle = useMemo(() => {
    return reducedMotion
      ? { ...GLOW_STYLE_BASE, animation: "none" }
      : { ...GLOW_STYLE_BASE, animation: "gw-seam-glow 3s ease-in-out infinite" };
  }, [reducedMotion]);

  const shimmerStyle = useMemo(() => {
    return reducedMotion
      ? { ...SHIMMER_STYLE_BASE, animation: "none", top: "10%" }
      : { ...SHIMMER_STYLE_BASE, animation: "gw-seam-shimmer 4s ease-in-out infinite" };
  }, [reducedMotion]);

  // ── Container style with transition ────────────────────────────────────
  const containerStyle = useMemo(() => ({
    ...CONTAINER_STYLE,
    pointerEvents: visible ? "none" : "none",
  }), [visible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={transitions.seam}
      style={containerStyle}
      aria-hidden="true"
    >
      <div style={CORE_STYLE} />
      <div style={glowStyle} />
      <div style={shimmerStyle} />
    </motion.div>
  );
});

GoldSeam.displayName = 'GoldSeam';

export default GoldSeam;