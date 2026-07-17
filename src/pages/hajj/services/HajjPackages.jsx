// src/pages/services/HajjPackages.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Hajj Packages Page
// v2.2: Fixed packages grid visibility · 100% Responsive · All content preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Shield, Users, Hotel, Bus, Utensils, 
  CheckCircle, Clock, MapPin, Send, Loader2, 
  Sparkles, Plane, ChevronRight, Landmark, Sun,
  AlertCircle, Heart, Compass, Church, Hand, ArrowDown,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";

// Rasoaf Brand Colors
const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)", goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111", white: "#ffffff", gray50: "#fafafa", gray100: "#f5f5f5",
  gray200: "#e5e5e5", gray400: "#a3a3a3", gray500: "#737373", gray600: "#525252",
  gray700: "#404040", greenBg: "rgba(34, 197, 94, 0.1)", green: "#22c55e",
  red: "#ef4444", redBg: "rgba(239, 68, 68, 0.1)",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-hajj-form-id-here";

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" }, { code: "+1", country: "USA" },
  { code: "+44", country: "UK" }, { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" }, { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" }, { code: "+27", country: "South Africa" },
];

const packages = [
  {
    name: "Economy Hajj", price: "₦3,500,000", duration: "30 Days",
    description: "Comfortable Hajj experience with essential services and 3-star accommodations.",
    features: ["3-Star Hotels in Makkah & Madinah", "Shared Room (4-6 persons)", "Group Transportation", "Basic Meal Plan", "Visa Processing", "Group Guide"],
    color: "#059669", bgLight: "rgba(5, 150, 105, 0.08)",
  },
  {
    name: "Premium Hajj", price: "₦5,800,000", duration: "35 Days",
    description: "Enhanced Hajj package with 4-star hotels and personalized services.",
    features: ["4-Star Hotels near Haram", "Triple Sharing Room", "Private Bus Transport", "Full Board Meals", "Premium Visa Service", "Dedicated Guide", "Zamzam Water (5L)", "Welcome Kit"],
    color: "#D4A017", bgLight: "rgba(212, 160, 23, 0.08)", popular: true,
  },
  {
    name: "VIP Hajj", price: "₦9,500,000", duration: "25-40 Days",
    description: "Ultimate Hajj experience with 5-star luxury and exclusive services.",
    features: ["5-Star Luxury Hotels", "Double Sharing Room", "Private Car Service", "Gourmet Dining", "Express Visa Processing", "Personal Guide", "Zamzam Water (10L)", "Luxury Welcome Kit", "Private Tent in Mina", "Fast-Track Services"],
    color: "#991B1B", bgLight: "rgba(153, 27, 27, 0.08)",
  },
];

const hajjFields = [
  { name: "packageType", label: "Preferred Package", type: "select", required: true,
    options: [{ value: "economy", label: "Economy Hajj - ₦3.5M" }, { value: "premium", label: "Premium Hajj - ₦5.8M" }, { value: "vip", label: "VIP Hajj - ₦9.5M" }]
  },
  { name: "nationality", label: "Nationality", type: "text", required: true, placeholder: "e.g., Nigerian" },
];

const whyChooseUs = [
  { icon: Shield, title: "Licensed Operator", desc: "NAHCON approved & certified" },
  { icon: Users, title: "Expert Guides", desc: "Experienced scholars & guides" },
  { icon: Hotel, title: "Prime Locations", desc: "Hotels near the Holy Mosques" },
  { icon: Bus, title: "Seamless Transport", desc: "Air-conditioned luxury buses" },
];

const journeySteps = [
  { icon: Send, title: "Registration & Visa", desc: "We handle your registration and visa processing accurately and efficiently from start to finish." },
  { icon: Plane, title: "Flight Arrangements", desc: "Comfortable flights from major Nigerian cities to the Kingdom of Saudi Arabia." },
  { icon: Hotel, title: "Accommodation", desc: "Quality hotels in Makkah and Madinah, carefully selected for your comfort." },
  { icon: Compass, title: "Safe Arrival & Transport", desc: "Seamless airport transfers and transportation throughout your pilgrimage." },
  { icon: Heart, title: "Spiritual Guidance", desc: "Experienced guides to support you through every ritual of Hajj." },
  { icon: Shield, title: "24/7 Support", desc: "Round-the-clock assistance throughout your journey for complete peace of mind." },
];

