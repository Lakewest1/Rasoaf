// src/pages/VisaServices.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Visa Services Page
// Comprehensive visa processing services with detailed information
// v2.1: All buttons navigate + scroll to top · 100% Responsive · Touch optimized
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import {
  GraduationCap,
  Building2,
  Plane,
  Globe,
  Users,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  FileText,
  BadgeCheck,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// ── Responsive Hook ──────────────────────────────────────────────────────
function useResponsive() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

// ── Visa Type Data ──────────────────────────────────────────────────────
const VISA_TYPES = [
  {
    id: "student",
    title: "Student Visa",
    route: "/visa-services/student",
    icon: GraduationCap,
    description: "Comprehensive student visa assistance for international education opportunities in top destinations worldwide.",
    processingTime: "4-8 weeks",
    successRate: "95%",
    requirements: ["Valid Passport (6+ months)", "Letter of Acceptance", "Proof of Funds", "Academic Transcripts", "English Proficiency Test", "Passport Photos"],
    features: ["Document Review", "Application Filing", "Interview Preparation", "Visa Tracking"],
    color: "#D4A017",
  },
  {
    id: "work",
    title: "Work Visa",
    route: "/visa-services/work",
    icon: Building2,
    description: "Professional work visa processing for employment opportunities abroad with expert guidance and support.",
    processingTime: "6-12 weeks",
    successRate: "92%",
    requirements: ["Valid Passport (6+ months)", "Employment Contract", "Qualifications Verified", "Medical Clearance", "Police Clearance", "CV/Resume"],
    features: ["Employer Liaison", "Document Preparation", "Medical Booking", "Status Updates"],
    color: "#B8860B",
  },
  {
    id: "tourist",
    title: "Tourist Visa",
    route: "/visa-services/tourist",
    icon: Plane,
    description: "Hassle-free tourist visa processing for leisure and vacation travel to your dream destinations.",
    processingTime: "2-4 weeks",
    successRate: "98%",
    requirements: ["Valid Passport (6+ months)", "Return Flight Ticket", "Hotel Booking", "Proof of Funds", "Travel Itinerary", "Passport Photos"],
    features: ["Application Filing", "Document Review", "Express Service", "Travel Insurance"],
    color: "#F7C948",
  },
  {
    id: "business",
    title: "Business Visa",
    route: "/visa-services/business",
    icon: Globe,
    description: "Efficient business visa services for corporate travel, conferences, and international business meetings.",
    processingTime: "3-6 weeks",
    successRate: "94%",
    requirements: ["Valid Passport (6+ months)", "Invitation Letter", "Company Registration", "Business Itinerary", "Proof of Funds", "Passport Photos"],
    features: ["Corporate Support", "Invitation Assistance", "Expedited Processing", "Multi-Entry Support"],
    color: "#D4A017",
  },
  {
    id: "family",
    title: "Family Visa",
    route: "/visa-services/family",
    icon: Users,
    description: "Family visa processing for reunification and dependent travel with compassionate support and guidance.",
    processingTime: "8-16 weeks",
    successRate: "88%",
    requirements: ["Valid Passport (6+ months)", "Sponsor Documents", "Proof of Relationship", "Financial Support", "Medical Clearance", "Passport Photos"],
    features: ["Relationship Verification", "Document Preparation", "Medical Booking", "Family Support"],
    color: "#B8860B",
  },
];

// ── Visa Process Steps ──────────────────────────────────────────────────
const PROCESS_STEPS = [
  { step: "01", title: "Consultation", description: "Discuss your visa needs and determine the best pathway." },
  { step: "02", title: "Document Review", description: "We review all your documents for completeness and accuracy." },
  { step: "03", title: "Application Filing", description: "Your application is prepared and filed with the embassy." },
  { step: "04", title: "Tracking & Support", description: "We track your application and keep you informed." },
  { step: "05", title: "Visa Issued", description: "Receive your visa and prepare for your journey." },
];

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: "#ffffff", fontFamily: "'Inter', sans-serif", overflowX: "hidden", paddingTop: "clamp(60px, 8vh, 80px)" },

  // Hero
  heroSection: { position: "relative", padding: "clamp(40px, 8vh, 100px) clamp(16px, 4vw, 48px)", background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)", textAlign: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(212,160,23,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 50%, rgba(212,160,23,0.05) 0%, transparent 60%)", pointerEvents: "none" },
  heroContent: { position: "relative", zIndex: 1 },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 3.5rem)", letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "clamp(10px, 1.5vw, 16px)" },
  heroHighlight: { color: "#F7C948" },
  heroSubtitle: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.85rem, 1.2vw, 1.15rem)", fontWeight: 400, color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 },

  // Content
  contentSection: { maxWidth: "1200px", margin: "0 auto", padding: "clamp(28px, 5vh, 64px) clamp(16px, 4vw, 48px) clamp(40px, 6vh, 80px)", width: "100%", boxSizing: "border-box" },

  // Section Header
  sectionHeader: { textAlign: "center", marginBottom: "clamp(28px, 4vw, 40px)" },
  eyebrow: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4A017", display: "block", marginBottom: "clamp(8px, 1vw, 12px)" },
  sectionTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.4rem)", color: "#111111", marginBottom: "clamp(8px, 1vw, 12px)", letterSpacing: "-0.02em" },
  sectionItalic: { fontStyle: "italic", color: "#D4A017" },
  sectionSubtitle: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.8rem, 1vw, 1rem)", color: "#5F5F5F", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, paddingInline: "clamp(0px, 2vw, 10px)" },

  // Visa Grid
  visaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 35vw, 340px), 1fr))", gap: "clamp(16px, 2vw, 24px)", marginBottom: "clamp(32px, 5vh, 48px)" },

  // Visa Card
  visaCard: { background: "#ffffff", borderRadius: "clamp(16px, 2vw, 20px)", padding: "clamp(20px, 2.5vw, 28px) clamp(16px, 2vw, 24px) clamp(18px, 2vw, 24px)", height: "100%", display: "flex", flexDirection: "column", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.04)", transition: "all 0.35s cubic-bezier(0.25,1,0.5,1)", position: "relative", overflow: "hidden" },
  visaCardHover: { border: "1px solid rgba(212,160,23,0.30)", boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.08)", transform: "translateY(-6px)" },
  accentLine: { position: "absolute", top: 0, left: "15%", right: "15%", height: "3px", borderRadius: "0 0 3px 3px", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease" },
  visaIcon: { display: "flex", alignItems: "center", justifyContent: "center", width: "clamp(44px, 5vw, 56px)", height: "clamp(44px, 5vw, 56px)", borderRadius: "clamp(12px, 1.5vw, 14px)", background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.12)", color: "#D4A017", marginBottom: "clamp(10px, 1.5vw, 14px)" },
  visaTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 1.3vw, 1.15rem)", color: "#111", marginBottom: "clamp(6px, 0.8vw, 8px)", letterSpacing: "-0.01em" },
  visaDesc: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)", fontWeight: 400, color: "#5F5F5F", lineHeight: 1.6, marginBottom: "clamp(10px, 1.5vw, 14px)", flex: 1 },
  infoBox: { display: "flex", gap: "clamp(10px, 1.5vw, 16px)", marginBottom: "clamp(10px, 1.5vw, 14px)", padding: "clamp(10px, 1.2vw, 12px) clamp(10px, 1.5vw, 14px)", background: "rgba(212,160,23,0.04)", borderRadius: "clamp(10px, 1vw, 12px)", border: "1px solid rgba(212,160,23,0.06)" },
  infoLabel: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.6rem, 0.7vw, 0.65rem)", fontWeight: 500, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "0.08em", display: "block" },
  infoValue: { fontFamily: "'Manrope', sans-serif", fontSize: "clamp(0.8rem, 1vw, 0.95rem)", fontWeight: 700, color: "#111" },
  reqLabel: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.6rem, 0.7vw, 0.7rem)", fontWeight: 600, color: "#5F5F5F", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "clamp(4px, 0.5vw, 6px)" },
  reqGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginBottom: "clamp(12px, 1.5vw, 16px)" },
  reqItem: { display: "flex", alignItems: "center", gap: "4px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.6rem, 0.7vw, 0.7rem)", fontWeight: 450, color: "#2d3748" },
  ctaBtn: { width: "100%", padding: "clamp(9px, 1vw, 11px) 0", background: "linear-gradient(135deg, #F7C948 0%, #D4A017 100%)", border: "none", borderRadius: "clamp(10px, 1vw, 12px)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)", fontWeight: 600, color: "#111", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)", boxShadow: "0 2px 12px rgba(212,160,23,0.25)", minHeight: "44px" },

  // Process Section
  processSection: { padding: "clamp(24px, 4vw, 40px)", background: "linear-gradient(135deg, #FFF8E6, #FFFBEF)", borderRadius: "clamp(16px, 2vw, 20px)", border: "1px solid rgba(212,160,23,0.1)", marginBottom: "clamp(32px, 5vh, 48px)" },
  processTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)", color: "#111", marginBottom: "clamp(16px, 2.5vw, 24px)", textAlign: "center" },
  processGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(160px, 20vw, 200px), 1fr))", gap: "clamp(14px, 2vw, 20px)" },
  processStep: { display: "flex", alignItems: "flex-start", gap: "clamp(10px, 1.5vw, 16px)" },
  stepNum: { display: "flex", alignItems: "center", justifyContent: "center", minWidth: "clamp(40px, 5vw, 48px)", minHeight: "clamp(40px, 5vw, 48px)", borderRadius: "clamp(10px, 1.5vw, 12px)", background: "linear-gradient(135deg, #F7C948, #D4A017)", color: "#111", fontFamily: "'Manrope', sans-serif", fontSize: "clamp(0.85rem, 1vw, 1rem)", fontWeight: 800 },
  stepTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 1vw, 1rem)", color: "#111", marginBottom: "clamp(2px, 0.3vw, 4px)" },
  stepDesc: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)", fontWeight: 400, color: "#5F5F5F", lineHeight: 1.6, margin: 0 },

  // CTA Section
  ctaSection: { padding: "clamp(24px, 4vw, 40px)", background: "linear-gradient(135deg, #FFF8E6, #FFFBEF)", borderRadius: "clamp(16px, 2vw, 20px)", border: "1px solid rgba(212,160,23,0.1)", textAlign: "center" },
  ctaSectionTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "clamp(1.2rem, 1.8vw, 1.4rem)", color: "#111", marginBottom: "clamp(4px, 0.8vw, 8px)" },
  ctaSectionText: { fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.8rem, 1vw, 0.95rem)", color: "#5F5F5F", marginBottom: "clamp(14px, 2vw, 20px)" },
  ctaSectionBtn: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(10px, 1.5vw, 14px) clamp(24px, 3vw, 36px)", background: "linear-gradient(135deg, #F7C948 0%, #D4A017 100%)", border: "none", borderRadius: "100px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", fontWeight: 600, color: "#111", cursor: "pointer", boxShadow: "0 4px 16px rgba(212,160,23,0.25)", transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)", minHeight: "48px", textDecoration: "none" },
};

