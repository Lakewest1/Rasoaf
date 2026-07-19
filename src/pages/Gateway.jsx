// src/pages/Gateway.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Gateway Page
// Hero Earth → Gateway Split → Choose Journey → Premium Travel Sections
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from "react";
import TravelHeroSection from "../components/travel/HeroSection";
import { GatewaySplit } from "../components/gateway";
import {
  FeaturedDestinations,
  TravelServices,
  WhyChooseRasoaf,
  TravelStatistics,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from "../components/travel";

export default function Gateway() {
  const scrollToGateway = useCallback(() => {
    const el = document.getElementById("gateway-section");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: Cinematic Travel Hero
          Distant Earth zooms in — "Imagine the journey"
      ═══════════════════════════════════════════════════════════ */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={scrollToGateway}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: Interactive Gateway Split
          "See the world. Choose your path."
          GatewaySplit renders its own EarthBackground internally
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
        <GatewaySplit />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          PREMIUM TRAVEL SECTIONS
          "Explore what we offer"
      ═══════════════════════════════════════════════════════════ */}
      <FeaturedDestinations />
      <TravelServices />
      <WhyChooseRasoaf />
      <TravelStatistics />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}