// src/pages/travel/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page
// Premium Layout: Hero → Trust → Services → Destinations → Process → Convert
// ─────────────────────────────────────────────────────────────────────────────

import {
  TravelHeroSection,
  CountryTicker,
  VisaServicesGrid,
  FeaturedDestinations,
  TravelServices,
  TravelExperience,
  WhyChooseRasoaf,
  VisaSupport,
  TravelProcess,
  TravelStatistics,
  TestimonialsSection,
  FAQSection,
  FinalCTA,
} from "../../components/travel";

export default function TravelHome() {
  return (
    <div style={{ minHeight: "100vh", background: "#050A14" }}>
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION — "Capture attention"
             Bold entrance with 3D Earth globe
      ═══════════════════════════════════════════════════════════ */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={() => document.getElementById("premium-travel-services")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* ═══════════════════════════════════════════════════════════
          2. COUNTRY TICKER — "Worldwide coverage"
             Infinite scrolling country flags
      ═══════════════════════════════════════════════════════════ */}
      <CountryTicker />

      {/* ═══════════════════════════════════════════════════════════
          3. VISA SERVICES GRID — "Core offerings"
             Student, Work, Tourist, Business, Family, Flights
      ═══════════════════════════════════════════════════════════ */}
      <VisaServicesGrid />

      {/* ═══════════════════════════════════════════════════════════
          4. FEATURED DESTINATIONS — "Sell the dream"
             Dubai, London, Toronto, Istanbul, Paris
      ═══════════════════════════════════════════════════════════ */}
      <FeaturedDestinations />

      {/* ═══════════════════════════════════════════════════════════
          5. TRAVEL SERVICES — "Additional offerings"
             Flights, Hotels, Insurance, Packages, Transfers
      ═══════════════════════════════════════════════════════════ */}
      <TravelServices />

      {/* ═══════════════════════════════════════════════════════════
          6. TRAVEL EXPERIENCES — "Why people travel"
             Study, Work, Tourism, Business, Family, Flights
      ═══════════════════════════════════════════════════════════ */}
      <TravelExperience />

      {/* ═══════════════════════════════════════════════════════════
          7. WHY CHOOSE US — "Build trust"
             Bento grid with key differentiators
      ═══════════════════════════════════════════════════════════ */}
      <WhyChooseRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          8. VISA SUPPORT — "Reduce anxiety"
             Step-by-step timeline of the visa process
      ═══════════════════════════════════════════════════════════ */}
      <VisaSupport />

      {/* ═══════════════════════════════════════════════════════════
          9. TRAVEL PROCESS — "Simple journey"
             Discover → Consult → Plan → Book → Travel → Enjoy
      ═══════════════════════════════════════════════════════════ */}
      <TravelProcess />

      {/* ═══════════════════════════════════════════════════════════
          10. STATISTICS — "Show authority"
              Animated counters: 20+ Years, 5000+ Travelers, 60+ Countries
      ═══════════════════════════════════════════════════════════ */}
      <TravelStatistics />

      {/* ═══════════════════════════════════════════════════════════
          11. TESTIMONIALS — "Social proof"
              Client success stories and reviews
      ═══════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════════════════════
          12. FAQ — "Address concerns"
              Common questions about visas and travel
      ═══════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════════
          13. FINAL CTA — "Strong closing"
              Compelling call-to-action to convert visitors
      ═══════════════════════════════════════════════════════════ */}
      <FinalCTA />
    </div>
  );
}