// ── Helper: Navigate and scroll to top ──────────────────────────────────
function navigateToTop(navigate, route) {
  navigate(route);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Visa Card Component ─────────────────────────────────────────────────
function VisaCard({ visa, index, isMobile }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const Icon = visa.icon;
  const delay = 0.08 * (index + 1);

  const handleClick = useCallback(() => {
    navigateToTop(navigate, visa.route);
  }, [navigate, visa.route]);

  return (
    <div style={{ opacity: 1, transform: "translateY(0)", transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`, height: "100%" }}>
      <div
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        style={{ ...s.visaCard, ...(hovered ? s.visaCardHover : {}) }}
      >
        {/* Gold accent line */}
        <div style={{ ...s.accentLine, background: `linear-gradient(90deg, transparent, ${visa.color}, transparent)`, transform: hovered ? "scaleX(1)" : "scaleX(0.3)", opacity: hovered ? 1 : 0.3 }} aria-hidden="true" />

        {/* Icon */}
        <div style={s.visaIcon}><Icon size={isMobile ? 24 : 28} strokeWidth={1.8} /></div>

        {/* Title */}
        <h3 style={s.visaTitle}>{visa.title}</h3>

        {/* Description */}
        <p style={s.visaDesc}>{visa.description}</p>

        {/* Processing & Success */}
        <div style={s.infoBox}>
          <div style={{ flex: 1 }}>
            <span style={s.infoLabel}>Processing Time</span>
            <span style={s.infoValue}>{visa.processingTime}</span>
          </div>
          <div style={{ flex: 1 }}>
            <span style={s.infoLabel}>Success Rate</span>
            <span style={{ ...s.infoValue, color: visa.color }}>{visa.successRate}</span>
          </div>
        </div>

        {/* Requirements */}
        <div>
          <span style={s.reqLabel}>Key Requirements</span>
          <div style={s.reqGrid}>
            {visa.requirements.slice(0, 4).map((req, idx) => (
              <div key={idx} style={s.reqItem}><CheckCircle size={10} color="#D4A017" />{req}</div>
            ))}
          </div>
        </div>

        {/* CTA Button - Navigates to individual visa page + scrolls to top */}
        <button
          onClick={handleClick}
          style={{ ...s.ctaBtn, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
          onMouseEnter={(e) => { if (!isMobile) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,160,23,0.35)"; } }}
          onMouseLeave={(e) => { if (!isMobile) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(212,160,23,0.25)"; } }}
        >
          Learn More <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Process Step Component ──────────────────────────────────────────────
function ProcessStep({ step, index }) {
  const delay = 0.08 * (index + 1);
  return (
    <div style={{ opacity: 1, transform: "translateY(0)", transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      <div style={s.processStep}>
        <div style={s.stepNum}>{step.step}</div>
        <div>
          <h4 style={s.stepTitle}>{step.title}</h4>
          <p style={s.stepDesc}>{step.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────
export default function VisaServices() {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Navigate to contact page + scroll to top
  const handleContactClick = useCallback(() => {
    navigateToTop(navigate, "/contact");
  }, [navigate]);

  return (
    <div style={s.page} id="visa-services">
      {/* Hero Section */}
      <div style={s.heroSection}>
        <div style={s.heroBg} aria-hidden="true" />
        <div style={s.heroContent}>
          <h1 style={s.heroTitle}>Visa <span style={s.heroHighlight}>Services</span></h1>
          <p style={s.heroSubtitle}>Professional visa processing for students, professionals, tourists, and families — with high success rates and end-to-end support.</p>
        </div>
      </div>

      {/* Content */}
      <div style={s.contentSection}>
        <div style={s.sectionHeader}>
          <span style={s.eyebrow}>Global Visa Solutions</span>
          <h2 style={s.sectionTitle}>Your <em style={s.sectionItalic}>Visa Journey</em> Starts Here</h2>
          <p style={s.sectionSubtitle}>We offer comprehensive visa processing services with expert guidance and support at every stage of your application.</p>
        </div>

        {/* Visa Types Grid */}
        <div style={s.visaGrid}>
          {VISA_TYPES.map((visa, index) => (
            <VisaCard key={visa.id} visa={visa} index={index} isMobile={isMobile} />
          ))}
        </div>

        {/* Process Section */}
        <div style={s.processSection}>
          <h3 style={s.processTitle}>Our Visa Processing Steps</h3>
          <div style={s.processGrid}>
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={s.ctaSection}>
          <h3 style={s.ctaSectionTitle}>Need a Visa?</h3>
          <p style={s.ctaSectionText}>Contact us today for professional visa assistance.</p>
          <button
            onClick={handleContactClick}
            style={s.ctaSectionBtn}
            onMouseEnter={(e) => { if (!isMobile) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(212,160,23,0.35)"; } }}
            onMouseLeave={(e) => { if (!isMobile) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,160,23,0.25)"; } }}
          >
            <Phone size={16} /> Speak with an Advisor
          </button>
        </div>
      </div>
    </div>
  );
}