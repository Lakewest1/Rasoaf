// src/components/gateway/useGatewaySequence.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Animation Sequence Hook (Phase 1 — Earth added)
// Sequence: logo → earth → closing → idle → opening → flash → crossfade
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TIMING, DURATIONS } from "./constants";

export function useGatewaySequence() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("logo");
  const [openingSide, setOpeningSide] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [logoVisible, setLogoVisible] = useState(true);
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // ── Entrance sequence: logo → earth → closing → idle ────────────────────
  useEffect(() => {
    clearTimers();

    // Phase 1: Logo visible for LOGO_TOTAL duration
    const t1 = setTimeout(() => {
      setLogoVisible(false);
      setPhase("earth");              // ← NEW: Earth scene appears
    }, DURATIONS.LOGO_TOTAL * 1000);

    // Phase 2: Earth visible for 3 seconds (configurable)
    const EARTH_DISPLAY = 3.0;       // seconds
    const t2 = setTimeout(() => {
      setPhase("closing");
    }, (DURATIONS.LOGO_TOTAL + EARTH_DISPLAY) * 1000);

    // Phase 3: Curtains close → idle
    const t3 = setTimeout(() => {
      setPhase("idle");
    }, (DURATIONS.LOGO_TOTAL + EARTH_DISPLAY + TIMING.CURTAIN_CLOSE) * 1000);

    timersRef.current = [t1, t2, t3];
  }, [clearTimers]);

  // ── Body scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  // ── Handle click → opening sequence ─────────────────────────────────────
  const handleClick = useCallback((side) => {
    if (phase !== "idle") return;
    clearTimers();
    setPhase("opening");
    setOpeningSide(side);

    const t1 = setTimeout(() => setPhase("flash"), DURATIONS.OPEN_TO_FLASH * 1000);
    const t2 = setTimeout(() => setPhase("crossfade"), (DURATIONS.OPEN_TO_FLASH + DURATIONS.FLASH_TO_CROSSFADE) * 1000);
    const t3 = setTimeout(() => {
      navigate(side === "hajj" ? "/hajj" : "/travel");
    }, DURATIONS.OPEN_TO_NAVIGATE * 1000);

    timersRef.current = [t1, t2, t3];
  }, [phase, navigate, clearTimers]);

  const handleMouseEnter = useCallback((side) => {
    if (phase === "idle") setHovered(side);
  }, [phase]);

  const handleMouseLeave = useCallback(() => setHovered(null), []);

  return {
    phase,
    openingSide,
    hovered,
    logoVisible,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}