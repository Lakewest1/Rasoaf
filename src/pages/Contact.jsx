// src/pages/Contact.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Contact Page
// v3: Updated contact details · 100% Responsive · Touch optimized · All content preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Send, Loader2, Sparkles,
  Shield, Clock, ChevronRight, ArrowDown
} from "lucide-react";
import { Link } from "react-router-dom";

// ── Rasoaf Brand Colors ──────────────────────────────────────────────────
const brand = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  goldBg: "rgba(212, 160, 23, 0.08)", goldBorder: "rgba(212, 160, 23, 0.2)",
  dark: "#111111", white: "#ffffff", cream: "#FFF8E6", borderLight: "#E6D5A8",
  mutedText: "#5F5F5F", gray600: "#525252", gray700: "#404040",
  green: "#22c55e", greenBg: "rgba(34, 197, 94, 0.1)", red: "#ef4444", redBg: "rgba(239, 68, 68, 0.1)",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

// ── Responsive Hook ──────────────────────────────────────────────────────
function useResponsive() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

// ── Contact Details (UPDATED) ────────────────────────────────────────────
const contactDetails = [
  { 
    icon: Phone, 
    title: "Call Us", 
    value: "+234 802 235 2362", 
    sub: "24/7 Support", 
    link: "tel:+2348022352362" 
  },
  { 
    icon: Mail, 
    title: "Email Us", 
    value: "info@rasoaf.com", 
    sub: "We reply within hours", 
    link: "mailto:info@rasoaf.com" 
  },
  { 
    icon: MapPin, 
    title: "Visit Our Office", 
    value: "3 Bolaji Taylor Street", 
    sub: "Off Alhaji Haruna Street, Ifako Ijaiye, Lagos, Nigeria", 
    link: "#" 
  },
];

