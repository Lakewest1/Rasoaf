// src/pages/travel/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, Mail, MapPin, Send, Loader2, Sparkles, 
  Shield, Clock, ChevronRight, MessageCircle, 
  Globe, ExternalLink, CheckCircle2, Music2, 
  Camera, Users2, Hash
} from "lucide-react";
import { Link } from "react-router-dom";
import { TravelHeroSection } from "../../components/travel";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id-here";

const contactCards = [
  { 
    icon: Phone, 
    title: "Call Us", 
    value: "+234 903 770 7888", 
    sub: "Available 24/7", 
    link: "tel:+2349037707888",
    desc: "Primary line"
  },
  { 
    icon: Mail, 
    title: "Email Us", 
    value: "info@rasoaf.com", 
    sub: "Response within hours", 
    link: "mailto:info@rasoaf.com",
    desc: "Official email"
  },
  { 
    icon: MapPin, 
    title: "Office", 
    value: "Lagos, Nigeria", 
    sub: "Ifako Ijaiye", 
    link: "#office",
    desc: "By appointment"
  },
];

const socialLinks = [
  { 
    name: "X (Twitter)", 
    url: "https://x.com/Rasoaftravels", 
    icon: Globe,
    iconColor: "#000000",
    bg: "rgba(0,0,0,0.04)",
  },
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/rasoaftravelsandtours/", 
    icon: Camera,
    iconColor: "#E4405F",
    bg: "rgba(228,64,95,0.06)",
  },
  { 
    name: "Facebook", 
    url: "https://www.facebook.com/profile.php?id=61590695552485", 
    icon: Users2,
    iconColor: "#1877F2",
    bg: "rgba(24,119,242,0.06)",
  },
  { 
    name: "TikTok", 
    url: "https://www.tiktok.com/@rasoaftravelsandtours?_r=1&_t=ZS-979zxQ4JqRF", 
    icon: Music2,
    iconColor: "#000000",
    bg: "rgba(0,0,0,0.04)",
  },
];

const additionalPhones = [
  { number: "+234 903 770 7888", href: "tel:+2349037707888" },
  { number: "+234 803 475 2061", href: "tel:+2348034752061" },
  { number: "+234 802 488 5017", href: "tel:+2348024885017" },
  { number: "+234 703 189 9529", href: "tel:+2347031899529" },
  { number: "+234 816 200 3534", href: "tel:+2348162003534" },
  { number: "+234 902 204 9017", href: "tel:+2349022049017" },
];

