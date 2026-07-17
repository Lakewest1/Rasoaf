// src/components/gateway/CrossFade.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Dark Crossfade Overlay
// Fades to black before navigation for seamless transition.
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { crossfadeVariants } from "./animations";
import { COLORS, Z_INDEX } from "./constants";

const OVERLAY_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: Z_INDEX.CROSSFADE,
  background: COLORS.BG_DARK,
  pointerEvents: "none",
};

const CrossFade = memo(function CrossFade({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={crossfadeVariants}
          initial="hidden"
          animate="visible"
          style={OVERLAY_STYLE}
        />
      )}
    </AnimatePresence>
  );
});

export default CrossFade;