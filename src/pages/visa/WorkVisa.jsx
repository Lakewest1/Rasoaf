// src/pages/visa/WorkVisa.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, CheckCircle, FileText, ArrowRight, Send, Shield, Globe,
  Clock, Users, Loader2, Sparkles, ChevronRight, ArrowDown, Building2
} from "lucide-react";
import { WORK_VISA, CONTACT_INFO } from "../../data/visaContent";

// ── Rasoaf Brand Colors ──────────────────────────────────────────────────
const brand = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)",
  goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111",
  white: "#ffffff",
  cream: "#FFF8E6",
  borderLight: "#E6D5A8",
  mutedText: "#5F5F5F",
  gray50: "#fafafa",
  gray200: "#e5e5e5",
  gray400: "#a3a3a3",
  gray500: "#737373",
  gray600: "#525252",
  gray700: "#404040",
  green: "#22c55e",
  greenBg: "rgba(34, 197, 94, 0.1)",
  red: "#ef4444",
  redBg: "rgba(239, 68, 68, 0.1)",
};

// ── FORMSPREE CONFIGURATION ──────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const countryCodes = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "Saudi Arabia" },
];

const jobTypes = [
  "Skilled Worker / Professional",
  "Healthcare / Medical",
  "Engineering",
  "IT / Technology",
  "Education / Teaching",
  "Hospitality / Tourism",
  "Construction / Trades",
  "Other",
];

const destinationCountries = [
  "United Kingdom",
  "Canada",
  "United States",
  "Australia",
  "United Arab Emirates",
  "Saudi Arabia",
  "Ireland",
  "Germany",
  "Other",
];

