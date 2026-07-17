// src/components/gateway/GoldSeam.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Luxury Center Gold Seam
// Production-ready. No changes required.
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";
import { motion } from "framer-motion";
import { COLORS, GRADIENTS, SHADOWS, Z_INDEX, EASING } from "./constants";
import { transitions } from "./animations";

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

const GLOW_STYLE = {
  position: "absolute",
  inset: 0,
  background: COLORS.GOLD_LIGHT,
  filter: "blur(6px)",
  willChange: "opacity",
  animation: "gw-seam-glow 3s ease-in-out infinite",
};

const SHIMMER_STYLE = {
  position: "absolute",
  top: "-10%",
  left: 0,
  right: 0,
  height: "35%",
  background: GRADIENTS.SHIMMER,
  willChange: "top",
  animation: "gw-seam-shimmer 4s ease-in-out infinite",
};

const GoldSeam = memo(function GoldSeam({ visible }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={transitions.seam}
      style={CONTAINER_STYLE}
      aria-hidden="true"
    >
      <div style={CORE_STYLE} />
      <div style={GLOW_STYLE} />
      <div style={SHIMMER_STYLE} />
    </motion.div>
  );
});

export default GoldSeam;