function useResponsive() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, #fffbeb 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif", overflowX: "hidden" },
  heroSection: { position: "relative", paddingTop: "clamp(100px, 12vh, 120px)", paddingBottom: "clamp(60px, 8vh, 100px)", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)", overflow: "hidden", background: `linear-gradient(135deg, ${brand.dark} 0%, #1a1a1a 40%, #2d1a0a 100%)`, display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(20px, 3vh, 40px)" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(60px, 8vh, 120px)", background: "linear-gradient(to top, #fffbeb, transparent)" },
  heroContent: { maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center", width: "100%" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 20px)", background: "rgba(212, 160, 23, 0.12)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "clamp(16px, 2vw, 24px)" },
  badgeText: { color: brand.goldLight, fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 600, letterSpacing: "0.05em" },
  heroTitle: { fontSize: "clamp(26px, 6vw, 58px)", fontWeight: 800, color: brand.white, marginBottom: "clamp(12px, 2vw, 20px)", fontFamily: "'Manrope', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em", paddingInline: "clamp(0px, 2vw, 20px)" },
  heroGradient: { background: `linear-gradient(to right, ${brand.goldLight}, #f59e0b, ${brand.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255, 255, 255, 0.7)", maxWidth: "650px", margin: "0 auto 0", lineHeight: 1.7, fontWeight: 400, paddingInline: "clamp(0px, 2vw, 10px)" },
  scrollBtnContainer: { position: "relative", zIndex: 10 },
  scrollBtn: { display: "inline-flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)", padding: "clamp(10px, 1.5vw, 14px) clamp(20px, 3vw, 32px)", borderRadius: "50px", border: "none", fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 600, color: brand.white, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold} 50%, ${brand.goldDark})`, boxShadow: `0 4px 20px rgba(212,160,23,0.35), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden", minHeight: "44px" },
  scrollBtnIcon: { display: "inline-flex", animation: "bounceDown 2s ease-in-out infinite" },
  contentSection: { maxWidth: "1200px", margin: "-30px auto 0", padding: "0 clamp(12px, 3vw, 20px) clamp(40px, 6vh, 80px)", position: "relative", zIndex: 20, width: "100%", boxSizing: "border-box" },
  introSection: { marginBottom: "clamp(40px, 6vh, 80px)" },
  introCard: { background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", padding: "clamp(20px, 3vw, 56px) clamp(16px, 3vw, 48px)", boxShadow: "0 8px 40px rgba(0,0,0,0.06)", border: `1px solid ${brand.gray200}`, position: "relative" },
  introLabel: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(4px, 0.8vw, 6px) clamp(10px, 1.5vw, 16px)", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, marginBottom: "clamp(12px, 2vw, 20px)", letterSpacing: "0.02em" },
  introTitle: { fontSize: "clamp(20px, 4vw, 36px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(8px, 1.5vw, 12px)", lineHeight: 1.3 },
  introSubtitle: { fontSize: "clamp(13px, 1.2vw, 16px)", color: brand.gray500, marginBottom: "clamp(16px, 2.5vw, 28px)", lineHeight: 1.6, maxWidth: "700px" },
  introText: { fontSize: "clamp(13px, 1.1vw, 15px)", color: brand.gray600, lineHeight: 1.8, marginBottom: "clamp(10px, 1.5vw, 18px)" },
  introHighlight: { background: brand.goldBg, borderLeft: `3px solid ${brand.gold}`, borderRadius: "0 12px 12px 0", padding: "clamp(14px, 2vw, 20px) clamp(16px, 2vw, 24px)", marginTop: "clamp(16px, 2.5vw, 28px)" },
  introHighlightText: { fontSize: "clamp(13px, 1.1vw, 15px)", color: brand.gray700, fontWeight: 500, lineHeight: 1.7, fontStyle: "italic" },
  collapseToggle: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "clamp(8px, 1.5vw, 12px) 0", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", color: brand.goldDark, fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 600, minHeight: "44px" },
  journeySection: { marginBottom: "clamp(40px, 6vh, 80px)" },
  journeyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(240px, 40vw, 280px), 1fr))", gap: "clamp(10px, 1.5vw, 20px)" },
  journeyCard: { background: brand.white, borderRadius: "clamp(14px, 1.5vw, 18px)", padding: "clamp(18px, 2.5vw, 28px) clamp(16px, 2vw, 24px)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: `1px solid ${brand.gray200}`, transition: "all 0.3s ease", display: "flex", gap: "clamp(10px, 1.5vw, 16px)", alignItems: "flex-start" },
  journeyIconWrap: { width: "clamp(38px, 5vw, 48px)", height: "clamp(38px, 5vw, 48px)", borderRadius: "clamp(10px, 1.5vw, 14px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  journeyContent: { flex: 1 },
  journeyTitle: { fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(2px, 0.4vw, 4px)" },
  journeyDesc: { fontSize: "clamp(11px, 1vw, 13px)", color: brand.gray500, lineHeight: 1.6 },

  // ── FIXED PACKAGES GRID ──────────────────────────────────────────────────
  // Uses smaller min width so 3 cards fit on tablet, and stacks on mobile
  packagesGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(240px, 30vw, 320px), 1fr))", 
    gap: "clamp(16px, 2vw, 24px)", 
    marginBottom: "clamp(40px, 6vh, 80px)",
    alignItems: "stretch",
  },
  packageCard: { background: brand.white, borderRadius: "clamp(18px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", border: `1px solid ${brand.gray200}`, transition: "all 0.4s ease", position: "relative", display: "flex", flexDirection: "column", height: "100%" },
  packageCardPopular: { background: brand.white, borderRadius: "clamp(18px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 12px 40px rgba(212,160,23,0.15)", border: `2px solid ${brand.gold}`, transition: "all 0.4s ease", position: "relative", display: "flex", flexDirection: "column", height: "100%" },
  popularBadge: { position: "absolute", top: "clamp(10px, 1.5vw, 16px)", right: "clamp(10px, 1.5vw, 16px)", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold})`, color: brand.dark, padding: "clamp(4px, 0.6vw, 6px) clamp(10px, 1.2vw, 14px)", borderRadius: "50px", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, letterSpacing: "0.02em", zIndex: 2, boxShadow: `0 2px 8px rgba(212,160,23,0.3)` },
  packageContent: { padding: "clamp(20px, 3vw, 32px) clamp(18px, 2.5vw, 28px)", display: "flex", flexDirection: "column", flex: 1 },
  packageName: { fontSize: "clamp(20px, 2vw, 24px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.8vw, 8px)" },
  packageDesc: { fontSize: "clamp(12px, 1.1vw, 14px)", color: brand.gray500, lineHeight: 1.6, marginBottom: "clamp(12px, 2vw, 20px)" },
  packagePriceRow: { display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "clamp(12px, 2vw, 20px)" },
  packagePrice: { fontSize: "clamp(28px, 3vw, 38px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1 },
  packagePerPerson: { fontSize: "clamp(11px, 1vw, 14px)", color: brand.gray500 },
  packageDuration: { display: "flex", alignItems: "center", gap: "8px", fontSize: "clamp(12px, 1.1vw, 14px)", color: brand.gray600, marginBottom: "clamp(12px, 2vw, 20px)", paddingBottom: "clamp(12px, 2vw, 20px)", borderBottom: `1px solid ${brand.gray200}` },
  featuresList: { display: "flex", flexDirection: "column", gap: "clamp(6px, 0.8vw, 10px)", marginBottom: "clamp(16px, 2vw, 24px)", flex: 1 },
  featureItem: { display: "flex", alignItems: "flex-start", gap: "clamp(6px, 0.8vw, 10px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.gray600, lineHeight: 1.5 },
  featureCheck: { color: brand.green, flexShrink: 0, marginTop: "1px" },
  selectBtn: { display: "block", width: "100%", padding: "clamp(10px, 1.2vw, 14px)", borderRadius: "12px", border: "none", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, color: brand.white, cursor: "pointer", textAlign: "center", textDecoration: "none", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", minHeight: "44px", marginTop: "auto" },

  sectionHeader: { textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)" },
  sectionBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.8vw, 6px) clamp(10px, 1.5vw, 16px)", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, marginBottom: "clamp(10px, 1.5vw, 16px)", letterSpacing: "0.02em" },
  sectionTitle: { fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 12px)" },
  sectionSubtitle: { fontSize: "clamp(13px, 1.2vw, 16px)", color: brand.gray500, maxWidth: "600px", margin: "0 auto", lineHeight: 1.6, paddingInline: "clamp(0px, 2vw, 10px)" },
  whyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 25vw, 220px), 1fr))", gap: "clamp(10px, 1.5vw, 16px)", marginBottom: "clamp(40px, 6vh, 80px)" },
  whyCard: { background: brand.white, borderRadius: "clamp(14px, 1.5vw, 18px)", padding: "clamp(18px, 2.5vw, 28px) clamp(16px, 2vw, 24px)", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", border: `1px solid ${brand.gray200}`, textAlign: "center", transition: "all 0.3s ease" },
  whyIcon: { width: "clamp(40px, 5vw, 52px)", height: "clamp(40px, 5vw, 52px)", borderRadius: "clamp(10px, 1.5vw, 14px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(10px, 1.5vw, 16px)" },
  whyTitle: { fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.5vw, 6px)" },
  whyDesc: { fontSize: "clamp(11px, 1vw, 13px)", color: brand.gray500, lineHeight: 1.5 },
  formSection: { maxWidth: "100%", margin: "0 auto" },
  formHeader: { textAlign: "center", marginBottom: "clamp(20px, 3vw, 36px)" },
  backLinkSection: { textAlign: "center", paddingBottom: "clamp(30px, 5vh, 60px)" },
  backLink: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray400, fontWeight: 500, fontSize: "clamp(13px, 1.1vw, 15px)", textDecoration: "none", transition: "color 0.2s ease", minHeight: "44px", padding: "8px 0" },
  formWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.gray200}`, minHeight: "clamp(500px, 60vh, 650px)" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #0d1a0d 0%, #1a0a05 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 36px)", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,26,13,0.9) 0%, rgba(26,10,5,0.75) 40%, rgba(212,160,23,0.3) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.6vw, 6px) clamp(10px, 1.2vw, 14px)", background: "rgba(212, 160, 23, 0.18)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "clamp(12px, 2vw, 20px)", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "clamp(48px, 6vw, 72px)", height: "clamp(48px, 6vw, 72px)", borderRadius: "clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.15)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(12px, 2vw, 20px)" },
  formImageTitle: { fontSize: "clamp(18px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 10px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "clamp(11px, 1.1vw, 14px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto clamp(16px, 2.5vw, 28px)", maxWidth: "300px" },
  formDivider: { width: "clamp(40px, 5vw, 60px)", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto clamp(16px, 2vw, 24px)", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "clamp(6px, 0.8vw, 10px)", fontSize: "clamp(10px, 1vw, 13px)", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 },
  formImageFeatIcon: { width: "clamp(20px, 2vw, 24px)", height: "clamp(20px, 2vw, 24px)", borderRadius: "clamp(4px, 0.5vw, 6px)", background: "rgba(212,160,23,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formSide: { flex: 1, padding: "clamp(18px, 2.5vw, 36px) clamp(14px, 2vw, 32px)", overflowY: "auto", maxHeight: "clamp(400px, 60vh, 700px)" },
  formRow: { display: "flex", gap: "clamp(8px, 1.2vw, 14px)", marginBottom: "clamp(8px, 1.2vw, 15px)", flexWrap: "wrap" },
  formRowTriple: { display: "flex", gap: "clamp(6px, 0.8vw, 10px)", marginBottom: "clamp(8px, 1.2vw, 15px)", flexWrap: "wrap" },
  formGroup: { flex: "1 1 140px", display: "flex", flexDirection: "column", minWidth: "0" },
  formGroupThird: { flex: "1 1 0", minWidth: "clamp(60px, 10vw, 80px)", display: "flex", flexDirection: "column" },
  label: { fontSize: "clamp(11px, 0.9vw, 12.5px)", fontWeight: 600, color: brand.gray700, marginBottom: "clamp(3px, 0.4vw, 5px)", letterSpacing: "0.01em" },
  required: { color: brand.goldDark },
  input: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.gray200}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.white, outline: "none", transition: "all 0.2s ease", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", minHeight: "42px" },
  select: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(28px, 3vw, 34px) clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.gray200}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.white, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", minHeight: "42px" },
  phoneRow: { display: "flex", gap: "clamp(4px, 0.6vw, 8px)", flexWrap: "wrap" },
  phoneCode: { width: "clamp(110px, 18vw, 140px)", padding: "clamp(8px, 1vw, 10px) clamp(22px, 2.5vw, 28px) clamp(8px, 1vw, 10px) clamp(6px, 0.8vw, 8px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.gray200}`, fontSize: "clamp(11px, 0.9vw, 13px)", color: brand.dark, background: brand.white, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", flexShrink: 0, appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", minHeight: "42px" },
  phoneInput: { flex: "1 1 120px", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.gray200}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.white, outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", minHeight: "42px" },
  textarea: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.gray200}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.white, outline: "none", resize: "vertical", fontFamily: "'Inter', sans-serif", minHeight: "80px", boxSizing: "border-box" },
  submitBtn: { width: "100%", padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 2vw, 20px)", borderRadius: "clamp(10px, 1vw, 12px)", border: "none", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, color: brand.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", marginTop: "clamp(12px, 1.5vw, 18px)", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold} 50%, ${brand.goldDark})`, boxShadow: `0 4px 16px rgba(212,160,23,0.3), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden", minHeight: "48px" },
  btnShine: { position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shine 3s ease-in-out infinite", pointerEvents: "none" },
  terms: { textAlign: "center", fontSize: "clamp(10px, 0.8vw, 11px)", color: brand.gray400, marginTop: "clamp(8px, 1vw, 14px)", lineHeight: 1.5 },
  focusInput: { borderColor: brand.gold, boxShadow: `0 0 0 3px ${brand.goldBg}` },
  errorInput: { borderColor: brand.red, boxShadow: `0 0 0 3px ${brand.redBg}` },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", marginBottom: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(12px, 1.5vw, 18px)", borderBottom: `1px solid ${brand.gray200}` },
  formHeaderIcon: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "clamp(8px, 1vw, 12px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  formHeaderSub: { fontSize: "clamp(10px, 0.9vw, 12px)", color: brand.gray500, marginTop: "2px" },
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "clamp(8px, 0.8vw, 10px)", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 14px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.red, marginBottom: "clamp(10px, 1.5vw, 16px)", display: "flex", alignItems: "center", gap: "8px" },
  successWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.gray200}`, minHeight: "clamp(400px, 50vh, 500px)" },
  successImgSide: { width: "42%", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0d1a0d 0%, #0a2e0a 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  successContent: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 40px)", textAlign: "center" },
  successIcon: { width: "clamp(52px, 6vw, 72px)", height: "clamp(52px, 6vw, 72px)", borderRadius: "50%", background: brand.greenBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(12px, 2vw, 20px)" },
  successTitle: { fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.8vw, 8px)" },
  successMsg: { fontSize: "clamp(12px, 1.2vw, 15px)", color: brand.gray500, lineHeight: 1.7, marginBottom: "clamp(16px, 2vw, 24px)", maxWidth: "400px" },
  successDetails: { background: brand.gray50, borderRadius: "clamp(10px, 1vw, 12px)", padding: "clamp(12px, 1.5vw, 16px) clamp(14px, 2vw, 20px)", marginBottom: "clamp(12px, 1.5vw, 20px)", display: "flex", flexDirection: "column", gap: "clamp(4px, 0.6vw, 8px)", width: "100%", maxWidth: "340px" },
  successDetail: { display: "flex", alignItems: "center", gap: "clamp(4px, 0.6vw, 8px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.gray600 },
  successBtn: { padding: "clamp(8px, 1vw, 11px) clamp(16px, 2.5vw, 28px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.gray200}`, background: brand.white, fontSize: "clamp(12px, 1.1vw, 14px)", fontWeight: 600, color: brand.gray600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.25s ease", minHeight: "44px" },
};

