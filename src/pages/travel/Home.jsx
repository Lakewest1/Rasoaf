// src/pages/travel/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page
// Premium Layout · Optimized Component Order
// ─────────────────────────────────────────────────────────────────────────────

import {
  TravelHeroSection,
  CountryTicker,
  VisaServicesGrid,
  FeaturedDestinations,
  TravelExperience,
  WhyChooseRasoaf,
  VisaSupport,
  TravelProcess,
  TravelStatistics,
  TestimonialsSection,
  FAQSection,
  VisaSlider,
  AboutRasoaf,
  Training,
  OfficeLocations,
  ContactNewsletter,
} from "../../components/travel";

export default function TravelHome() {
  return (
    <div style={{ minHeight: "100vh", background: "#050A14" }}>
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION — "Capture attention"
      ═══════════════════════════════════════════════════════════ */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={() => {
          const el = document.getElementById("visa-services-grid");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          2. COUNTRY TICKER — "Worldwide coverage"
      ═══════════════════════════════════════════════════════════ */}
      <CountryTicker />

      {/* ═══════════════════════════════════════════════════════════
          3. VISA CTA SLIDER — "Core CTA"
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <VisaSlider />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          4. ABOUT RASOAF — "Build trust"
      ═══════════════════════════════════════════════════════════ */}
      <AboutRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          5. VISA SERVICES GRID — "Core offerings"
      ═══════════════════════════════════════════════════════════ */}
      <div id="visa-services-grid">
        <VisaServicesGrid />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          6. TRAVEL PROCESS — "How it works"
      ═══════════════════════════════════════════════════════════ */}
      <TravelProcess />

      {/* ═══════════════════════════════════════════════════════════
          7. WHY CHOOSE US — "Differentiators"
      ═══════════════════════════════════════════════════════════ */}
      <WhyChooseRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          8. TRAVEL EXPERIENCES — "Emotional connection"
      ═══════════════════════════════════════════════════════════ */}
      <TravelExperience />

      {/* ═══════════════════════════════════════════════════════════
          9. FEATURED DESTINATIONS — "Sell the dream"
      ═══════════════════════════════════════════════════════════ */}
      <FeaturedDestinations />

      {/* ═══════════════════════════════════════════════════════════
          10. TRAINING — "Education services"
      ═══════════════════════════════════════════════════════════ */}
      <Training />

      {/* ═══════════════════════════════════════════════════════════
          11. VISA SUPPORT — "Reduce anxiety"
      ═══════════════════════════════════════════════════════════ */}
      <VisaSupport />

      {/* ═══════════════════════════════════════════════════════════
          12. STATISTICS — "Show authority"
      ═══════════════════════════════════════════════════════════ */}
      <TravelStatistics />

      {/* ═══════════════════════════════════════════════════════════
          13. TESTIMONIALS — "Social proof"
      ═══════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════════════════════
          14. FAQ — "Address concerns"
      ═══════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════════
          15. OFFICE LOCATIONS — "Global presence"
      ═══════════════════════════════════════════════════════════ */}
      <OfficeLocations />

      {/* ═══════════════════════════════════════════════════════════
          16. CONTACT / NEWSLETTER — "Stay connected"
      ═══════════════════════════════════════════════════════════ */}
      <ContactNewsletter />
    </div>
  );
}