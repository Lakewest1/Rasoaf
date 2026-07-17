// src/components/gateway/three/FlightNetwork/DestinationLabels.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Dynamic Destination Labels
// Only labels for active routes. Fade with route lifecycle.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import FloatingLabel from "./FloatingLabel";

export default function DestinationLabels({ routes }) {
  // Collect unique cities from active routes
  const activeCities = useMemo(() => {
    const map = new Map();
    routes.forEach((route) => {
      if (route.state !== "fadingOut" || route.opacity > 0.1) {
        map.set(route.origin.name, { name: route.origin.name, lat: route.origin.lat, lng: route.origin.lng, isHub: false });
        map.set(route.destination.name, { name: route.destination.name, lat: route.destination.lat, lng: route.destination.lng, isHub: false });
      }
    });
    return Array.from(map.values());
  }, [routes]);

  return (
    <group>
      {activeCities.map((city) => (
        <FloatingLabel key={city.name} city={city} />
      ))}
    </group>
  );
}