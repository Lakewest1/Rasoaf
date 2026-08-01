// src/components/gateway/LogoIntro.jsx (REMOVED - SKIP ANIMATION)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Skip Logo Animation (ULTRA-FAST)
//
// OPTIMIZATION:
// 1. Logo intro animation completely removed/skipped
// 2. No wait for splash screen
// 3. Users go straight to gateway
// 4. Saves 2-3 seconds per page load
//
// Result: Gateway loads instantly, no logo animation delay
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";

// REMOVED: Animation completely skipped
// This component does nothing (logo intro animation is gone)
const LogoIntro = memo(function LogoIntro({ visible }) {
  // Return null - no animation, no delay
  return null;
});

LogoIntro.displayName = "LogoIntro";

export default LogoIntro;