// src/components/gateway/three/FlightNetwork/useDynamicRoutes.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Cinematic Route Lifecycle Hook
//
// Lifecycle per route:
//   1. Fade in (0.7s)
//   2. Particle travels (3.5–5.5s)
//   3. Destination pulses on arrival (0.8s)
//   4. Completed route holds visible (2–3.5s)
//   5. Fade out (1.0s)
//   6. Gap before next spawn (0.5–1.2s)
//
// Routes are staggered so different phases overlap naturally.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { generateRandomRoute } from "./geoUtils";
import { ROUTE_TIMING, PARTICLES } from "./constants";

// Route lifecycle states
const STATE = {
  FADING_IN:      "fadingIn",
  TRAVELING:      "traveling",
  ARRIVING:       "arriving",
  HOLDING:        "holding",
  FADING_OUT:     "fadingOut",
};

export function useDynamicRoutes() {
  const [routes, setRoutes] = useState([]);
  const timersRef = useRef([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  // ── Spawn a single route through its full lifecycle ─────────────────────
  const spawnRoute = useCallback(() => {
    if (!isMountedRef.current) return;

    const newRoute = {
      ...generateRandomRoute(),
      opacity: 0,
      state: STATE.FADING_IN,
      spawnedAt: performance.now(),
    };

    // Add to active routes
    setRoutes((prev) => [...prev, newRoute]);

    const clearTimer = (fn, delay) => {
      const t = setTimeout(fn, delay);
      timersRef.current.push(t);
      return t;
    };

    // Phase 1: Fade in
    clearTimer(() => {
      if (!isMountedRef.current) return;
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === newRoute.id ? { ...r, opacity: 1, state: STATE.TRAVELING } : r
        )
      );
    }, ROUTE_TIMING.FADE_IN_DURATION * 1000);

    // Phase 2 → 3: Particle arrives → destination pulses
    const travelTime =
      (PARTICLES.MIN_DURATION + Math.random() * (PARTICLES.MAX_DURATION - PARTICLES.MIN_DURATION)) * 1000;

    clearTimer(() => {
      if (!isMountedRef.current) return;
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === newRoute.id ? { ...r, state: STATE.ARRIVING } : r
        )
      );
    }, ROUTE_TIMING.FADE_IN_DURATION * 1000 + travelTime);

    // Phase 3 → 4: Pulse complete → hold
    clearTimer(() => {
      if (!isMountedRef.current) return;
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === newRoute.id ? { ...r, state: STATE.HOLDING } : r
        )
      );
    }, ROUTE_TIMING.FADE_IN_DURATION * 1000 + travelTime + ROUTE_TIMING.ARRIVAL_PULSE_DURATION * 1000);

    // Phase 4 → 5: Hold complete → fade out
    const holdDuration =
      (ROUTE_TIMING.HOLD_DURATION_MIN +
        Math.random() * (ROUTE_TIMING.HOLD_DURATION_MAX - ROUTE_TIMING.HOLD_DURATION_MIN)) *
      1000;

    clearTimer(() => {
      if (!isMountedRef.current) return;
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === newRoute.id ? { ...r, state: STATE.FADING_OUT } : r
        )
      );
    }, ROUTE_TIMING.FADE_IN_DURATION * 1000 + travelTime + ROUTE_TIMING.ARRIVAL_PULSE_DURATION * 1000 + holdDuration);

    // Phase 5 → Remove: Fade out complete → delete route
    clearTimer(() => {
      if (!isMountedRef.current) return;
      setRoutes((prev) => prev.filter((r) => r.id !== newRoute.id));
    }, ROUTE_TIMING.FADE_IN_DURATION * 1000 + travelTime + ROUTE_TIMING.ARRIVAL_PULSE_DURATION * 1000 + holdDuration + ROUTE_TIMING.FADE_OUT_DURATION * 1000);
  }, []);

  // ── Continuous staggered spawning ────────────────────────────────────────
  useEffect(() => {
    let active = true;

    const scheduleNext = () => {
      if (!active) return;

      const gap =
        (ROUTE_TIMING.SPAWN_GAP_MIN +
          Math.random() * (ROUTE_TIMING.SPAWN_GAP_MAX - ROUTE_TIMING.SPAWN_GAP_MIN)) *
        1000;

      const timer = setTimeout(() => {
        if (!active) return;

        setRoutes((prev) => {
          const activeCount = prev.filter(
            (r) => r.state !== STATE.FADING_OUT
          ).length;

          // Maintain 3–5 active routes
          if (activeCount < ROUTE_TIMING.ACTIVE_ROUTES_MAX) {
            spawnRoute();
          }
          return prev;
        });

        scheduleNext();
      }, gap);

      timersRef.current.push(timer);
    };

    // Initial staggered spawns — don't spawn all at once
    for (let i = 0; i < ROUTE_TIMING.ACTIVE_ROUTES_MIN; i++) {
      const timer = setTimeout(
        () => spawnRoute(),
        i * ROUTE_TIMING.INITIAL_STAGGER * 1000
      );
      timersRef.current.push(timer);
    }

    // Start the continuous scheduler after initial batch
    const schedulerTimer = setTimeout(
      scheduleNext,
      ROUTE_TIMING.ACTIVE_ROUTES_MIN * ROUTE_TIMING.INITIAL_STAGGER * 1000 + 500
    );
    timersRef.current.push(schedulerTimer);

    return () => {
      active = false;
    };
  }, [spawnRoute]);

  return routes;
}