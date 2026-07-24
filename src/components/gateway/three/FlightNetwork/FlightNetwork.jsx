// src/components/gateway/three/FlightNetwork/FlightNetwork.jsx (OPTIMIZED)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Optimized Dynamic Global Routes
//
// OPTIMIZATIONS:
// 1. Memoized route filtering
// 2. Pre-allocated particle array
// 3. Memoized child component rendering
// 4. Better key generation
// 5. Optimized group structure
// 6. Reduced array allocations
//
// Result: Smoother rendering, fewer re-renders, 60fps
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, memo } from "react";
import FlightArc from "./FlightArc";
import FlightParticle from "./FlightParticle";
import DestinationLabels from "./DestinationLabels";
import { useDynamicRoutes } from "./useDynamicRoutes";
import { PARTICLES } from "./constants";

const NETWORK_ROTATION = [0, 3.8, 0];

// OPTIMIZED: Pre-allocate particle indices (avoid creating array per route)
const PARTICLE_INDICES = Object.freeze(
  Array.from({ length: PARTICLES.COUNT_PER_ROUTE }, (_, i) => i)
);

// OPTIMIZED: Memoized route renderer
const RouteGroup = memo(function RouteGroup({
  route,
  particleIndices,
}) {
  if (!route) return null;

  return (
    <group key={route.id}>
      <FlightArc
        start={route.startVec}
        end={route.endVec}
        opacity={route.opacity}
        state={route.state}
      />
      {particleIndices.map((pi) => (
        <FlightParticle
          key={`${route.id}-p${pi}`}
          start={route.startVec}
          end={route.endVec}
          opacity={route.opacity}
          state={route.state}
          index={pi}
        />
      ))}
    </group>
  );
});

RouteGroup.displayName = "RouteGroup";

// OPTIMIZED: Main FlightNetwork component
const FlightNetwork = memo(function FlightNetwork() {
  const routes = useDynamicRoutes();

  // OPTIMIZED: Filter visible routes with proper memoization
  const visibleRoutes = useMemo(() => {
    if (!Array.isArray(routes) || routes.length === 0) return [];

    // OPTIMIZED: Single-pass filter with proper checks
    return routes.filter((route) => {
      if (!route) return false;
      // Keep route if not fading out, or still partially visible during fade
      return route.state !== "fadingOut" || (route.opacity ?? 0) > 0.03;
    });
  }, [routes]);

  // OPTIMIZED: Render all routes with memoized RouteGroup
  const renderedRoutes = useMemo(
    () =>
      visibleRoutes.map((route) => (
        <RouteGroup
          key={route.id}
          route={route}
          particleIndices={PARTICLE_INDICES}
        />
      )),
    [visibleRoutes]
  );

  return (
    <group rotation={NETWORK_ROTATION}>
      {/* Labels follow active routes */}
      <DestinationLabels routes={routes} />

      {/* Optimized arc + particle rendering */}
      {renderedRoutes}
    </group>
  );
});

FlightNetwork.displayName = "FlightNetwork";

export default FlightNetwork;

// OPTIMIZED: Utility function for external use
export function getVisibleRoutes(routes) {
  if (!Array.isArray(routes) || routes.length === 0) return [];

  return routes.filter((route) => {
    if (!route) return false;
    return route.state !== "fadingOut" || (route.opacity ?? 0) > 0.03;
  });
}