// src/pages/services/FlightBooking.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plane, Globe, Shield, RefreshCw, Headphones, 
  Star, TrendingUp, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronRight, Building2, Sun, Moon,
  Landmark, Send, Loader2, Sparkles, Users, ArrowDown
} from "lucide-react";
import { Link } from "react-router-dom";

// ── Rasoaf Brand Colors ──────────────────────────────────────────────────
const brand = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)",
  goldBgHover: "rgba(212, 160, 23, 0.15)",
  goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111",
  white: "#ffffff",
  gray50: "#fafafa",
  gray100: "#f5f5f5",
  gray200: "#e5e5e5",
  gray400: "#a3a3a3",
  gray500: "#737373",
  gray600: "#525252",
  gray700: "#404040",
  greenBg: "rgba(34, 197, 94, 0.1)",
  green: "#22c55e",
  red: "#ef4444",
  redBg: "rgba(239, 68, 68, 0.1)",
  cream: "#FFF8E6",
  borderLight: "#E6D5A8",
  mutedText: "#5F5F5F",
};

// ── FORMSPREE CONFIGURATION ──────────────────────────────────────────────
// Replace this with your actual Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" },
  { code: "+27", country: "South Africa" },
];

// ── Data ─────────────────────────────────────────────────────────────────
const flightFields = [
  { name: "tripType", label: "Trip Type", type: "select", required: true,
    options: [
      { value: "one-way", label: "One Way" },
      { value: "round-trip", label: "Round Trip" },
      { value: "multi-city", label: "Multi-City" },
    ]
  },
  { name: "cabinClass", label: "Cabin Class", type: "select", required: true,
    options: [
      { value: "economy", label: "Economy" },
      { value: "premium-economy", label: "Premium Economy" },
      { value: "business", label: "Business" },
      { value: "first", label: "First Class" },
    ]
  },
  { name: "departureCity", label: "Departure City", type: "text", required: true, placeholder: "e.g., Lagos, Abuja, Kano" },
  { name: "destinationCity", label: "Destination (Holy City)", type: "select", required: true,
    options: [
      { value: "jeddah", label: "Jeddah (Makkah)" },
      { value: "madinah", label: "Madinah" },
      { value: "both", label: "Both Makkah & Madinah" },
    ]
  }
];

const features = [
  { icon: Plane, title: "Hajj & Umrah Flights", desc: "Direct and connecting flights to Jeddah and Madinah from all major Nigerian cities. Special rates for pilgrims and groups.", color: brand.gold, bg: brand.goldBg, stat: "Hajj" },
  { icon: Shield, title: "Licensed & Approved", desc: "NAHCON approved travel agency. All our flight bookings comply with Saudi aviation and Hajj/Umrah regulations.", color: brand.goldDark, bg: brand.goldBg, stat: "NAHCON" },
  { icon: RefreshCw, title: "Flexible Dates", desc: "Change your travel dates easily as your pilgrimage plans evolve. We accommodate last-minute adjustments.", color: brand.gold, bg: brand.goldBg, stat: "Flex" },
  { icon: Headphones, title: "24/7 Pilgrim Support", desc: "Dedicated support team familiar with Hajj & Umrah requirements. Assistance in English, Arabic, and Hausa.", color: brand.goldDark, bg: brand.goldBg, stat: "24/7" },
];

const holyCities = [
  { name: "Makkah Al-Mukarramah", airport: "King Abdulaziz Intl (JED)", icon: Building2,
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop",
    desc: "The holiest city in Islam, home to Masjid al-Haram and the Holy Kaaba. Gateway for Hajj and Umrah pilgrims.",
    distance: "5h 30m from Lagos", airlines: "8+ airlines", price: "₦850,000 – ₦1,200,000",
  },
  { name: "Madinah Al-Munawwarah", airport: "Prince Mohammad Bin Abdulaziz (MED)", icon: Landmark,
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&h=400&fit=crop",
    desc: "The City of the Prophet (PBUH), home to Masjid an-Nabawi. A must-visit during your pilgrimage journey.",
    distance: "6h 15m from Lagos", airlines: "6+ airlines", price: "₦920,000 – ₦1,400,000",
  },
];

