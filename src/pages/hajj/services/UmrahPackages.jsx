// src/pages/services/UmrahPackages.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Umrah Packages Page
// v2.1: Rating instead of price · Scroll-to-form · Full content preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Moon, Calendar, Hotel, Car, Utensils, Send, 
  Shield, Phone, Mail, User, Users, Baby, MapPin, 
  ChevronDown, ArrowDown, ChevronRight, Star, Clock
} from "lucide-react";

const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)", goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111", white: "#ffffff", gray50: "#fafafa", gray200: "#e5e5e5",
  gray400: "#a3a3a3", gray500: "#737373", gray600: "#525252", gray700: "#404040",
};

function useResponsive() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const handleResize = () => setWindowWidth(window.innerWidth); window.addEventListener("resize", handleResize); return () => window.removeEventListener("resize", handleResize); }, []);
  return { isMobile: windowWidth < 640, isTablet: windowWidth >= 640 && windowWidth < 1024, isDesktop: windowWidth >= 1024 };
}

const umrahPackages = [
  {
    name: "Quick Umrah", duration: "7 Days", hotel: "3-Star Hotel", transport: "Group Bus", meals: "Breakfast Only",
    rating: "4.3/5", reviewCount: "85+ Reviews",
    color: "#059669", description: "Perfect for a brief, focused spiritual retreat."
  },
  {
    name: "Standard Umrah", duration: "10 Days", hotel: "4-Star Hotel", transport: "Shared Car", meals: "Half Board",
    rating: "4.6/5", reviewCount: "150+ Reviews",
    color: "#2563EB", popular: true, description: "Our most balanced package for comfort and value."
  },
  {
    name: "Ramadan Umrah", duration: "15 Days", hotel: "4-Star Hotel", transport: "Private Car", meals: "Full Board + Iftar",
    rating: "4.8/5", reviewCount: "200+ Reviews",
    color: "#991B1B", description: "Experience the blessed month in the holiest cities."
  },
  {
    name: "Luxury Umrah", duration: "14 Days", hotel: "5-Star Hotel", transport: "VIP Private Car", meals: "All Inclusive",
    rating: "4.9/5", reviewCount: "120+ Reviews",
    color: "#D4A017", description: "Uncompromising comfort for the discerning pilgrim."
  }
];

const umrahPackageOptions = [
  { value: "", label: "Select..." },
  { value: "quick-umrah", label: "Quick Umrah — 7 Days" },
  { value: "standard-umrah", label: "Standard Umrah — 10 Days" },
  { value: "ramadan-umrah", label: "Ramadan Umrah — 15 Days" },
  { value: "luxury-umrah", label: "Luxury Umrah — 14 Days" }
];

const preferredMonthOptions = [
  { value: "", label: "Select..." },
  { value: "any", label: "Any Available" },
  { value: "ramadan", label: "Ramadan" },
  { value: "dhul-hijjah", label: "Dhul Hijjah" },
  { value: "rabi-al-awwal", label: "Rabi Al-Awwal" }
];

const countryCodes = [
  { value: "+234", label: "+234 Nigeria" }, { value: "+1", label: "+1 USA" },
  { value: "+44", label: "+44 UK" }, { value: "+966", label: "+966 Saudi Arabia" }, { value: "+971", label: "+971 UAE" }
];

const contactMethods = [
  { value: "email", label: "Email" }, { value: "phone", label: "Phone" }, { value: "whatsapp", label: "WhatsApp" }
];

