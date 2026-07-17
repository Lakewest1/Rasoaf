// src/pages/travel/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Loader2, Sparkles, Shield, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TravelHeroSection } from "../../components/travel";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const contactCards = [
  { icon: Phone, title: "Call Us", value: "+234 903 770 7888", sub: "Available 24/7", link: "tel:+2349037707888" },
  { icon: Mail, title: "Email Us", value: "travel@rasoaf.com", sub: "Response within hours", link: "mailto:travel@rasoaf.com" },
  { icon: MapPin, title: "Office", value: "Lagos, Nigeria", sub: "By appointment", link: "#" },
];

export default function TravelContact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `Travel Contact - ${formData.name}`,
          ...formData,
          Submitted: new Date().toLocaleString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }, 6000);
    } catch (err) {
      setLoading(false);
      setFormError(err.message);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #E6D5A8",
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    background: "#FFF8E6",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease",
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#FFF8E6", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 24, color: "#111", marginBottom: 8 }}>Message Sent!</h2>
          <p style={{ color: "#5F5F5F", marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
          <button onClick={() => setSubmitted(false)} style={{ padding: "12px 28px", borderRadius: 10, border: "1px solid #E6D5A8", background: "#fff", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Send Another Message</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6" }}>
      <TravelHeroSection
        badge="Get In Touch"
        title="Contact Travel & Tours"
        subtitle="Have questions about visas, flights, or travel packages? Our team is here to help."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop"
      />

      <section style={{ maxWidth: 1100, margin: "-40px auto 0", padding: "40px 20px 80px", position: "relative", zIndex: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20, marginBottom: 40 }}>
          {contactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, textAlign: "center", border: "1px solid #E6D5A8" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(212,160,23,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Icon size={22} color="#B8860B" />
                </div>
                <h4 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, marginBottom: 4 }}>{c.title}</h4>
                <a href={c.link} style={{ fontSize: 18, fontWeight: 700, color: "#B8860B", textDecoration: "none", fontFamily: "'Manrope', sans-serif" }}>{c.value}</a>
                <p style={{ fontSize: 12, color: "#5F5F5F", marginTop: 4 }}>{c.sub}</p>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#fff", borderRadius: 24, padding: 40, border: "1px solid #E6D5A8", boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
          <h3 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 24, color: "#111", marginBottom: 24 }}>Send a Message</h3>
          {formError && <div style={{ background: "rgba(239,68,68,0.1)", padding: 12, borderRadius: 10, color: "#ef4444", marginBottom: 16 }}>{formError}</div>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name *" style={inputStyle} />
            <div style={{ display: "flex", gap: 14 }}>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email *" style={{ ...inputStyle, flex: 1 }} />
              <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone" style={{ ...inputStyle, flex: 1 }} />
            </div>
            <select name="subject" value={formData.subject} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}>
              <option value="">Subject</option>
              <option>Student Visa</option><option>Work Visa</option><option>Tourist Visa</option>
              <option>Business Visa</option><option>Family Visa</option><option>Flight Booking</option><option>Other</option>
            </select>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Message *" style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} />
            <button type="submit" disabled={loading} style={{
              padding: "14px 28px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg, #F7C948, #D4A017)",
              color: "#111", fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={18} />}
              {loading ? "Sending..." : "Send Message"}
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#5F5F5F" }}>By submitting, you agree to our privacy policy.</p>
          </form>
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <Link to="/travel" style={{ color: "#5F5F5F", fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Travel Home
        </Link>
      </div>
    </div>
  );
}