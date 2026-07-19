// src/components/gateway/GoldSeam.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Luxury Center Gold Seam
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";
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

const GoldSeam = memo(function GoldSeam({ visible }) {
  const reducedMotion = usePrefersReducedMotion();

  // The seam's fade in/out is handled by Framer Motion above (which is safe
  // to leave as-is), but the ambient glow/shimmer are separate, infinite CSS
  // keyframe loops with no built-in way to opt out — so they need an
  // explicit guard here.
  const glowStyle = reducedMotion
    ? { ...GLOW_STYLE_BASE, animation: "none" }
    : { ...GLOW_STYLE_BASE, animation: "gw-seam-glow 3s ease-in-out infinite" };

  const shimmerStyle = reducedMotion
    ? { ...SHIMMER_STYLE_BASE, animation: "none", top: "10%" }
    : { ...SHIMMER_STYLE_BASE, animation: "gw-seam-shimmer 4s ease-in-out infinite" };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={transitions.seam}
      style={CONTAINER_STYLE}
      aria-hidden="true"
    >
      <div style={CORE_STYLE} />
      <div style={glowStyle} />
      <div style={shimmerStyle} />
    </motion.div>
  );
});

export default GoldSeam;