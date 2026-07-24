// src/pages/services/FlightBooking.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Flight Booking Page
// v2.1: Removed prices · Rating & flight info instead · Full content preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, Globe, Shield, RefreshCw, Headphones, 
  Star, TrendingUp, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronRight, Building2, Sun, Moon,
  Landmark, Send, Loader2, Sparkles, Users, ArrowDown,
  ChevronDown
} from "lucide-react";
import { Link } from "react-router-dom";

const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)", goldBgHover: "rgba(212, 160, 23, 0.15)",
  goldBorder: "rgba(212, 160, 23, 0.2)", dark: "#111111", white: "#ffffff",
  gray50: "#fafafa", gray100: "#f5f5f5", gray200: "#e5e5e5", gray400: "#a3a3a3",
  gray500: "#737373", gray600: "#525252", gray700: "#404040",
  greenBg: "rgba(34, 197, 94, 0.1)", green: "#22c55e", red: "#ef4444",
  redBg: "rgba(239, 68, 68, 0.1)", cream: "#FFF8E6", borderLight: "#E6D5A8",
  mutedText: "#5F5F5F",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" }, { code: "+1", country: "USA" },
  { code: "+44", country: "UK" }, { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" }, { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" }, { code: "+27", country: "South Africa" },
];

function useResponsive() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setWindowWidth(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { isMobile: windowWidth < 640, isTablet: windowWidth >= 640 && windowWidth < 1024, isDesktop: windowWidth >= 1024 };
}

const flightFields = [
  { name: "tripType", label: "Trip Type", type: "select", required: true,
    options: [{ value: "one-way", label: "One Way" }, { value: "round-trip", label: "Round Trip" }, { value: "multi-city", label: "Multi-City" }]
  },
  { name: "cabinClass", label: "Cabin Class", type: "select", required: true,
    options: [{ value: "economy", label: "Economy" }, { value: "premium-economy", label: "Premium Economy" }, { value: "business", label: "Business" }, { value: "first", label: "First Class" }]
  },
  { name: "departureCity", label: "Departure City", type: "text", required: true, placeholder: "e.g., Lagos, Abuja, Kano" },
  { name: "destinationCity", label: "Destination (Holy City)", type: "select", required: true,
    options: [{ value: "jeddah", label: "Jeddah (Makkah)" }, { value: "madinah", label: "Madinah" }, { value: "both", label: "Both Makkah & Madinah" }]
  }
];

const features = [
  { icon: Plane, title: "Hajj & Umrah Flights", desc: "Direct and connecting flights to Jeddah and Madinah from all major Nigerian cities. Special rates for pilgrims and groups.", color: brand.gold, bg: brand.goldBg, stat: "Hajj" },
  { icon: Shield, title: "Licensed & Approved", desc: "NAHCON approved travel agency. All our flight bookings comply with Saudi aviation and Hajj/Umrah regulations.", color: brand.goldDark, bg: brand.goldBg, stat: "NAHCON" },
  { icon: RefreshCw, title: "Flexible Dates", desc: "Change your travel dates easily as your pilgrimage plans evolve. We accommodate last-minute adjustments.", color: brand.gold, bg: brand.goldBg, stat: "Flex" },
  { icon: Headphones, title: "24/7 Pilgrim Support", desc: "Dedicated support team familiar with Hajj & Umrah requirements. Assistance in English, Arabic, and Hausa.", color: brand.goldDark, bg: brand.goldBg, stat: "24/7" },
];

