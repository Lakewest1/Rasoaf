// src/pages/Services.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Services Page
// Professional overview of all travel services with stats and CTA
// v2: 100% Responsive · Touch optimized · All content preserved
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Star, Plane, Building2, MapPin,
  ArrowRight, Sparkles, ShieldCheck,
  Users, Clock, Phone
} from "lucide-react";

// ── Rasoaf Brand Colors ──────────────────────────────────────────────────
const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  dark: "#111111", white: "#ffffff", cream: "#FFF8E6",
};

// ── Services Data ────────────────────────────────────────────────────────
const services = [
  {
    id: "hajj",
    title: "Hajj Packages",
    description: "Complete Hajj journey with premium accommodations in Makkah & Madinah, guided rituals, and seamless logistics.",
    icon: Star,
    link: "/services/hajj",
    color: "#D4A017",
    features: ["5-Star Hotels", "Guided Tours", "VIP Transport", "24/7 Support"],
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop",
  },
  {
    id: "umrah",
    title: "Umrah Packages",
    description: "Spiritual Umrah journeys year-round with flexible durations, comfortable stays, and dedicated guidance.",
    icon: Sparkles,
    link: "/services/umrah",
    color: "#2E7D32",
    features: ["Flexible Dates", "All Inclusive", "Group Packages", "Ramadan Special"],
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&h=400&fit=crop",
  },
  {
    id: "flight",
    title: "Flight Booking",
    description: "Competitive fares on major airlines worldwide. We handle complex itineraries and multi-city bookings.",
    icon: Plane,
    link: "/services/flight-booking",
    color: "#1565C0",
    features: ["Global Airlines", "Best Prices", "Flexible Changes", "Multi-City"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109bb05?w=600&h=400&fit=crop",
  },
  {
    id: "hotel",
    title: "Hotel Reservation",
    description: "Curated accommodations from luxury suites to comfortable stays, matched to your preferences and budget.",
    icon: Building2,
    link: "/services/hotel-reservation",
    color: "#6A1B9A",
    features: ["Worldwide Hotels", "Best Rates", "Free Cancellation", "24/7 Booking"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
];

const stats = [
  { icon: Users, value: "15,000+", label: "Happy Travelers" },
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: ShieldCheck, value: "100%", label: "Satisfaction" },
];

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, #fafafa 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif", overflowX: "hidden" },

  // Hero
  heroSection: { position: "relative", paddingTop: "clamp(6rem, 10vh, 8rem)", paddingBottom: "clamp(3rem, 8vh, 5rem)", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)", background: `linear-gradient(135deg, ${brand.dark} 0%, #1a1a1a 50%, ${brand.dark} 100%)`, overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, opacity: 0.1 },
  heroOrb1: { position: "absolute", top: "clamp(40px, 8vw, 80px)", left: "clamp(20px, 5vw, 40px)", width: "clamp(150px, 25vw, 280px)", height: "clamp(150px, 25vw, 280px)", backgroundColor: "rgba(212,160,23,0.3)", borderRadius: "50%", filter: "blur(80px)" },
  heroOrb2: { position: "absolute", bottom: "clamp(20px, 5vw, 40px)", right: "clamp(20px, 5vw, 40px)", width: "clamp(200px, 30vw, 380px)", height: "clamp(200px, 30vw, 380px)", backgroundColor: "rgba(59,130,246,0.2)", borderRadius: "50%", filter: "blur(80px)" },
  heroContent: { maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center", width: "100%" },
  badge: { display: "inline-block", padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 20px)", backgroundColor: "rgba(212,160,23,0.2)", color: brand.goldLight, borderRadius: "50px", fontSize: "clamp(11px, 1vw, 14px)", fontWeight: 500, marginBottom: "clamp(12px, 2vw, 16px)", letterSpacing: "0.02em" },
  heroTitle: { fontSize: "clamp(1.8rem, 5vw, 3.75rem)", fontWeight: 800, color: brand.white, marginBottom: "clamp(14px, 2vw, 24px)", fontFamily: "'Manrope', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em", paddingInline: "clamp(0px, 2vw, 10px)" },
  heroGradient: { background: "linear-gradient(to right, #F7C948, #D4A017)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "clamp(0.9rem, 1.2vw, 1.125rem)", color: "rgba(255,255,255,0.65)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.8, paddingInline: "clamp(0px, 2vw, 10px)" },

  // Stats
  statsSection: { position: "relative", zIndex: 20, maxWidth: "1000px", margin: "clamp(-2.5rem, -3vw, -2.5rem) auto 0", padding: "0 clamp(12px, 3vw, 20px)" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(120px, 20vw, 180px), 1fr))", gap: "clamp(10px, 1.5vw, 16px)" },
  statCard: { backgroundColor: brand.white, borderRadius: "clamp(14px, 2vw, 20px)", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "clamp(14px, 2vw, 24px)", textAlign: "center", transition: "box-shadow 0.3s ease" },
  statIcon: { width: "clamp(28px, 4vw, 32px)", height: "clamp(28px, 4vw, 32px)", color: brand.goldDark, margin: "0 auto clamp(8px, 1vw, 12px)" },
  statValue: { fontSize: "clamp(1.3rem, 2.5vw, 1.875rem)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  statLabel: { fontSize: "clamp(0.7rem, 0.9vw, 0.875rem)", color: "#737373", marginTop: "clamp(2px, 0.3vw, 4px)" },

  // Content
  contentSection: { maxWidth: "1200px", margin: "0 auto", padding: "clamp(40px, 6vh, 80px) clamp(12px, 3vw, 20px)", width: "100%", boxSizing: "border-box" },

  // Section Header
  sectionHeader: { textAlign: "center", marginBottom: "clamp(32px, 5vw, 64px)" },
  sectionTitle: { fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(8px, 1vw, 16px)", letterSpacing: "-0.02em" },
  sectionSubtitle: { fontSize: "clamp(0.85rem, 1.1vw, 1rem)", color: "#737373", maxWidth: "550px", margin: "0 auto", lineHeight: 1.7, paddingInline: "clamp(0px, 2vw, 10px)" },

  // Services Grid
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(300px, 40vw, 450px), 1fr))", gap: "clamp(20px, 3vw, 32px)" },

  // Service Card
  serviceCard: { backgroundColor: brand.white, borderRadius: "clamp(18px, 2.5vw, 24px)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", transition: "all 0.5s ease", overflow: "hidden", border: "1px solid #f0f0f0" },
  serviceImageWrap: { position: "relative", height: "clamp(140px, 22vw, 192px)", overflow: "hidden" },
  serviceImage: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" },
  serviceImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" },
  serviceImageContent: { position: "absolute", bottom: "clamp(10px, 1.5vw, 16px)", left: "clamp(14px, 2vw, 24px)", display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)" },
  serviceIcon: { width: "clamp(40px, 5vw, 48px)", height: "clamp(40px, 5vw, 48px)", borderRadius: "clamp(10px, 1.5vw, 12px)", display: "flex", alignItems: "center", justifyContent: "center" },
  serviceTitle: { fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif" },
  serviceContent: { padding: "clamp(16px, 2.5vw, 24px)" },
  serviceDesc: { fontSize: "clamp(0.8rem, 1vw, 0.95rem)", color: "#737373", lineHeight: 1.7, marginBottom: "clamp(14px, 2vw, 24px)" },
  featureGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(6px, 1vw, 12px)", marginBottom: "clamp(16px, 2vw, 24px)" },
  featureItem: { display: "flex", alignItems: "center", gap: "clamp(4px, 0.6vw, 8px)", fontSize: "clamp(0.7rem, 0.9vw, 0.875rem)", fontWeight: 500 },
  featureDot: { width: "6px", height: "6px", borderRadius: "50%", flexShrink: 0 },
  ctaLink: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(8px, 1.2vw, 12px) clamp(16px, 2.5vw, 24px)", borderRadius: "clamp(10px, 1vw, 12px)", color: brand.white, fontWeight: 600, fontSize: "clamp(0.8rem, 1vw, 0.95rem)", textDecoration: "none", transition: "all 0.3s ease", fontFamily: "'Inter', sans-serif", minHeight: "44px" },

  // CTA Section
  ctaSection: { background: `linear-gradient(to right, ${brand.goldLight}, ${brand.gold})`, padding: "clamp(40px, 6vh, 64px) clamp(16px, 3vw, 20px)" },
  ctaContent: { maxWidth: "800px", margin: "0 auto", textAlign: "center" },
  ctaTitle: { fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(8px, 1vw, 16px)", letterSpacing: "-0.02em" },
  ctaText: { fontSize: "clamp(0.9rem, 1.1vw, 1.125rem)", color: "rgba(255,255,255,0.9)", marginBottom: "clamp(20px, 3vw, 32px)", lineHeight: 1.7 },
  ctaBtn: { display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: brand.white, color: brand.goldDark, padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 32px)", borderRadius: "50px", fontWeight: 700, fontSize: "clamp(0.95rem, 1.2vw, 1.125rem)", textDecoration: "none", transition: "all 0.3s ease", fontFamily: "'Inter', sans-serif", minHeight: "48px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
};

// ── Animations ───────────────────────────────────────────────────────────
const hoverShadow = { boxShadow: "0 20px 48px rgba(0,0,0,0.12)", transform: "translateY(-4px)" };

export default function Services() {
  return (
    <div style={s.page}>
      {/* ═══════════════ HERO ═══════════════ */}
      <section style={s.heroSection}>
        <div style={s.heroBg}>
          <div style={s.heroOrb1} />
          <div style={s.heroOrb2} />
        </div>
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={s.badge}>Our Premium Services</span>
            <h1 style={s.heroTitle}>
              Your Journey,{" "}
              <span style={s.heroGradient}>Our Priority</span>
            </h1>
            <p style={s.heroSubtitle}>
              From sacred pilgrimages to global adventures, we provide end-to-end travel solutions 
              tailored to your needs with uncompromising quality and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section style={s.statsSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} style={s.statsGrid}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} style={s.statCard} whileHover={hoverShadow}>
                <Icon style={s.statIcon} />
                <div style={s.statValue}>{stat.value}</div>
                <div style={s.statLabel}>{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════════════ SERVICES GRID ═══════════════ */}
      <section style={s.contentSection}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={s.sectionHeader}>
          <h2 style={s.sectionTitle}>Explore Our Services</h2>
          <p style={s.sectionSubtitle}>
            Choose from our comprehensive range of travel services, each designed 
            to provide you with an exceptional experience.
          </p>
        </motion.div>

        <div style={s.servicesGrid}>
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                style={s.serviceCard}
                whileHover={hoverShadow}
              >
                {/* Image */}
                <div style={s.serviceImageWrap}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={s.serviceImage}
                    loading="lazy"
                  />
                  <div style={s.serviceImageOverlay} />
                  <div style={s.serviceImageContent}>
                    <div style={{ ...s.serviceIcon, backgroundColor: `${service.color}30` }}>
                      <Icon size={22} color={service.color} />
                    </div>
                    <h3 style={s.serviceTitle}>{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div style={s.serviceContent}>
                  <p style={s.serviceDesc}>{service.description}</p>

                  {/* Features */}
                  <div style={s.featureGrid}>
                    {service.features.map((feature, i) => (
                      <div key={i} style={{ ...s.featureItem, color: service.color }}>
                        <div style={{ ...s.featureDot, backgroundColor: service.color }} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <Link
                    to={service.link}
                    style={{ ...s.ctaLink, background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Learn More
                    <ArrowRight size={16} style={{ transition: "transform 0.3s ease" }} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section style={s.ctaSection}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={s.ctaContent}>
          <h2 style={s.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={s.ctaText}>Contact us today for personalized travel planning and exclusive deals.</p>
          <a
            href="tel:+2348022352362"
            style={s.ctaBtn}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; }}
          >
            <Phone size={20} />
            Call Us Now
          </a>
        </motion.div>
      </section>
    </div>
  );
}