const s = {
  page: { minHeight: "100vh", backgroundColor: "#FFF8E6", fontFamily: "'Inter', sans-serif", overflowX: "hidden" },
  heroSection: { position: "relative", paddingTop: "clamp(6rem, 10vh, 8rem)", paddingBottom: "clamp(3rem, 5vh, 5rem)", paddingLeft: "clamp(0.75rem, 2vw, 1rem)", paddingRight: "clamp(0.75rem, 2vw, 1rem)", background: "linear-gradient(to bottom right, #111111, #1a1a1a, #111111)", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,0.9), transparent)" },
  heroContent: { maxWidth: "clamp(48rem, 70vw, 56rem)", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" },
  badge: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "clamp(0.35rem, 0.6vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem)", backgroundColor: "rgba(247, 201, 72, 0.2)", color: brand.goldLight, borderRadius: "9999px", fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", fontWeight: 700, marginBottom: "clamp(0.75rem, 1.5vw, 1rem)", textTransform: "uppercase", letterSpacing: "0.18em" },
  heroTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 5vw, 3.5rem)", color: brand.white, marginBottom: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "-0.02em", lineHeight: 1.15, paddingInline: "clamp(0px, 2vw, 10px)" },
  heroGradient: { background: "linear-gradient(to right, #F7C948, #D4A017)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "clamp(0.9rem, 1.3vw, 1.125rem)", color: "#E6D5A8", maxWidth: "42rem", margin: "0 auto clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.7, fontWeight: 400, paddingInline: "clamp(0px, 2vw, 10px)" },
  heroBtn: { display: "inline-flex", alignItems: "center", gap: "0.625rem", padding: "clamp(0.75rem, 1.2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontWeight: 600, fontSize: "clamp(0.85rem, 1.1vw, 1rem)", letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(247, 201, 72, 0.3)", transition: "all 250ms ease", minHeight: "44px", fontFamily: "'Inter', sans-serif" },
  introSection: { maxWidth: "clamp(48rem, 70vw, 56rem)", margin: "clamp(-1.5rem, -2vw, -2rem) auto 0", padding: "0 clamp(0.75rem, 2vw, 1rem) clamp(2rem, 4vh, 4rem)", position: "relative", zIndex: 20 },
  introCard: { backgroundColor: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)", border: "1px solid #E6D5A8", padding: "clamp(1.25rem, 3vw, 2rem)" },
  introTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", color: brand.dark, marginBottom: "clamp(0.5rem, 1vw, 0.75rem)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  introSubtitle: { fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 600, lineHeight: 1.7, color: brand.dark, marginBottom: "clamp(1rem, 1.5vw, 1.5rem)", fontFamily: "'Inter', sans-serif" },
  introText: { fontSize: "clamp(0.85rem, 1.1vw, 1rem)", lineHeight: 1.75, color: brand.gray500, marginBottom: "clamp(0.75rem, 1.2vw, 1.5rem)", fontFamily: "'Inter', sans-serif" },
  introCompare: { fontSize: "clamp(0.85rem, 1.1vw, 1rem)", lineHeight: 1.7, color: brand.dark, fontWeight: 600, marginTop: "clamp(1rem, 1.5vw, 1.5rem)", fontFamily: "'Inter', sans-serif" },
  collapseToggle: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "clamp(8px, 1.5vw, 12px) 0", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", color: brand.goldDark, fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 600, minHeight: "44px" },
  packagesSection: { maxWidth: "clamp(60rem, 85vw, 80rem)", margin: "0 auto", padding: "0 clamp(0.75rem, 2vw, 1rem) clamp(3rem, 5vh, 5rem)", position: "relative", zIndex: 20, scrollMarginTop: "2rem" },
  sectionHeader: { textAlign: "center", marginBottom: "clamp(1.5rem, 3vw, 3rem)" },
  sectionBadge: { textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 700, fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", color: brand.goldDark, display: "block", marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)", fontFamily: "'Inter', sans-serif" },
  sectionTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, color: brand.dark, letterSpacing: "-0.02em", lineHeight: 1.2, fontSize: "clamp(1.5rem, 3vw, 2.25rem)" },
  packagesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(240px, 30vw, 280px), 1fr))", gap: "clamp(1rem, 2vw, 1.5rem)", marginBottom: "clamp(3rem, 5vh, 5rem)" },
  packageCard: { position: "relative", backgroundColor: brand.white, borderRadius: "clamp(18px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)", padding: "clamp(1rem, 2vw, 1.5rem)", border: "1px solid #E6D5A8", display: "flex", flexDirection: "column", transition: "all 300ms ease" },
  packageCardPopular: { position: "relative", backgroundColor: brand.white, borderRadius: "clamp(18px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)", padding: "clamp(1rem, 2vw, 1.5rem)", border: `2px solid ${brand.goldLight}`, display: "flex", flexDirection: "column", transition: "all 300ms ease" },
  popularBadge: { position: "absolute", top: "clamp(-0.6rem, -0.8vw, -0.75rem)", left: "50%", transform: "translateX(-50%)", backgroundColor: brand.gold, color: brand.white, padding: "clamp(0.2rem, 0.3vw, 0.25rem) clamp(0.75rem, 1.2vw, 1rem)", borderRadius: "9999px", fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)", fontWeight: 700, letterSpacing: "0.01em", fontFamily: "'Inter', sans-serif" },
  packageHeader: { display: "flex", alignItems: "center", gap: "clamp(0.35rem, 0.5vw, 0.5rem)", marginBottom: "clamp(0.75rem, 1vw, 1rem)" },
  packageName: { fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)", letterSpacing: "-0.02em" },
  packageDesc: { fontSize: "clamp(0.75rem, 1vw, 0.875rem)", lineHeight: 1.7, color: brand.gray500, marginBottom: "clamp(0.75rem, 1vw, 1rem)", fontFamily: "'Inter', sans-serif" },
  // ── REPLACED PRICE WITH RATING ──
  packageRatingRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "clamp(0.75rem, 1vw, 1rem)" },
  packageRating: { fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif", lineHeight: 1 },
  packageStars: { display: "flex", gap: "2px" },
  packageReviews: { fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)", color: brand.gray500, marginLeft: "4px", fontFamily: "'Inter', sans-serif" },
  packageFeatures: { display: "flex", flexDirection: "column", gap: "clamp(0.35rem, 0.5vw, 0.5rem)", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)", flex: 1 },
  packageFeatureItem: { display: "flex", alignItems: "center", gap: "clamp(0.35rem, 0.5vw, 0.5rem)", fontSize: "clamp(0.75rem, 1vw, 0.875rem)", color: brand.gray500, fontFamily: "'Inter', sans-serif" },
  packageBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "clamp(0.6rem, 0.9vw, 0.75rem) 0", borderRadius: "12px", color: brand.dark, fontWeight: 600, fontSize: "clamp(0.8rem, 1vw, 0.95rem)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", border: "none", cursor: "pointer", transition: "all 200ms ease", minHeight: "44px", marginTop: "auto" },
  bookingSection: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 40vw, 350px), 1fr))", gap: "clamp(1rem, 2vw, 2rem)", alignItems: "start", maxWidth: "clamp(60rem, 85vw, 80rem)", margin: "0 auto", scrollMarginTop: "2rem" },
  bannerCard: { position: "relative", borderRadius: "clamp(18px, 2vw, 24px)", overflow: "hidden", minHeight: "clamp(350px, 50vh, 500px)", display: "flex", flexDirection: "column", justifyContent: "flex-end" },
  bannerImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "clamp(18px, 2vw, 24px)" },
  bannerOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.4) 50%, rgba(17,17,17,0.2) 100%)", borderRadius: "clamp(18px, 2vw, 24px)" },
  bannerContent: { position: "relative", zIndex: 2, padding: "clamp(1rem, 2vw, 2rem)", color: brand.white },
  bannerTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "clamp(0.75rem, 1vw, 1rem)", color: brand.white },
  bannerText: { fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.7, color: "#E6D5A8", marginBottom: "clamp(1rem, 1.5vw, 1.5rem)", fontFamily: "'Inter', sans-serif" },
  bannerFeatureList: { display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 0.75vw, 0.75rem)" },
  bannerFeatureItem: { display: "flex", alignItems: "center", gap: "clamp(0.5rem, 0.75vw, 0.75rem)", fontSize: "clamp(0.75rem, 1vw, 0.875rem)", color: brand.white, fontFamily: "'Inter', sans-serif" },
  formCard: { backgroundColor: brand.white, borderRadius: "clamp(18px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)", border: "1px solid #E6D5A8", padding: "clamp(1.25rem, 3vw, 2rem)" },
  formTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.25rem, 2vw, 1.5rem)", color: brand.dark, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "clamp(0.3rem, 0.5vw, 0.5rem)" },
  formSubtitle: { fontSize: "clamp(0.8rem, 1vw, 0.95rem)", lineHeight: 1.7, color: brand.gray500, marginBottom: "clamp(1.25rem, 2vw, 2rem)", fontFamily: "'Inter', sans-serif" },
  formGroup: { marginBottom: "0" },
  label: { display: "block", fontWeight: 600, fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)", color: brand.dark, marginBottom: "clamp(0.35rem, 0.5vw, 0.5rem)", fontFamily: "'Inter', sans-serif" },
  required: { color: brand.gold },
  inputWrapper: { position: "relative" },
  inputIcon: { position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", width: "1.125rem", height: "1.125rem", color: brand.goldDark, pointerEvents: "none" },
  input: { width: "100%", padding: "clamp(0.6rem, 0.9vw, 0.75rem) clamp(0.75rem, 1vw, 1rem) clamp(0.6rem, 0.9vw, 0.75rem) clamp(2.25rem, 3vw, 2.75rem)", borderRadius: "clamp(10px, 1vw, 12px)", border: "1px solid #E6D5A8", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: brand.dark, backgroundColor: "#FFF8E6", outline: "none", boxSizing: "border-box", transition: "border-color 200ms ease", fontFamily: "'Inter', sans-serif", minHeight: "42px" },
  select: { width: "100%", padding: "clamp(0.6rem, 0.9vw, 0.75rem) clamp(1.75rem, 2.5vw, 2rem) clamp(0.6rem, 0.9vw, 0.75rem) clamp(0.75rem, 1vw, 1rem)", borderRadius: "clamp(10px, 1vw, 12px)", border: "1px solid #E6D5A8", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: brand.dark, backgroundColor: "#FFF8E6", outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box", transition: "border-color 200ms ease", fontFamily: "'Inter', sans-serif", minHeight: "42px" },
  selectIcon: { position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", width: "1rem", height: "1rem", color: brand.goldDark, pointerEvents: "none" },
  phoneRow: { display: "flex", gap: "clamp(0.35rem, 0.5vw, 0.5rem)", flexWrap: "wrap" },
  phoneCodeWrap: { position: "relative", width: "clamp(130px, 18vw, 160px)", flexShrink: 0 },
  phoneInput: { flex: "1 1 150px", padding: "clamp(0.6rem, 0.9vw, 0.75rem) clamp(0.75rem, 1vw, 1rem)", borderRadius: "clamp(10px, 1vw, 12px)", border: "1px solid #E6D5A8", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: brand.dark, backgroundColor: "#FFF8E6", outline: "none", boxSizing: "border-box", transition: "border-color 200ms ease", fontFamily: "'Inter', sans-serif", minHeight: "42px" },
  dateRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(0.75rem, 1vw, 1rem)" },
  tripleRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "clamp(0.5rem, 0.75vw, 0.75rem)" },
  textarea: { width: "100%", padding: "clamp(0.6rem, 0.9vw, 0.75rem) clamp(0.75rem, 1vw, 1rem)", borderRadius: "clamp(10px, 1vw, 12px)", border: "1px solid #E6D5A8", fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: brand.dark, backgroundColor: "#FFF8E6", outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 200ms ease", fontFamily: "'Inter', sans-serif", minHeight: "80px" },
  submitBtn: { width: "100%", padding: "clamp(0.7rem, 1vw, 0.875rem) clamp(1rem, 2vw, 1.5rem)", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontWeight: 600, fontSize: "clamp(0.85rem, 1vw, 0.95rem)", letterSpacing: "0.01em", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 200ms ease", boxShadow: "0 2px 4px rgba(0,0,0,0.06)", fontFamily: "'Inter', sans-serif", minHeight: "48px" },
  termsText: { fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)", lineHeight: 1.6, color: brand.gray500, textAlign: "center", marginTop: "clamp(0.35rem, 0.5vw, 0.5rem)", fontFamily: "'Inter', sans-serif" },
};

function CollapsibleText({ text, isMobile }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200;
  const shouldTruncate = isMobile && text && text.length > maxLength;
  const displayText = shouldTruncate && !expanded ? text.slice(0, maxLength) + "..." : text;
  if (!shouldTruncate) return <p style={s.introText}>{text}</p>;
  return (
    <div>
      <AnimatePresence mode="wait"><motion.p key={expanded ? "e" : "c"} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={s.introText}>{displayText}</motion.p></AnimatePresence>
      <button onClick={() => setExpanded(!expanded)} style={s.collapseToggle} aria-label={expanded ? "Show less" : "Read more"} aria-expanded={expanded}><span>{expanded ? "Show Less" : "Read More"}</span><motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={16} /></motion.span></button>
    </div>
  );
}

export default function UmrahPackages() {
  const { isMobile } = useResponsive();

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 60 : 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [isMobile]);

  const scrollToForm = useCallback(() => scrollToSection("booking-form-section"), [scrollToSection]);

  const handleFocus = (e) => { e.currentTarget.style.borderColor = brand.goldLight; };
  const handleBlur = (e) => { e.currentTarget.style.borderColor = "#E6D5A8"; };

  const renderStars = (count) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={isMobile ? 12 : 14} color={i < Math.floor(count) ? brand.gold : brand.gray200} fill={i < Math.floor(count) ? brand.gold : "none"} />
  ));

  return (
    <div style={s.page}>
      {/* HERO */}
      <section style={s.heroSection}>
        <div style={s.heroBg}>
          <img src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1920&h=800&fit=crop" alt="Umrah" style={s.heroImg} />
          <div style={s.heroOverlay} />
        </div>
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={s.badge}><Sparkles style={{ width: "clamp(0.85rem, 1vw, 1rem)", height: "clamp(0.85rem, 1vw, 1rem)", display: "inline", marginRight: "0.5rem" }} />Blessed Journey</span>
            <h1 style={s.heroTitle}>Umrah Packages <span style={s.heroGradient}>2026-27</span></h1>
            <p style={s.heroSubtitle}>Perform Umrah with peace of mind. Choose from our flexible packages available throughout the year, including special Ramadan packages.</p>
            <motion.button onClick={() => scrollToSection("packages-section")} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} style={s.heroBtn}
              whileHover={{ backgroundColor: "#FFE082", boxShadow: "0 6px 20px rgba(247, 201, 72, 0.45)", transform: "translateY(-2px)" }} whileTap={{ transform: "translateY(0)" }}>
              View Packages<ArrowDown style={{ width: "1.125rem", height: "1.125rem" }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section style={s.introSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} style={s.introCard}>
          <h2 style={s.introTitle}>UMRAH Packages:</h2>
          <p style={s.introSubtitle}>Affordable Umrah Packages for Every Season</p>
          <CollapsibleText text="Whether you wish to perform Umrah monthly, quarterly, or annually, RASOAF Travels and Tours Limited has a special package designed to meet your needs. We proudly offer flexible, affordable, and well-organized Umrah packages for both first-time pilgrims and experienced travellers." isMobile={isMobile} />
          <CollapsibleText text="Our commitment is to make your journey comfortable, stress-free, and spiritually rewarding. From visa processing and flight reservations to accommodation and travel guidance, we provide comprehensive support throughout your pilgrimage." isMobile={isMobile} />
          <CollapsibleText text="At RASOAF Travels and Tours Limited, we believe that quality service should be affordable. That is why our loyal clients enjoy competitive pricing and exclusive discounts that make Umrah more accessible without compromising on service quality." isMobile={isMobile} />
          <CollapsibleText text="We encourage you to compare our services, pricing, and customer support with those of other travel agencies in Nigeria and beyond. We are confident that our professionalism, transparency, personalized attention, and value for money set us apart." isMobile={isMobile} />
          <p style={s.introCompare}>Come. Compare. Experience the Difference.</p>
        </motion.div>
      </section>

      {/* PACKAGES GRID */}
      <section id="packages-section" style={s.packagesSection}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={s.sectionHeader}>
          <span style={s.sectionBadge}>Choose Your Journey</span>
          <h2 style={s.sectionTitle}>Tailored Umrah Packages</h2>
        </motion.div>

        <div style={s.packagesGrid}>
          {umrahPackages.map((pkg, idx) => {
            const ratingNum = parseFloat(pkg.rating);
            return (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + idx * 0.1 }}
                style={pkg.popular ? s.packageCardPopular : s.packageCard}
                whileHover={!isMobile ? { boxShadow: "0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.03)", transform: "translateY(-4px)" } : {}}>
                {pkg.popular && <div style={s.popularBadge}>Most Popular</div>}
                <div style={s.packageHeader}>
                  <Moon style={{ width: "clamp(1rem, 1.5vw, 1.25rem)", height: "clamp(1rem, 1.5vw, 1.25rem)", color: brand.gold }} />
                  <h3 style={s.packageName}>{pkg.name}</h3>
                </div>
                <p style={s.packageDesc}>{pkg.description}</p>
                {/* ── RATING ROW ── */}
                <div style={s.packageRatingRow}>
                  <span style={s.packageRating}>{pkg.rating}</span>
                  <div style={s.packageStars}>{renderStars(ratingNum)}</div>
                  <span style={s.packageReviews}>{pkg.reviewCount}</span>
                </div>
                <div style={s.packageFeatures}>
                  <div style={s.packageFeatureItem}><Calendar style={{ width: "clamp(0.85rem, 1vw, 1rem)", height: "clamp(0.85rem, 1vw, 1rem)", color: brand.gold }} />{pkg.duration}</div>
                  <div style={s.packageFeatureItem}><Hotel style={{ width: "clamp(0.85rem, 1vw, 1rem)", height: "clamp(0.85rem, 1vw, 1rem)", color: brand.gold }} />{pkg.hotel}</div>
                  <div style={s.packageFeatureItem}><Car style={{ width: "clamp(0.85rem, 1vw, 1rem)", height: "clamp(0.85rem, 1vw, 1rem)", color: brand.gold }} />{pkg.transport}</div>
                  <div style={s.packageFeatureItem}><Utensils style={{ width: "clamp(0.85rem, 1vw, 1rem)", height: "clamp(0.85rem, 1vw, 1rem)", color: brand.gold }} />{pkg.meals}</div>
                </div>
                <button type="button" onClick={scrollToForm} style={{ ...s.packageBtn, backgroundColor: pkg.color, color: brand.white }}
                  onMouseEnter={!isMobile ? (e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; } : undefined}
                  onMouseLeave={!isMobile ? (e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; } : undefined}>
                  Book Now <ArrowDown size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* BOOKING FORM + BANNER */}
        <div id="booking-form-section" style={s.bookingSection}>
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={s.bannerCard}>
            <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=1000&fit=crop" alt="Book Your Umrah Package" style={s.bannerImg} />
            <div style={s.bannerOverlay} />
            <div style={s.bannerContent}>
              <h3 style={s.bannerTitle}>Book Umrah Package</h3>
              <p style={s.bannerText}>Fill the form below to get started</p>
              <div style={s.bannerFeatureList}>
                <div style={s.bannerFeatureItem}><Shield style={{ width: "1.25rem", height: "1.25rem", color: brand.goldLight }} /><span>Secure & Encrypted Booking</span></div>
                <div style={s.bannerFeatureItem}><Phone style={{ width: "1.25rem", height: "1.25rem", color: brand.goldLight }} /><span>24/7 Customer Support</span></div>
                <div style={s.bannerFeatureItem}><MapPin style={{ width: "1.25rem", height: "1.25rem", color: brand.goldLight }} /><span>Trusted by Thousands of Pilgrims</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={s.formCard}>
            <h3 style={s.formTitle}>Book Umrah Package</h3>
            <p style={s.formSubtitle}>Fill the form below to get started</p>
            <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style={{ display: "flex", flexDirection: "column", gap: "clamp(0.75rem, 1.2vw, 1.25rem)" }}>
              <div style={s.formGroup}><label htmlFor="first-name" style={s.label}>First Name <span style={s.required}>*</span></label><div style={s.inputWrapper}><User style={s.inputIcon} /><input id="first-name" type="text" name="firstName" placeholder="Saheed" required style={s.input} onFocus={handleFocus} onBlur={handleBlur} /></div></div>
              <div style={s.formGroup}><label htmlFor="last-name" style={s.label}>Last Name <span style={s.required}>*</span></label><div style={s.inputWrapper}><User style={s.inputIcon} /><input id="last-name" type="text" name="lastName" placeholder="Mohammed" required style={s.input} onFocus={handleFocus} onBlur={handleBlur} /></div></div>
              <div style={s.formGroup}><label htmlFor="email" style={s.label}>Email Address <span style={s.required}>*</span></label><div style={s.inputWrapper}><Mail style={s.inputIcon} /><input id="email" type="email" name="email" placeholder="Mohammed@example.com" required style={s.input} onFocus={handleFocus} onBlur={handleBlur} /></div></div>
              <div style={s.formGroup}><label htmlFor="phone" style={s.label}>Phone Number</label><div style={s.phoneRow}><div style={s.phoneCodeWrap}><select name="countryCode" defaultValue="+234" style={{ ...s.select, paddingLeft: "0.75rem" }} onFocus={handleFocus} onBlur={handleBlur}>{countryCodes.map((code) => (<option key={code.value} value={code.value}>{code.label}</option>))}</select><ChevronDown style={{ ...s.selectIcon, right: "0.5rem" }} /></div><input id="phone" type="tel" name="phone" placeholder="800 123 4567" style={s.phoneInput} onFocus={handleFocus} onBlur={handleBlur} /></div></div>
              <div style={s.dateRow}><div style={s.formGroup}><label htmlFor="departure" style={s.label}>Preferred Departure <span style={s.required}>*</span></label><input id="departure" type="date" name="preferredDeparture" required style={{ ...s.input, paddingLeft: "0.75rem" }} onFocus={handleFocus} onBlur={handleBlur} /></div><div style={s.formGroup}><label htmlFor="return-date" style={s.label}>Return Date</label><input id="return-date" type="date" name="returnDate" style={{ ...s.input, paddingLeft: "0.75rem" }} onFocus={handleFocus} onBlur={handleBlur} /></div></div>
              <div style={s.formGroup}><label htmlFor="preferred-contact" style={s.label}>Preferred Contact <span style={s.required}>*</span></label><div style={s.inputWrapper}><select id="preferred-contact" name="preferredContact" required defaultValue="email" style={s.select} onFocus={handleFocus} onBlur={handleBlur}>{contactMethods.map((method) => (<option key={method.value} value={method.value}>{method.label}</option>))}</select><ChevronDown style={s.selectIcon} /></div></div>
              <div style={s.tripleRow}><div style={s.formGroup}><label htmlFor="adults" style={s.label}>Adults <span style={s.required}>*</span></label><div style={s.inputWrapper}><Users style={s.inputIcon} /><input id="adults" type="number" name="adults" min="1" defaultValue="1" required style={s.input} onFocus={handleFocus} onBlur={handleBlur} /></div></div><div style={s.formGroup}><label htmlFor="children" style={s.label}>Children (2-11)</label><div style={s.inputWrapper}><Baby style={s.inputIcon} /><input id="children" type="number" name="children" min="0" defaultValue="0" style={s.input} onFocus={handleFocus} onBlur={handleBlur} /></div></div><div style={s.formGroup}><label htmlFor="infants" style={s.label}>Infants (0-2)</label><div style={s.inputWrapper}><Baby style={s.inputIcon} /><input id="infants" type="number" name="infants" min="0" defaultValue="0" style={s.input} onFocus={handleFocus} onBlur={handleBlur} /></div></div></div>
              <div style={s.formGroup}><label htmlFor="umrah-package" style={s.label}>Umrah Package <span style={s.required}>*</span></label><div style={s.inputWrapper}><select id="umrah-package" name="umrahPackage" required defaultValue="" style={s.select} onFocus={handleFocus} onBlur={handleBlur}>{umrahPackageOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}</select><ChevronDown style={s.selectIcon} /></div></div>
              <div style={s.formGroup}><label htmlFor="preferred-month" style={s.label}>Preferred Month</label><div style={s.inputWrapper}><select id="preferred-month" name="preferredMonth" defaultValue="" style={s.select} onFocus={handleFocus} onBlur={handleBlur}>{preferredMonthOptions.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}</select><ChevronDown style={s.selectIcon} /></div></div>
              <div style={s.formGroup}><label htmlFor="message" style={s.label}>Additional Message</label><textarea id="message" name="additionalMessage" placeholder="Any special requests or requirements..." rows={3} style={s.textarea} onFocus={handleFocus} onBlur={handleBlur} /></div>
              <motion.button type="submit" style={s.submitBtn} whileHover={{ backgroundColor: "#FFE082", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} whileTap={{ backgroundColor: brand.goldLight }}><Send style={{ width: "1.125rem", height: "1.125rem" }} />Submit Enquiry</motion.button>
              <p style={s.termsText}>By submitting, you agree to our privacy policy and terms of service. We'll never share your information.</p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}