const holyCities = [
  { name: "Makkah Al-Mukarramah", airport: "King Abdulaziz Intl (JED)", icon: Building2, image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=400&fit=crop", desc: "The holiest city in Islam, home to Masjid al-Haram and the Holy Kaaba. Gateway for Hajj and Umrah pilgrims.", distance: "5h 30m from Lagos", airlines: "8+ airlines", rating: "4.8/5", reviewCount: "500+ Reviews" },
  { name: "Madinah Al-Munawwarah", airport: "Prince Mohammad Bin Abdulaziz (MED)", icon: Landmark, image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=600&h=400&fit=crop", desc: "The City of the Prophet (PBUH), home to Masjid an-Nabawi. A must-visit during your pilgrimage journey.", distance: "6h 15m from Lagos", airlines: "6+ airlines", rating: "4.7/5", reviewCount: "350+ Reviews" },
];

const popularRoutes = [
  { from: "Lagos", to: "Jeddah (Makkah)", duration: "5h 30m", type: "Direct", rating: "4.8/5", reviewCount: "200+ Reviews" },
  { from: "Abuja", to: "Jeddah (Makkah)", duration: "5h 45m", type: "Direct", rating: "4.7/5", reviewCount: "150+ Reviews" },
  { from: "Kano", to: "Madinah", duration: "5h 00m", type: "Direct", rating: "4.6/5", reviewCount: "120+ Reviews" },
  { from: "Lagos", to: "Madinah", duration: "6h 15m", type: "1 Stop", rating: "4.5/5", reviewCount: "90+ Reviews" },
];

const heroStats = [
  { icon: Plane, label: "Pilgrims Flown", value: "15,000+" },
  { icon: Globe, label: "Nigerian Cities", value: "12+" },
  { icon: Star, label: "Years Experience", value: "15+" },
  { icon: Sun, label: "Airlines Partnered", value: "10+" },
];

const benefits = ["Hajj/Umrah Visa Assistance", "Group Booking Discounts", "Zamzam Water Allowance", "Flexible Date Changes"];

const introParagraphs = [
  "At RASOAF Travels and Tours Limited, we are committed to providing professional, reliable, and cost-effective flight booking services. Our experienced ticketing specialists work with leading airlines and industry partners to secure competitive airfares for both domestic and international travellers.",
  "Every booking is processed with accuracy and transparency. Once your reservation is confirmed, you will receive your flight ticket, booking reference, and flight details directly on your mobile phone and via email, making it easy to access your travel information anytime, anywhere.",
  "We embrace modern, paperless travel. There is no need to carry printed tickets, as your electronic ticket (e-ticket) is sufficient for check-in and travel. However, if you require assistance at any stage of your journey, our dedicated support team is always available to provide guidance and help verify your booking when necessary.",
  "To make travel more accessible, we also offer flexible payment options, including instalment payment plans for eligible flight bookings. This allows you to secure your seat while paying over an agreed period, subject to our booking terms and conditions.",
  "Whether you are travelling for business, education, tourism, family visits, Umrah, Hajj, or any other purpose, RASOAF Travels and Tours Limited is your trusted partner for affordable fares, reliable bookings, and exceptional customer service.",
];

const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif", overflowX: "hidden" },
  heroSection: { position: "relative", paddingTop: "clamp(6rem, 10vh, 120px)", paddingBottom: "clamp(3rem, 8vh, 100px)", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)", overflow: "hidden", background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #1a1207 100%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(20px, 3vh, 40px)" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(60px, 8vh, 120px)", background: `linear-gradient(to top, ${brand.cream}, transparent)` },
  heroContent: { maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center", width: "100%" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 20px)", background: "rgba(212, 160, 23, 0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(212, 160, 23, 0.25)", borderRadius: "50px", marginBottom: "clamp(16px, 2vw, 24px)" },
  badgeText: { color: brand.goldLight, fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 600, letterSpacing: "0.04em" },
  pulseDot: { width: "6px", height: "6px", backgroundColor: brand.gold, borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" },
  heroTitle: { fontSize: "clamp(26px, 6vw, 60px)", fontWeight: 800, color: brand.white, marginBottom: "clamp(12px, 2vw, 20px)", fontFamily: "'Manrope', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em", paddingInline: "clamp(0px, 2vw, 20px)" },
  heroGradient: { background: `linear-gradient(to right, ${brand.goldLight}, ${brand.gold}, ${brand.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255, 255, 255, 0.7)", maxWidth: "650px", margin: "0 auto clamp(20px, 3vw, 40px)", lineHeight: 1.7, fontWeight: 400, paddingInline: "clamp(0px, 2vw, 10px)" },
  heroBtnRow: { position: "relative", zIndex: 10 },
  heroBtn: { display: "inline-flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)", padding: "clamp(10px, 1.5vw, 14px) clamp(20px, 3vw, 32px)", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(247, 201, 72, 0.35)", transition: "all 250ms ease", minHeight: "44px" },
  statsRow: { display: "flex", justifyContent: "center", gap: "clamp(16px, 4vw, 50px)", flexWrap: "wrap" },
  statItem: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)" },
  statIcon: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "clamp(8px, 1vw, 12px)", background: "rgba(212, 160, 23, 0.1)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statValue: { fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  statLabel: { fontSize: "clamp(10px, 1vw, 13px)", color: "rgba(212, 160, 23, 0.7)", fontWeight: 400, letterSpacing: "0.02em" },
  contentSection: { maxWidth: "1200px", margin: "-30px auto 0", padding: "0 clamp(12px, 3vw, 20px) clamp(40px, 6vh, 80px)", position: "relative", zIndex: 20, width: "100%", boxSizing: "border-box" },
  introCard: { backgroundColor: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: `1px solid ${brand.borderLight}`, padding: "clamp(20px, 4vw, 48px)", marginBottom: "clamp(40px, 6vh, 60px)" },
  introTitle: { fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem, 3vw, 2rem)", color: brand.dark, marginBottom: "clamp(10px, 1.5vw, 16px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  introSubtitle: { fontSize: "clamp(0.95rem, 1.3vw, 1.125rem)", fontWeight: 600, lineHeight: 1.7, color: brand.dark, marginBottom: "clamp(14px, 2vw, 20px)", fontFamily: "'Inter', sans-serif" },
  introText: { fontSize: "clamp(0.85rem, 1.1vw, 1rem)", lineHeight: 1.75, color: brand.mutedText, marginBottom: "clamp(10px, 1.5vw, 16px)", fontFamily: "'Inter', sans-serif" },
  introClosing: { fontWeight: 600, color: brand.dark, marginTop: "clamp(4px, 0.8vw, 8px)", fontSize: "clamp(0.85rem, 1.1vw, 1rem)" },
  collapseToggle: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "clamp(8px, 1.5vw, 12px) 0", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", color: brand.goldDark, fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 600, minHeight: "44px" },
  sectionHeader: { textAlign: "center", marginBottom: "clamp(28px, 4vw, 48px)" },
  sectionBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.8vw, 6px) clamp(10px, 1.5vw, 16px)", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, marginBottom: "clamp(10px, 1.5vw, 16px)", letterSpacing: "0.02em" },
  sectionTitle: { fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 12px)" },
  sectionSubtitle: { fontSize: "clamp(13px, 1.2vw, 16px)", color: brand.mutedText, maxWidth: "550px", margin: "0 auto", lineHeight: 1.6, paddingInline: "clamp(0px, 2vw, 10px)" },
  holyCitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(260px, 35vw, 300px), 1fr))", gap: "clamp(14px, 2vw, 20px)", marginBottom: "clamp(40px, 6vh, 80px)" },
  holyCityCard: { background: brand.white, borderRadius: "clamp(16px, 2vw, 20px)", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: `1px solid ${brand.borderLight}`, transition: "all 0.4s ease" },
  holyCityImage: { width: "100%", height: "clamp(150px, 22vw, 200px)", objectFit: "cover" },
  holyCityContent: { padding: "clamp(16px, 2.5vw, 24px)" },
  holyCityName: { fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.8vw, 8px)", display: "flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)" },
  holyCityIcon: { width: "clamp(30px, 3.5vw, 36px)", height: "clamp(30px, 3.5vw, 36px)", borderRadius: "clamp(8px, 1vw, 10px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  holyCityDesc: { fontSize: "clamp(12px, 1.1vw, 14px)", color: brand.mutedText, lineHeight: 1.6, marginBottom: "clamp(10px, 1.5vw, 16px)" },
  holyCityInfo: { display: "flex", gap: "clamp(10px, 1.5vw, 16px)", flexWrap: "wrap", marginBottom: "clamp(10px, 1.5vw, 16px)" },
  holyCityInfoItem: { display: "flex", alignItems: "center", gap: "6px", fontSize: "clamp(11px, 1vw, 13px)", color: brand.gray600 },
  // ── RATING ROW (replaces price) ──
  holyCityRatingRow: { display: "flex", alignItems: "center", gap: "8px" },
  holyCityRating: { fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif" },
  holyCityStars: { display: "flex", gap: "2px" },
  holyCityReviews: { fontSize: "clamp(10px, 1vw, 12px)", color: brand.gray500, marginLeft: "4px" },
  featuresGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(220px, 28vw, 250px), 1fr))", gap: "clamp(12px, 1.5vw, 20px)", marginBottom: "clamp(40px, 6vh, 80px)" },
  featureCard: { background: brand.white, borderRadius: "clamp(14px, 1.5vw, 16px)", padding: "clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 28px)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center", transition: "all 0.3s ease", border: `1px solid ${brand.borderLight}`, position: "relative", overflow: "hidden" },
  featureIcon: { width: "clamp(44px, 5vw, 56px)", height: "clamp(44px, 5vw, 56px)", borderRadius: "clamp(10px, 1.5vw, 14px)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(10px, 1.5vw, 16px)", position: "relative", zIndex: 1, transition: "transform 0.3s ease" },
  featureTitle: { fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 700, color: brand.dark, marginBottom: "clamp(4px, 0.8vw, 8px)", fontFamily: "'Manrope', sans-serif", position: "relative", zIndex: 1 },
  featureDesc: { fontSize: "clamp(11px, 1vw, 14px)", color: brand.mutedText, lineHeight: 1.6, position: "relative", zIndex: 1 },
  routesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(220px, 30vw, 260px), 1fr))", gap: "clamp(10px, 1.5vw, 16px)", marginBottom: "clamp(40px, 6vh, 80px)" },
  routeCard: { background: brand.white, borderRadius: "clamp(12px, 1.5vw, 14px)", padding: "clamp(16px, 2.5vw, 24px)", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", border: `1px solid ${brand.borderLight}`, cursor: "pointer", transition: "all 0.3s ease" },
  routeHeader: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", marginBottom: "clamp(10px, 1.5vw, 16px)" },
  routeAvatar: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "50%", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(14px, 1.5vw, 16px)", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif", flexShrink: 0 },
  routePath: { display: "flex", alignItems: "center", gap: "8px", fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 600, color: brand.dark },
  routeDuration: { display: "flex", alignItems: "center", gap: "4px", fontSize: "clamp(10px, 1vw, 12px)", color: brand.gray400, marginTop: "3px" },
  routeFooter: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "4px" },
  // ── RATING ROW for routes (replaces price) ──
  routeRatingRow: { display: "flex", alignItems: "center", gap: "6px" },
  routeRating: { fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif" },
  routeStars: { display: "flex", gap: "1px" },
  routeReviews: { fontSize: "clamp(9px, 0.9vw, 11px)", color: brand.gray500 },
  benefitsBanner: { background: `linear-gradient(135deg, ${brand.goldDark}, ${brand.gold})`, borderRadius: "clamp(16px, 2vw, 24px)", padding: "clamp(24px, 4vw, 56px) clamp(16px, 3vw, 48px)", marginBottom: "clamp(40px, 6vh, 80px)", position: "relative", overflow: "hidden" },
  benefitsBannerOrb1: { position: "absolute", top: "-60px", right: "-40px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.06)", filter: "blur(50px)" },
  benefitsBannerOrb2: { position: "absolute", bottom: "-80px", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", background: "rgba(0, 0, 0, 0.1)", filter: "blur(50px)" },
  benefitsContent: { position: "relative", zIndex: 1 },
  benefitsTitle: { fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.8vw, 8px)", textAlign: "center" },
  benefitsSubtitle: { fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(255, 255, 255, 0.85)", textAlign: "center", marginBottom: "clamp(20px, 3vw, 36px)", lineHeight: 1.5 },
  benefitsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 20vw, 180px), 1fr))", gap: "clamp(10px, 1.5vw, 16px)" },
  benefitItem: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", color: brand.white, fontWeight: 500, fontSize: "clamp(13px, 1.2vw, 15px)" },
  formSection: { maxWidth: "100%", margin: "0 auto" },
  formHeader: { textAlign: "center", marginBottom: "clamp(20px, 3vw, 36px)" },
  backLinkSection: { textAlign: "center", paddingBottom: "clamp(30px, 5vh, 60px)" },
  backLink: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray400, fontWeight: 500, fontSize: "clamp(13px, 1.1vw, 15px)", textDecoration: "none", transition: "color 0.2s ease", minHeight: "44px", padding: "8px 0" },
  orb1: { position: "absolute", top: "-80px", right: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "rgba(212, 160, 23, 0.06)", filter: "blur(60px)" },
  orb2: { position: "absolute", bottom: "-120px", left: "-80px", width: "550px", height: "550px", borderRadius: "50%", background: "rgba(212, 160, 23, 0.04)", filter: "blur(60px)" },
  formWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "clamp(500px, 60vh, 650px)" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${brand.dark} 0%, #1a1207 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 36px)", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.7) 40%, rgba(212,160,23,0.25) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.6vw, 6px) clamp(10px, 1.2vw, 14px)", background: "rgba(212, 160, 23, 0.15)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "clamp(12px, 2vw, 20px)", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "clamp(48px, 6vw, 72px)", height: "clamp(48px, 6vw, 72px)", borderRadius: "clamp(14px, 2vw, 20px)", background: "rgba(212, 160, 23, 0.12)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(12px, 2vw, 20px)" },
  formImageTitle: { fontSize: "clamp(18px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 10px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "clamp(11px, 1.1vw, 14px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto clamp(16px, 2.5vw, 28px)", maxWidth: "300px" },
  formDivider: { width: "clamp(40px, 5vw, 60px)", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto clamp(16px, 2vw, 24px)", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "clamp(6px, 0.8vw, 10px)", fontSize: "clamp(10px, 1vw, 13px)", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 },
  formImageFeatIcon: { width: "clamp(20px, 2vw, 24px)", height: "clamp(20px, 2vw, 24px)", borderRadius: "clamp(4px, 0.5vw, 6px)", background: "rgba(212, 160, 23, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
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
  submitBtn: { width: "100%", padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 2vw, 20px)", borderRadius: "clamp(10px, 1vw, 12px)", border: "none", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, color: brand.dark, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", marginTop: "clamp(12px, 1.5vw, 18px)", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold})`, boxShadow: `0 4px 16px rgba(212, 160, 23, 0.3), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden", minHeight: "48px" },
  btnShine: { position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shine 3s ease-in-out infinite", pointerEvents: "none" },
  terms: { textAlign: "center", fontSize: "clamp(10px, 0.8vw, 11px)", color: brand.mutedText, marginTop: "clamp(8px, 1vw, 14px)", lineHeight: 1.5 },
  focusInput: { borderColor: brand.gold, boxShadow: `0 0 0 3px ${brand.goldBg}` },
  errorInput: { borderColor: brand.red, boxShadow: `0 0 0 3px ${brand.redBg}` },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", marginBottom: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(12px, 1.5vw, 18px)", borderBottom: `1px solid ${brand.borderLight}` },
  formHeaderIcon: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "clamp(8px, 1vw, 12px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  formHeaderSub: { fontSize: "clamp(10px, 0.9vw, 12px)", color: brand.mutedText, marginTop: "2px" },
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "clamp(8px, 0.8vw, 10px)", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 14px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.red, marginBottom: "clamp(10px, 1.5vw, 16px)", display: "flex", alignItems: "center", gap: "8px" },
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

function BookingForm({ serviceName = "Holy Land Flight", accentColor = brand.gold, additionalFields = [] }) {
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
      const sd = { _subject: `New Holy Land Flight Enquiry - ${formData.firstName} ${formData.lastName}`, "First Name": formData.firstName, "Last Name": formData.lastName, "Email": formData.email, "Phone": fp, "Phone Code": formData.phoneCode, "Travel Date": formData.travelDate, "Return Date": formData.returnDate || "N/S", "Preferred Contact": formData.preferredContact, "Adults": formData.adults, "Children (2-11)": formData.children, "Infants (0-2)": formData.infants, "Service": serviceName, "Message": formData.message || "N/A", "Submitted At": new Date().toLocaleString(), "Page": window.location.href };
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
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}><div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div><h3 style={s.successTitle}>Enquiry Submitted!</h3><p style={s.successMsg}>Thank you for your interest. Our team will contact you within <strong>24 hours</strong>.</p><div style={s.successDetails}><div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24h</span></div><div style={s.successDetail}><Users size={14} color={brand.gold} /><span>Consultant assigned</span></div><div style={s.successDetail}><Shield size={14} color={brand.gold} /><span>Data secure</span></div></div><button onClick={() => setSubmitted(false)} style={s.successBtn} onMouseEnter={e => { e.target.style.borderColor = brand.gold; e.target.style.color = brand.goldDark; e.target.style.background = brand.goldBg; }} onMouseLeave={e => { e.target.style.borderColor = brand.borderLight; e.target.style.color = brand.gray600; e.target.style.background = brand.white; }}>Submit Another</button></motion.div>
    </div>
  );

  return (
    <div style={s.formWrapper} className="form-flex-container">
      <div style={s.formImageSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=900&fit=crop" alt="Holy Mosque" style={s.formImageBg} /><div style={s.formImageOverlay} /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}><div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>TRUSTED PILGRIMAGE PARTNER</span></div><div style={s.formImageIcon}><Plane size={34} color={brand.gold} /></div><h2 style={s.formImageTitle}>Book <span style={s.formImageGold}>Holy Land</span><br />Flight</h2><p style={s.formImageSubtitle}>Trusted by thousands of pilgrims. Direct flights to Makkah and Madinah.</p><div style={s.formDivider} /><div style={s.formImageFeatures}>{[{ icon: Shield, text: "NAHCON Approved" },{ icon: Plane, text: "Direct Flights" },{ icon: Users, text: "Group Discounts" },{ icon: Globe, text: "Visa Assistance" },{ icon: Clock, text: "24/7 Support" }].map((item, i) => { const I = item.icon; return <div key={i} style={s.formImageFeatItem}><div style={s.formImageFeatIcon}><I size={13} color={brand.gold} /></div>{item.text}</div>; })}</div></motion.div></div>
      <div style={s.formSide} className="form-form-side"><motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit}><div style={s.formHeaderStyle}><div style={s.formHeaderIcon}><Send size={20} color={accentColor} /></div><div><div style={s.formHeaderTitle}>Book {serviceName}</div><div style={s.formHeaderSub}>Fill the form below</div></div></div>{formError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}><span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span><span>{formError}</span></motion.div>}<div style={s.formRow}><div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Ahmad" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Jubril" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ahmad@example.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Travel Date <span style={s.required}>*</span></label><input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required style={inp("travelDate")} onFocus={() => setFocused("travelDate")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Return Date</label><input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} style={inp("returnDate")} onFocus={() => setFocused("returnDate")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Preferred Contact <span style={s.required}>*</span></label><select name="preferredContact" value={formData.preferredContact} onChange={handleChange} style={s.select}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></div></div><div style={s.formRowTriple}><div style={s.formGroupThird}><label style={s.label}>Adults <span style={s.required}>*</span></label><select name="adults" value={formData.adults} onChange={handleChange} style={s.select}>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div style={s.formGroupThird}><label style={s.label}>Children</label><select name="children" value={formData.children} onChange={handleChange} style={s.select}>{[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}</select></div><div style={s.formGroupThird}><label style={s.label}>Infants</label><select name="infants" value={formData.infants} onChange={handleChange} style={s.select}>{[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}</select></div></div>{additionalFields.length > 0 && (<div style={{ ...s.formRow, flexWrap: "wrap" }}>{additionalFields.map(f => (<div key={f.name} style={s.formGroup}><label style={s.label}>{f.label} {f.required && <span style={s.required}>*</span>}</label>{f.type === "select" ? (<select name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} style={s.select}><option value="">Select...</option>{f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>) : (<input type={f.type || "text"} name={f.name} value={formData[f.name]} onChange={handleChange} required={f.required} placeholder={f.placeholder} style={inp(f.name)} onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)} />)}</div>))}</div>)}<div style={{ ...s.formGroup, marginTop: "2px" }}><label style={s.label}>Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any special requests..." style={txa("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div><motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.98 } : {}} style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}><div style={s.btnShine} />{loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Submitting...</> : <><Send size={18} style={{ position: "relative", zIndex: 1 }} /><span style={{ position: "relative", zIndex: 1 }}>Submit Enquiry</span></>}</motion.button><p style={s.terms}>By submitting, you agree to our privacy policy. We'll never share your information.</p></motion.form></div>
    </div>
  );
}

export default function FlightBooking() {
  const { isMobile } = useResponsive();
  const scrollToForm = useCallback(() => { const e = document.getElementById("booking-form"); if (e) { const o = isMobile ? 60 : 80; const t = e.getBoundingClientRect().top + window.scrollY - o; window.scrollTo({ top: t, behavior: "smooth" }); } }, [isMobile]);

  const renderStars = (count) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={isMobile ? 10 : 12} color={i < Math.floor(count) ? brand.gold : brand.gray200} fill={i < Math.floor(count) ? brand.gold : "none"} />
  ));

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO — unchanged */}
      <section style={s.heroSection}>
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop" alt="Holy Mosque" style={s.heroImg} loading="eager" /></div>
        <motion.div animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={s.orb1} />
        <motion.div animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.05, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} style={s.orb2} />
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={s.badge}><Building2 size={15} color={brand.gold} /><span style={s.badgeText}>Hajj & Umrah Flights</span><div style={s.pulseDot} /></motion.div>
            <h1 style={s.heroTitle}>Fly to the <span style={s.heroGradient}>Holy Lands</span></h1>
            <p style={s.heroSubtitle}>Book your sacred journey with confidence. Direct and connecting flights to Jeddah and Madinah from across Nigeria.</p>
            <div style={s.heroBtnRow}><button onClick={scrollToForm} style={s.heroBtn} onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FFE082"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(247,201,72,0.5)"; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = brand.goldLight; e.currentTarget.style.boxShadow = "0 4px 20px rgba(247,201,72,0.35)"; }}><Plane size={20} />Book Flight<ArrowDown size={18} /></button></div>
            <div style={s.statsRow}>{heroStats.map((st, i) => { const I = st.icon; return <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} style={s.statItem}><div style={s.statIcon}><I size={20} color={brand.gold} /></div><div><div style={s.statValue}>{st.value}</div><div style={s.statLabel}>{st.label}</div></div></motion.div>; })}</div>
          </motion.div>
        </div>
        <div style={s.heroOverlay} />
      </section>

      <section style={s.contentSection}>
        {/* INTRO — unchanged */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={s.introCard}>
          <h2 style={s.introTitle}>FLIGHT Booking:</h2>
          <p style={s.introSubtitle}>Reliable and Affordable Flight Booking Services</p>
          {introParagraphs.map((text, i) => <CollapsibleText key={i} text={text} isMobile={isMobile} />)}
          <p style={s.introClosing}>Book with confidence. Travel with ease. Fly with RASOAF Travels and Tours Limited.</p>
        </motion.div>

        {/* HOLY CITIES — Rating instead of price */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: "clamp(40px,6vh,80px)" }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><Landmark size={14} />Holy Destinations</span><h2 style={s.sectionTitle}>Fly to the Blessed Cities</h2><p style={s.sectionSubtitle}>Flights to both Jeddah (Makkah) and Madinah with flexible itineraries.</p></div>
          <div style={s.holyCitiesGrid}>{holyCities.map((city, i) => { const I = city.icon; const ratingNum = parseFloat(city.rating); return <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }} style={s.holyCityCard} whileHover={!isMobile ? { transform: "translateY(-6px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" } : {}}><img src={city.image} alt={city.name} style={s.holyCityImage} /><div style={s.holyCityContent}><div style={s.holyCityName}><div style={s.holyCityIcon}><I size={18} color={brand.goldDark} /></div>{city.name}</div><p style={s.holyCityDesc}>{city.desc}</p><div style={s.holyCityInfo}><div style={s.holyCityInfoItem}><Clock size={14} color={brand.gold} />{city.distance}</div><div style={s.holyCityInfoItem}><Plane size={14} color={brand.gold} />{city.airlines}</div></div><div style={s.holyCityRatingRow}><span style={s.holyCityRating}>{city.rating}</span><div style={s.holyCityStars}>{renderStars(ratingNum)}</div><span style={s.holyCityReviews}>{city.reviewCount}</span></div></div></motion.div>; })}</div>
        </motion.div>

        {/* FEATURES — unchanged */}
        <div style={s.featuresGrid}>{features.map((item, i) => { const I = item.icon; return <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={s.featureCard} whileHover={!isMobile ? { transform: "translateY(-6px)", boxShadow: "0 16px 48px rgba(0,0,0,0.1)", borderColor: brand.gold } : {}}><div style={{ position: "absolute", top: "16px", right: "16px", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: brand.goldBg, fontFamily: "'Manrope',sans-serif", opacity: 0.5, lineHeight: 1 }}>{item.stat}</div><div style={{ ...s.featureIcon, backgroundColor: item.bg }}><I size={isMobile ? 22 : 28} color={item.color} /></div><h3 style={s.featureTitle}>{item.title}</h3><p style={s.featureDesc}>{item.desc}</p></motion.div>; })}</div>

        {/* ROUTES — Rating instead of price */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: "clamp(40px,6vh,80px)" }}>
          <div style={s.sectionHeader}><span style={s.sectionBadge}><TrendingUp size={14} />Popular Routes</span><h2 style={s.sectionTitle}>Most Booked Holy Land Flights</h2><p style={s.sectionSubtitle}>Trusted routes from Nigerian cities to Makkah and Madinah.</p></div>
          <div style={s.routesGrid}>{popularRoutes.map((r, i) => { const ratingNum = parseFloat(r.rating); return <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={s.routeCard} whileHover={!isMobile ? { transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)", borderColor: brand.gold } : {}}><div style={s.routeHeader}><div style={s.routeAvatar}>{r.from.charAt(0)}</div><div style={{ flex: 1 }}><div style={s.routePath}>{r.from}<ArrowRight size={14} color={brand.gold} />{r.to}</div><div style={s.routeDuration}><Clock size={12} />{r.duration}<span style={{ marginLeft: "8px", padding: "2px 8px", background: brand.goldBg, borderRadius: "4px", fontSize: "10px", fontWeight: 600, color: brand.goldDark }}>{r.type}</span></div></div></div><div style={s.routeFooter}><div style={s.routeRatingRow}><span style={s.routeRating}>{r.rating}</span><div style={s.routeStars}>{renderStars(ratingNum)}</div></div><span style={s.routeReviews}>{r.reviewCount}</span></div></motion.div>; })}</div>
        </motion.div>

        {/* BENEFITS — unchanged */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.benefitsBanner}>
          <div style={s.benefitsBannerOrb1} /><div style={s.benefitsBannerOrb2} /><div style={s.benefitsContent}><h3 style={s.benefitsTitle}>Why Book With Us?</h3><p style={s.benefitsSubtitle}>Every booking includes complete pilgrimage support.</p><div style={s.benefitsGrid}>{benefits.map((b, i) => <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} viewport={{ once: true }} style={s.benefitItem}><CheckCircle size={20} color="#ffffff" />{b}</motion.div>)}</div></div>
        </motion.div>

        {/* FORM — unchanged */}
        <div id="booking-form" style={s.formSection}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.formHeader}><span style={s.sectionBadge}><Plane size={14} />Book Your Journey</span><h2 style={s.sectionTitle}>Reserve Your Holy Land Flight</h2><p style={s.sectionSubtitle}>Fill in your details and our specialist will contact you within 24 hours.</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}><BookingForm serviceName="Holy Land Flight" accentColor={brand.gold} additionalFields={flightFields} /></motion.div>
        </div>
      </section>

      <div style={s.backLinkSection}><Link to="/services" style={s.backLink} onMouseEnter={e => e.target.style.color = brand.gold} onMouseLeave={e => e.target.style.color = brand.gray400}><ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />Back to All Services</Link></div>
    </div>
  );
}