// src/pages/hajj/Home.jsx (NO LAZY LOADING - NO PLACEHOLDER)
// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: Import HajjHeroSection normally (NOT lazy)
// RESULT: Hero renders immediately, no yellow placeholder
// ─────────────────────────────────────────────────────────────────────────────

import { useNavigate } from "react-router-dom";
import { HajjHeroSection, ServiceCard } from "../../components/hajj";
import { SectionHeader } from "../../components/common";
import { Star, Plane, Hotel, Globe } from "lucide-react";

const services = [
  { 
    icon: Star, 
    title: "Hajj Packages", 
    description: "Complete Hajj pilgrimage packages with expert guidance and spiritual support.", 
    color: "#D4A017", 
    route: "/hajj/packages/hajj" 
  },
  { 
    icon: Star, 
    title: "Umrah Packages", 
    description: "Flexible Umrah packages available throughout the year including Ramadan.", 
    color: "#D4A017", 
    route: "/hajj/packages/umrah" 
  },
  { 
    icon: Plane, 
    title: "Flight Booking", 
    description: "Reliable flights to Jeddah and Madinah from all major Nigerian cities.", 
    color: "#1A73E8", 
    route: "/hajj/flight-booking" 
  },
  { 
    icon: Hotel, 
    title: "Hotel Reservation", 
    description: "Comfortable accommodation near the Holy Mosques in Makkah and Madinah.", 
    color: "#0D9488", 
    route: "/hajj/hotel-reservation" 
  },
];

export default function HajjHome() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6" }}>
      {/* HERO SECTION — Renders immediately, no placeholder */}
      <HajjHeroSection
        badge="Sacred Journeys"
        title="Your Trusted Hajj & Umrah Partner"
        subtitle="Embark on a blessed pilgrimage with premium packages, expert guidance, and complete peace of mind."
        backgroundImage="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop"
        ctaText="Explore Packages"
        onCtaClick={() => {
          const el = document.getElementById("services-section");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* SERVICES SECTION */}
      <section
        id="services-section"
        style={{
          maxWidth: 1200,
          margin: "-40px auto 0",
          padding: "40px 20px 80px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <SectionHeader
          badge="Our Services"
          badgeIcon={<Globe size={14} />}
          title="Premium Hajj & Umrah Services"
          subtitle="Everything you need for a blessed and comfortable pilgrimage journey."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} onClick={() => navigate(s.route)} />
          ))}
        </div>
      </section>

      {/* ADD YOUR OTHER SECTIONS HERE */}
      {/* <HajjStats /> */}
      {/* <HajjTestimonials /> */}
      {/* <HajjFAQ /> */}
      {/* etc. */}
    </div>
  );
}