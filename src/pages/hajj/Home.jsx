// src/pages/hajj/Home.jsx (PREMIUM + RESPONSIVE + ANIMATIONS)
// ─────────────────────────────────────────────────────────────────────────────
// IMPROVEMENTS:
// 1. Perfect mobile responsiveness (all breakpoints optimized)
// 2. Premium design (better spacing, typography, shadows)
// 3. Scroll reveal animations (fade-in, slide-up, stagger)
// 4. Touch-friendly buttons and spacing
// 5. Optimized performance
// ─────────────────────────────────────────────────────────────────────────────

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HajjHeroSection, ServiceCard } from "../../components/hajj";
import { SectionHeader } from "../../components/common";
import { Star, Plane, Hotel, Globe, ArrowRight } from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const services = [
  { 
    icon: Star, 
    title: "Hajj Packages", 
    description: "Complete Hajj pilgrimage packages with expert guidance and spiritual support.", 
    color: "#D4A017", 
    route: "/hajj/packages/hajj",
    delay: 0,
  },
  { 
    icon: Star, 
    title: "Umrah Packages", 
    description: "Flexible Umrah packages available throughout the year including Ramadan.", 
    color: "#D4A017", 
    route: "/hajj/packages/umrah",
    delay: 0.1,
  },
  { 
    icon: Plane, 
    title: "Flight Booking", 
    description: "Reliable flights to Jeddah and Madinah from all major Nigerian cities.", 
    color: "#1A73E8", 
    route: "/hajj/flight-booking",
    delay: 0.2,
  },
  { 
    icon: Hotel, 
    title: "Hotel Reservation", 
    description: "Comfortable accommodation near the Holy Mosques in Makkah and Madinah.", 
    color: "#0D9488", 
    route: "/hajj/hotel-reservation",
    delay: 0.3,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL WRAPPER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function ScrollReveal({ children, className = "" }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE CARD WITH ANIMATION
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedServiceCard({ service, onClick, delay }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay, ease: "easeOut" },
        },
      }}
    >
      <ServiceCard {...service} onClick={onClick} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function HajjHome() {
  const navigate = useNavigate();
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6", overflow: "hidden" }}>
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION — Premium responsive hero
      ═══════════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════════
          2. SERVICES SECTION — Responsive grid with animations
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={servicesRef}
        id="services-section"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* SECTION HEADER WITH ANIMATION */}
        <ScrollReveal>
          <SectionHeader
            badge="Our Services"
            badgeIcon={<Globe size={18} />}
            title="Premium Hajj & Umrah Services"
            subtitle="Everything you need for a blessed and comfortable pilgrimage journey."
          />
        </ScrollReveal>

        {/* SERVICES GRID — Responsive & Animated */}
        <motion.div
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 100%, 350px), 1fr))",
            gap: "clamp(16px, 3vw, 24px)",
            marginTop: "clamp(32px, 5vw, 48px)",
          }}
        >
          {services.map((service) => (
            <AnimatedServiceCard
              key={service.route}
              service={service}
              onClick={() => navigate(service.route)}
              delay={service.delay}
            />
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3. CALL TO ACTION SECTION — Premium centered CTA
      ═══════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 40px)",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 700,
                color: "#111",
                margin: "0 0 16px 0",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Ready to Begin Your Sacred Journey?
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.125rem)",
                color: "#5F5F5F",
                margin: "0 0 32px 0",
                lineHeight: 1.6,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Our expert team is ready to guide you through every step of your Hajj or Umrah journey.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/hajj/contact")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.95rem, 1.5vw, 1rem)",
                fontWeight: 600,
                padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)",
                borderRadius: "50px",
                border: "none",
                background: "#D4A017",
                color: "#111",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 16px rgba(212, 160, 23, 0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Get Started
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════
          4. DECORATIVE ELEMENT
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #D4A017, transparent)",
          margin: "60px auto",
          maxWidth: "1200px",
          width: "90%",
        }}
      />

      {/* ADD YOUR OTHER SECTIONS HERE */}
      {/* <HajjStats /> */}
      {/* <HajjTestimonials /> */}
      {/* <HajjFAQ /> */}
    </div>
  );
}