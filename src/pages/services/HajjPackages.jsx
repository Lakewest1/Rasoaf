// src/pages/services/HajjPackages.jsx
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Star, Shield, Users, Hotel, Bus, Utensils, 
  CheckCircle, Clock, MapPin, Send, Loader2, 
  Sparkles, Plane, ChevronRight, Landmark, Sun,
  AlertCircle, Heart, Compass, Church, Hand, ArrowDown
} from "lucide-react";
import { Link } from "react-router-dom";

// Rasoaf Brand Colors
const brand = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)",
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
};

// FORMSPREE CONFIGURATION
// Replace with your actual Formspree endpoint for Hajj
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-hajj-form-id-here";

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

// Data
const packages = [
  {
    name: "Economy Hajj",
    price: "₦3,500,000",
    duration: "30 Days",
    description: "Comfortable Hajj experience with essential services and 3-star accommodations.",
    features: [
      "3-Star Hotels in Makkah & Madinah",
      "Shared Room (4-6 persons)",
      "Group Transportation",
      "Basic Meal Plan",
      "Visa Processing",
      "Group Guide"
    ],
    color: "#059669",
    bgLight: "rgba(5, 150, 105, 0.08)",
  },
  {
    name: "Premium Hajj",
    price: "₦5,800,000",
    duration: "35 Days",
    description: "Enhanced Hajj package with 4-star hotels and personalized services.",
    features: [
      "4-Star Hotels near Haram",
      "Triple Sharing Room",
      "Private Bus Transport",
      "Full Board Meals",
      "Premium Visa Service",
      "Dedicated Guide",
      "Zamzam Water (5L)",
      "Welcome Kit"
    ],
    color: "#D4A017",
    bgLight: "rgba(212, 160, 23, 0.08)",
    popular: true
  },
  {
    name: "VIP Hajj",
    price: "₦9,500,000",
    duration: "25-40 Days",
    description: "Ultimate Hajj experience with 5-star luxury and exclusive services.",
    features: [
      "5-Star Luxury Hotels",
      "Double Sharing Room",
      "Private Car Service",
      "Gourmet Dining",
      "Express Visa Processing",
      "Personal Guide",
      "Zamzam Water (10L)",
      "Luxury Welcome Kit",
      "Private Tent in Mina",
      "Fast-Track Services"
    ],
    color: "#991B1B",
    bgLight: "rgba(153, 27, 27, 0.08)",
  }
];