// ── Styles ──────────────────────────────────────────────────────────────
const s = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg, ${brand.cream} 0%, ${brand.white} 100%)`, fontFamily: "'Inter', sans-serif", overflowX: "hidden" },

  // Hero
  heroSection: { position: "relative", paddingTop: "clamp(6rem, 10vh, 120px)", paddingBottom: "clamp(3rem, 8vh, 80px)", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)", background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center" },
  heroBg: { position: "absolute", inset: 0 },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 },
  heroOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(60px, 8vh, 120px)", background: `linear-gradient(to top, ${brand.cream}, transparent)` },
  heroContent: { maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center", width: "100%" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", padding: "clamp(6px, 1vw, 8px) clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.25)", borderRadius: "50px", marginBottom: "clamp(16px, 2vw, 24px)" },
  badgeText: { color: brand.goldLight, fontSize: "clamp(11px, 1.2vw, 14px)", fontWeight: 600, letterSpacing: "0.04em" },
  heroTitle: { fontSize: "clamp(26px, 6vw, 56px)", fontWeight: 800, color: brand.white, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(10px, 1.5vw, 16px)", lineHeight: 1.1, letterSpacing: "-0.02em", paddingInline: "clamp(0px, 2vw, 10px)" },
  heroSubtitle: { fontSize: "clamp(14px, 1.4vw, 18px)", color: "rgba(255,255,255,0.7)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7, paddingInline: "clamp(0px, 2vw, 10px)" },

  // Content
  contentSection: { maxWidth: "1100px", margin: "-30px auto 0", padding: "0 clamp(12px, 3vw, 20px) clamp(40px, 6vh, 80px)", position: "relative", zIndex: 20, width: "100%", boxSizing: "border-box" },

  // Contact Cards
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(200px, 28vw, 250px), 1fr))", gap: "clamp(12px, 2vw, 20px)", marginBottom: "clamp(20px, 3vw, 32px)" },
  contactCard: { background: brand.white, borderRadius: "clamp(14px, 1.5vw, 16px)", padding: "clamp(18px, 2.5vw, 24px)", textAlign: "center", border: `1px solid ${brand.borderLight}`, transition: "all 0.3s ease" },
  contactIcon: { width: "clamp(40px, 5vw, 48px)", height: "clamp(40px, 5vw, 48px)", borderRadius: "clamp(10px, 1.5vw, 12px)", background: brand.goldBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(8px, 1vw, 12px)" },
  contactTitle: { fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 600, color: brand.dark, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(4px, 0.5vw, 6px)" },
  contactValue: { fontSize: "clamp(15px, 1.5vw, 18px)", fontWeight: 700, color: brand.goldDark, fontFamily: "'Manrope', sans-serif", textDecoration: "none", display: "block", marginBottom: "clamp(2px, 0.3vw, 4px)", wordBreak: "break-word" },
  contactSub: { fontSize: "clamp(10px, 0.9vw, 12px)", color: brand.mutedText, lineHeight: 1.5 },

  // Form
  formWrapper: { display: "flex", background: brand.white, borderRadius: "clamp(16px, 2vw, 24px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.08)", border: `1px solid ${brand.borderLight}`, minHeight: "clamp(500px, 60vh, 650px)" },
  formImageSide: { width: "38%", position: "relative", overflow: "hidden", background: `linear-gradient(180deg, ${brand.dark} 0%, #1a1207 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "clamp(20px, 4vw, 48px) clamp(16px, 3vw, 36px)", flexShrink: 0 },
  formImageBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 },
  formImageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.7) 40%, rgba(212,160,23,0.2) 100%)" },
  formImageContent: { position: "relative", zIndex: 2, textAlign: "center", color: brand.white, width: "100%" },
  formImageBadge: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "clamp(4px, 0.6vw, 6px) clamp(10px, 1.2vw, 14px)", background: "rgba(212,160,23,0.15)", backdropFilter: "blur(8px)", border: `1px solid ${brand.goldBorder}`, borderRadius: "50px", marginBottom: "clamp(12px, 2vw, 20px)", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 600, color: brand.goldLight, letterSpacing: "0.04em" },
  formImageIcon: { width: "clamp(48px, 6vw, 72px)", height: "clamp(48px, 6vw, 72px)", borderRadius: "clamp(14px, 2vw, 20px)", background: "rgba(212,160,23,0.12)", backdropFilter: "blur(12px)", border: `1px solid ${brand.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto clamp(12px, 2vw, 20px)" },
  formImageTitle: { fontSize: "clamp(18px, 2.8vw, 30px)", fontWeight: 800, fontFamily: "'Manrope', sans-serif", marginBottom: "clamp(6px, 1vw, 10px)", letterSpacing: "-0.02em", lineHeight: 1.2 },
  formImageGold: { color: brand.gold },
  formImageSubtitle: { fontSize: "clamp(11px, 1.1vw, 14px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: "0 auto clamp(16px, 2.5vw, 28px)", maxWidth: "300px" },
  formDivider: { width: "clamp(40px, 5vw, 60px)", height: "2px", background: `linear-gradient(90deg, transparent, ${brand.gold}, transparent)`, margin: "0 auto clamp(16px, 2vw, 24px)", borderRadius: "1px" },

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
  textarea: { width: "100%", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 13px)", borderRadius: "clamp(8px, 0.8vw, 10px)", border: `1px solid ${brand.borderLight}`, fontSize: "clamp(13px, 1vw, 14px)", color: brand.dark, background: brand.cream, outline: "none", resize: "vertical", fontFamily: "'Inter', sans-serif", minHeight: "80px", boxSizing: "border-box" },
  submitBtn: { width: "100%", padding: "clamp(10px, 1.2vw, 14px) clamp(14px, 2vw, 20px)", borderRadius: "clamp(10px, 1vw, 12px)", border: "none", fontSize: "clamp(13px, 1.1vw, 15px)", fontWeight: 600, color: brand.dark, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", transition: "all 0.3s ease", marginTop: "clamp(12px, 1.5vw, 18px)", background: `linear-gradient(135deg, ${brand.goldLight}, ${brand.gold})`, boxShadow: `0 4px 16px rgba(212,160,23,0.3), 0 2px 0 ${brand.goldDark}`, position: "relative", overflow: "hidden", minHeight: "48px" },
  btnShine: { position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shine 3s ease-in-out infinite", pointerEvents: "none" },
  terms: { textAlign: "center", fontSize: "clamp(10px, 0.8vw, 11px)", color: brand.mutedText, marginTop: "clamp(8px, 1vw, 14px)", lineHeight: 1.5 },
  focusInput: { borderColor: brand.gold, boxShadow: `0 0 0 3px ${brand.goldBg}` },
  errorInput: { borderColor: brand.red, boxShadow: `0 0 0 3px ${brand.redBg}` },
  errorMessage: { background: brand.redBg, border: `1px solid ${brand.red}30`, borderRadius: "clamp(8px, 0.8vw, 10px)", padding: "clamp(8px, 1vw, 10px) clamp(10px, 1.2vw, 14px)", fontSize: "clamp(11px, 1vw, 13px)", color: brand.red, marginBottom: "clamp(10px, 1.5vw, 16px)", display: "flex", alignItems: "center", gap: "8px" },

  // Back Link
  backLink: { textAlign: "center", paddingBottom: "clamp(24px, 4vh, 40px)" },
  backLinkAnchor: { display: "inline-flex", alignItems: "center", gap: "8px", color: brand.gray600, fontSize: "clamp(12px, 1.1vw, 14px)", textDecoration: "none", transition: "color 0.2s ease", minHeight: "44px", padding: "8px 0" },
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

export default function Contact() {
  const { isMobile } = useResponsive();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setFormError(null);
    try {
      const r = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ _subject: `New Contact Message - ${formData.name}`, "Name": formData.name, "Email": formData.email, "Phone": formData.phone || "Not provided", "Subject": formData.subject || "General Enquiry", "Message": formData.message, "Submitted At": new Date().toLocaleString(), "Page": window.location.href }) });
      if (!r.ok) throw new Error("Failed to send. Please try again.");
      setLoading(false); setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }, 6000);
    } catch (err) { setLoading(false); setFormError(err.message); setTimeout(() => setFormError(null), 8000); }
  };

  const inp = (name) => ({ ...s.input, ...(focused === name ? s.focusInput : {}), ...(formError && !formData[name] && ["name","email","message"].includes(name) ? s.errorInput : {}) });

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* HERO */}
      <section style={s.heroSection}>
        <div style={s.heroBg}><img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop" alt="Contact us" style={s.heroImg} loading="eager" /></div>
        <div style={s.heroOverlay} />
        <div style={s.heroContent}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={s.badge}><Phone size={14} color={brand.gold} /><span style={s.badgeText}>GET IN TOUCH</span></span>
            <h1 style={s.heroTitle}>We'd Love to Hear From You</h1>
            <p style={s.heroSubtitle}>Our dedicated team is available 24/7 to answer your questions, assist with bookings, and provide expert travel advice.</p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section style={s.contentSection}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div style={s.contactGrid}>
            {contactDetails.map((detail, idx) => {
              const Icon = detail.icon;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }}
                  style={s.contactCard} whileHover={!isMobile ? { borderColor: brand.gold, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" } : {}}>
                  <div style={s.contactIcon}><Icon size={22} color={brand.goldDark} /></div>
                  <h4 style={s.contactTitle}>{detail.title}</h4>
                  <a href={detail.link} style={s.contactValue} target={detail.link.startsWith("tel") || detail.link.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">{detail.value}</a>
                  <p style={s.contactSub}>{detail.sub}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <div style={s.formWrapper} className="form-flex-container">
            <div style={s.formImageSide} className="form-image-side">
              <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=900&fit=crop" alt="Support" style={s.formImageBg} />
              <div style={s.formImageOverlay} />
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={s.formImageContent}>
                <div style={s.formImageBadge}><Sparkles size={12} color={brand.gold} /><span>CONTACT US</span></div>
                <div style={s.formImageIcon}><Send size={34} color={brand.gold} /></div>
                <h2 style={s.formImageTitle}>Send <span style={s.formImageGold}>a Message</span></h2>
                <p style={s.formImageSubtitle}>Our support team typically responds within 2 hours.</p>
                <div style={s.formDivider} />
              </motion.div>
            </div>

            <div style={s.formSide} className="form-form-side">
              <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit}>
                <div style={s.formHeaderStyle}><div style={s.formHeaderIcon}><Send size={20} color={brand.gold} /></div><div><div style={s.formHeaderTitle}>Send Us a Message</div><div style={s.formHeaderSub}>We'll get back to you promptly</div></div></div>
                {formError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.errorMessage}><span style={{ fontSize: "16px", flexShrink: 0 }}>⚠️</span><span>{formError}</span></motion.div>}
                <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Full Name <span style={s.required}>*</span></label><input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Taofik Muyideen" style={inp("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} /></div></div>
                <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Email Address <span style={s.required}>*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="muyideen@email.com" style={inp("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></div><div style={s.formGroup}><label style={s.label}>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 800 123 4567" style={inp("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></div></div>
                <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Subject</label><select name="subject" value={formData.subject} onChange={handleChange} style={s.select}><option value="">General Enquiry</option><option value="Hajj">Hajj Packages</option><option value="Umrah">Umrah Packages</option><option value="Flight">Flight Booking</option><option value="Hotel">Hotel Reservation</option><option value="Visa">Visa Services</option><option value="Other">Other</option></select></div></div>
                <div style={s.formRow}><div style={s.formGroup}><label style={s.label}>Message <span style={s.required}>*</span></label><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="How can we help you?" style={inp("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} /></div></div>
                <motion.button type="submit" disabled={loading} whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.98 } : {}} style={{ ...s.submitBtn, ...(loading ? { opacity: 0.75, cursor: "not-allowed" } : {}) }}><div style={s.btnShine} />{loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Sending...</> : <><Send size={18} /><span>Send Message</span></>}</motion.button>
                <p style={s.terms}>By submitting, you agree to our privacy policy and terms of service.</p>
              </motion.form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BACK LINK */}
      <div style={s.backLink}><Link to="/" style={s.backLinkAnchor} onMouseEnter={e => e.target.style.color = brand.gold} onMouseLeave={e => e.target.style.color = brand.gray600}><ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Home</Link></div>
    </div>
  );
}