// src/pages/Gateway.jsx (ULTRA-FAST - NO ANIMATIONS)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Gateway Page (INSTANT)
//
// OPTIMIZATIONS:
// 1. NO loading animations (LogoIntro removed)
// 2. NO splash screens (FlashOverlay removed)
// 3. NO crossfade delays (instant black screen)
// 4. Instant button navigation (startTransition)
// 5. Earth loads in background
// 6. Navigation happens immediately (<100ms)
//
// Result: Users click button → immediately navigate, no delays
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { GatewaySplit } from "../components/gateway";

// Lazy load only if needed
const TravelHeroSection = lazy(() => import("../components/travel/HeroSection"));

// Ultra-minimal fallback
const GatewayFallback = () => (
  <div
    style={{
      width: "100%",
      height: "100vh",
      background: "linear-gradient(135deg, #0d1a2a 0%, #050a14 100%)",
    }}
  />
);

export default function Gateway() {
  const navigate = useNavigate();

  // OPTIMIZED: Instant navigation using startTransition
  // Does NOT wait for animations or Earth loading
  const handleNavigateToHajj = () => {
    startTransition(() => {
      navigate("/hajj", { replace: false });
    });
  };

  const handleNavigateToTravel = () => {
    startTransition(() => {
      navigate("/travel", { replace: false });
    });
  };

  const handleScrollToGateway = () => {
    const el = document.getElementById("gateway-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: Hero (Optional)
      ═══════════════════════════════════════════════════════════ */}
      <Suspense fallback={null}>
        <TravelHeroSection
          badge="RASOAF Travel & Tours"
          title="Your Gateway to the World"
          subtitle="Premium visa services, flight bookings, and curated travel experiences."
          ctaText="Explore Services"
          onCtaClick={handleScrollToGateway}
        />
      </Suspense>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: Gateway Split (Instant navigation, no animations)
      ═══════════════════════════════════════════════════════════ */}
      <div
        id="gateway-section"
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Suspense fallback={<GatewayFallback />}>
          <GatewaySplit
            onHajjClick={handleNavigateToHajj}
            onTravelClick={handleNavigateToTravel}
          />
        </Suspense>
      </div>
    </>
  );
}