const hajjFields = [
  {
    name: "packageType",
    label: "Preferred Package",
    type: "select",
    required: true,
    options: [
      { value: "economy", label: "Economy Hajj - ₦3.5M" },
      { value: "premium", label: "Premium Hajj - ₦5.8M" },
      { value: "vip", label: "VIP Hajj - ₦9.5M" },
    ]
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    required: true,
    placeholder: "e.g., Nigerian"
  }
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

// Styles
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, #fffbeb 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif" },
  
  // Hero
  heroSection: { position: "relative", paddingTop: "120px", paddingBottom: "100px", paddingLeft: "20px", paddingRight: "20px", overflow: "hidden", background: `linear-gradient(135deg, ${brand.dark} 0%, #1a1a1a 40%, #2d1a0a 100%)` },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, #fffbeb, transparent)" },
  heroContent: { maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", background: "rgba(212, 160, 23, 0.12)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "24px" },
  badgeText: { color: brand.goldLight, fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em" },
  heroTitle: { fontSize: "clamp(32px, 6vw, 58px)", fontWeight: 800, color: brand.white, marginBottom: "20px", fontFamily: "'Manrope', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em" },
  heroGradient: { background: `linear-gradient(to right, ${brand.goldLight}, #f59e0b, ${brand.goldDark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "18px", color: "rgba(255, 255, 255, 0.7)", maxWidth: "650px", margin: "0 auto 0", lineHeight: 1.7, fontWeight: 400 },
  
  // Content
  contentSection: { maxWidth: "1200px", margin: "-40px auto 0", padding: "0 20px 80px", position: "relative", zIndex: 20 },
  
  // NEW: Introduction Section
  introSection: { marginBottom: "80px" },
  introCard: { background: brand.white, borderRadius: "24px", padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)", boxShadow: "0 8px 40px rgba(0,0,0,0.06)", border: `1px solid ${brand.gray200}`, position: "relative" },
  introLabel: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "13px", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.02em" },
  introTitle: { fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "12px", lineHeight: 1.3 },
  introSubtitle: { fontSize: "16px", color: brand.gray500, marginBottom: "28px", lineHeight: 1.6, maxWidth: "700px" },
  introText: { fontSize: "15px", color: brand.gray600, lineHeight: 1.8, marginBottom: "18px" },
  introHighlight: { background: brand.goldBg, borderLeft: `3px solid ${brand.gold}`, borderRadius: "0 12px 12px 0", padding: "20px 24px", marginTop: "28px" },
  introHighlightText: { fontSize: "15px", color: brand.gray700, fontWeight: 500, lineHeight: 1.7, fontStyle: "italic" },
  
  // NEW: Scroll to packages button on banner
  scrollBtnContainer: { display: "flex", justifyContent: "center", marginTop: "32px" },
  scrollBtn: { 
    display: "inline-flex", alignItems: "center", gap: "10px", 
    padding: "14px 32px", borderRadius: "50px", border: "none",
    fontSize: "15px", fontWeight: 600, color: brand.white, cursor: "pointer",
    fontFamily: "'Inter', sans-serif", transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
    background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold} 50%, ${brand.goldDark})`,
    boxShadow: `0 4px 20px rgba(212, 160, 23, 0.35), 0 2px 0 ${brand.goldDark}`,
    position: "relative", overflow: "hidden"
  },
  scrollBtnIcon: { 
    display: "inline-flex", 
    animation: "bounceDown 2s ease-in-out infinite" 
  },
  
  // Journey Steps
  journeySection: { marginBottom: "80px" },
  journeyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  journeyCard: { background: brand.white, borderRadius: "18px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: `1px solid ${brand.gray200}`, transition: "all 0.3s ease", display: "flex", gap: "16px", alignItems: "flex-start" },
  journeyIconWrap: { width: "48px", height: "48px", borderRadius: "14px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  journeyContent: { flex: 1 },
  journeyTitle: { fontSize: "16px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "4px" },
  journeyDesc: { fontSize: "13px", color: brand.gray500, lineHeight: 1.6 },
  
  // Packages
  packagesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "80px" },
  packageCard: { background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", border: `1px solid ${brand.gray200}`, transition: "all 0.4s ease", position: "relative" },
  packageCardPopular: { background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 12px 40px rgba(212,160,23,0.15)", border: `2px solid ${brand.gold}`, transition: "all 0.4s ease", position: "relative" },
  popularBadge: { position: "absolute", top: "16px", right: "16px", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold})`, color: brand.dark, padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.02em", zIndex: 2, boxShadow: `0 2px 8px rgba(212,160,23,0.3)` },
  packageContent: { padding: "32px 28px" },
  packageName: { fontSize: "24px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "8px" },
  packageDesc: { fontSize: "14px", color: brand.gray500, lineHeight: 1.6, marginBottom: "20px" },
  packagePriceRow: { display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "20px" },
  packagePrice: { fontSize: "38px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1 },
  packagePerPerson: { fontSize: "14px", color: brand.gray500 },
  packageDuration: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: brand.gray600, marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${brand.gray200}` },
  featuresList: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" },
  featureItem: { display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: brand.gray600, lineHeight: 1.5 },
  featureCheck: { color: brand.green, flexShrink: 0, marginTop: "1px" },
  selectBtn: { display: "block", width: "100%", padding: "14px", borderRadius: "12px", border: "none", fontSize: "15px", fontWeight: 600, color: brand.white, cursor: "pointer", textAlign: "center", textDecoration: "none", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease" },
  
  // Section Header
  sectionHeader: { textAlign: "center", marginBottom: "48px" },
  sectionBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "13px", fontWeight: 600, marginBottom: "16px", letterSpacing: "0.02em" },
  sectionTitle: { fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "12px" },
  sectionSubtitle: { fontSize: "16px", color: brand.gray500, maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 },
  
  // Why Choose Us
  whyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "80px" },
  whyCard: { background: brand.white, borderRadius: "18px", padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", border: `1px solid ${brand.gray200}`, textAlign: "center", transition: "all 0.3s ease" },
  whyIcon: { width: "52px", height: "52px", borderRadius: "14px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
  whyTitle: { fontSize: "16px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "6px" },
  whyDesc: { fontSize: "13px", color: brand.gray500, lineHeight: 1.5 },
  
  // Form Section
  formSection: { maxWidth: "100%", margin: "0 auto" },
  formHeader: { textAlign: "center", marginBottom: "36px" },
  
  // Back Link
  backLinkSection: { textAlign: "center", paddingBottom: "60px" },
  backLink: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray400, fontWeight: 500, fontSize: "15px", textDecoration: "none", transition: "color 0.2s ease" },

  // Inline Form Styles
  formWrapper: { display: "flex", background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.gray200}`, minHeight: "650px" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #0d1a0d 0%, #1a0a05 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 36px", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,26,13,0.9) 0%, rgba(26,10,5,0.75) 40%, rgba(212,160,23,0.3) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "rgba(212, 160, 23, 0.18)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "20px", fontSize: "12px", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "72px", height: "72px", borderRadius: "20px", background: "rgba(212, 160, 23, 0.15)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
  formImageTitle: { fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "10px", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: "300px" },
  formDivider: { width: "60px", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto 24px", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 500, lineHeight: 1.4 },
  formImageFeatIcon: { width: "24px", height: "24px", borderRadius: "6px", background: "rgba(212, 160, 23, 0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formSide: { flex: 1, padding: "36px 32px", overflowY: "auto", maxHeight: "700px" },
  formRow: { display: "flex", gap: "14px", marginBottom: "15px" },
  formRowTriple: { display: "flex", gap: "10px", marginBottom: "15px" },
  formGroup: { flex: 1, display: "flex", flexDirection: "column" },
  formGroupThird: { flex: "1 1 0", minWidth: "80px", display: "flex", flexDirection: "column" },
  label: { fontSize: "12.5px", fontWeight: 600, color: brand.gray700, marginBottom: "5px", letterSpacing: "0.01em" },
  required: { color: brand.goldDark },
  input: { width: "100%", padding: "10px 13px", borderRadius: "10px", border: `1px solid ${brand.gray200}`, fontSize: "14px", color: brand.dark, background: brand.white, outline: "none", transition: "all 0.2s ease", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  select: { width: "100%", padding: "10px 34px 10px 13px", borderRadius: "10px", border: `1px solid ${brand.gray200}`, fontSize: "14px", color: brand.dark, background: brand.white, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", boxSizing: "border-box", appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" },
  phoneRow: { display: "flex", gap: "8px" },
  phoneCode: { width: "140px", padding: "10px 28px 10px 8px", borderRadius: "10px", border: `1px solid ${brand.gray200}`, fontSize: "13px", color: brand.dark, background: brand.white, outline: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", flexShrink: 0, appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" },
  phoneInput: { flex: 1, padding: "10px 13px", borderRadius: "10px", border: `1px solid ${brand.gray200}`, fontSize: "14px", color: brand.dark, background: brand.white, outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" },
  textarea: { width: "100%", padding: "10px 13px", borderRadius: "10px", border: `1px solid ${brand.gray200}`, fontSize: "14px", color: brand.dark, background: brand.white, outline: "none", resize: "vertical", fontFamily: "'Inter', sans-serif", minHeight: "80px", boxSizing: "border-box" },
  submitBtn: { width: "100%", padding: "14px 20px", borderRadius: "12px", border: "none", fontSize: "15px", fontWeight: 600, color: brand.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", marginTop: "18px", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold} 50%, ${brand.goldDark})`, boxShadow: `0 4px 16px rgba(212, 160, 23, 0.3), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden" },
  btnShine: { position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shine 3s ease-in-out infinite", pointerEvents: "none" },
  terms: { textAlign: "center", fontSize: "11px", color: brand.gray400, marginTop: "14px", lineHeight: 1.5 },
  focusInput: { borderColor: brand.gold, boxShadow: `0 0 0 3px ${brand.goldBg}` },
  errorInput: { borderColor: brand.red, boxShadow: `0 0 0 3px ${brand.redBg}` },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", paddingBottom: "18px", borderBottom: `1px solid ${brand.gray200}` },
  formHeaderIcon: { width: "44px", height: "44px", borderRadius: "12px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "19px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", lineHeight: 1.2 },
  formHeaderSub: { fontSize: "12px", color: brand.gray500, marginTop: "2px" },
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: brand.red, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },

  // Success
  successWrapper: { display: "flex", background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.gray200}`, minHeight: "500px" },
  successImgSide: { width: "42%", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #0d1a0d 0%, #0a2e0a 100%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  successContent: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", textAlign: "center" },
  successIcon: { width: "72px", height: "72px", borderRadius: "50%", background: brand.greenBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" },
  successTitle: { fontSize: "24px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "8px" },
  successMsg: { fontSize: "15px", color: brand.gray500, lineHeight: 1.7, marginBottom: "24px", maxWidth: "400px" },
  successDetails: { background: brand.gray50, borderRadius: "12px", padding: "16px 20px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px", width: "100%", maxWidth: "340px" },
  successDetail: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: brand.gray600 },
  successBtn: { padding: "11px 28px", borderRadius: "10px", border: `1px solid ${brand.gray200}`, background: brand.white, fontSize: "14px", fontWeight: 600, color: brand.gray600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.25s ease" },
};

// Animations
const keyframes = `
@keyframes shine { 0% { left: -100%; } 50% { left: 120%; } 100% { left: 120%; } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes bounceDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
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

// ==========================================================================
//  INLINE BOOKING FORM (with Formspree)
// ==========================================================================
function HajjBookingForm({ additionalFields = [] }) {
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
        _subject: `New Hajj Package Enquiry - ${formData.firstName} ${formData.lastName}`,
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
        "Service": "Hajj Package",
        "Message": formData.message || "No additional message",
        "Submitted At": new Date().toLocaleString(),
        "Page": window.location.href,
      };

      additionalFields.forEach(f => {
        const value = formData[f.name];
        if (value) {
          submissionData[f.label] = f.type === "select" 
            ? f.options.find(o => o.value === value)?.label || value 
            : value;
        }
      });

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
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
  const phn = (name) => ({ ...s.phoneInput, ...(focused === name ? s.focusInput : {}) });
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
          <p style={s.successMsg}>Thank you for your interest in our Hajj Package. Our Hajj specialist will contact you within <strong>24 hours</strong> with full details.</p>
          <div style={s.successDetails}>
            <div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24 hours</span></div>
            <div style={s.successDetail}><Users size={14} color={brand.gold} /><span>Dedicated Hajj consultant assigned</span></div>
            <div style={s.successDetail}><Shield size={14} color={brand.gold} /><span>NAHCON approved service</span></div>
          </div>
          <button onClick={() => setSubmitted(false)} style={s.successBtn}
            onMouseEnter={e => { e.target.style.borderColor = brand.gold; e.target.style.color = brand.goldDark; e.target.style.background = brand.goldBg; }}
            onMouseLeave={e => { e.target.style.borderColor = brand.gray200; e.target.style.color = brand.gray600; e.target.style.background = brand.white; }}
          >Submit Another Enquiry</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={s.formWrapper} className="form-flex-container">
      <div style={s.formImageSide} className="form-image-side">
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600&h=900&fit=crop" alt="Holy Kaaba" style={s.formImageBg} />
        <div style={s.formImageOverlay} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}>
          <div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>SACRED JOURNEY 2026</span></div>
          <div style={s.formImageIcon}><Landmark size={34} color={brand.gold} /></div>
          <h2 style={s.formImageTitle}>Reserve Your <span style={s.formImageGold}>Hajj</span><br />Package</h2>
          <p style={s.formImageSubtitle}>Embark on the blessed pilgrimage with confidence. NAHCON approved, complete packages from Nigeria.</p>
          <div style={s.formDivider} />
          <div style={s.formImageFeatures}>
            {[
              { icon: Shield, text: "NAHCON Approved & Licensed" },
              { icon: Hotel, text: "Premium Accommodations" },
              { icon: Bus, text: "Seamless Transportation" },
              { icon: Users, text: "Experienced Guides & Scholars" },
              { icon: Clock, text: "24/7 Pilgrim Support" },
            ].map((item, i) => {
              const I = item.icon;
              return <div key={i} style={s.formImageFeatItem}><div style={s.formImageFeatIcon}><I size={13} color={brand.gold} /></div>{item.text}</div>;
            })}
          </div>
        </motion.div>
      </div>

      <div style={s.formSide} className="form-form-side">
        <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit}>
          <div style={s.formHeaderStyle}>
            <div style={s.formHeaderIcon}><Send size={20} color={brand.gold} /></div>
            <div><div style={s.formHeaderTitle}>Book Hajj Package</div><div style={s.formHeaderSub}>Fill the form below to get started</div></div>
          </div>
          {formError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} /><span>{formError}</span>
            </motion.div>
          )}
          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Ismail" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div>
            <div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Musa" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div>
          </div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email Address <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="ismail@example.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div>
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

// ==========================================================================
//  MAIN HAJJ PACKAGES PAGE
// ==========================================================================
export default function HajjPackages() {
  const scrollToPackages = useCallback(() => {
    const el = document.getElementById("packages-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO */}
      <section style={s.heroSection}>
        <div style={s.heroBg}>
          <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop" alt="Hajj pilgrimage - Holy Kaaba" style={s.heroImg} loading="eager" />
        </div>
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }} style={s.badge}>
              <span style={{ fontSize: "16px" }}>✦</span>
              <span style={s.badgeText}>Sacred Journey</span>
              <span style={{ fontSize: "16px" }}>✦</span>
            </motion.div>
            <h1 style={s.heroTitle}>Hajj Packages <span style={s.heroGradient}>2026</span></h1>
            <p style={s.heroSubtitle}>Experience a Stress-Free and Affordable Hajj with RASOAF Travels and Tours Limited</p>
          </motion.div>
        </div>
        <div style={s.heroOverlay} />

          {/* NEW: Scroll to Packages Button */}
            <div style={s.scrollBtnContainer}>
              <motion.button
                type="button"
                onClick={scrollToPackages}
                style={s.scrollBtn}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 28px rgba(212,160,23,0.45), 0 3px 0 #A07000" }}
                whileTap={{ scale: 0.97 }}
                aria-label="Scroll to Choose Your Hajj Package section"
              >
                <span style={{ position: "relative", zIndex: 1 }}>Choose Your Hajj Package</span>
                <span style={{ ...s.scrollBtnIcon, position: "relative", zIndex: 1 }}>
                  <ArrowDown size={18} />
                </span>
              </motion.button>
            </div>
      </section>

      {/* CONTENT */}
      <section style={s.contentSection}>

        {/* NEW: INTRODUCTION */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={s.introSection}>
          <div style={s.introCard}>
            <span style={s.introLabel}><Hand size={14} />Our Commitment</span>
            <h2 style={s.introTitle}>Experience a Stress-Free and Affordable Hajj with RASOAF Travels and Tours Limited</h2>
            <p style={s.introSubtitle}>At RASOAF Travels and Tours Limited, we are committed to making your Hajj pilgrimage a memorable, comfortable, and spiritually fulfilling experience. Our Hajj package is designed to be reliable, affordable, and well-organized, providing excellent value for pilgrims across Nigeria.</p>
            <p style={s.introText}>We have carefully considered the needs of every pilgrim - including fathers, mothers, brothers, sisters, and families travelling with children - to ensure everyone enjoys a smooth, hassle-free journey.</p>
            <p style={s.introText}>From the very first step of registration and visa processing to payment, flight arrangements, accommodation, and your safe arrival in the Kingdom of Saudi Arabia, our experienced team provides professional guidance every step of the way. We take pride in delivering a seamless Hajj experience, allowing you to focus on your worship while we handle the logistics.</p>
            <p style={s.introText}>Our services go beyond simply providing information online. We offer personalized support throughout the entire visa and travel process, ensuring that your application is completed accurately, efficiently, and at a competitive cost.</p>
            <div style={s.introHighlight}>
              <p style={s.introHighlightText}>"Choose RASOAF Travels and Tours Limited as your trusted Hajj travel partner and experience the difference that professionalism, integrity, and exceptional customer care can make. Let us take care of your journey while you prepare for one of the most important spiritual experiences of your life."</p>
            </div>
            <p style={{ ...s.introText, marginTop: "20px", fontWeight: 600, color: brand.goldDark, textAlign: "center", fontSize: "16px" }}>
              Travel with confidence. Perform your Hajj with peace of mind. Travel with RASOAF Travels and Tours Limited.
            </p>

          
          </div>
        </motion.div>

        {/* YOUR JOURNEY STEPS */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={s.journeySection}>
          <div style={s.sectionHeader}>
            <span style={s.sectionBadge}><Compass size={14} />Step by Step</span>
            <h2 style={s.sectionTitle}>Your Hajj Journey With Us</h2>
            <p style={s.sectionSubtitle}>From registration to your safe return, we handle every detail so you can focus on your worship.</p>
          </div>
          <div style={s.journeyGrid}>
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }} style={s.journeyCard}
                  whileHover={{ transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.08)", borderColor: brand.gold }}>
                  <div style={s.journeyIconWrap}><Icon size={22} color={brand.goldDark} /></div>
                  <div style={s.journeyContent}>
                    <h4 style={s.journeyTitle}>{step.title}</h4>
                    <p style={s.journeyDesc}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* PACKAGES */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} id="packages-section">
          <div style={s.sectionHeader}>
            <span style={s.sectionBadge}><Star size={14} />Our Packages</span>
            <h2 style={s.sectionTitle}>Choose Your Hajj Package</h2>
            <p style={s.sectionSubtitle}>Three carefully designed packages to suit every budget and preference.</p>
          </div>
          <div style={s.packagesGrid}>
            {packages.map((pkg, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + idx * 0.1 }} viewport={{ once: true }}
                style={pkg.popular ? { ...s.packageCardPopular, transform: "scale(1.03)" } : s.packageCard}
                whileHover={{ transform: pkg.popular ? "scale(1.06) translateY(-8px)" : "translateY(-8px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}>
                {pkg.popular && <div style={s.popularBadge}>✦ Most Popular</div>}
                <div style={s.packageContent}>
                  <h3 style={s.packageName}>{pkg.name}</h3>
                  <p style={s.packageDesc}>{pkg.description}</p>
                  <div style={s.packagePriceRow}>
                    <span style={s.packagePrice}>{pkg.price}</span>
                    <span style={s.packagePerPerson}>/person</span>
                  </div>
                  <div style={s.packageDuration}><Clock size={16} color={brand.gray400} /><span>{pkg.duration}</span></div>
                  <div style={s.featuresList}>
                    {pkg.features.map((feature, i) => (
                      <div key={i} style={s.featureItem}><CheckCircle size={16} style={s.featureCheck} /><span>{feature}</span></div>
                    ))}
                  </div>
                  <a href="#booking-form" style={{ ...s.selectBtn, background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)` }}
                    onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 24px ${pkg.color}40`; }}
                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Select Package</a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WHY CHOOSE US */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div style={s.sectionHeader}>
            <span style={s.sectionBadge}><Shield size={14} />Why Choose Us</span>
            <h2 style={s.sectionTitle}>Why Choose Our Hajj Packages?</h2>
            <p style={s.sectionSubtitle}>We provide end-to-end Hajj services with NAHCON approval and decades of experience.</p>
          </div>
          <div style={s.whyGrid}>
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} style={s.whyCard}
                  whileHover={{ transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.08)", borderColor: brand.gold }}>
                  <div style={s.whyIcon}><Icon size={24} color={brand.goldDark} /></div>
                  <h4 style={s.whyTitle}>{item.title}</h4>
                  <p style={s.whyDesc}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* BOOKING FORM */}
        <div id="booking-form" style={s.formSection}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.formHeader}>
            <span style={s.sectionBadge}><Landmark size={14} />Reserve Your Spot</span>
            <h2 style={s.sectionTitle}>Reserve Your Hajj Package</h2>
            <p style={s.sectionSubtitle}>Fill the form below and our Hajj specialist will contact you within 24 hours with complete package details.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }}>
            <HajjBookingForm additionalFields={hajjFields} />
          </motion.div>
        </div>
      </section>

      {/* BACK LINK */}
      <div style={s.backLinkSection}>
        <Link to="/services" style={s.backLink}
          onMouseEnter={e => e.target.style.color = brand.gold}
          onMouseLeave={e => e.target.style.color = brand.gray400}>
          <ChevronRight size={16} style={{ transform: "rotate(180deg)" }} />Back to All Services
        </Link>
      </div>
    </div>
  );
}