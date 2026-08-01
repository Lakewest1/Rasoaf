// src/components/gateway/FlashOverlay.jsx (REMOVED - SKIP ANIMATION)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Skip Flash Animation (ULTRA-FAST)
//
// OPTIMIZATION:
// 1. Flash animation completely removed
// 2. No camera shutter effect delay
// 3. Instant gateway display
// 4. Saves 1-2 seconds
//
// Result: No waiting for flash animation
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";

// REMOVED: Flash animation completely skipped
// This component does nothing
const FlashOverlay = memo(function FlashOverlay({ visible }) {
  // Return null - no animation, no delay
  return null;
});

FlashOverlay.displayName = "FlashOverlay";

export default FlashOverlay;