// src/pages/visa/BusinessVisa.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Business Visa Page
// v3: Updated content · All original features preserved · Responsive
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Briefcase, Users, Presentation, ArrowRight, AlertCircle,
  Shield, Clock, Loader2, Sparkles, ChevronRight, ArrowDown, Send,
  ChevronDown, CheckCircle, Building2, FileText, Plane
} from "lucide-react";

// ── Rasoaf Brand Colors ──────────────────────────────────────────────────
const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)", goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111", white: "#ffffff", cream: "#FFF8E6", borderLight: "#E6D5A8",
  mutedText: "#5F5F5F", gray50: "#fafafa", gray200: "#e5e5e5", gray400: "#a3a3a3",
  gray500: "#737373", gray600: "#525252", gray700: "#404040",
  green: "#22c55e", greenBg: "rgba(34, 197, 94, 0.1)", red: "#ef4444", redBg: "rgba(239, 68, 68, 0.1)",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const CONTACT_INFO = { phone: "+234 903 770 7888", email: "info@rasoaf.com" };

const countryCodes = [
  { code: "+234", country: "Nigeria" }, { code: "+1", country: "USA" },
  { code: "+44", country: "UK" }, { code: "+971", country: "UAE" }, { code: "+966", country: "Saudi Arabia" },
];

const businessPurposes = ["Meetings / Conferences", "Trade Exhibitions", "Client Visits", "Contract Negotiations", "Training / Workshops", "Market Research", "Other"];
const destinations = ["United Kingdom", "United States", "Canada", "Australia", "Schengen Area", "United Arab Emirates", "Saudi Arabia", "Other"];

// ── UPDATED BUSINESS VISA DATA ───────────────────────────────────────────
const BUSINESS_VISA = {
  heading: "Business Visa Services",
  intro: "Professional guidance and support throughout the business visa application process for conferences, meetings, trade shows, and more.",
  description: "At RASOAF Travels and Tours Limited, we provide professional guidance and support throughout the business visa application process. We assist clients in preparing and organizing the necessary documentation required for various business-related travel purposes, including:",
  
  purposes: [
    { text: "Attending conferences", icon: Presentation },
    { text: "Participating in business meetings or trade shows", icon: Users },
    { text: "Attending seminars and workshops", icon: Building2 },
    { text: "Conducting market research", icon: Globe },
    { text: "Participating in international training programs or short-term business visits", icon: Plane },
  ],
  
  importantNote: "Please note that a business visa does not authorize employment in the destination country. Individuals intending to work abroad are generally required to obtain a work or employment visa, depending on the immigration regulations of the country concerned.",
  
  expertGuidance: "Our experienced team will guide you through each stage of the application process, ensuring that your documentation is properly prepared and submitted to maximize your chances of a successful outcome.",
  
  usInfo: "For travel to the United States, business visitors typically apply for a B-1 Business Visitor Visa, which permits eligible travelers to engage in approved business activities such as meetings, conferences, negotiations, and training programs. However, visa categories vary from country to country, and our consultants will advise you on the appropriate visa type based on your destination and purpose of travel.",
  
  closing: "At RASOAF Travels and Tours Limited, we are committed to providing reliable guidance and support until your visa application process is completed.",
};