const keyframes = `
@keyframes shine { 0% { left: -100%; } 50% { left: 120%; } 100% { left: 120%; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes bounceDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
@media (max-width: 860px) {
  .form-flex-container { flex-direction: column !important; }
  .form-image-side { width: 100% !important; min-height: clamp(160px, 25vh, 220px) !important; padding: clamp(16px, 3vw, 28px) clamp(12px, 2vw, 20px) !important; }
  .form-form-side { padding: clamp(16px, 2.5vw, 24px) clamp(12px, 2vw, 18px) !important; max-height: none !important; }
}
@media (max-width: 480px) {
  .form-image-side { min-height: clamp(120px, 20vh, 180px) !important; padding: clamp(12px, 2.5vw, 20px) clamp(10px, 2vw, 16px) !important; }
  .form-form-side { padding: clamp(12px, 2vw, 20px) clamp(10px, 2vw, 14px) !important; }
}
`;

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

function HajjBookingForm({ additionalFields = [] }) {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "", travelDate: "", returnDate: "", adults: "1", children: "0", infants: "0", message: "", preferredContact: "email", ...additionalFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}) });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [focused, setFocused] = useState(null);
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setFormError(null);
    try {
      const fp = `${formData.phoneCode} ${formData.phone}`;
      const sd = { _subject: `New Hajj Package - ${formData.firstName} ${formData.lastName}`, "First Name": formData.firstName, "Last Name": formData.lastName, "Email": formData.email, "Phone": fp, "Phone Code": formData.phoneCode, "Travel Date": formData.travelDate, "Return Date": formData.returnDate || "N/S", "Preferred Contact": formData.preferredContact, "Adults": formData.adults, "Children (2-11)": formData.children, "Infants (0-2)": formData.infants, "Service": "Hajj Package", "Message": formData.message || "N/A", "Submitted At": new Date().toLocaleString(), "Page": window.location.href };
      additionalFields.forEach(f => { const v = formData[f.name]; if (v) sd[f.label] = f.type === "select" ? f.options.find(o => o.value === v)?.label || v : v; });
      const r = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(sd) });
      if (!r.ok) { const ed = await r.json().catch(() => ({})); throw new Error(ed.error || "Failed to submit."); }
      setLoading(false); setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "", travelDate: "", returnDate: "", adults: "1", children: "0", infants: "0", message: "", preferredContact: "email", ...additionalFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}) }); }, 6000);
    } catch (err) { setLoading(false); setFormError(err.message || "Something went wrong."); setTimeout(() => setFormError(null), 8000); }
  };

  const inp = (n) => ({ ...s.input, ...(focused === n ? s.focusInput : {}), ...(formError && !formData[n] ? s.errorInput : {}) });
  const phn = (n) => ({ ...s.phoneInput, ...(focused === n ? s.focusInput : {}) });
  const txa = (n) => ({ ...s.textarea, ...(focused === n ? s.focusInput : {}) });

  if (submitted) return (
    <div style={s.successWrapper} className="form-flex-container">
      <div style={s.successImgSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=900&fit=crop" alt="" style={{ ...s.formImageBg, opacity: 0.35 }} /><div style={s.formImageOverlay} /><div style={{ position: "relative", zIndex: 2, textAlign: "center" }}><CheckCircle size={48} color={brand.green} style={{ marginBottom: "16px" }} /><h3 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope',sans-serif" }}>Enquiry Sent!</h3></div></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}><div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div><h3 style={s.successTitle}>Enquiry Submitted!</h3><p style={s.successMsg}>Thank you! Our Hajj specialist will contact you within <strong>24 hours</strong>.</p><div style={s.successDetails}><div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24h</span></div><div style={s.successDetail}><Users size={14} color={brand.gold} /><span>Consultant assigned</span></div><div style={s.successDetail}><Shield size={14} color={brand.gold} /><span>NAHCON approved</span></div></div><button onClick={() => setSubmitted(false)} style={s.successBtn} onMouseEnter={e => { e.target.style.borderColor = brand.gold; e.target.style.color = brand.goldDark; e.target.style.background = brand.goldBg; }} onMouseLeave={e => { e.target.style.borderColor = brand.gray200; e.target.style.color = brand.gray600; e.target.style.background = brand.white; }}>Submit Another</button></motion.div>
    </div>
  );

  return (
    <div style={s.formWrapper} className="form-flex-container">
      <div style={s.formImageSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=900&fit=crop" alt="Kaaba" style={s.formImageBg} /><div style={s.formImageOverlay} /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}><div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>SACRED JOURNEY 2026</span></div><div style={s.formImageIcon}><Landmark size={34} color={brand.gold} /></div><h2 style={s.formImageTitle}>Reserve Your <span style={s.formImageGold}>Hajj</span><br />Package</h2><p style={s.formImageSubtitle}>Embark on the blessed pilgrimage with confidence.</p><div style={s.formDivider} /><div style={s.formImageFeatures}>{[{ icon: Shield, text: "NAHCON Approved" },{ icon: Hotel, text: "Premium Hotels" },{ icon: Bus, text: "Transport Included" },{ icon: Users, text: "Expert Guides" },{ icon: Clock, text: "24/7 Support" }].map((item, i) => { const I = item.icon; return <div key={i} style={s.formImageFeatItem}><div style={s.formImageFeatIcon}><I size={13} color={brand.gold} /></div>{item.text}</div>; })}</div></motion.div></div>
      <div style={s.formSide} className="form-form-side"><motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit}><div style={s.formHeaderStyle}><div style={s.formHeaderIcon}><Send size={20} color={brand.gold} /></div><div><div style={s.formHeaderTitle}>Book Hajj Package</div><div style={s.formHeaderSub}>Fill the form below</div></div></div>{formError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}><AlertCircle size={16} style={{ flexShrink: 0 }} /><span>{formError}</span></motion.div>}<div style={s.formRow}><div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Ismail" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Musa" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ismail@example.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Travel Date <span style={s.required}>*</span></label><input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required style={inp("travelDate")} onFocus={() => setFocused("travelDate")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Return Date</label><input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} style={inp("returnDate")} onFocus={() => setFocused("returnDate")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Preferred Contact <span style={s.required}>*</span></label><select name="preferredContact" value={formData.preferredContact} onChange={handleChange} style={s.select}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></div></div><div style={s.formRowTriple}><div style={s.formGroupThird}><label style={s.label}>Adults <span style={s.required}>*</span></label><select name="adults" value={formData.adults} onChange={handleChange} style={s.select}>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div style={s.formGroupThird}><label style={s.label}>Children</label><select name="children" value={formData.children} onChange={handleChange} style={s.select}>{[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div style={s.formGroupThird}><label style={s.label}>Infants</label><select name="infants" value={formData.infants} onChange={handleChange} style={s.select}>{[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}</select></div></div>{additionalFields.length > 0 && (<div style={{ ...s.formRow, flexWrap: "wrap" }}>{additionalFields.map(f => (<div key={f.name} style={s.formGroup}><label style={s.label}>{f.label} {f.required && <span style={s.required}>*</span>}</label>{f.type === "select" ? (<select name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} style={s.select}><option value="">Select...</option>{f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>) : (<input type={f.type || "text"} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} placeholder={f.placeholder} style={inp(f.name)} onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} />)}</div>))}</div>)}<div style={{ ...s.formGroup, marginTop: "2px" }}><label style={s.label}>Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any special requests..." style={txa("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div><motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.98 } : {}} style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}><div style={s.btnShine} />{loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Submitting...</> : <><Send size={18} style={{ position: "relative", zIndex: 1 }} /><span style={{ position: "relative", zIndex: 1 }}>Submit Enquiry</span></>}</motion.button><p style={s.terms}>By submitting, you agree to our privacy policy.</p></motion.form></div>
    </div>
  );
}