const popularRoutes = [
  { from: "Lagos", to: "Jeddah (Makkah)", price: "₦850,000 – ₦1,200,000", duration: "5h 30m", type: "Direct" },
  { from: "Abuja", to: "Jeddah (Makkah)", price: "₦920,000 – ₦1,350,000", duration: "5h 45m", type: "Direct" },
  { from: "Kano", to: "Madinah", price: "₦890,000 – ₦1,250,000", duration: "5h 00m", type: "Direct" },
  { from: "Lagos", to: "Madinah", price: "₦980,000 – ₦1,400,000", duration: "6h 15m", type: "1 Stop" },
];

const heroStats = [
  { icon: Plane, label: "Pilgrims Flown", value: "15,000+" },
  { icon: Globe, label: "Nigerian Cities", value: "12+" },
  { icon: Star, label: "Years Experience", value: "15+" },
  { icon: Sun, label: "Airlines Partnered", value: "10+" },
];

const benefits = ["Hajj/Umrah Visa Assistance", "Group Booking Discounts", "Zamzam Water Allowance", "Flexible Date Changes"];

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif" },
  heroSection: { position: "relative", paddingTop: "120px", paddingBottom: "100px", paddingLeft: "20px", paddingRight: "20px", overflow: "hidden", background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #1a1207 100%)" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: `linear-gradient(to top, ${brand.cream}, transparent)` },
  heroContent: { maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", background: "rgba(212, 160, 23, 0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(212, 160, 23, 0.25)", borderRadius: "50px", marginBottom: "24px" },
  badgeText: { color: brand.goldLight, fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em" },
  pulseDot: { width: "6px", height: "6px", backgroundColor: brand.gold, borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" },
  heroTitle: { fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 800, color: brand.white, marginBottom: "20px", fontFamily: "'Manrope', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em" },
  heroGradient: { background: `linear-gradient(to right, ${brand.goldLight}, ${brand.gold}, ${brand.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  heroSubtitle: { fontSize: "18px", color: "rgba(255, 255, 255, 0.7)", maxWidth: "650px", margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 400 },
  heroBtnRow: { display: "flex", justifyContent: "center", marginBottom: "40px" },
  heroBtn: { display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "16px", letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: `0 4px 20px rgba(247, 201, 72, 0.35)`, transition: "all 250ms ease" },
  statsRow: { display: "flex", justifyContent: "center", gap: "clamp(20px, 4vw, 50px)", flexWrap: "wrap" },
  statItem: { display: "flex", alignItems: "center", gap: "12px" },
  statIcon: { width: "44px", height: "44px", borderRadius: "12px", background: "rgba(212, 160, 23, 0.1)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statValue: { fontSize: "28px", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  statLabel: { fontSize: "13px", color: "rgba(212, 160, 23, 0.7)", fontWeight: 400, letterSpacing: "0.02em" },
  contentSection: { maxWidth: "1200px", margin: "-40px auto 0", padding: "0 20px 80px", position: "relative", zIndex: 20 },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "80px" },
  featureCard: { background: brand.white, borderRadius: "16px", padding: "32px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center", transition: "all 0.3s ease", border: `1px solid ${brand.borderLight}`, position: "relative", overflow: "hidden" },
  featureIcon: { width: "56px", height: "56px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", position: "relative", zIndex: 1, transition: "transform 0.3s ease" },
  featureTitle: { fontSize: "18px", fontWeight: 700, color: brand.dark, marginBottom: "8px", fontFamily: "'Manrope', sans-serif", position: "relative", zIndex: 1 },
  featureDesc: { fontSize: "14px", color: brand.mutedText, lineHeight: 1.6, position: "relative", zIndex: 1 },
  sectionHeader: { textAlign: "center", marginBottom: "48px" },
  sectionBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "13px", fontWeight: 600, marginBottom: "16px", letterSpacing: "0.02em" },
  sectionTitle: { fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "12px" },
  sectionSubtitle: { fontSize: "16px", color: brand.mutedText, maxWidth: "550px", margin: "0 auto", lineHeight: 1.6 },
  holyCitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginBottom: "80px" },
  holyCityCard: { background: brand.white, borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: `1px solid ${brand.borderLight}`, transition: "all 0.4s ease" },
  holyCityImage: { width: "100%", height: "200px", objectFit: "cover" },
  holyCityContent: { padding: "24px" },
  holyCityName: { fontSize: "22px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" },
  holyCityIcon: { width: "36px", height: "36px", borderRadius: "10px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  holyCityDesc: { fontSize: "14px", color: brand.mutedText, lineHeight: 1.6, marginBottom: "16px" },
  holyCityInfo: { display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" },
  holyCityInfoItem: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: brand.gray600 },
  holyCityPrice: { fontSize: "24px", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif" },
  routesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "80px" },
  routeCard: { background: brand.white, borderRadius: "14px", padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", border: `1px solid ${brand.borderLight}`, cursor: "pointer", transition: "all 0.3s ease" },
  routeHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  routeAvatar: { width: "44px", height: "44px", borderRadius: "50%", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif", flexShrink: 0 },
  routePath: { display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: 600, color: brand.dark },
  routeDuration: { display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: brand.gray400, marginTop: "3px" },
  routeFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  routePrice: { fontSize: "22px", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif" },
  routePerPerson: { fontSize: "12px", color: brand.gray400, fontWeight: 400 },
  benefitsBanner: { background: `linear-gradient(135deg, ${brand.goldDark}, ${brand.gold})`, borderRadius: "24px", padding: "clamp(32px, 5vw, 56px) clamp(24px, 5vw, 48px)", marginBottom: "80px", position: "relative", overflow: "hidden" },
  benefitsBannerOrb1: { position: "absolute", top: "-60px", right: "-40px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.06)", filter: "blur(50px)" },
  benefitsBannerOrb2: { position: "absolute", bottom: "-80px", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(0, 0, 0, 0.1)", filter: "blur(50px)" },
  benefitsContent: { position: "relative", zIndex: 1 },
  benefitsTitle: { fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif", marginBottom: "8px", textAlign: "center" },
  benefitsSubtitle: { fontSize: "16px", color: "rgba(255, 255, 255, 0.85)", textAlign: "center", marginBottom: "36px", lineHeight: 1.5 },
  benefitsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" },
  benefitItem: { display: "flex", alignItems: "center", gap: "12px", color: brand.white, fontWeight: 500, fontSize: "15px" },
  formSection: { maxWidth: "100%", margin: "0 auto" },
  formHeader: { textAlign: "center", marginBottom: "36px" },
  backLinkSection: { textAlign: "center", paddingBottom: "60px" },
  backLink: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray400, fontWeight: 500, fontSize: "15px", textDecoration: "none", transition: "color 0.2s ease" },
  orb1: { position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "rgba(212, 160, 23, 0.06)", filter: "blur(60px)" },
  orb2: { position: "absolute", bottom: "-120px", left: "-80px", width: "550px", height: "550px", borderRadius: "50%", background: "rgba(212, 160, 23, 0.04)", filter: "blur(60px)" },

  // Form styles
  formWrapper: { display: "flex", background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "650px" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${brand.dark} 0%, #1a1207 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 36px", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.7) 40%, rgba(212,160,23,0.25) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "rgba(212, 160, 23, 0.15)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "20px", fontSize: "12px", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "72px", height: "72px", borderRadius: "20px", background: "rgba(212, 160, 23, 0.12)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
  formImageTitle: { fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "10px", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: "300px" },
  formImageStats: { display: "flex", justifyContent: "center", gap: "24px", marginBottom: "28px", flexWrap: "wrap" },
  formImageStat: { textAlign: "center" },
  formImageStatVal: { fontSize: "22px", fontWeight: 700, color: brand.gold, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  formImageStatLbl: { fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" },
  formDivider: { width: "60px", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto 24px", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 },
  formImageFeatIcon: { width: "24px", height: "24px", borderRadius: "6px", background: "rgba(212, 160, 23, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formSide: { flex: 1, padding: "36px 32px", overflowY: "auto", maxHeight: "700px" },
  formRow: { display: "flex", gap: "14px", marginBottom: "15px" },
  formRowTriple: { display: "flex", gap: "10px", marginBottom: "15px" },
  formGroup: { flex: 1, display: "flex", flexDirection: "column" },
  formGroupThird: { flex: "1 1 0", minWidth: "80px", display: "flex", flexDirection: "column" },
  label: { fontSize: "12.5px", fontWeight: 600, color: brand.gray700, marginBottom: "5px", letterSpacing: "0.01em" },
  required: { color: brand.goldDark },
  input: { width: "100%", padding: "10px 13px", borderRadius: "10px", border: `1px solid ${brand.borderLight}`, fontSize: "14px", color: brand.dark, background: brand.cream, outline: "none", transition: "all 0.2s ease", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  select: { width: "100%", padding: "10px 34px 10px 13px", borderRadius: "10px", border: `1px solid ${brand.borderLight}`, fontSize: "14px", color: brand.dark, background: brand.cream, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" },
  phoneRow: { display: "flex", gap: "8px" },
  phoneCode: { width: "140px", padding: "10px 28px 10px 8px", borderRadius: "10px", border: `1px solid ${brand.borderLight}`, fontSize: "13px", color: brand.dark, background: brand.cream, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", flexShrink: 0, appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" },
  phoneInput: { flex: 1, padding: "10px 13px", borderRadius: "10px", border: `1px solid ${brand.borderLight}`, fontSize: "14px", color: brand.dark, background: brand.cream, outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "10px 13px", borderRadius: "10px", border: `1px solid ${brand.borderLight}`, fontSize: "14px", color: brand.dark, background: brand.cream, outline: "none", resize: "vertical", fontFamily: "'Inter', sans-serif", minHeight: "80px", boxSizing: "border-box" },
  submitBtn: { width: "100%", padding: "14px 20px", borderRadius: "12px", border: "none", fontSize: "15px", fontWeight: 600, color: brand.dark, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", marginTop: "18px", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold})`, boxShadow: `0 4px 16px rgba(212, 160, 23, 0.3), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden" },
  btnShine: { position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shine 3s ease-in-out infinite", pointerEvents: "none" },
  terms: { textAlign: "center", fontSize: "11px", color: brand.mutedText, marginTop: "14px", lineHeight: 1.5 },
  focusInput: { borderColor: brand.gold, boxShadow: `0 0 0 3px ${brand.goldBg}` },
  errorInput: { borderColor: brand.red, boxShadow: `0 0 0 3px ${brand.redBg}` },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", paddingBottom: "18px", borderBottom: `1px solid ${brand.borderLight}` },
  formHeaderIcon: { width: "44px", height: "44px", borderRadius: "12px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "19px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  formHeaderSub: { fontSize: "12px", color: brand.mutedText, marginTop: "2px" },
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: brand.red, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },

  // Success
  successWrapper: { display: "flex", background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "500px" },
  successImgSide: { width: "42%", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0d1a0d 0%, #0a2e0a 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  successContent: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", textAlign: "center" },
  successIcon: { width: "72px", height: "72px", borderRadius: "50%", background: brand.greenBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" },
  successTitle: { fontSize: "24px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "8px" },
  successMsg: { fontSize: "15px", color: brand.mutedText, lineHeight: 1.7, marginBottom: "24px", maxWidth: "400px" },
  successDetails: { background: brand.cream, borderRadius: "12px", padding: "16px 20px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "340px" },
  successDetail: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: brand.gray600 },
  successBtn: { padding: "11px 28px", borderRadius: "10px", border: `1px solid ${brand.borderLight}`, background: brand.white, fontSize: "14px", fontWeight: 600, color: brand.gray600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.25s ease" },
};

// ── Animations ───────────────────────────────────────────────────────────
const keyframes = `
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes shine { 0% { left: -100%; } 50% { left: 120%; } 100% { left: 120%; } }
@media (max-width: 860px) {
  .form-flex-container { flex-direction: column !important; }
  .form-image-side { width: 100% !important; min-height: 220px !important; padding: 28px 20px !important; }
  .form-form-side { padding: 24px 18px !important; max-height: none !important; }
}
@media (max-width: 480px) {
  .form-image-side { min-height: 180px !important; padding: 20px 16px !important; }
  .form-form-side { padding: 20px 14px !important; }
}
`;

// ══════════════════════════════════════════════════════════════════════════
//  INLINE BOOKING FORM COMPONENT (with Formspree integration)
// ══════════════════════════════════════════════════════════════════════════
function BookingForm({ serviceName = "Holy Land Flight", accentColor = brand.gold, additionalFields = [] }) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "",
    travelDate: "", returnDate: "", adults: "1", children: "0", infants: "0",
    message: "", preferredContact: "email",
    ...additionalFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);

    try {
      const fullPhone = `${formData.phoneCode} ${formData.phone}`;
      
      const submissionData = {
        _subject: `New Holy Land Flight Enquiry - ${formData.firstName} ${formData.lastName}`,
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Email": formData.email,
        "Phone": fullPhone,
        "Phone Code": formData.phoneCode,
        "Travel Date": formData.travelDate,
        "Return Date": formData.returnDate || "Not specified",
        "Preferred Contact": formData.preferredContact,
        "Adults": formData.adults,
        "Children (2-11)": formData.children,
        "Infants (0-2)": formData.infants,
        "Service": serviceName,
        "Message": formData.message || "No additional message",
      };

      additionalFields.forEach(f => {
        const value = formData[f.name];
        if (value) {
          submissionData[f.label] = f.type === "select" 
            ? f.options.find(o => o.value === value)?.label || value 
            : value;
        }
      });

      submissionData["Submitted At"] = new Date().toLocaleString();
      submissionData["Page"] = window.location.href;

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit form. Please try again.");
      }

      setLoading(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "",
          travelDate: "", returnDate: "", adults: "1", children: "0", infants: "0",
          message: "", preferredContact: "email",
          ...additionalFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
        });
      }, 6000);

    } catch (error) {
      setLoading(false);
      setFormError(error.message || "Something went wrong. Please try again.");
      setTimeout(() => setFormError(null), 8000);
    }
  };

  const inp = (name) => ({ ...s.input, ...(focused === name ? s.focusInput : {}), ...(formError && !formData[name] ? s.errorInput : {}) });
  const phn = (name) => ({ ...s.phoneInput, ...(focused === name ? s.focusInput : {}), ...(formError && !formData[name] ? s.errorInput : {}) });
  const txa = (name) => ({ ...s.textarea, ...(focused === name ? s.focusInput : {}) });

  if (submitted) {
    return (
      <div style={s.successWrapper}>
        <div style={s.successImgSide}>
          <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=900&fit=crop" alt="" style={{ ...s.formImageBg, opacity: 0.35 }} />
          <div style={s.formImageOverlay} />
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <CheckCircle size={48} color={brand.green} style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif" }}>Enquiry Sent!</h3>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}>
          <div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div>
          <h3 style={s.successTitle}>Enquiry Submitted Successfully!</h3>
          <p style={s.successMsg}>Thank you for your interest in our {serviceName}. Our dedicated team will contact you within <strong>24 hours</strong> with the best options for your journey.</p>
          <div style={s.successDetails}>
            <div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24 hours</span></div>
            <div style={s.successDetail}><Users size={14} color={brand.gold} /><span>Dedicated travel consultant assigned</span></div>
            <div style={s.successDetail}><Shield size={14} color={brand.gold} /><span>Your data is secure & protected</span></div>
          </div>
          <button onClick={() => setSubmitted(false)} style={s.successBtn}
            onMouseEnter={e => { e.target.style.borderColor = brand.gold; e.target.style.color = brand.goldDark; e.target.style.background = brand.goldBg; }}
            onMouseLeave={e => { e.target.style.borderColor = brand.borderLight; e.target.style.color = brand.gray600; e.target.style.background = brand.white; }}
          >Submit Another Enquiry</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={s.formWrapper} className="form-flex-container">
      {/* Left Image */}
      <div style={s.formImageSide} className="form-image-side">
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=900&fit=crop" alt="Holy Mosque" style={s.formImageBg} />
        <div style={s.formImageOverlay} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}>
          <div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>TRUSTED PILGRIMAGE PARTNER</span></div>
          <div style={s.formImageIcon}><Plane size={34} color={brand.gold} /></div>
          <h2 style={s.formImageTitle}>Book <span style={s.formImageGold}>Holy Land</span><br />Flight</h2>
          <p style={s.formImageSubtitle}>Trusted by thousands of pilgrims. Direct flights to Makkah and Madinah with complete journey support.</p>
          <div style={s.formDivider} />
          <div style={s.formImageStats}>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>15K+</div><div style={s.formImageStatLbl}>Pilgrims Flown</div></div>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>12+</div><div style={s.formImageStatLbl}>Nigerian Cities</div></div>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>10+</div><div style={s.formImageStatLbl}>Airlines</div></div>
          </div>
          <div style={s.formImageFeatures}>
            {[{ icon: Shield, text: "NAHCON Approved & Licensed" },{ icon: Plane, text: "Direct & Connecting Flights" },{ icon: Users, text: "Group Booking Discounts" },{ icon: Globe, text: "Visa Assistance Included" },{ icon: Clock, text: "24/7 Pilgrim Support Team" }].map((item, i) => {
              const I = item.icon;
              return <div key={i} style={s.formImageFeatItem}><div style={s.formImageFeatIcon}><I size={13} color={brand.gold} /></div>{item.text}</div>;
            })}
          </div>
        </motion.div>
      </div>

      {/* Right Form */}
      <div style={s.formSide} className="form-form-side">
        <motion.form 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          onSubmit={handleSubmit}
          action={FORMSPREE_ENDPOINT}
          method="POST"
        >
          <div style={s.formHeaderStyle}>
            <div style={s.formHeaderIcon}><Send size={20} color={accentColor} /></div>
            <div><div style={s.formHeaderTitle}>Book {serviceName}</div><div style={s.formHeaderSub}>Fill the form below to get started</div></div>
          </div>

          {formError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              style={s.errorMessage}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
              <span>{formError}</span>
            </motion.div>
          )}

          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Ahmad" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div>
            <div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Jubril" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div>
          </div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email Address <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ahmad@example.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone Number <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div>
          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.label}>Travel Date <span style={s.required}>*</span></label><input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required style={inp("travelDate")} onFocus={() => setFocused("travelDate")} onBlur={() => setFocused(null)} /></div>
            <div style={s.formGroup}><label style={s.label}>Return Date</label><input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} style={inp("returnDate")} onFocus={() => setFocused("returnDate")} onBlur={() => setFocused(null)} /></div>
          </div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Preferred Contact <span style={s.required}>*</span></label><select name="preferredContact" value={formData.preferredContact} onChange={handleChange} style={s.select}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></div></div>
          <div style={s.formRowTriple}>
            <div style={s.formGroupThird}><label style={s.label}>Adults <span style={s.required}>*</span></label><select name="adults" value={formData.adults} onChange={handleChange} style={s.select}>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
            <div style={s.formGroupThird}><label style={s.label}>Children (2-11)</label><select name="children" value={formData.children} onChange={handleChange} style={s.select}>{[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
            <div style={s.formGroupThird}><label style={s.label}>Infants (0-2)</label><select name="infants" value={formData.infants} onChange={handleChange} style={s.select}>{[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
          </div>
          {additionalFields.length > 0 && (
            <div style={{ ...s.formRow, flexWrap: "wrap" }}>
              {additionalFields.map(f => (
                <div key={f.name} style={s.formGroup}>
                  <label style={s.label}>{f.label} {f.required && <span style={s.required}>*</span>}</label>
                  {f.type === "select" ? (
                    <select name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} style={s.select}><option value="">Select...</option>{f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
                  ) : (
                    <input type={f.type || "text"} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} placeholder={f.placeholder} style={inp(f.name)} onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} />
                  )}
                </div>
              ))}
            </div>
          )}
          <div style={{ ...s.formGroup, marginTop: "2px" }}><label style={s.label}>Additional Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any special requests or requirements..." style={txa("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div>
          <motion.button type="submit" disabled={loading}
            whileHover={!loading ? { scale: 1.01, boxShadow: "0 8px 28px rgba(212,160,23,0.45), 0 3px 0 #A07000" } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}>
            <div style={s.btnShine} />
            {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Submitting...</> : <><Send size={18} style={{ position: "relative", zIndex: 1 }} /><span style={{ position: "relative", zIndex: 1 }}>Submit Enquiry</span></>}
          </motion.button>
          <p style={s.terms}>By submitting, you agree to our privacy policy and terms of service. We'll never share your information.</p>
        </motion.form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN FLIGHT BOOKING PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function FlightBooking() {
  // Smooth scroll handler
  const scrollToForm = () => {
    const element = document.getElementById("booking-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO */}
      <section style={s.heroSection}>
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop" alt="Holy Mosque Makkah" style={s.heroImg} loading="eager" /></div>
        <motion.div animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={s.orb1} />
        <motion.div animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.05, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} style={s.orb2} />
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={s.badge}><Building2 size={15} color={brand.gold} /><span style={s.badgeText}>Hajj & Umrah Flights</span><div style={s.pulseDot} /></motion.div>
            <h1 style={s.heroTitle}>Fly to the <span style={s.heroGradient}>Holy Lands</span></h1>
            <p style={s.heroSubtitle}>Book your sacred journey with confidence. Direct and connecting flights to Jeddah and Madinah from across Nigeria. Special Hajj & Umrah fares with full pilgrimage support.</p>
            
            {/* Book Flight Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.5 }}
              style={s.heroBtnRow}
            >
              <button
                onClick={scrollToForm}
                style={s.heroBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFE082";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(247, 201, 72, 0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = brand.goldLight;
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(247, 201, 72, 0.35)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Plane size={20} />
                Book Flight
                <ArrowDown size={18} />
              </button>
            </motion.div>

            <div style={s.statsRow}>
              {heroStats.map((st, i) => { const I = st.icon; return <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} style={s.statItem}><div style={s.statIcon}><I size={20} color={brand.gold} /></div><div><div style={s.statValue}>{st.value}</div><div style={s.statLabel}>{st.label}</div></div></motion.div>; })}
            </div>
          </motion.div>
        </div>
        <div style={s.heroOverlay} />
      </section>

      {/* CONTENT */}
      <section style={s.contentSection}>

        {/* INTRODUCTION TEXT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: brand.white,
            borderRadius: "24px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)",
            border: `1px solid ${brand.borderLight}`,
            padding: "clamp(24px, 4vw, 48px)",
            marginBottom: "60px"
          }}
        >
          <h2 style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: brand.dark,
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            lineHeight: 1.2
          }}>
            FLIGHT Booking:
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.7,
            color: brand.dark,
            marginBottom: "20px"
          }}>
            Reliable and Affordable Flight Booking Services
          </p>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: brand.mutedText
          }}>
            <p style={{ marginBottom: "16px" }}>
              At <strong style={{ color: brand.dark, fontWeight: 600 }}>RASOAF Travels and Tours Limited</strong>, we are committed to providing professional,
              reliable, and cost-effective flight booking services. Our experienced ticketing specialists
              work with leading airlines and industry partners to secure competitive airfares for both
              domestic and international travellers.
            </p>
            <p style={{ marginBottom: "16px" }}>
              Every booking is processed with accuracy and transparency. Once your reservation is
              confirmed, you will receive your flight ticket, booking reference, and flight details directly
              on your mobile phone and via email, making it easy to access your travel information
              anytime, anywhere.
            </p>
            <p style={{ marginBottom: "16px" }}>
              We embrace modern, paperless travel. There is no need to carry printed tickets, as your
              electronic ticket (e-ticket) is sufficient for check-in and travel. However, if you require
              assistance at any stage of your journey, our dedicated support team is always available to
              provide guidance and help verify your booking when necessary.
            </p>
            <p style={{ marginBottom: "16px" }}>
              To make travel more accessible, we also offer flexible payment options, including instalment
              payment plans for eligible flight bookings. This allows you to secure your seat while paying
              over an agreed period, subject to our booking terms and conditions.
            </p>
            <p style={{ marginBottom: "16px" }}>
              Whether you are travelling for business, education, tourism, family visits, Umrah, Hajj, or
              any other purpose, RASOAF Travels and Tours Limited is your trusted partner for
              affordable fares, reliable bookings, and exceptional customer service.
            </p>
            <p style={{
              fontWeight: 600,
              color: brand.dark,
              marginTop: "8px"
            }}>
              Book with confidence. Travel with ease. Fly with RASOAF Travels and Tours Limited.
            </p>
          </div>
        </motion.div>

        {/* HOLY CITIES */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: "80px" }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Landmark size={14} />Holy Destinations</span><h2 style={s.sectionTitle}>Fly to the Blessed Cities</h2><p style={s.sectionSubtitle}>We offer flights to both Jeddah (gateway to Makkah) and Madinah, with flexible itineraries for Hajj and Umrah pilgrims.</p></div>
          <div style={s.holyCitiesGrid}>
            {holyCities.map((city, i) => { const I = city.icon; return <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} style={s.holyCityCard} whileHover={{ transform: "translateY(-6px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}><img src={city.image} alt={city.name} style={s.holyCityImage} /><div style={s.holyCityContent}><div style={s.holyCityName}><div style={s.holyCityIcon}><I size={18} color={brand.goldDark} /></div>{city.name}</div><p style={s.holyCityDesc}>{city.desc}</p><div style={s.holyCityInfo}><div style={s.holyCityInfoItem}><Clock size={14} color={brand.gold} />{city.distance}</div><div style={s.holyCityInfoItem}><Plane size={14} color={brand.gold} />{city.airlines}</div></div><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={s.holyCityPrice}>{city.price}</span><span style={{ fontSize: "12px", color: brand.gray400 }}>{city.airport}</span></div></div></motion.div>; })}
          </div>
        </motion.div>

        {/* FEATURES */}
        <div style={s.featuresGrid}>
          {features.map((item, i) => { const I = item.icon; return <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={s.featureCard} whileHover={{ transform: "translateY(-6px)", boxShadow: "0 16px 48px rgba(0,0,0,0.1)", borderColor: brand.gold }}><div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "48px", fontWeight: 800, color: brand.goldBg, fontFamily: "'Manrope', sans-serif", opacity: 0.5, lineHeight: 1 }}>{item.stat}</div><div style={{ ...s.featureIcon, backgroundColor: item.bg }}><I size={28} color={item.color} /></div><h3 style={s.featureTitle}>{item.title}</h3><p style={s.featureDesc}>{item.desc}</p></motion.div>; })}
        </div>

        {/* ROUTES */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: "80px" }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><TrendingUp size={14} />Popular Pilgrim Routes</span><h2 style={s.sectionTitle}>Most Booked Holy Land Flights</h2><p style={s.sectionSubtitle}>Trusted routes from Nigerian cities to the holy cities of Makkah and Madinah, served by top international airlines.</p></div>
          <div style={s.routesGrid}>
            {popularRoutes.map((r, i) => <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={s.routeCard} whileHover={{ transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)", borderColor: brand.gold }}><div style={s.routeHeader}><div style={s.routeAvatar}>{r.from.charAt(0)}</div><div style={{ flex: 1 }}><div style={s.routePath}>{r.from}<ArrowRight size={14} color={brand.gold} />{r.to}</div><div style={s.routeDuration}><Clock size={12} />{r.duration}<span style={{ marginLeft: "8px", padding: "2px 8px", background: brand.goldBg, borderRadius: "4px", fontSize: "10px", fontWeight: 600, color: brand.goldDark }}>{r.type}</span></div></div></div><div style={s.routeFooter}><span style={s.routePrice}>{r.price}</span><span style={s.routePerPerson}>per person</span></div></motion.div>)}
          </div>
        </motion.div>

        {/* BENEFITS */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.benefitsBanner}>
          <div style={s.benefitsBannerOrb1} /><div style={s.benefitsBannerOrb2} />
          <div style={s.benefitsContent}>
            <h3 style={s.benefitsTitle}>Why Book Your Pilgrimage Flight With Us?</h3>
            <p style={s.benefitsSubtitle}>We understand the sacred nature of your journey. Every booking includes complete pilgrimage support and spiritual guidance.</p>
            <div style={s.benefitsGrid}>{benefits.map((b, i) => <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} viewport={{ once: true }} style={s.benefitItem}><CheckCircle size={20} color="#ffffff" />{b}</motion.div>)}</div>
          </div>
        </motion.div>

        {/* BOOKING FORM */}
        <div id="booking-form" style={s.formSection}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.formHeader}>
            <span style={s.sectionBadge}><Plane size={14} />Book Your Sacred Journey</span>
            <h2 style={s.sectionTitle}>Reserve Your Holy Land Flight</h2>
            <p style={s.sectionSubtitle}>Fill in your travel details below and our pilgrimage flight specialist will contact you with the best options for your blessed journey within 24 hours.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }}>
            <BookingForm serviceName="Holy Land Flight" accentColor={brand.gold} additionalFields={flightFields} />
          </motion.div>
        </div>
      </section>

      {/* BACK LINK */}
      <div style={s.backLinkSection}>
        <Link to="/services" style={s.backLink} onMouseEnter={e => e.target.style.color = brand.gold} onMouseLeave={e => e.target.style.color = brand.gray400}>
          <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />Back to All Services
        </Link>
      </div>
    </div>
  );
}