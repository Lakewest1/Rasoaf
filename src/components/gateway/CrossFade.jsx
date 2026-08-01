// src/components/gateway/CrossFade.jsx (INSTANT - ZERO DELAY)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Instant Crossfade (No Animation)
//
// OPTIMIZATION:
// 1. Zero animation duration (instant fade)
// 2. Immediate black screen
// 3. No delays before navigation
// 4. GPU accelerated
//
// Result: Users click → instant black → navigate (no waiting)
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, Z_INDEX } from "./constants";

// ULTRA-FAST: Zero animation durations
const INSTANT_CROSSFADE_VARIANTS = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0, // INSTANT - No delay
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0, // INSTANT - No delay
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0, // INSTANT - No delay
    },
  },
};

const OVERLAY_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: Z_INDEX.CROSSFADE,
  background: COLORS.BG_DARK,
  pointerEvents: "none",
  willChange: "opacity",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  perspective: "1000px",
  contain: "strict",
};

const CrossFade = memo(function CrossFade({ visible }) {
  const variants = useMemo(() => INSTANT_CROSSFADE_VARIANTS, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="crossfade-overlay"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={OVERLAY_STYLE}
        />
      )}
    </AnimatePresence>
  );
});

CrossFade.displayName = "CrossFade";

export default CrossFade;