export default function HajjPackages() {
  const { isMobile } = useResponsive();
  const scrollToPackages = useCallback(() => { const el = document.getElementById("packages-section"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      <section style={s.heroSection}>
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop" alt="Hajj" style={s.heroImg} loading="eager" /></div>
        <div style={s.heroContent}><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} style={s.badge}><span style={{ fontSize: "clamp(12px,1.5vw,16px)" }}>✦</span><span style={s.badgeText}>Sacred Journey</span><span style={{ fontSize: "clamp(12px,1.5vw,16px)" }}>✦</span></motion.div><h1 style={s.heroTitle}>Hajj Packages <span style={s.heroGradient}>2026</span></h1><p style={s.heroSubtitle}>Experience a Stress-Free and Affordable Hajj with RASOAF Travels and Tours Limited</p></motion.div></div>
        <div style={s.heroOverlay} />
        <div style={s.scrollBtnContainer}><motion.button type="button" onClick={scrollToPackages} style={s.scrollBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><span style={{ position: "relative", zIndex: 1 }}>Choose Your Hajj Package</span><span style={{ ...s.scrollBtnIcon, position: "relative", zIndex: 1 }}><ArrowDown size={18} /></span></motion.button></div>
      </section>

      <section style={s.contentSection}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={s.introSection}>
          <div style={s.introCard}>
            <span style={s.introLabel}><Hand size={14} />Our Commitment</span>
            <h2 style={s.introTitle}>Experience a Stress-Free and Affordable Hajj</h2>
            <p style={s.introSubtitle}>At RASOAF Travels and Tours Limited, we are committed to making your Hajj pilgrimage memorable, comfortable, and spiritually fulfilling.</p>
            <CollapsibleText text="We have carefully considered the needs of every pilgrim - including fathers, mothers, brothers, sisters, and families travelling with children - to ensure everyone enjoys a smooth, hassle-free journey." isMobile={isMobile} />
            <CollapsibleText text="From the very first step of registration and visa processing to payment, flight arrangements, accommodation, and your safe arrival in the Kingdom of Saudi Arabia, our experienced team provides professional guidance every step of the way." isMobile={isMobile} />
            <CollapsibleText text="Our services go beyond simply providing information online. We offer personalized support throughout the entire visa and travel process, ensuring that your application is completed accurately, efficiently, and at a competitive cost." isMobile={isMobile} />
            <div style={s.introHighlight}><p style={s.introHighlightText}>"Choose RASOAF Travels and Tours Limited as your trusted Hajj travel partner and experience the difference that professionalism, integrity, and exceptional customer care can make."</p></div>
            <p style={{ ...s.introText, marginTop: "clamp(12px,2vw,20px)", fontWeight: 600, color: brand.goldDark, textAlign: "center", fontSize: "clamp(13px,1.2vw,16px)" }}>Travel with confidence. Perform your Hajj with peace of mind. Travel with RASOAF Travels and Tours Limited.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={s.journeySection}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Compass size={14} />Step by Step</span><h2 style={s.sectionTitle}>Your Hajj Journey With Us</h2><p style={s.sectionSubtitle}>From registration to your safe return, we handle every detail.</p></div>
          <div style={s.journeyGrid}>{journeySteps.map((step, idx) => { const Icon = step.icon; return (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }} style={s.journeyCard} whileHover={!isMobile ? { transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.08)", borderColor: brand.gold } : {}}><div style={s.journeyIconWrap}><Icon size={isMobile ? 18 : 22} color={brand.goldDark} /></div><div style={s.journeyContent}><h4 style={s.journeyTitle}>{step.title}</h4><p style={s.journeyDesc}>{step.desc}</p></div></motion.div>); })}</div>
        </motion.div>

        {/* ── PACKAGES (FIXED GRID) ── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} id="packages-section">
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Star size={14} />Our Packages</span><h2 style={s.sectionTitle}>Choose Your Hajj Package</h2><p style={s.sectionSubtitle}>Three carefully designed packages to suit every budget and preference.</p></div>
          <div style={s.packagesGrid}>
            {packages.map((pkg, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + idx * 0.1 }} viewport={{ once: true }}
                style={pkg.popular ? s.packageCardPopular : s.packageCard}
                whileHover={!isMobile ? { transform: pkg.popular ? "scale(1.03) translateY(-6px)" : "translateY(-6px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" } : {}}>
                {pkg.popular && <div style={s.popularBadge}>✦ Most Popular</div>}
                <div style={s.packageContent}>
                  <h3 style={s.packageName}>{pkg.name}</h3>
                  <p style={s.packageDesc}>{pkg.description}</p>
                  <div style={s.packagePriceRow}><span style={s.packagePrice}>{pkg.price}</span><span style={s.packagePerPerson}>/person</span></div>
                  <div style={s.packageDuration}><Clock size={isMobile ? 14 : 16} color={brand.gray400} /><span>{pkg.duration}</span></div>
                  <div style={s.featuresList}>{pkg.features.map((feature, i) => (<div key={i} style={s.featureItem}><CheckCircle size={isMobile ? 14 : 16} style={s.featureCheck} /><span>{feature}</span></div>))}</div>
                  <a href="#booking-form" style={{ ...s.selectBtn, background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)` }} onMouseEnter={e => { if (!isMobile) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 24px ${pkg.color}40`; } }} onMouseLeave={e => { if (!isMobile) { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; } }}>Select Package</a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Shield size={14} />Why Choose Us</span><h2 style={s.sectionTitle}>Why Choose Our Hajj Packages?</h2><p style={s.sectionSubtitle}>We provide end-to-end Hajj services with NAHCON approval.</p></div>
          <div style={s.whyGrid}>{whyChooseUs.map((item, idx) => { const Icon = item.icon; return (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} style={s.whyCard} whileHover={!isMobile ? { transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.08)", borderColor: brand.gold } : {}}><div style={s.whyIcon}><Icon size={isMobile ? 20 : 24} color={brand.goldDark} /></div><h4 style={s.whyTitle}>{item.title}</h4><p style={s.whyDesc}>{item.desc}</p></motion.div>); })}</div>
        </motion.div>

        <div id="booking-form" style={s.formSection}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.formHeader}><span style={s.sectionBadge}><Landmark size={14} />Reserve Your Spot</span><h2 style={s.sectionTitle}>Reserve Your Hajj Package</h2><p style={s.sectionSubtitle}>Fill the form and our specialist will contact you within 24 hours.</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}><HajjBookingForm additionalFields={hajjFields} /></motion.div>
        </div>
      </section>

      <div style={s.backLinkSection}><Link to="/services" style={s.backLink} onMouseEnter={e => e.target.style.color = brand.gold} onMouseLeave={e => e.target.style.color = brand.gray400}><ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />Back to All Services</Link></div>
    </div>
  );
}