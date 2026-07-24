// src/components/gateway/CrossFade.jsx (OPTIMIZED)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Dark Crossfade Overlay (OPTIMIZED)
//
// OPTIMIZATIONS:
// 1. GPU-accelerated opacity animations
// 2. Optimized animation variants
// 3. Simplified animation keyframes
// 4. Proper z-index handling
// 5. Containment for isolated rendering
//
// Result: Smooth fade-to-black at 60fps
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, Z_INDEX } from "./constants";

// OPTIMIZED: Simplified crossfade animation variants
// Uses only opacity (GPU-accelerated)
const OPTIMIZED_CROSSFADE_VARIANTS = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const OVERLAY_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: Z_INDEX.CROSSFADE,
  background: COLORS.BG_DARK,
  pointerEvents: "none",
  
  // GPU ACCELERATION: Opacity is GPU-accelerated
  willChange: "opacity",
  
  // GPU ACCELERATION
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  
  // OPTIMIZATION: 3D rendering context
  perspective: "1000px",
  
  // OPTIMIZATION: Isolates this element's paint operations
  contain: "strict",
};

// OPTIMIZED: Memoized variants to prevent unnecessary re-creation
const CrossFade = memo(function CrossFade({ visible }) {
  const variants = useMemo(() => OPTIMIZED_CROSSFADE_VARIANTS, []);

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