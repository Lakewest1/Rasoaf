// src/hooks/usePrefersReducedMotion.js
// ─────────────────────────────────────────────────────────────────────────────
// Tracks the user's `prefers-reduced-motion` OS setting live (not just at
// mount) so ambient/decorative animations can be disabled immediately if the
// person changes the setting while the app is open, and re-enabled if they
// change it back.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitial() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const mql = window.matchMedia(QUERY);
    const handleChange = (event) => setReduced(event.matches);

    // addEventListener is the modern API; addListener is the Safari <14 fallback.
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    }
    mql.addListener(handleChange);
    return () => mql.removeListener(handleChange);
  }, []);

  return reduced;
}