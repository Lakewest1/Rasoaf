// src/components/gateway/three/FlightNetwork/FlightNetwork.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Dynamic Global Routes
// Phase-aware rendering. Staggered cinematic lifecycle.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import FlightArc from "./FlightArc";
import FlightParticle from "./FlightParticle";
import DestinationLabels from "./DestinationLabels";
import { useDynamicRoutes } from "./useDynamicRoutes";
import { PARTICLES } from "./constants";

const NETWORK_ROTATION = [0, 3.8, 0];

export default function FlightNetwork() {
  const routes = useDynamicRoutes();

  // Show all routes except fully removed ones
  const visibleRoutes = useMemo(
    () => routes.filter((r) => r.state !== "fadingOut" || r.opacity > 0.03),
    [routes]
  );

  return (
    <group rotation={NETWORK_ROTATION}>
      {/* Labels follow active routes */}
      <DestinationLabels routes={routes} />

      {/* Arcs + particles */}
      {visibleRoutes.map((route) => (
        <group key={route.id}>
          <FlightArc
            start={route.startVec}
            end={route.endVec}
            opacity={route.opacity}
            state={route.state}
          />
          {Array.from({ length: PARTICLES.COUNT_PER_ROUTE }).map((_, pi) => (
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
      ))}
    </group>
  );
}