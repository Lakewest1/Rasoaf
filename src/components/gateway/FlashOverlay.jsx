// src/components/gateway/FlashOverlay.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Cinematic Camera Shutter Flash
// Production-ready. No changes required.
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flashVariants } from "./animations";
import { GRADIENTS, Z_INDEX } from "./constants";

const FLASH_CONTAINER = {
  position: "fixed",
  inset: 0,
  zIndex: Z_INDEX.FLASH,
  pointerEvents: "none",
  background: GRADIENTS.FLASH_BG,
};

const LENS_STREAK = {
  position: "absolute",
  top: "35%",
  left: "10%",
  right: "10%",
  height: "8%",
  background: GRADIENTS.LENS_STREAK,
  filter: "blur(4px)",
};

const BLOOM_RING = {
  position: "absolute",
  top: "20%",
  left: "20%",
  right: "20%",
  bottom: "20%",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.15)",
  filter: "blur(8px)",
};

const FlashOverlay = memo(function FlashOverlay({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={flashVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={FLASH_CONTAINER}
        >
          <div style={LENS_STREAK} />
          <div style={BLOOM_RING} />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default FlashOverlay;