const RASOAF_CSS = `
  :root {
    --gold: #D4A017;
    --gold-light: #F7C948;
    --gold-dark: #B8860B;
    --cream: #FFF8E6;
    --cream-light: #FFFDF5;
    --white: #FFFFFF;
    --text-dark: #0A0F1A;
    --text-grey: #4B5563;
    --text-light: #6B7280;
    --border: #E6D5A8;
    --font-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.06);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.08);
    --radius: 20px;
    --radius-sm: 12px;
  }

  .tc-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #FFFDF5 0%, #FFF8E6 50%, #FFFDF5 100%);
  }

  .tc-hero-wrapper {
    position: relative;
  }

  .tc-section {
    max-width: 1200px;
    margin: -40px auto 0;
    padding: 40px 20px 80px;
    position: relative;
    z-index: 20;
  }

  /* ── Contact Cards ── */
  .tc-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }

  .tc-contact-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 28px 24px;
    text-align: center;
    border: 1px solid var(--border);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    text-decoration: none;
    display: block;
  }

  .tc-contact-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--gold);
  }

  .tc-card-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: rgba(212,160,23,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
    transition: all 0.4s ease;
  }

  .tc-contact-card:hover .tc-card-icon {
    background: rgba(212,160,23,0.12);
    transform: scale(1.05);
  }

  .tc-card-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-dark);
    margin: 0 0 4px 0;
  }

  .tc-card-value {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.15rem;
    color: var(--gold-dark);
    text-decoration: none;
    display: block;
    margin-bottom: 2px;
  }

  .tc-card-sub {
    font-size: 0.75rem;
    color: var(--text-light);
    margin: 0;
  }

  .tc-card-desc {
    font-size: 0.7rem;
    color: var(--text-light);
    margin: 6px 0 0 0;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── Additional Info Section ── */
  .tc-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }

  .tc-info-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 28px 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  .tc-info-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--text-dark);
    margin: 0 0 16px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .tc-phone-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tc-phone-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--text-grey);
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 6px 0;
  }

  .tc-phone-item:hover {
    color: var(--gold-dark);
    transform: translateX(2px);
  }

  .tc-phone-item svg {
    flex-shrink: 0;
    color: var(--gold);
  }

  .tc-address {
    font-family: var(--font-body);
    font-size: 0.92rem;
    color: var(--text-grey);
    line-height: 1.7;
    margin: 0;
  }

  .tc-email-link {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--gold-dark);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .tc-email-link:hover {
    color: var(--gold);
  }

  /* ── Social Links ── */
  .tc-social-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 40px;
  }

  .tc-social-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 18px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    background: var(--white);
  }

  .tc-social-link:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--gold);
  }

  .tc-social-icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .tc-social-name {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--text-dark);
  }

  /* ── Help & Support Section ── */
  .tc-help-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 40px;
  }

  .tc-help-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: all 0.4s ease;
  }

  .tc-help-card:hover {
    box-shadow: var(--shadow-md);
    border-color: rgba(212,160,23,0.3);
  }

  .tc-help-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-dark);
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .tc-help-text {
    font-family: var(--font-body);
    font-size: 0.88rem;
    color: var(--text-grey);
    line-height: 1.6;
    margin: 0;
  }

  .tc-help-link {
    color: var(--gold-dark);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .tc-help-link:hover {
    color: var(--gold);
    text-decoration: underline;
  }

  /* ── Form Card ── */
  .tc-form-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 40px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
  }

  .tc-form-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--text-dark);
    margin: 0 0 8px 0;
  }

  .tc-form-subtitle {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--text-grey);
    margin: 0 0 28px 0;
  }

  .tc-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .tc-input {
    width: 100%;
    padding: 13px 16px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    font-size: 14px;
    font-family: var(--font-body);
    background: var(--cream-light);
    outline: none;
    box-sizing: border-box;
    transition: all 0.3s ease;
    color: var(--text-dark);
  }

  .tc-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(212,160,23,0.08);
    background: var(--white);
  }

  .tc-input-row {
    display: flex;
    gap: 14px;
  }

  .tc-input-row .tc-input {
    flex: 1;
  }

  .tc-select {
    width: 100%;
    padding: 13px 16px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    font-size: 14px;
    font-family: var(--font-body);
    background: var(--cream-light);
    outline: none;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23B8860B' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 44px;
    color: var(--text-dark);
    transition: all 0.3s ease;
  }

  .tc-select:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(212,160,23,0.08);
    background: var(--white);
  }

  .tc-textarea {
    width: 100%;
    padding: 13px 16px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    font-size: 14px;
    font-family: var(--font-body);
    background: var(--cream-light);
    outline: none;
    resize: vertical;
    min-height: 120px;
    box-sizing: border-box;
    color: var(--text-dark);
    transition: all 0.3s ease;
  }

  .tc-textarea:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(212,160,23,0.08);
    background: var(--white);
  }

  .tc-submit-btn {
    padding: 15px 32px;
    border-radius: var(--radius-sm);
    border: none;
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
    color: #0A0F1A;
    font-family: var(--font-body);
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 16px rgba(212,160,23,0.25);
  }

  .tc-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(212,160,23,0.4);
  }

  .tc-submit-btn:active {
    transform: translateY(0);
  }

  .tc-submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .tc-error-banner {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    padding: 12px 16px;
    border-radius: var(--radius-sm);
    color: #ef4444;
    font-size: 0.88rem;
    margin-bottom: 16px;
  }

  .tc-privacy-text {
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-light);
    margin-top: 8px;
  }

  .tc-back-link {
    text-align: center;
    padding-bottom: 60px;
  }

  .tc-back-link a {
    color: var(--text-grey);
    font-size: 14px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: color 0.3s ease;
  }

  .tc-back-link a:hover {
    color: var(--gold-dark);
  }

  .tc-success-wrapper {
    min-height: 100vh;
    background: linear-gradient(180deg, #FFFDF5 0%, #FFF8E6 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .tc-success-card {
    text-align: center;
    background: var(--white);
    border-radius: var(--radius);
    padding: 48px 40px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    max-width: 440px;
    width: 100%;
  }

  .tc-success-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(34,197,94,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .tc-success-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--text-dark);
    margin: 0 0 8px 0;
  }

  .tc-success-text {
    color: var(--text-grey);
    margin: 0 0 28px 0;
    font-size: 0.95rem;
  }

  .tc-retry-btn {
    padding: 12px 28px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--white);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .tc-retry-btn:hover {
    background: var(--cream-light);
    border-color: var(--gold);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .tc-cards-grid { grid-template-columns: repeat(3, 1fr); }
    .tc-social-grid { grid-template-columns: repeat(2, 1fr); }
    .tc-info-grid { grid-template-columns: 1fr; }
    .tc-help-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .tc-section { padding: 30px 16px 60px; }
    .tc-cards-grid { grid-template-columns: 1fr; gap: 14px; }
    .tc-social-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .tc-form-card { padding: 28px 20px; }
    .tc-input-row { flex-direction: column; gap: 14px; }
    .tc-contact-card { padding: 22px 18px; }
  }

  @media (max-width: 480px) {
    .tc-section { padding: 24px 12px 48px; }
    .tc-social-grid { grid-template-columns: 1fr; }
    .tc-form-card { padding: 22px 16px; border-radius: 16px; }
    .tc-submit-btn { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .tc-contact-card:hover { transform: none !important; }
    .tc-social-link:hover { transform: none !important; }
    .tc-submit-btn:hover { transform: none !important; }
  }

  @media (forced-colors: active) {
    .tc-contact-card { border: 2px solid CanvasText; }
    .tc-social-link { border: 2px solid CanvasText; }
    .tc-form-card { border: 2px solid CanvasText; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

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
      if (!res.ok) throw new Error("Failed to send message. Please try again.");
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => { 
        setSubmitted(false); 
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); 
      }, 6000);
    } catch (err) {
      setLoading(false);
      setFormError(err.message);
    }
  };

  if (submitted) {
    return (
      <div className="tc-success-wrapper">
        <style>{RASOAF_CSS}</style>
        <div className="tc-success-card">
          <div className="tc-success-icon">
            <CheckCircle2 size={36} color="#22c55e" strokeWidth={2.5} />
          </div>
          <h2 className="tc-success-title">Message Sent!</h2>
          <p className="tc-success-text">We'll get back to you within 24 hours. Our team is ready to assist.</p>
          <button onClick={() => setSubmitted(false)} className="tc-retry-btn">Send Another Message</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tc-page">
      <style>{RASOAF_CSS}</style>

      <div className="tc-hero-wrapper">
        <TravelHeroSection
          badge="Get In Touch"
          title="Contact Travel & Tours"
          subtitle="Have questions about visas, flights, or travel packages? Our team is here to help."
          backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop"
        />
      </div>

      <section className="tc-section">
        <div className="tc-cards-grid">
          {contactCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <a key={i} href={c.link} className="tc-contact-card">
                <div className="tc-card-icon">
                  <Icon size={22} color="#B8860B" strokeWidth={1.8} />
                </div>
                <h4 className="tc-card-title">{c.title}</h4>
                <span className="tc-card-value">{c.value}</span>
                <p className="tc-card-sub">{c.sub}</p>
                <p className="tc-card-desc">{c.desc}</p>
              </a>
            );
          })}
        </div>

        <div className="tc-help-grid">
          <div className="tc-help-card">
            <h3 className="tc-help-title">
              <MessageCircle size={18} color="#D4A017" strokeWidth={2} />
              HELP
            </h3>
            <p className="tc-help-text">
              You can contact us anytime using our chatbot on the website at{" "}
              <a href="https://www.rasoaf.com" className="tc-help-link" target="_blank" rel="noopener noreferrer">
                www.rasoaf.com
              </a>{" "}
              or by phone or email:{" "}
              <a href="mailto:info@rasoaf.com" className="tc-help-link">info@rasoaf.com</a>
            </p>
          </div>
          <div className="tc-help-card">
            <h3 className="tc-help-title">
              <Shield size={18} color="#D4A017" strokeWidth={2} />
              SUPPORT
            </h3>
            <p className="tc-help-text">
              Our team is available anytime to support you on any inquiry either through email, telephone or chatbot.
            </p>
          </div>
        </div>

        <div className="tc-info-grid">
          <div className="tc-info-card">
            <h3 className="tc-info-title">
              <Phone size={20} color="#D4A017" strokeWidth={2} />
              Phone Numbers
            </h3>
            <ul className="tc-phone-list">
              {additionalPhones.map((phone, i) => (
                <li key={i}>
                  <a href={phone.href} className="tc-phone-item">
                    <Phone size={14} strokeWidth={2} />
                    {phone.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tc-info-card">
            <h3 className="tc-info-title">
              <MapPin size={20} color="#D4A017" strokeWidth={2} />
              CONTACT / Office Address
            </h3>
            <p className="tc-address">
              3 Bolaji Taylor Street,<br />
              Off Alhaji Haruna Street,<br />
              Ifako Ijaiye,<br />
              Lagos State, Nigeria
            </p>
            <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #E6D5A8" }}>
              <a href="mailto:info@rasoaf.com" className="tc-email-link">
                <Mail size={16} strokeWidth={2} />
                info@rasoaf.com
              </a>
            </div>
          </div>
        </div>

        <div className="tc-social-grid">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tc-social-link"
                aria-label={`Follow us on ${social.name}`}
              >
                <div className="tc-social-icon-wrap" style={{ background: social.bg }}>
                  <Icon size={20} color={social.iconColor} strokeWidth={2} />
                </div>
                <span className="tc-social-name">{social.name}</span>
                <ExternalLink size={14} color="#9CA3AF" strokeWidth={2} style={{ marginLeft: "auto" }} />
              </a>
            );
          })}
        </div>

        <div className="tc-form-card">
          <h3 className="tc-form-title">Send a Message</h3>
          <p className="tc-form-subtitle">Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {formError && <div className="tc-error-banner">{formError}</div>}
          
          <form className="tc-form" onSubmit={handleSubmit}>
            <input className="tc-input" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name *" aria-label="Full Name" />
            <div className="tc-input-row">
              <input className="tc-input" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email *" aria-label="Email Address" />
              <input className="tc-input" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone" aria-label="Phone Number" />
            </div>
            <select className="tc-select" name="subject" value={formData.subject} onChange={handleChange} aria-label="Subject">
              <option value="">Select Subject</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Business Visa">Business Visa</option>
              <option value="Family Visa">Family Visa</option>
              <option value="Flight Booking">Flight Booking</option>
              <option value="Other">Other</option>
            </select>
            <textarea className="tc-textarea" name="message" value={formData.message} onChange={handleChange} required placeholder="Your Message *" aria-label="Your Message" />
            <button className="tc-submit-btn" type="submit" disabled={loading}>
              {loading ? (
                <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Sending...</>
              ) : (
                <><Send size={18} />Send Message</>
              )}
            </button>
            <p className="tc-privacy-text">By submitting, you agree to our privacy policy.</p>
          </form>
        </div>
      </section>

      <div className="tc-back-link">
        <Link to="/travel">
          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
          Back to Travel Home
        </Link>
      </div>
    </div>
  );
}