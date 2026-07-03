// src/pages/services/HotelReservation.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Hotel Reservation Page
// v2: 100% Responsive · Collapsible sections · Touch optimized · All content preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Star, Wifi, Coffee, Bath, Car, 
  Shield, Phone, MapPin, Clock, Users, Send, 
  Loader2, Sparkles, CheckCircle, ArrowDown, Hotel,
  ChevronDown
} from "lucide-react";

// ── Rasoaf Brand Colors ──────────────────────────────────────────────────
const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)", goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111", white: "#ffffff", gray200: "#e5e5e5", gray400: "#a3a3a3",
  gray500: "#737373", gray600: "#525252", gray700: "#404040",
  greenBg: "rgba(34, 197, 94, 0.1)", green: "#22c55e",
  red: "#ef4444", redBg: "rgba(239, 68, 68, 0.1)",
  cream: "#FFF8E6", borderLight: "#E6D5A8", mutedText: "#5F5F5F",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" }, { code: "+1", country: "USA" },
  { code: "+44", country: "UK" }, { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" }, { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" }, { code: "+27", country: "South Africa" },
];

// ── Responsive Hook ──────────────────────────────────────────────────────
function useResponsive() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

// ── Data ─────────────────────────────────────────────────────────────────
const hotelCategories = [
  { name: "Budget", stars: 3, desc: "Comfortable & Affordable", description: "Clean, comfortable accommodations for the budget-conscious traveller." },
  { name: "Standard", stars: 4, desc: "Quality & Value", popular: true, description: "The perfect balance of comfort, amenities, and value for money." },
  { name: "Premium", stars: 5, desc: "Luxury & Elegance", description: "Exceptional service and premium facilities for a memorable stay." },
  { name: "Ultra Luxury", stars: 5, desc: "World-Class Luxury", description: "The finest accommodations with unparalleled service and exclusivity." },
];

const hotelFields = [
  { name: "hotelStar", label: "Hotel Rating", type: "select", required: true, options: [{ value: "3", label: "3-Star" }, { value: "4", label: "4-Star" }, { value: "5", label: "5-Star" }, { value: "any", label: "Any Rating" }] },
  { name: "roomType", label: "Room Type", type: "select", required: true, options: [{ value: "single", label: "Single" }, { value: "double", label: "Double" }, { value: "twin", label: "Twin" }, { value: "suite", label: "Suite" }, { value: "family", label: "Family Room" }] },
  { name: "destination", label: "Destination City", type: "text", required: true, placeholder: "e.g., Makkah, Madinah, Dubai" },
  { name: "budget", label: "Budget per Night", type: "select", required: false, options: [{ value: "any", label: "Flexible" }, { value: "35000-65000", label: "₦35,000 – ₦65,000" }, { value: "65000-120000", label: "₦65,000 – ₦120,000" }, { value: "120000-250000", label: "₦120,000 – ₦250,000" }, { value: "250000+", label: "₦250,000+" }] }
];

const amenities = [
  { icon: Wifi, label: "Free WiFi" }, { icon: Coffee, label: "Breakfast Included" },
  { icon: Bath, label: "Private Bathroom" }, { icon: Car, label: "Airport Shuttle" },
];