// ── Responsive Hook ──────────────────────────────────────────────────────
function useResponsive() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif", overflowX: "hidden" },

  // Hero
  heroSection: { position: "relative", paddingTop: "clamp(6rem, 10vh, 120px)", paddingBottom: "clamp(3rem, 8vh, 80px)", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)", background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(20px, 3vh, 40px)" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(60px, 8vh, 120px)", background: `linear-gradient(to top, ${brand.cream}, transparent)` },
  heroContent: { maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center", width: "100%" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.25)", borderRadius: "50px", marginBottom: "clamp(14px, 2vw, 20px)" },
  badgeText: { color: brand.goldLight, fontSize: "clamp(11px, 1vw, 13px)", fontWeight: 600, letterSpacing: "0.04em" },
  heroTitle: { fontSize: "clamp(26px, 6vw, 56px)", fontWeight: 800, color: brand.white, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(10px, 1.5vw, 16px)", lineHeight: 1.1, letterSpacing: "-0.02em", paddingInline: "clamp(0px, 2vw, 10px)" },
  heroSubtitle: { fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto clamp(20px, 3vw, 40px)", lineHeight: 1.7, paddingInline: "clamp(0px, 2vw, 10px)" },
  heroBtnRow: { position: "relative", zIndex: 10 },
  heroBtn: { display: "inline-flex", alignItems: "center", gap: "clamp(6px, 1vw, 10px)", padding: "clamp(10px, 1.5vw, 14px) clamp(20px, 3vw, 32px)", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(247,201,72,0.35)", transition: "all 250ms ease", minHeight: "44px" },

  // Content
  contentSection: { maxWidth: "1100px", margin: "-30px auto 0", padding: "0 clamp(12px, 3vw, 20px) clamp(40px, 6vh, 80px)", position: "relative", zIndex: 20, width: "100%", boxSizing: "border-box" },

  // Cards
  card: { backgroundColor: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: `1px solid ${brand.borderLight}`, padding: "clamp(20px, 3vw, 48px)", marginBottom: "clamp(20px, 3vw, 32px)" },
  sectionTitle: { fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(12px, 2vw, 20px)", letterSpacing: "-0.02em" },
  text: { fontSize: "clamp(0.85rem, 1.1vw, 15px)", color: brand.mutedText, lineHeight: 1.8, marginBottom: "clamp(12px, 1.5vw, 20px)" },
  collapseToggle: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "clamp(8px, 1.5vw, 12px) 0", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", color: brand.goldDark, fontSize: "clamp(12px, 1vw, 14px)", fontWeight: 600, minHeight: "44px" },

  // Purpose List
  purposeList: { display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)", marginTop: "clamp(10px, 1.5vw, 16px)" },
  purposeItem: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", padding: "clamp(10px, 1.2vw, 14px) clamp(12px, 1.5vw, 18px)", background: brand.cream, borderRadius: "clamp(8px, 0.8vw, 10px)", fontSize: "clamp(12px, 1vw, 14px)", color: brand.mutedText, border: `1px solid ${brand.borderLight}`, transition: "all 0.3s ease" },
  purposeIcon: { color: brand.goldDark, flexShrink: 0 },

  // Note Box
  noteBox: { background: brand.goldBg, border: `1px solid ${brand.goldBorder}`, borderRadius: "clamp(12px, 1.5vw, 14px)", padding: "clamp(14px, 2vw, 20px)", marginTop: "clamp(16px, 2.5vw, 24px)", display: "flex", gap: "clamp(8px, 1vw, 12px)", alignItems: "flex-start" },
  noteIcon: { color: brand.goldDark, flexShrink: 0, marginTop: "2px" },
  noteText: { fontSize: "clamp(12px, 1vw, 14px)", color: brand.mutedText, lineHeight: 1.6 },

  // CTA Box
  ctaBox: { background: `linear-gradient(135deg, ${brand.goldDark}, ${brand.gold})`, borderRadius: "clamp(16px, 2vw, 24px)", padding: "clamp(24px, 4vw, 40px)", textAlign: "center", color: brand.white, marginTop: "clamp(20px, 3vw, 32px)", position: "relative", overflow: "hidden" },
  ctaOrb1: { position: "absolute", top: "-40px", right: "-20px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", filter: "blur(40px)" },
  ctaOrb2: { position: "absolute", bottom: "-60px", left: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(0,0,0,0.1)", filter: "blur(40px)" },
  ctaContent: { position: "relative", zIndex: 1 },
  ctaTitle: { fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 700, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.8vw, 8px)" },
  ctaText: { fontSize: "clamp(13px, 1.2vw, 16px)", opacity: 0.9, marginBottom: "clamp(16px, 2vw, 24px)" },
  ctaButton: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(10px, 1.5vw, 14px) clamp(20px, 3vw, 32px)", borderRadius: "50px", border: "none", fontSize: "clamp(14px, 1.2vw, 16px)", fontWeight: 600, color: brand.dark, background: brand.white, cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 4px 14px rgba(0,0,0,0.1)", minHeight: "44px" },

  // Back Link
  backLink: { textAlign: "center", paddingBottom: "clamp(24px, 4vh, 40px)" },
  backLinkAnchor: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray500, fontSize: "clamp(12px, 1.1vw, 14px)", textDecoration: "none", transition: "color 0.2s ease", minHeight: "44px", padding: "8px 0" },

  // Form Styles (unchanged)
  formWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "clamp(500px, 60vh, 650px)" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${brand.dark} 0%, #1a1207 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 36px)", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.7) 40%, rgba(212,160,23,0.2) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.6vw, 6px) clamp(10px, 1.2vw, 14px)", background: "rgba(212,160,23,0.15)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "clamp(12px, 2vw, 20px)", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "clamp(48px, 6vw, 72px)", height: "clamp(48px, 6vw, 72px)", borderRadius: "clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.12)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(12px, 2vw, 20px)" },
  formImageTitle: { fontSize: "clamp(18px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 10px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "clamp(11px, 1.1vw, 14px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto clamp(16px, 2.5vw, 28px)", maxWidth: "300px" },
  formDivider: { width: "clamp(40px, 5vw, 60px)", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto clamp(16px, 2vw, 24px)", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "clamp(8px, 1vw, 12px)", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "clamp(6px, 0.8vw, 10px)", fontSize: "clamp(10px, 1vw, 13px)", color: "rgba(255,255,255,0.85)", fontWeight: 500 },
  formImageFeatIcon: { width: "clamp(20px, 2vw, 24px)", height: "clamp(20px, 2vw, 24px)", borderRadius: "clamp(4px, 0.5vw, 6px)", background: "rgba(212,160,23,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },

  formSide: { flex: 1, padding: "clamp(18px, 2.5vw, 36px) clamp(14px, 2vw, 32px)", overflowY: "auto", maxHeight: "clamp(400px, 60vh, 700px)", WebkitOverflowScrolling: "touch" },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "clamp(8px, 1vw, 12px)", marginBottom: "clamp(16px, 2vw, 24px)", paddingBottom: "clamp(12px, 1.5vw, 18px)", borderBottom: `1px solid ${brand.borderLight}` },
  formHeaderIcon: { width: "clamp(36px, 4vw, 44px)", height: "clamp(36px, 4vw, 44px)", borderRadius: "clamp(8px, 1vw, 12px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "clamp(16px, 1.5vw, 19px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif" },
  formHeaderSub: { fontSize: "clamp(10px, 0.9vw, 12px)", color: brand.mutedText, marginTop: "2px" },
  formRow: { display: "flex", gap: "clamp(8px, 1.2vw, 14px)", marginBottom: "clamp(8px, 1.2vw, 15px)", flexWrap: "wrap" },
  formGroup: { flex: "1 1 140px", display: "flex", flexDirection: "column", minWidth: "0" },
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
@keyframes shine { 0% { left: -100%; } 50% { left: 120%; } 100% { left: 120%; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
//  COLLAPSIBLE TEXT
// ══════════════════════════════════════════════════════════════════════════
function CollapsibleText({ text, isMobile }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200;
  const shouldTruncate = isMobile && text && text.length > maxLength;
  const displayText = shouldTruncate && !expanded ? text.slice(0, maxLength) + "..." : text;
  if (!shouldTruncate) return <p style={s.text}>{text}</p>;
  return (
    <div>
      <AnimatePresence mode="wait"><motion.p key={expanded ? "e" : "c"} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} style={s.text}>{displayText}</motion.p></AnimatePresence>
      <button onClick={() => setExpanded(!expanded)} style={s.collapseToggle} aria-label={expanded ? "Show less" : "Read more"} aria-expanded={expanded}><span>{expanded ? "Show Less" : "Read More"}</span><motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={16} /></motion.span></button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  BUSINESS VISA FORM (unchanged)
// ══════════════════════════════════════════════════════════════════════════
function BusinessVisaForm() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "", destination: "", purpose: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [focused, setFocused] = useState(null);
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setFormError(null);
    try {
      const fp = `${formData.phoneCode} ${formData.phone}`;
      const sd = { _subject: `New Business Visa - ${formData.firstName} ${formData.lastName}`, "First Name": formData.firstName, "Last Name": formData.lastName, "Email": formData.email, "Phone": fp, "Destination": formData.destination, "Purpose": formData.purpose, "Company": formData.company || "N/P", "Message": formData.message || "N/A", "Submitted At": new Date().toLocaleString(), "Page": window.location.href };
      const r = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(sd) });
      if (!r.ok) { const ed = await r.json().catch(() => ({})); throw new Error(ed.error || "Failed to submit."); }
      setLoading(false); setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "", destination: "", purpose: "", company: "", message: "" }); }, 6000);
    } catch (err) { setLoading(false); setFormError(err.message || "Something went wrong."); setTimeout(() => setFormError(null), 8000); }
  };

  const inp = (n) => ({ ...s.input, ...(focused === n ? s.focusInput : {}), ...(formError && !formData[n] && ["firstName","lastName","email","phone","destination","purpose"].includes(n) ? s.errorInput : {}) });
  const phn = (n) => ({ ...s.phoneInput, ...(focused === n ? s.focusInput : {}) });

  if (submitted) return (
    <div style={s.successWrapper} className="form-flex-container">
      <div style={s.successImgSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=900&fit=crop" alt="" style={{ ...s.formImageBg, opacity: 0.35 }} /><div style={s.formImageOverlay} /><div style={{ position: "relative", zIndex: 2, textAlign: "center" }}><CheckCircle size={48} color={brand.green} style={{ marginBottom: "16px" }} /><h3 style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 700, color: brand.white, fontFamily: "'Manrope',sans-serif" }}>Enquiry Sent!</h3></div></div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}><div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div><h3 style={s.successTitle}>Business Enquiry Submitted!</h3><p style={s.successMsg}>Your enquiry has been received. Our corporate specialist will contact you within <strong>24 hours</strong>.</p><div style={s.successDetails}><div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24h</span></div><div style={s.successDetail}><Shield size={14} color={brand.gold} /><span>Data secure</span></div></div><button onClick={() => setSubmitted(false)} style={s.successBtn} onMouseEnter={e => { e.target.style.borderColor = brand.gold; e.target.style.color = brand.goldDark; e.target.style.background = brand.goldBg; }} onMouseLeave={e => { e.target.style.borderColor = brand.borderLight; e.target.style.color = brand.gray600; e.target.style.background = brand.white; }}>Submit Another</button></motion.div>
    </div>
  );

  return (
    <div style={s.formWrapper} className="form-flex-container">
      <div style={s.formImageSide} className="form-image-side"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=900&fit=crop" alt="Business" style={s.formImageBg} /><div style={s.formImageOverlay} /><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}><div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>CORPORATE TRAVEL</span></div><div style={s.formImageIcon}><Briefcase size={34} color={brand.gold} /></div><h2 style={s.formImageTitle}>Business <span style={s.formImageGold}>Visa</span><br />Application</h2><p style={s.formImageSubtitle}>Conferences, meetings, trade shows – we handle your business visa.</p><div style={s.formDivider} /><div style={s.formImageFeatures}>{[{ icon: Shield, text: "Licensed Advisers" },{ icon: Users, text: "Expert Guidance" },{ icon: Globe, text: "Multi‑country" }].map((item, i) => { const I = item.icon; return <div key={i} style={s.formImageFeatItem}><div style={s.formImageFeatIcon}><I size={13} color={brand.gold} /></div>{item.text}</div>; })}</div></motion.div></div>
      <div style={s.formSide} className="form-form-side"><motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit}><div style={s.formHeaderStyle}><div style={s.formHeaderIcon}><Send size={20} color={brand.gold} /></div><div><div style={s.formHeaderTitle}>Start Your Business Visa</div><div style={s.formHeaderSub}>Fill the form below</div></div></div>{formError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}><span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span><span>{formError}</span></motion.div>}<div style={s.formRow}><div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Taofik" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Muyideen" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="muyideen@email.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{countryCodes.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Destination <span style={s.required}>*</span></label><select name="destination" value={formData.destination} onChange={handleChange} required style={s.select}><option value="">Select...</option>{destinations.map(d => <option key={d} value={d}>{d}</option>)}</select></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Purpose <span style={s.required}>*</span></label><select name="purpose" value={formData.purpose} onChange={handleChange} required style={s.select}><option value="">Select...</option>{businessPurposes.map(p => <option key={p} value={p}>{p}</option>)}</select></div><div style={s.formGroup}><label style={s.label}>Company</label><input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" style={inp("company")} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} /></div></div><div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any special requirements..." style={s.textarea} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div></div><motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.98 } : {}} style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}><div style={s.btnShine} />{loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Submitting...</> : <><Send size={18} style={{ position: "relative", zIndex: 1 }} /><span style={{ position: "relative", zIndex: 1 }}>Submit Enquiry</span></>}</motion.button><p style={s.terms}>By submitting, you agree to our privacy policy.</p></motion.form></div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function BusinessVisa() {
  const { isMobile } = useResponsive();
  const scrollToForm = useCallback(() => { const e = document.getElementById("visa-booking-form"); if (e) { const o = isMobile ? 60 : 80; const t = e.getBoundingClientRect().top + window.scrollY - o; window.scrollTo({ top: t, behavior: "smooth" }); } }, [isMobile]);

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO */}
      <section style={s.heroSection}>
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=800&fit=crop" alt="Business" style={s.heroImg} loading="eager" /></div>
        <div style={s.heroOverlay} />
        <div style={s.heroContent}><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><span style={s.badge}><Globe size={14} color={brand.gold} /><span style={s.badgeText}>BUSINESS TRAVEL</span></span><h1 style={s.heroTitle}>{BUSINESS_VISA.heading}</h1><p style={s.heroSubtitle}>{BUSINESS_VISA.intro}</p><div style={s.heroBtnRow}><button onClick={scrollToForm} style={s.heroBtn} onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#FFE082"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(247,201,72,0.5)"; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = brand.goldLight; e.currentTarget.style.boxShadow = "0 4px 20px rgba(247,201,72,0.35)"; }}><Briefcase size={20} />Get Started<ArrowDown size={18} /></button></div></motion.div></div>
      </section>

      {/* CONTENT */}
      <section style={s.contentSection}>
        {/* Business Travel Purposes */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
          <h2 style={s.sectionTitle}>Business Travel Purposes</h2>
          <CollapsibleText text={BUSINESS_VISA.description} isMobile={isMobile} />
          <div style={s.purposeList}>
            {BUSINESS_VISA.purposes.map((purpose, idx) => {
              const Icon = purpose.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ delay: idx * 0.06 }} 
                  viewport={{ once: true }} 
                  style={s.purposeItem}
                  whileHover={!isMobile ? { borderColor: brand.gold, transform: "translateX(4px)" } : {}}
                >
                  <Icon size={16} style={s.purposeIcon} />
                  <span>{purpose.text}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
          <h2 style={s.sectionTitle}>Important Information</h2>
          <div style={s.noteBox}>
            <AlertCircle size={20} style={s.noteIcon} />
            <p style={s.noteText}>{BUSINESS_VISA.importantNote}</p>
          </div>
          <CollapsibleText text={BUSINESS_VISA.expertGuidance} isMobile={isMobile} />
          <CollapsibleText text={BUSINESS_VISA.usInfo} isMobile={isMobile} />
        </motion.div>

        {/* Closing */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
          <CollapsibleText text={BUSINESS_VISA.closing} isMobile={isMobile} />
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.ctaBox}>
          <div style={s.ctaOrb1} /><div style={s.ctaOrb2} />
          <div style={s.ctaContent}><h3 style={s.ctaTitle}>Plan Your Business Trip</h3><p style={s.ctaText}>Contact us today for business visa assistance. Call {CONTACT_INFO.phone} or email {CONTACT_INFO.email}</p><button onClick={scrollToForm} style={s.ctaButton} onMouseEnter={!isMobile ? e => e.target.style.backgroundColor = "#FFE082" : undefined} onMouseLeave={!isMobile ? e => e.target.style.backgroundColor = brand.white : undefined}>Get Started <ArrowRight size={16} /></button></div>
        </motion.div>

        {/* FORM */}
        <div id="visa-booking-form" style={{ marginTop: "clamp(24px, 4vw, 40px)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}><BusinessVisaForm /></motion.div>
        </div>
      </section>

      {/* BACK LINK */}
      <div style={s.backLink}><a href="/visa-services" style={s.backLinkAnchor} onMouseEnter={e => e.target.style.color = brand.gold} onMouseLeave={e => e.target.style.color = brand.gray500}><ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Visa Services</a></div>
    </div>
  );
}