// src/pages/services/HotelReservation.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, Star, Wifi, Coffee, Bath, Car, 
  Shield, Phone, MapPin, Clock, Users, Send, 
  Loader2, Sparkles, CheckCircle, ArrowDown, Hotel
} from "lucide-react";

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
const hotelCategories = [
  { 
    name: "Budget", 
    stars: 3, 
    desc: "Comfortable & Affordable", 
    price: "From ₦35,000/night",
    description: "Clean, comfortable accommodations for the budget-conscious traveller."
  },
  { 
    name: "Standard", 
    stars: 4, 
    desc: "Quality & Value", 
    price: "From ₦65,000/night",
    popular: true,
    description: "The perfect balance of comfort, amenities, and value for money."
  },
  { 
    name: "Premium", 
    stars: 5, 
    desc: "Luxury & Elegance", 
    price: "From ₦120,000/night",
    description: "Exceptional service and premium facilities for a memorable stay."
  },
  { 
    name: "Ultra Luxury", 
    stars: 5, 
    desc: "World-Class Luxury", 
    price: "From ₦250,000/night",
    description: "The finest accommodations with unparalleled service and exclusivity."
  },
];

const hotelFields = [
  {
    name: "hotelStar",
    label: "Hotel Rating",
    type: "select",
    required: true,
    options: [
      { value: "3", label: "3-Star" },
      { value: "4", label: "4-Star" },
      { value: "5", label: "5-Star" },
      { value: "any", label: "Any Rating" },
    ]
  },
  {
    name: "roomType",
    label: "Room Type",
    type: "select",
    required: true,
    options: [
      { value: "single", label: "Single" },
      { value: "double", label: "Double" },
      { value: "twin", label: "Twin" },
      { value: "suite", label: "Suite" },
      { value: "family", label: "Family Room" },
    ]
  },
  {
    name: "destination",
    label: "Destination City",
    type: "text",
    required: true,
    placeholder: "e.g., Makkah, Madinah, Dubai"
  },
  {
    name: "budget",
    label: "Budget per Night",
    type: "select",
    required: false,
    options: [
      { value: "any", label: "Flexible" },
      { value: "35000-65000", label: "₦35,000 – ₦65,000" },
      { value: "65000-120000", label: "₦65,000 – ₦120,000" },
      { value: "120000-250000", label: "₦120,000 – ₦250,000" },
      { value: "250000+", label: "₦250,000+" },
    ]
  }
];

