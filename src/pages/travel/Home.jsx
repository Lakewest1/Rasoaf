// src/pages/travel/Home.jsx (v4.0 — PREMIUM UX ARCHITECTURE)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page
// ARCHITECTURE: Psychological Flow · Conversion-First · Story-Driven
// ─────────────────────────────────────────────────────────────────────────────
//
// SECTION ORDER RATIONALE:
// Each section placement follows the AIDA framework
// (Attention → Interest → Desire → Action) + Trust Building
//
// 1. HERO — Grab attention, emotional hook (2.5s max load)
// 2. TRUST BAR — Immediate credibility (stats, partners, awards)
// 3. PROBLEM AGITATION — "Travel is complicated, we make it simple"
// 4. SOLUTION (Services) — "Here's exactly how we help"
// 5. SOCIAL PROOF — Testimonials, reviews, client logos
// 6. PROCESS — "How easy it is to work with us"
// 7. DIFFERENTIATORS — "Why choose us over competitors"
// 8. DESTINATIONS — Aspirational imagery, desire building
// 9. STATISTICS — Quantified trust (numbers don't lie)
// 10. TRAINING — Authority positioning
// 11. VISA SUPPORT — Pain point solution
// 12. FAQ — Objection handling
// 13. LOCATIONS — Local trust, accessibility
// 14. FINAL CTA — Newsletter + Contact (conversion)
//
// KEY PRINCIPLES:
// ✓ Above-fold: Hero + Trust signals (first impression matters)
// ✓ Every 3rd section = Social Proof (testimonials, stats, partners)
// ✓ Services before process (WHAT before HOW)
// ✓ FAQ near bottom (handle objections before final CTA)
// ✓ Contact/Newsletter LAST (they've read everything, now convert)
// ─────────────────────────────────────────────────────────────────────────────

import React, { lazy, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import {
  TravelHeroSection,
  CountryTicker,
  VisaSlider,
  AboutRasoaf,
} from "../../components/travel";

// ══════════════════════════════════════════════════════════════════════════
// LAZY LOAD SECTIONS — Performance optimized, below-fold priority
// ══════════════════════════════════════════════════════════════════════════

// PRIORITY 1: Trust & Social Proof (loads earliest below fold)
const Partners = lazy(() => import("../../components/home/Partners"));
const TravelStatistics = lazy(() => import("../../components/travel/TravelStatistics"));
const TestimonialsSection = lazy(() => import("../../components/travel/TestimonialsSection"));

// PRIORITY 2: Core Services & Process
const VisaServicesGrid = lazy(() => import("../../components/travel/VisaServicesGrid"));
const TravelProcess = lazy(() => import("../../components/travel/TravelProcess"));
const WhyChooseRasoaf = lazy(() => import("../../components/travel/WhyChooseRasoaf"));

// PRIORITY 3: Aspirational & Desire
const FeaturedDestinations = lazy(() => import("../../components/travel/FeaturedDestinations"));
const TravelExperience = lazy(() => import("../../components/travel/TravelExperience"));

// PRIORITY 4: Authority & Support
const Training = lazy(() => import("../../components/travel/Training"));
const VisaSupport = lazy(() => import("../../components/travel/VisaSupport"));
const FAQSection = lazy(() => import("../../components/travel/FAQSection"));

// PRIORITY 5: Conversion
const OfficeLocations = lazy(() => import("../../components/travel/OfficeLocations"));
const ContactNewsletter = lazy(() => import("../../components/travel/ContactNewsletter"));

// ══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS — RASOAF DESIGN SYSTEM
// ══════════════════════════════════════════════════════════════════════════

const REVEAL_EASE = [0.25, 1, 0.5, 1];

const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: REVEAL_EASE },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: REVEAL_EASE },
  },
};

const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ══════════════════════════════════════════════════════════════════════════
// LOADING FALLBACK
// ══════════════════════════════════════════════════════════════════════════