// ── Styles ───────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif" },

  heroSection: {
    position: "relative", paddingTop: "120px", paddingBottom: "80px", paddingLeft: "20px", paddingRight: "20px",
    background: `linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)`, overflow: "hidden"
  },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: `linear-gradient(to top, ${brand.cream}, transparent)` },
  heroContent: { maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 20px", background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.25)", borderRadius: "50px", marginBottom: "20px" },
  badgeText: { color: brand.goldLight, fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em" },
  heroTitle: { fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 800, color: brand.white, fontFamily: "'Manrope', sans-serif", marginBottom: "16px", lineHeight: 1.1, letterSpacing: "-0.02em" },
  heroSubtitle: { fontSize: "18px", color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.7 },
  heroBtnRow: { display: "flex", justifyContent: "center" },
  heroBtn: { display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 32px", borderRadius: "12px", backgroundColor: brand.goldLight, color: brand.dark, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "16px", letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: `0 4px 20px rgba(247, 201, 72, 0.35)`, transition: "all 250ms ease" },

  contentSection: { maxWidth: "1100px", margin: "-40px auto 0", padding: "0 20px 80px", position: "relative", zIndex: 20 },

  card: { backgroundColor: brand.white, borderRadius: "24px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)", border: `1px solid ${brand.borderLight}`, padding: "clamp(28px, 5vw, 48px)", marginBottom: "32px" },
  sectionTitle: { fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "20px", letterSpacing: "-0.02em" },
  text: { fontSize: "15px", color: brand.mutedText, lineHeight: 1.8, marginBottom: "20px" },

  docGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px", marginTop: "20px" },
  docItem: { display: "flex", alignItems: "flex-start", gap: "10px", padding: "14px 16px", background: brand.cream, borderRadius: "12px", fontSize: "14px", color: brand.mutedText, lineHeight: 1.5 },
  docIcon: { color: brand.goldDark, flexShrink: 0, marginTop: "2px" },

  ctaBox: { background: `linear-gradient(135deg, ${brand.goldDark}, ${brand.gold})`, borderRadius: "24px", padding: "40px", textAlign: "center", color: brand.white, marginTop: "32px", position: "relative", overflow: "hidden" },
  ctaOrb1: { position: "absolute", top: "-40px", right: "-20px", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", filter: "blur(40px)" },
  ctaOrb2: { position: "absolute", bottom: "-60px", left: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(0,0,0,0.1)", filter: "blur(40px)" },
  ctaContent: { position: "relative", zIndex: 1 },
  ctaTitle: { fontSize: "24px", fontWeight: 700, fontFamily: "'Manrope', sans-serif", marginBottom: "8px" },
  ctaText: { fontSize: "16px", opacity: 0.9, marginBottom: "24px" },
  ctaButton: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "50px", border: "none", fontSize: "16px", fontWeight: 600, color: brand.dark, background: brand.white, cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" },

  backLink: { textAlign: "center", paddingBottom: "40px" },
  backLinkAnchor: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray500, fontSize: "14px", textDecoration: "none", transition: "color 0.2s ease" },

  // Form styles
  formWrapper: { display: "flex", background: brand.white, borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "650px" },
  formImageSide: { width: "42%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${brand.dark} 0%, #1a1207 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "48px 36px", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.7) 40%, rgba(212,160,23,0.2) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "rgba(212, 160, 23, 0.15)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "20px", fontSize: "12px", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "72px", height: "72px", borderRadius: "20px", background: "rgba(212, 160, 23, 0.12)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
  formImageTitle: { fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "10px", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: "300px" },
  formImageStats: { display: "flex", justifyContent: "center", gap: "24px", marginBottom: "28px" },
  formImageStat: { textAlign: "center" },
  formImageStatVal: { fontSize: "22px", fontWeight: 700, color: brand.gold, fontFamily: "'Manrope', sans-serif" },
  formImageStatLbl: { fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" },
  formDivider: { width: "60px", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto 24px", borderRadius: "1px" },
  formImageFeatures: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "280px", margin: "0 auto", textAlign: "left" },
  formImageFeatItem: { display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: 500 },
  formImageFeatIcon: { width: "24px", height: "24px", borderRadius: "6px", background: "rgba(212, 160, 23, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },

  formSide: { flex: 1, padding: "36px 32px", overflowY: "auto", maxHeight: "700px" },
  formHeaderStyle: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", paddingBottom: "18px", borderBottom: `1px solid ${brand.borderLight}` },
  formHeaderIcon: { width: "44px", height: "44px", borderRadius: "12px", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  formHeaderTitle: { fontSize: "19px", fontWeight: 700, color: brand.dark, fontFamily: "'Manrope', sans-serif" },
  formHeaderSub: { fontSize: "12px", color: brand.mutedText, marginTop: "2px" },
  formRow: { display: "flex", gap: "14px", marginBottom: "15px" },
  formGroup: { flex: 1, display: "flex", flexDirection: "column" },
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
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: brand.red, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },

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
@media (max-width: 860px) {
  .form-flex-container { flex-direction: column !important; }
  .form-image-side { width: 100% !important; min-height: 220px !important; padding: 28px 20px !important; }
  .form-form-side { padding: 24px 18px !important; max-height: none !important; }
}
@media (max-width: 768px) {
  .hero-section { padding-top: 80px !important; padding-bottom: 60px !important; }
  .hero-title { font-size: clamp(28px, 8vw, 42px) !important; }
  .hero-btn { padding: 12px 24px !important; }
  .card { padding: 24px 20px !important; }
  .doc-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 480px) {
  .hero-section { padding-top: 60px !important; padding-bottom: 50px !important; }
  .hero-btn { width: 100% !important; justify-content: center; }
}
`;

// ══════════════════════════════════════════════════════════════════════════
//  WORK VISA BOOKING FORM
// ══════════════════════════════════════════════════════════════════════════
function WorkVisaForm() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phoneCode: "+234", phone: "",
    destinationCountry: "", jobType: "", message: "",
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
        _subject: `New Work Visa Enquiry - ${formData.firstName} ${formData.lastName}`,
        "First Name": formData.firstName,
        "Last Name": formData.lastName,
        "Email": formData.email,
        "Phone": fullPhone,
        "Destination Country": formData.destinationCountry,
        "Job Type": formData.jobType,
        "Message": formData.message || "No additional message",
        "Submitted At": new Date().toLocaleString(),
        "Page": window.location.href,
      };

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
          destinationCountry: "", jobType: "", message: "",
        });
      }, 6000);
    } catch (error) {
      setLoading(false);
      setFormError(error.message || "Something went wrong. Please try again.");
      setTimeout(() => setFormError(null), 8000);
    }
  };

  const inp = (name) => ({ ...s.input, ...(focused === name ? s.focusInput : {}), ...(formError && !formData[name] && ["firstName","lastName","email","phone"].includes(name) ? s.errorInput : {}) });
  const phn = (name) => ({ ...s.phoneInput, ...(focused === name ? s.focusInput : {}) });

  if (submitted) {
    return (
      <div style={s.successWrapper}>
        <div style={s.successImgSide}>
          <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=900&fit=crop" alt="" style={{ ...s.formImageBg, opacity: 0.35 }} />
          <div style={s.formImageOverlay} />
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <CheckCircle size={48} color={brand.green} style={{ marginBottom: "16px" }} />
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: brand.white, fontFamily: "'Manrope', sans-serif" }}>Enquiry Sent!</h3>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={s.successContent}>
          <div style={s.successIcon}><CheckCircle size={36} color={brand.green} /></div>
          <h3 style={s.successTitle}>Application Submitted!</h3>
          <p style={s.successMsg}>Your work visa enquiry has been received. Our employment migration specialist will contact you within <strong>24 hours</strong> to discuss your opportunities.</p>
          <div style={s.successDetails}>
            <div style={s.successDetail}><Clock size={14} color={brand.gold} /><span>Response within 24 hours</span></div>
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
        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=900&fit=crop" alt="Professional office" style={s.formImageBg} />
        <div style={s.formImageOverlay} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}>
          <div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>GLOBAL CAREERS</span></div>
          <div style={s.formImageIcon}><Briefcase size={34} color={brand.gold} /></div>
          <h2 style={s.formImageTitle}>Work <span style={s.formImageGold}>Visa</span><br />Application</h2>
          <p style={s.formImageSubtitle}>Secure your future with a work visa for the UK, Canada, USA, Australia, and more. Professional guidance from start to finish.</p>
          <div style={s.formDivider} />
          <div style={s.formImageStats}>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>1000+</div><div style={s.formImageStatLbl}>Visas Processed</div></div>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>10+</div><div style={s.formImageStatLbl}>Countries</div></div>
            <div style={s.formImageStat}><div style={s.formImageStatVal}>97%</div><div style={s.formImageStatLbl}>Success Rate</div></div>
          </div>
          <div style={s.formImageFeatures}>
            {[
              { icon: Shield, text: "Licensed Immigration Advisers" },
              { icon: Building2, text: "Employer Sponsorship Assistance" },
              { icon: FileText, text: "Document Preparation & Review" },
            ].map((item, i) => {
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
            <div style={s.formHeaderIcon}><Send size={20} color={brand.gold} /></div>
            <div><div style={s.formHeaderTitle}>Start Your Work Visa</div><div style={s.formHeaderSub}>Fill the form below to get started</div></div>
          </div>

          {formError && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span>
              <span>{formError}</span>
            </motion.div>
          )}

          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.label}>First Name <span style={s.required}>*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Taofik" style={inp("firstName")} onFocus={() => setFocused("firstName")} onBlur={() => setFocused(null)} /></div>
            <div style={s.formGroup}><label style={s.label}>Last Name <span style={s.required}>*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Muyideen" style={inp("lastName")} onFocus={() => setFocused("lastName")} onBlur={() => setFocused(null)} /></div>
          </div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email Address <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="muyideen@email.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div></div>
          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Phone Number <span style={s.required}>*</span></label><div style={s.phoneRow}><select name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={s.phoneCode}>{countryCodes.map(c => <option key={c.code} value={c.code}>{c.code} {c.country}</option>)}</select><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="800 123 4567" style={phn("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div></div>

          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.label}>Destination Country <span style={s.required}>*</span></label>
              <select name="destinationCountry" value={formData.destinationCountry} onChange={handleChange} required style={s.select}>
                <option value="">Select...</option>
                {destinationCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.label}>Job Type <span style={s.required}>*</span></label>
              <select name="jobType" value={formData.jobType} onChange={handleChange} required style={s.select}>
                <option value="">Select...</option>
                {jobTypes.map(j => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>

          <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Additional Message</label><textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Any specific employers or industries..." style={s.textarea} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div></div>

          <motion.button type="submit" disabled={loading}
            whileHover={!loading ? { scale: 1.01, boxShadow: "0 8px 28px rgba(212,160,23,0.45), 0 3px 0 #A07000" } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}>
            <div style={s.btnShine} />
            {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Submitting...</> : <><Send size={18} style={{ position: "relative", zIndex: 1 }} /><span style={{ position: "relative", zIndex: 1 }}>Submit Application</span></>}
          </motion.button>
          <p style={s.terms}>By submitting, you agree to our privacy policy and terms of service. We'll never share your information.</p>
        </motion.form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN WORK VISA PAGE
// ══════════════════════════════════════════════════════════════════════════
export default function WorkVisa() {
  const scrollToForm = () => {
    const el = document.getElementById("visa-booking-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO */}
      <section style={s.heroSection} className="hero-section">
        <div style={s.heroBg}>
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&h=800&fit=crop"
            alt="Professional work environment"
            style={s.heroImg}
            loading="eager"
          />
        </div>
        <div style={s.heroOverlay} />
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={s.badge}>
              <Briefcase size={14} color={brand.gold} />
              <span style={s.badgeText}>EMPLOYMENT ABROAD</span>
            </span>
            <h1 style={s.heroTitle} className="hero-title">{WORK_VISA.heading}</h1>
            <p style={s.heroSubtitle}>{WORK_VISA.intro}</p>
            <div style={s.heroBtnRow}>
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
                <Briefcase size={20} />
                Get Started
                <ArrowDown size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={s.contentSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
          <h2 style={s.sectionTitle}>Professional Job Visa Guidance</h2>
          <p style={s.text}>{WORK_VISA.description}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
          <h2 style={s.sectionTitle}>
            <FileText size={22} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            Required Documents
          </h2>
          <p style={s.text}>Depending on the destination country and employer requirements, applicants may be required to provide the following documents:</p>
          <div style={s.docGrid} className="doc-grid">
            {WORK_VISA.requiredDocuments.map((doc, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} style={s.docItem}>
                <CheckCircle size={16} style={s.docIcon} /><span>{doc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
          <p style={s.text}>{WORK_VISA.closing}</p>
        </motion.div>

        {/* CTA BOX */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.ctaBox}>
          <div style={s.ctaOrb1} /><div style={s.ctaOrb2} />
          <div style={s.ctaContent}>
            <h3 style={s.ctaTitle}>Ready to Work Abroad?</h3>
            <p style={s.ctaText}>Contact us today for professional guidance. Call {CONTACT_INFO.phone} or email {CONTACT_INFO.email}</p>
            <button onClick={scrollToForm} style={s.ctaButton}
              onMouseEnter={e => { e.target.style.backgroundColor = "#FFE082"; }}
              onMouseLeave={e => { e.target.style.backgroundColor = brand.white; }}
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* BOOKING FORM */}
        <div id="visa-booking-form" style={{ marginTop: "40px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={s.card}>
            <WorkVisaForm />
          </motion.div>
        </div>
      </section>

      {/* BACK LINK */}
      <div style={s.backLink}>
        <a href="/visa-services" style={s.backLinkAnchor} onMouseEnter={e => e.target.style.color = brand.gold} onMouseLeave={e => e.target.style.color = brand.gray500}>
          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Visa Services
        </a>
      </div>
    </div>
  );
}