const amenities = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Coffee, label: "Breakfast Included" },
  { icon: Bath, label: "Private Bathroom" },
  { icon: Car, label: "Airport Shuttle" },
];

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif" },
  
  // Hero
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
  
  // Content
  contentSection: { maxWidth: "1200px", margin: "-40px auto 0", padding: "0 20px 80px", position: "relative", zIndex: 20 },
  
  // Intro Card
  introCard: { backgroundColor: brand.white, borderRadius: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)", border: `1px solid ${brand.borderLight}`, padding: "clamp(24px, 4vw, 48px)", marginBottom: "60px" },
  
  // Section Header
  sectionHeader: { textAlign: "center", marginBottom: "48px" },
  sectionBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 16px", background: brand.goldBg, color: brand.goldDark, borderRadius: "50px", fontSize: "13px", fontWeight: 600, marginBottom: "16px", letterSpacing: "0.02em" },
  sectionTitle: { fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "12px" },
  sectionSubtitle: { fontSize: "16px", color: brand.mutedText, maxWidth: "550px", margin: "0 auto", lineHeight: 1.6 },
  
  // Categories Grid
  categoriesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "80px" },
  categoryCard: { position: "relative", background: brand.white, borderRadius: "20px", padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", textAlign: "center", transition: "all 0.3s ease", border: `1px solid ${brand.borderLight}`, display: "flex", flexDirection: "column" },
  categoryStars: { display: "flex", justifyContent: "center", gap: "4px", marginBottom: "16px" },
  categoryName: { fontWeight: 700, color: brand.dark, fontSize: "18px", marginBottom: "4px", fontFamily: "'Manrope', sans-serif" },
  categoryDesc: { color: brand.mutedText, fontSize: "14px", marginBottom: "12px" },
  categoryBtn: { display: "block", width: "100%", padding: "12px 0", borderRadius: "12px", color: brand.dark, fontWeight: 600, fontSize: "14px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", textDecoration: "none", border: "none", cursor: "pointer", backgroundColor: brand.goldLight, transition: "all 200ms ease", marginTop: "auto" },
  popularBadge: { position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", backgroundColor: brand.gold, color: brand.white, padding: "5px 16px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700, fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em", boxShadow: `0 2px 8px rgba(212, 160, 23, 0.3)` },
  popularBorder: { border: `2px solid ${brand.goldLight}` },
  
  // Amenities Grid
  amenitiesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "80px" },
  amenityCard: { background: brand.white, borderRadius: "14px", padding: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", border: `1px solid ${brand.borderLight}`, display: "flex", alignItems: "center", gap: "12px", transition: "all 0.3s ease" },
  amenityIcon: { width: "44px", height: "44px", borderRadius: "10px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  amenityLabel: { fontWeight: 500, color: brand.dark, fontSize: "15px" },
  
  // Form Section
  formSection: { maxWidth: "100%", margin: "0 auto" },
  formHeader: { textAlign: "center", marginBottom: "36px" },
  
  // Form Styles
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

// ── Animations & Responsive ──────────────────────────────────────────────
const keyframes = `
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.8); } }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes shine { 0% { left: -100%; } 50% { left: 120%; } 100% { left: 120%; } }

/* ── Form Responsive ── */
@media (max-width: 860px) {
  .form-flex-container { flex-direction: column !important; }
  .form-image-side { width: 100% !important; min-height: 220px !important; padding: 28px 20px !important; }
  .form-form-side { padding: 24px 18px !important; max-height: none !important; }
}
@media (max-width: 480px) {
  .form-image-side { min-height: 180px !important; padding: 20px 16px !important; }
  .form-form-side { padding: 20px 14px !important; }
}

/* ── Global Responsive ── */
@media (max-width: 768px) {
  .hero-section { padding-top: 80px !important; padding-bottom: 60px !important; }
  .hero-title { font-size: clamp(28px, 8vw, 42px) !important; }
  .hero-subtitle { font-size: 15px !important; margin-bottom: 28px !important; }
  .hero-btn { padding: 12px 24px !important; font-size: 15px !important; }
  .stats-row { gap: 16px !important; }
  .stat-icon { width: 36px !important; height: 36px !important; }
  .stat-value { font-size: 22px !important; }
  .stat-label { font-size: 11px !important; }
  .content-section { padding: 0 16px 60px !important; margin-top: -30px !important; }
  .section-title { font-size: 26px !important; }
  .section-subtitle { font-size: 14px !important; }
  .categories-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
  .amenities-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
  .intro-card { padding: 24px 20px !important; }
}

@media (max-width: 480px) {
  .hero-section { padding-top: 60px !important; padding-bottom: 50px !important; }
  .hero-title { font-size: clamp(24px, 7vw, 36px) !important; }
  .hero-subtitle { font-size: 14px !important; }
  .hero-btn { width: 100% !important; justify-content: center; }
  .stats-row { flex-direction: column !important; align-items: center; }
  .amenities-grid { grid-template-columns: 1fr !important; }
}
`;

// ══════════════════════════════════════════════════════════════════════════
//  INLINE BOOKING FORM COMPONENT (with Formspree integration)
// ══════════════════════════════════════════════════════════════════════════
function BookingForm({ serviceName = "Hotel Reservation", accentColor = brand.gold, additionalFields = [] }) {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "",
    checkIn: "", checkOut: "", adults: "1", children: "0",
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
        _subject: `New Hotel Reservation Enquiry - ${formData.firstName} ${formData.lastName}`,
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Email": formData.email,
        "Phone": fullPhone,
        "Phone Code": formData.phoneCode,
        "Check-In Date": formData.checkIn,
        "Check-Out Date": formData.checkOut || "Not specified",
        "Preferred Contact": formData.preferredContact,
        "Adults": formData.adults,
        "Children": formData.children,
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
          checkIn: "", checkOut: "", adults: "1", children: "0",
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

  const inp = (name) => ({ ...s.input, ...(focused === name ? s.focusInput : {}), ...(formError && !formData[name] && ["firstName","lastName","email","phone","checkIn"].includes(name) ? s.errorInput : {}) });
  const phn = (name) => ({ ...s.phoneInput, ...(focused === name ? s.focusInput : {}) });
  const txa = (name) => ({ ...s.textarea, ...(focused === name ? s.focusInput : {}) });

  if (submitted) {
    return (
      <div style={s.successWrapper}>
        <div style={s.successImgSide}>
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop" alt="" style={{ ...s.formImageBg, opacity: 0.35 }} />
          <div style={s.formImageOverlay} />
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <CheckCircle size={48} color={brand.green} style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif" }}>Enquiry Sent!</h3>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}>
          <div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div>
          <h3 style={s.successTitle}>Enquiry Submitted Successfully!</h3>
          <p style={s.successMsg}>Thank you for your interest in our {serviceName}. Our dedicated team will contact you within <strong>24 hours</strong> with the best accommodation options for your stay.</p>
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
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=900&fit=crop" alt="Luxury Hotel" style={s.formImageBg} />
        <div style={s.formImageOverlay} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}>
          <div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>PREMIUM ACCOMMODATION</span></div>
          <div style={s.formImageIcon}><Hotel size={34} color={brand.gold} /></div>
          <h2 style={s.formImageTitle}>Reserve <span style={s.formImageGold}>Your</span><br />Hotel</h2>
          <p style={s.formImageSubtitle}>Comfortable stays in Makkah, Madinah, and worldwide destinations. Quality accommodation for every budget.</p>
          <div style={s.formDivider} />
          <div style={s.formImageStats}>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>500+</div><div style={s.formImageStatLbl}>Partner Hotels</div></div>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>50+</div><div style={s.formImageStatLbl}>Destinations</div></div>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>10K+</div><div style={s.formImageStatLbl}>Happy Guests</div></div>
          </div>
          <div style={s.formImageFeatures}>
            {[{ icon: Shield, text: "Verified & Quality-Assured Hotels" },{ icon: Wifi, text: "Free WiFi & Modern Amenities" },{ icon: MapPin, text: "Prime Locations Near Holy Sites" },{ icon: Coffee, text: "Breakfast & Dining Options" },{ icon: Clock, text: "24/7 Guest Support Team" }].map((item, i) => {
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
            <div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Taofik" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div>
            <div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Muyideen" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div>
          </div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email Address <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="muyideen@email.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone Number <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div>
          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.label}>Check-In Date <span style={s.required}>*</span></label><input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required style={inp("checkIn")} onFocus={() => setFocused("checkIn")} onBlur={() => setFocused(null)} /></div>
            <div style={s.formGroup}><label style={s.label}>Check-Out Date</label><input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} style={inp("checkOut")} onFocus={() => setFocused("checkOut")} onBlur={() => setFocused(null)} /></div>
          </div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Preferred Contact <span style={s.required}>*</span></label><select name="preferredContact" value={formData.preferredContact} onChange={handleChange} style={s.select}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></div></div>
          <div style={s.formRow}>
            <div style={s.formGroupThird}><label style={s.label}>Adults <span style={s.required}>*</span></label><select name="adults" value={formData.adults} onChange={handleChange} style={s.select}>{[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
            <div style={s.formGroupThird}><label style={s.label}>Children</label><select name="children" value={formData.children} onChange={handleChange} style={s.select}>{[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}</select></div>
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
//  MAIN HOTEL RESERVATION PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function HotelReservation() {
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
      <section style={s.heroSection} className="hero-section">
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=800&fit=crop" alt="Luxury Hotel" style={s.heroImg} loading="eager" /></div>
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={s.badge}><Building2 size={15} color={brand.gold} /><span style={s.badgeText}>Global Hotels</span><div style={s.pulseDot} /></motion.div>
            <h1 style={s.heroTitle} className="hero-title">Hotel{" "}<span style={s.heroGradient}>Reservation</span></h1>
            <p style={s.heroSubtitle} className="hero-subtitle">Find and book the perfect accommodation worldwide. From luxury resorts to budget-friendly stays, we have options for every traveller.</p>
            
            {/* Book Hotel Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.5 }}
              style={s.heroBtnRow}
            >
              <button
                onClick={scrollToForm}
                style={s.heroBtn}
                className="hero-btn"
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
                <Hotel size={20} />
                Book Hotel
                <ArrowDown size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
        <div style={s.heroOverlay} />
      </section>

      {/* CONTENT */}
      <section style={s.contentSection} className="content-section">

        {/* INTRODUCTION TEXT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={s.introCard}
          className="intro-card"
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
            Hotel Reservation:
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.7,
            color: brand.dark,
            marginBottom: "20px"
          }}>
            Premium Hotel Accommodation for a Comfortable Stay
          </p>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: brand.mutedText
          }}>
            <p style={{ marginBottom: "16px" }}>
              At <strong style={{ color: brand.dark, fontWeight: 600 }}>RASOAF Travels and Tours Limited</strong>, we understand that comfortable accommodation
              is an essential part of every successful journey. That is why we carefully select quality hotels
              that provide comfort, convenience, and excellent hospitality for our clients.
            </p>
            <p style={{ marginBottom: "16px" }}>
              For Hajj and Umrah pilgrims, we partner with reputable hotels in the holy cities of Makkah
              and Madinah, ensuring that our clients enjoy clean, secure, and comfortable accommodation
              throughout their stay. Our hotel options are chosen with the needs of pilgrims in mind,
              offering convenient access to the Holy Mosques whenever possible and a peaceful
              environment for rest and worship.
            </p>
            <p style={{ marginBottom: "16px" }}>
              Whether you are travelling individually, with your family, or as part of a group, we provide
              accommodation packages that suit your budget without compromising on quality.
            </p>
            <p style={{ marginBottom: "16px" }}>
              Our goal is to give every traveller a memorable experience by combining excellent
              accommodation with outstanding customer service. From the moment you arrive until your
              return home, RASOAF Travels and Tours Limited is dedicated to making your journey
              comfortable, enjoyable, and worry-free.
            </p>
            <p style={{
              fontWeight: 600,
              color: brand.dark,
              marginTop: "8px"
            }}>
              Relax in comfort. Worship in peace. Stay with confidence through RASOAF Travels
              and Tours Limited.
            </p>
          </div>
        </motion.div>

        {/* HOTEL CATEGORIES */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div style={s.sectionHeader}>
            <span style={s.sectionBadge}><Star size={14} />Accommodation Types</span>
            <h2 style={s.sectionTitle} className="section-title">Choose Your Perfect Stay</h2>
            <p style={s.sectionSubtitle} className="section-subtitle">From budget-friendly rooms to world-class luxury suites, find accommodation that matches your needs.</p>
          </div>
          <div style={s.categoriesGrid} className="categories-grid">
            {hotelCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ transform: "translateY(-6px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}
                style={{
                  ...s.categoryCard,
                  ...(category.popular ? s.popularBorder : {})
                }}
              >
                {category.popular && (
                  <div style={s.popularBadge}>Most Popular</div>
                )}
                
                <div style={s.categoryStars}>
                  {[...Array(category.stars)].map((_, i) => (
                    <Star key={i} size={18} color={brand.gold} fill={brand.gold} />
                  ))}
                </div>
                
                <h3 style={s.categoryName}>{category.name}</h3>
                <p style={s.categoryDesc}>{category.desc}</p>
                <p style={{ ...s.categoryDesc, fontSize: "13px", marginBottom: "12px", color: brand.mutedText }}>{category.description}</p>
                {/* Price removed as requested */}
                
                <button
                  onClick={scrollToForm}
                  style={s.categoryBtn}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFE082"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = brand.goldLight; }}
                >
                  Browse Hotels
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AMENITIES */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "80px" }}
        >
          <div style={s.sectionHeader}>
            <span style={s.sectionBadge}><Wifi size={14} />Hotel Features</span>
            <h2 style={s.sectionTitle} className="section-title">Popular Amenities</h2>
            <p style={s.sectionSubtitle} className="section-subtitle">Every hotel we partner with offers essential amenities for a comfortable and enjoyable stay.</p>
          </div>
          <div style={s.amenitiesGrid} className="amenities-grid">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  style={s.amenityCard}
                  whileHover={{ borderColor: brand.gold, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                >
                  <div style={s.amenityIcon}>
                    <Icon size={20} color={brand.goldDark} />
                  </div>
                  <span style={s.amenityLabel}>{amenity.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* BOOKING FORM */}
        <div id="booking-form" style={s.formSection}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={s.formHeader}>
            <span style={s.sectionBadge}><Hotel size={14} />Book Your Accommodation</span>
            <h2 style={s.sectionTitle} className="section-title">Reserve Your Hotel</h2>
            <p style={s.sectionSubtitle} className="section-subtitle">Fill in your details below and our accommodation specialist will find the perfect hotel for your stay within 24 hours.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>
            <BookingForm serviceName="Hotel Reservation" accentColor={brand.gold} additionalFields={hotelFields} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}