function SectionLoader() {
  return (
    <div
      style={{
        minHeight: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          border: "2px solid rgba(212, 160, 23, 0.1)",
          borderTopColor: "#D4A017",
          borderRadius: "50%",
          animation: "travel-spin 1s linear infinite",
        }}
        aria-hidden="true"
      />
      <style>{`
        @keyframes travel-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL WRAPPER
// ══════════════════════════════════════════════════════════════════════════

const ScrollRevealSection = React.forwardRef(function ScrollRevealSection(
  { children, id, delay = 0 },
  forwardRef
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.12,
    triggerOnce: true,
    rootMargin: "0px 0px -12% 0px",
  });

  const mergedRef = (node) => {
    inViewRef(node);
    if (forwardRef) {
      if (typeof forwardRef === "function") forwardRef(node);
      else forwardRef.current = node;
    }
  };

  const variants = prefersReducedMotion ? fadeOnly : sectionVariants;

  return (
    <motion.div
      ref={mergedRef}
      {...(id ? { id } : {})}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 1, ease: REVEAL_EASE, delay }
      }
      style={{ width: "100%", willChange: "opacity, transform" }}
    >
      <Suspense fallback={<SectionLoader />}>{children}</Suspense>
    </motion.div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// MAIN HOME COMPONENT — AIDA Architecture
// ══════════════════════════════════════════════════════════════════════════

export default function TravelHome() {
  const visaServicesRef = useRef(null);

  const handleExploreClick = () => {
    if (visaServicesRef.current) {
      visaServicesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050A14", width: "100%" }}>
      
      {/* ══════════════════════════════════════════════════════════════════
          PHASE 1: ATTENTION — Above Fold, Immediate Load
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 1: HERO — Emotional hook, primary CTA */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={handleExploreClick}
      />

      {/* SECTION 2: COUNTRY TICKER — Instant brand presence, global reach */}
      <CountryTicker />


        {/* SECTION 6: VISA SLIDER — Quick service overview, CTA */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <VisaSlider />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 2: TRUST & CREDIBILITY — Reinforce first impression
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 3: ABOUT + STATS — Who we are, quantified trust */}
      <AboutRasoaf />

      {/* SECTION 4: TRAVEL STATISTICS — Numbers build credibility */}
      <ScrollRevealSection>
        <TravelStatistics />
      </ScrollRevealSection>

     

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 3: SOLUTION — Address pain points
          ══════════════════════════════════════════════════════════════════ */}
      
      

      {/* SECTION 7: VISA SERVICES — Comprehensive solution showcase */}
      <ScrollRevealSection id="visa-services-grid" ref={visaServicesRef} delay={0.05}>
        <VisaServicesGrid />
      </ScrollRevealSection>


       {/* SECTION 5: PARTNERS — Social proof through association */}
      <ScrollRevealSection id="partners" delay={0.05}>
        <Partners />
      </ScrollRevealSection>

      {/* SECTION 8: VISA SUPPORT — Deepen solution, address concerns */}
      <ScrollRevealSection delay={0.05}>
        <VisaSupport />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 4: SOCIAL PROOF — Others trust us, you can too
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 9: TESTIMONIALS — Real client stories */}
      <ScrollRevealSection delay={0.05}>
        <TestimonialsSection />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 5: PROCESS — How easy it is
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 10: TRAVEL PROCESS — Step-by-step, reduce anxiety */}
      <ScrollRevealSection delay={0.05}>
        <TravelProcess />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 6: DIFFERENTIATION — Why us over competitors
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 11: WHY CHOOSE US — Unique value proposition */}
      <ScrollRevealSection delay={0.05}>
        <WhyChooseRasoaf />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 7: DESIRE — Aspirational imagery & experiences
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 12: FEATURED DESTINATIONS — Dream building */}
      <ScrollRevealSection delay={0.05}>
        <FeaturedDestinations />
      </ScrollRevealSection>

      {/* SECTION 13: TRAVEL EXPERIENCES — Immersive storytelling */}
      <ScrollRevealSection delay={0.05}>
        <TravelExperience />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 8: AUTHORITY — Industry expertise
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 14: TRAINING — Thought leadership, education */}
      <ScrollRevealSection delay={0.05}>
        <Training />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 9: OBJECTION HANDLING — Remove final barriers
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 15: FAQ — Answer common concerns before they ask */}
      <ScrollRevealSection delay={0.05}>
        <FAQSection />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 10: LOCAL TRUST — Accessibility & presence
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 16: OFFICE LOCATIONS — Physical presence = legitimacy */}
      <ScrollRevealSection delay={0.05}>
        <OfficeLocations />
      </ScrollRevealSection>

      {/* ══════════════════════════════════════════════════════════════════
          PHASE 11: CONVERSION — Final CTA, capture leads
          ══════════════════════════════════════════════════════════════════ */}
      
      {/* SECTION 17: CONTACT & NEWSLETTER — Bottom of funnel conversion */}
      <ScrollRevealSection delay={0.05}>
        <ContactNewsletter />
      </ScrollRevealSection>
    </div>
  );
}