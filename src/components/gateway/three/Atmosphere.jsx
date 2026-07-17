// src/components/gateway/three/Atmosphere.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Atmosphere (Delegate)
// Composes AtmosphereScatter, Halo, and Aurora into one component.
// Receives sunDirection from parent for dynamic lighting response.
// ─────────────────────────────────────────────────────────────────────────────

import AtmosphereScatter from "./AtmosphereScatter";
import Halo from "./Halo";
import Aurora from "./Aurora";

export default function Atmosphere({ sunDirection }) {
  return (
    <group>
      <AtmosphereScatter sunDirection={sunDirection} />
      <Halo sunDirection={sunDirection} />
      <Aurora sunDirection={sunDirection} />
    </group>
  );
}