const introParagraphs = [
  "At RASOAF Travels and Tours Limited, we understand that comfortable accommodation is an essential part of every successful journey. That is why we carefully select quality hotels that provide comfort, convenience, and excellent hospitality for our clients.",
  "For Hajj and Umrah pilgrims, we partner with reputable hotels in the holy cities of Makkah and Madinah, ensuring that our clients enjoy clean, secure, and comfortable accommodation throughout their stay. Our hotel options are chosen with the needs of pilgrims in mind, offering convenient access to the Holy Mosques whenever possible and a peaceful environment for rest and worship.",
  "Whether you are travelling individually, with your family, or as part of a group, we provide accommodation packages that suit your budget without compromising on quality.",
  "Our goal is to give every traveller a memorable experience by combining excellent accommodation with outstanding customer service. From the moment you arrive until your return home, RASOAF Travels and Tours Limited is dedicated to making your journey comfortable, enjoyable, and worry-free.",
];

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif", overflowX: "hidden" },

  // Hero
  heroSection: { position: "relative", paddingTop: "clamp(6rem, 10vh, 120px)", paddingBottom: "clamp(3rem, 8vh, 100px)", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)", overflow: "hidden", background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #1a1207 100%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(20px, 3vh, 40px)" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(60px, 8vh, 120px)", background: `linear-gradient(to top, ${brand.cream}, transparent)` },
  heroContent: { maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center", width: "100%" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(212,160,23,0.25)", borderRadius: "50px", marginBottom: "clamp(16px, 2vw, 24px)" },
  badgeText: { color: brand.goldLight, fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 600, letterSpacing: "0.04em" },
  pulseDot: { width: "6px", height: "6px", backgroundColor: brand.gold, borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" },
  heroTitle: { fontSize: "clamp(26px, 6vw, 60px)", fontWeight: 800, color: brand.white, marginBottom: "clamp(12px, 2vw, 20px)", fontFamily: "'Manrope', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em", paddingInline: "clamp(0px, 2vw, 20px)" },
  heroGradient: { background: `linear-gradient(to right, ${brand.goldLight}, ${brand.gold}, ${brand.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255,255,255,0.7)", maxWidth: "650px", margin: "0 auto clamp(20px, 3vw, 40px)", lineHeight: 1.7, fontWeight: 400, paddingInline: "clamp(0px, 2vw, 10px)" },
  heroBtnRow: { position: "relative", zIndex: 10 },
  heroBtn: { display: "inline-flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)", padding: "clamp(10px, 1.5vw, 14px) clamp(20px, 3vw, 32px)", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(247,201,72,0.35)", transition: "all 250ms ease", minHeight: "44px" },

  // Content
  contentSection: { maxWidth: "1200px", margin: "-30px auto 0", padding: "0 clamp(12px, 3vw, 20px) clamp(40px, 6vh, 80px)", position: "relative", zIndex: 20, width: "100%", boxSizing: "border-box" },

  // Intro Card
  introCard: { backgroundColor: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: `1px solid ${brand.borderLight}`, padding: "clamp(20px, 4vw, 48px)", marginBottom: "clamp(40px, 6vh, 60px)" },
  introTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem, 3vw, 2rem)", color: brand.dark, marginBottom: "clamp(10px, 1.5vw, 16px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  introSubtitle: { fontSize: "clamp(0.95rem, 1.3vw, 1.125rem)", fontWeight: 600, lineHeight: 1.7, color: brand.dark, marginBottom: "clamp(14px, 2vw, 20px)", fontFamily: "'Inter', sans-serif" },
  introText: { fontSize: "clamp(0.85rem, 1.1vw, 1rem)", lineHeight: 1.75, color: brand.mutedText, marginBottom: "clamp(10px, 1.5vw, 16px)", fontFamily: "'Inter', sans-serif" },
  introClosing: { fontWeight: 600, color: brand.dark, marginTop: "clamp(4px, 0.8vw, 8px)", fontSize: "clamp(0.85rem, 1.1vw, 1rem)" },
  collapseToggle: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "clamp(8px, 1.5vw, 12px) 0", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", color: brand.goldDark, fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 600, minHeight: "44px" },

  // Section Header
  sectionHeader: { textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)" },
  sectionBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.8vw, 6px) clamp(10px, 1.5vw, 16px)", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, marginBottom: "clamp(10px, 1.5vw, 16px)", letterSpacing: "0.02em" },
  sectionTitle: { fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 12px)" },
  sectionSubtitle: { fontSize: "clamp(13px, 1.2vw, 16px)", color: brand.mutedText, maxWidth: "550px", margin: "0 auto", lineHeight: 1.6, paddingInline: "clamp(0px, 2vw, 10px)" },

  // Categories
  categoriesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(220px, 28vw, 260px), 1fr))", gap: "clamp(14px, 2vw, 20px)", marginBottom: "clamp(40px, 6vh, 80px)" },
  categoryCard: { position: "relative", background: brand.white, borderRadius: "clamp(16px, 2vw, 20px)", padding: "clamp(20px, 2.5vw, 28px) clamp(16px, 2vw, 24px)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center", transition: "all 0.3s ease", border: `1px solid ${brand.borderLight}`, display: "flex", flexDirection: "column" },
  categoryStars: { display: "flex", justifyContent: "center", gap: "clamp(2px, 0.4vw, 4px)", marginBottom: "clamp(10px, 1.5vw, 16px)" },
  categoryName: { fontWeight: 700, color: brand.dark, fontSize: "clamp(15px, 1.5vw, 18px)", marginBottom: "clamp(2px, 0.4vw, 4px)", fontFamily: "'Manrope', sans-serif" },
  categoryDesc: { color: brand.mutedText, fontSize: "clamp(12px, 1.1vw, 14px)", marginBottom: "clamp(8px, 1vw, 12px)" },
  categoryBtn: { display: "block", width: "100%", padding: "clamp(10px, 1.2vw, 12px) 0", borderRadius: "12px", color: brand.dark, fontWeight: 600, fontSize: "clamp(13px, 1vw, 14px)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", textDecoration: "none", border: "none", cursor: "pointer", backgroundColor: brand.goldLight, transition: "all 200ms ease", marginTop: "auto", minHeight: "44px" },
  popularBadge: { position: "absolute", top: "clamp(-8px, -1vw, -10px)", left: "50%", transform: "translateX(-50%)", backgroundColor: brand.gold, color: brand.white, padding: "clamp(3px, 0.5vw, 5px) clamp(12px, 1.5vw, 16px)", borderRadius: "9999px", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", boxShadow: "0 2px 8px rgba(212,160,23,0.3)" },
  popularBorder: { border: `2px solid ${brand.goldLight}` },

  // Amenities
  amenitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 22vw, 200px), 1fr))", gap: "clamp(10px, 1.5vw, 16px)", marginBottom: "clamp(40px, 6vh, 80px)" },
  amenityCard: { background: brand.white, borderRadius: "clamp(12px, 1.5vw, 14px)", padding: "clamp(14px, 2vw, 20px)", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", border: `1px solid ${brand.borderLight}`, display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", transition: "all 0.3s ease" },
  amenityIcon: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "clamp(8px, 1vw, 10px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  amenityLabel: { fontWeight: 500, color: brand.dark, fontSize: "clamp(13px, 1.1vw, 15px)" },

  // Form Section
  formSection: { maxWidth: "100%", margin: "0 auto" },
  formHeader: { textAlign: "center", marginBottom: "clamp(20px, 3vw, 36px)" },

  // Inline Form
  formWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "clamp(500px, 60vh, 650px)" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${brand.dark} 0%, #1a1207 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 36px)", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.7) 40%, rgba(212,160,23,0.25) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.6vw, 6px) clamp(10px, 1.2vw, 14px)", background: "rgba(212,160,23,0.15)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "clamp(12px, 2vw, 20px)", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "clamp(48px, 6vw, 72px)", height: "clamp(48px, 6vw, 72px)", borderRadius: "clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.12)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(12px, 2vw, 20px)" },
  formImageTitle: { fontSize: "clamp(18px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 10px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "clamp(11px, 1.1vw, 14px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto clamp(16px, 2.5vw, 28px)", maxWidth: "300px" },
  formDivider: { width: "clamp(40px, 5vw, 60px)", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto clamp(16px, 2vw, 24px)", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "clamp(6px, 0.8vw, 10px)", fontSize: "clamp(10px, 1vw, 13px)", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 },
  formImageFeatIcon: { width: "clamp(20px, 2vw, 24px)", height: "clamp(20px, 2vw, 24px)", borderRadius: "clamp(4px, 0.5vw, 6px)", background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formSide: { flex: 1, padding: "clamp(18px, 2.5vw, 36px) clamp(14px, 2vw, 32px)", overflowY: "auto", maxHeight: "clamp(400px, 60vh, 700px)", WebkitOverflowScrolling: "touch" },
  formRow: { display: "flex", gap: "clamp(8px, 1.2vw, 14px)", marginBottom: "clamp(8px, 1.2vw, 15px)", flexWrap: "wrap" },
  formRowTriple: { display: "flex", gap: "clamp(6px, 0.8vw, 10px)", marginBottom: "clamp(8px, 1.2vw, 15px)", flexWrap: "wrap" },
  formGroup: { flex: "1 1 140px", display: "flex", flexDirection: "column", minWidth: "0" },
  formGroupThird: { flex: "1 1 0", minWidth: "clamp(60px, 10vw, 80px)", display: "flex", flexDirection: "column" },
  label: { fontSize: "clamp(11px, 0.9vw, 12.5px)", fontWeight: 600, color: brand.gray700, marginBottom: "clamp(3px, 0.4vw, 5px)", letterSpacing: "0.01em" },
  required: { color: brand.goldDark },
  input: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.cream, outline: "none", transition: "all 0.2s ease", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", minHeight: "42px" },
  select: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(28px, 3vw, 34px) clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.cream, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", minHeight: "42px" },
  phoneRow: { display: "flex", gap: "clamp(4px, 0.6vw, 8px)", flexWrap: "wrap" },
  phoneCode: { width: "clamp(110px, 18vw, 140px)", padding: "clamp(8px, 1vw, 10px) clamp(22px, 2.5vw, 28px) clamp(8px, 1vw, 10px) clamp(6px, 0.8vw, 8px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, fontSize: "clamp(11px, 0.9vw, 13px)", color: brand.dark, background: brand.cream, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", flexShrink: 0, appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", minHeight: "42px" },
  phoneInput: { flex: "1 1 120px", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.cream, outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", minHeight: "42px" },
  textarea: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.cream, outline: "none", resize: "vertical", fontFamily: "'Inter', sans-serif", minHeight: "80px", boxSizing: "border-box" },
  submitBtn: { width: "100%", padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 2vw, 20px)", borderRadius: "clamp(10px, 1vw, 12px)", border: "none", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, color: brand.dark, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", marginTop: "clamp(12px, 1.5vw, 18px)", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold})`, boxShadow: `0 4px 16px rgba(212,160,23,0.3), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden", minHeight: "48px" },
  btnShine: { position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shine 3s ease-in-out infinite", pointerEvents: "none" },
  terms: { textAlign: "center", fontSize: "clamp(10px, 0.8vw, 11px)", color: brand.mutedText, marginTop: "clamp(8px, 1vw, 14px)", lineHeight: 1.5 },
  focusInput: { borderColor: brand.gold, boxShadow: `0 0 0 3px ${brand.goldBg}` },
  errorInput: { borderColor: brand.red, boxShadow: `0 0 0 3px ${brand.redBg}` },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", marginBottom: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(12px, 1.5vw, 18px)", borderBottom: `1px solid ${brand.borderLight}` },
  formHeaderIcon: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "clamp(8px, 1vw, 12px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  formHeaderSub: { fontSize: "clamp(10px, 0.9vw, 12px)", color: brand.mutedText, marginTop: "2px" },
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "clamp(8px, 0.8vw, 10px)", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 14px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.red, marginBottom: "clamp(10px, 1.5vw, 16px)", display: "flex", alignItems: "center", gap: "8px" },

  // Success
  successWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "clamp(400px, 50vh, 500px)" },
  successImgSide: { width: "42%", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0d1a0d 0%, #0a2e0a 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  successContent: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 40px)", textAlign: "center" },
  successIcon: { width: "clamp(52px, 6vw, 72px)", height: "clamp(52px, 6vw, 72px)", borderRadius: "50%", background: brand.greenBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(12px, 2vw, 20px)" },
  successTitle: { fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.8vw, 8px)" },
  successMsg: { fontSize: "clamp(12px, 1.2vw, 15px)", color: brand.mutedText, lineHeight: 1.7, marginBottom: "clamp(16px, 2vw, 24px)", maxWidth: "400px" },
  successDetails: { background: brand.cream, borderRadius: "clamp(10px, 1vw, 12px)", padding: "clamp(12px, 1.5vw, 16px) clamp(14px, 2vw, 20px)", marginBottom: "clamp(12px, 1.5vw, 20px)", display: "flex", flexDirection: "column", gap: "clamp(4px, 0.6vw, 8px)", width: "100%", maxWidth: "340px" },
  successDetail: { display: "flex", alignItems: "center", gap: "clamp(4px, 0.6vw, 8px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.gray600 },
  successBtn: { padding: "clamp(8px, 1vw, 11px) clamp(16px, 2.5vw, 28px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, background: brand.white, fontSize: "clamp(12px, 1.1vw, 14px)", fontWeight: 600, color: brand.gray600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.25s ease", minHeight: "44px" },
};

// ── Animations ───────────────────────────────────────────────────────────
const keyframes = `
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes shine { 0% { left: -100%; } 50% { left: 120%; } 100% { left: 120%; } }
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

// ══════════════════════════════════════════════════════════════════════════
//  COLLAPSIBLE TEXT COMPONENT
// ══════════════════════════════════════════════════════════════════════════
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

// ══════════════════════════════════════════════════════════════════════════
//  INLINE BOOKING FORM
// ══════════════════════════════════════════════════════════════════════════
function BookingForm({ serviceName = "Hotel Reservation", accentColor = brand.gold, additionalFields = [] }) {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "", checkIn: "", checkOut: "", adults: "1", children: "0", message: "", preferredContact: "email", ...additionalFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}) });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [focused, setFocused] = useState(null);
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setFormError(null);
    try {
      const fp = `${formData.phoneCode} ${formData.phone}`;
      const sd = { _subject: `New Hotel Enquiry - ${formData.firstName} ${formData.lastName}`, "First Name": formData.firstName, "Last Name": formData.lastName, "Email": formData.email, "Phone": fp, "Phone Code": formData.phoneCode, "Check-In": formData.checkIn, "Check-Out": formData.checkOut || "N/S", "Preferred Contact": formData.preferredContact, "Adults": formData.adults, "Children": formData.children, "Service": serviceName, "Message": formData.message || "N/A", "Submitted At": new Date().toLocaleString(), "Page": window.location.href };
      additionalFields.forEach(f => { const v = formData[f.name]; if (v) sd[f.label] = f.type === "select" ? f.options.find(o => o.value === v)?.label || v : v; });
      const r = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(sd) });
      if (!r.ok) { const ed = await r.json().catch(() => ({})); throw new Error(ed.error || "Failed to submit."); }
      setLoading(false); setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "", checkIn: "", checkOut: "", adults: "1", children: "0", message: "", preferredContact: "email", ...additionalFields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}) }); }, 6000);
    } catch (err) { setLoading(false); setFormError(err.message || "Something went wrong."); setTimeout(() => setFormError(null), 8000); }
  };

  const inp = (n) => ({ ...s.input, ...(focused === n ? s.focusInput : {}), ...(formError && !formData[n] && ["firstName","lastName","email","phone","checkIn"].includes(n) ? s.errorInput : {}) });
  const phn = (n) => ({ ...s.phoneInput, ...(focused === n ? s.focusInput : {}) });
  const txa = (n) => ({ ...s.textarea, ...(focused === n ? s.focusInput : {}) });

  if (submitted) return (
    <div style={s.successWrapper} className="form-flex-container">
      <div style={s.successImgSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop" alt="" style={{ ...s.formImageBg, opacity: 0.35 }} /><div style={s.formImageOverlay} /><div style={{ position: "relative", zIndex: 2, textAlign: "center" }}><CheckCircle size={48} color={brand.green} style={{ marginBottom: "16px" }} /><h3 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope',sans-serif" }}>Enquiry Sent!</h3></div></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}><div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div><h3 style={s.successTitle}>Enquiry Submitted!</h3><p style={s.successMsg}>Thank you for your interest. Our team will contact you within <strong>24 hours</strong>.</p><div style={s.successDetails}><div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24h</span></div><div style={s.successDetail}><Users size={14} color={brand.gold} /><span>Consultant assigned</span></div><div style={s.successDetail}><Shield size={14} color={brand.gold} /><span>Data secure</span></div></div><button onClick={() => setSubmitted(false)} style={s.successBtn} onMouseEnter={e => { e.target.style.borderColor = brand.gold; e.target.style.color = brand.goldDark; e.target.style.background = brand.goldBg; }} onMouseLeave={e => { e.target.style.borderColor = brand.borderLight; e.target.style.color = brand.gray600; e.target.style.background = brand.white; }}>Submit Another</button></motion.div>
    </div>
  );

  return (
    <div style={s.formWrapper} className="form-flex-container">
      <div style={s.formImageSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop" alt="Hotel" style={s.formImageBg} /><div style={s.formImageOverlay} /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}><div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>PREMIUM ACCOMMODATION</span></div><div style={s.formImageIcon}><Hotel size={34} color={brand.gold} /></div><h2 style={s.formImageTitle}>Reserve <span style={s.formImageGold}>Your</span><br />Hotel</h2><p style={s.formImageSubtitle}>Comfortable stays in Makkah, Madinah, and worldwide.</p><div style={s.formDivider} /><div style={s.formImageFeatures}>{[{ icon: Shield, text: "Verified Hotels" },{ icon: Wifi, text: "Free WiFi" },{ icon: MapPin, text: "Prime Locations" },{ icon: Coffee, text: "Dining Options" },{ icon: Clock, text: "24/7 Support" }].map((item, i) => { const I = item.icon; return <div key={i} style={s.formImageFeatItem}><div style={s.formImageFeatIcon}><I size={13} color={brand.gold} /></div>{item.text}</div>; })}</div></motion.div></div>
      <div style={s.formSide} className="form-form-side"><motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit}><div style={s.formHeaderStyle}><div style={s.formHeaderIcon}><Send size={20} color={accentColor} /></div><div><div style={s.formHeaderTitle}>Book {serviceName}</div><div style={s.formHeaderSub}>Fill the form below</div></div></div>{formError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}><span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span><span>{formError}</span></motion.div>}<div style={s.formRow}><div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Taofik" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Muyideen" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="muyideen@email.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Check-In <span style={s.required}>*</span></label><input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required style={inp("checkIn")} onFocus={() => setFocused("checkIn")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Check-Out</label><input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} style={inp("checkOut")} onFocus={() => setFocused("checkOut")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Preferred Contact <span style={s.required}>*</span></label><select name="preferredContact" value={formData.preferredContact} onChange={handleChange} style={s.select}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></div></div><div style={s.formRow}><div style={s.formGroupThird}><label style={s.label}>Adults <span style={s.required}>*</span></label><select name="adults" value={formData.adults} onChange={handleChange} style={s.select}>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div style={s.formGroupThird}><label style={s.label}>Children</label><select name="children" value={formData.children} onChange={handleChange} style={s.select}>{[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}</select></div></div>{additionalFields.length > 0 && (<div style={{ ...s.formRow, flexWrap: "wrap" }}>{additionalFields.map(f => (<div key={f.name} style={s.formGroup}><label style={s.label}>{f.label} {f.required && <span style={s.required}>*</span>}</label>{f.type === "select" ? (<select name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} style={s.select}><option value="">Select...</option>{f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>) : (<input type={f.type || "text"} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} placeholder={f.placeholder} style={inp(f.name)} onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} />)}</div>))}</div>)}<div style={{ ...s.formGroup, marginTop: "2px" }}><label style={s.label}>Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any special requests..." style={txa("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div><motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.98 } : {}} style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}><div style={s.btnShine} />{loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Submitting...</> : <><Send size={18} style={{ position: "relative", zIndex: 1 }} /><span style={{ position: "relative", zIndex: 1 }}>Submit Enquiry</span></>}</motion.button><p style={s.terms}>By submitting, you agree to our privacy policy.</p></motion.form></div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function HotelReservation() {
  const { isMobile } = useResponsive();
  const scrollToForm = useCallback(() => { const e = document.getElementById("booking-form"); if (e) { const o = isMobile ? 60 : 80; const t = e.getBoundingClientRect().top + window.scrollY - o; window.scrollTo({ top: t, behavior: "smooth" }); } }, [isMobile]);

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO */}
      <section style={s.heroSection}>
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=800&fit=crop" alt="Hotel" style={s.heroImg} loading="eager" /></div>
        <div style={s.heroContent}><motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={s.badge}><Building2 size={15} color={brand.gold} /><span style={s.badgeText}>Global Hotels</span><div style={s.pulseDot} /></motion.div><h1 style={s.heroTitle}>Hotel <span style={s.heroGradient}>Reservation</span></h1><p style={s.heroSubtitle}>Find and book the perfect accommodation worldwide. From luxury resorts to budget-friendly stays, we have options for every traveller.</p><div style={s.heroBtnRow}><button onClick={scrollToForm} style={s.heroBtn} onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FFE082"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(247,201,72,0.5)"; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = brand.goldLight; e.currentTarget.style.boxShadow = "0 4px 20px rgba(247,201,72,0.35)"; }}><Hotel size={20} />Book Hotel<ArrowDown size={18} /></button></div></motion.div></div>
        <div style={s.heroOverlay} />
      </section>

      {/* CONTENT */}
      <section style={s.contentSection}>
        {/* INTRO */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={s.introCard}>
          <h2 style={s.introTitle}>Hotel Reservation:</h2>
          <p style={s.introSubtitle}>Premium Hotel Accommodation for a Comfortable Stay</p>
          {introParagraphs.map((text, i) => <CollapsibleText key={i} text={text} isMobile={isMobile} />)}
          <p style={s.introClosing}>Relax in comfort. Worship in peace. Stay with confidence through RASOAF Travels and Tours Limited.</p>
        </motion.div>

        {/* CATEGORIES */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Star size={14} />Accommodation Types</span><h2 style={s.sectionTitle}>Choose Your Perfect Stay</h2><p style={s.sectionSubtitle}>From budget-friendly rooms to world-class luxury suites.</p></div>
          <div style={s.categoriesGrid}>{hotelCategories.map((cat, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} style={{ ...s.categoryCard, ...(cat.popular ? s.popularBorder : {}) }} whileHover={!isMobile ? { transform: "translateY(-6px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" } : {}}>{cat.popular && <div style={s.popularBadge}>Most Popular</div>}<div style={s.categoryStars}>{[...Array(cat.stars)].map((_, i) => <Star key={i} size={isMobile ? 15 : 18} color={brand.gold} fill={brand.gold} />)}</div><h3 style={s.categoryName}>{cat.name}</h3><p style={s.categoryDesc}>{cat.desc}</p><p style={{ ...s.categoryDesc, fontSize: "clamp(11px,1vw,13px)", marginBottom: "clamp(8px,1vw,12px)", color: brand.mutedText }}>{cat.description}</p><button onClick={scrollToForm} style={s.categoryBtn} onMouseEnter={!isMobile ? e => e.currentTarget.style.backgroundColor = "#FFE082" : undefined} onMouseLeave={!isMobile ? e => e.currentTarget.style.backgroundColor = brand.goldLight : undefined}>Browse Hotels</button></motion.div>))}</div>
        </motion.div>

        {/* AMENITIES */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: "clamp(40px,6vh,80px)" }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Wifi size={14} />Hotel Features</span><h2 style={s.sectionTitle}>Popular Amenities</h2><p style={s.sectionSubtitle}>Every hotel we partner with offers essential amenities for a comfortable stay.</p></div>
          <div style={s.amenitiesGrid}>{amenities.map((a, idx) => { const I = a.icon; return (<motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} style={s.amenityCard} whileHover={!isMobile ? { borderColor: brand.gold, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" } : {}}><div style={s.amenityIcon}><I size={isMobile ? 17 : 20} color={brand.goldDark} /></div><span style={s.amenityLabel}>{a.label}</span></motion.div>); })}</div>
        </motion.div>

        {/* FORM */}
        <div id="booking-form" style={s.formSection}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={s.formHeader}><span style={s.sectionBadge}><Hotel size={14} />Book Accommodation</span><h2 style={s.sectionTitle}>Reserve Your Hotel</h2><p style={s.sectionSubtitle}>Fill in your details and our specialist will contact you within 24 hours.</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}><BookingForm serviceName="Hotel Reservation" accentColor={brand.gold} additionalFields={hotelFields} /></motion.div>
        </div>
      </section>
    </div>
  );
}