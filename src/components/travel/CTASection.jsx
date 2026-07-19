// src/components/travel/CTASection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED  Premium Call to Action
// Strict Rasoaf Global Design System Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  :root {
    /* Rasoaf DS type families */
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;

    /* Type scale (per Rasoaf Global Design System) */
    --rasoaf-h2-size: clamp(2.3rem, 5vw, 3.5rem);
    --rasoaf-body-large: clamp(1rem, 1.1vw, 1.125rem);
    --rasoaf-caption-size: 0.875rem;
    --rasoaf-eyebrow-size: 0.8rem;
    --rasoaf-button-size: 0.95rem;
  }

  .cta-section {
    padding: clamp(80px, 12vh, 160px) clamp(16px, 4vw, 60px);
    background: linear-gradient(135deg, #010612 0%, #0A1628 40%, #1a1207 100%);
    font-family: var(--rasoaf-body);
    text-align: center; position: relative; overflow: hidden;
  }
  .cta-orb {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
  }
  .cta-orb-1 { top: -150px; right: -150px; width: 500px; height: 500px; background: rgba(212,160,23,0.05); }
  .cta-orb-2 { bottom: -150px; left: -100px; width: 450px; height: 450px; background: rgba(212,160,23,0.04); }
  .cta-orb-3 { top: 40%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 300px; background: rgba(247,201,72,0.03); }
  .cta-container { max-width: 750px; margin: 0 auto; position: relative; z-index: 1; }

  /* Eyebrow Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .cta-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 18px; background: rgba(212,160,23,0.12); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212,160,23,0.25); border-radius: 100px;
    font-family: var(--rasoaf-body);
    color: #F7C948; font-size: var(--rasoaf-eyebrow-size); font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 20px;
    line-height: 1;
  }

  /* H2  Manrope 800, clamp(2.3rem,5vw,3.5rem), letter-spacing -0.02em, line-height 1.15 (per DS) */
  .cta-title {
    font-family: var(--rasoaf-display); font-weight: 800;
    font-size: var(--rasoaf-h2-size); color: #fff;
    letter-spacing: -0.02em; margin-bottom: 16px; line-height: 1.15;
  }
  .cta-gold {
    background: linear-gradient(135deg, #F7C948, #D4A017);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  /* Subtitle  Inter 400, body-large scale, line-height 1.7 (per DS) */
  .cta-subtitle {
    font-family: var(--rasoaf-body); font-weight: 400;
    font-size: var(--rasoaf-body-large); color: rgba(255,255,255,0.55);
    max-width: 520px; margin: 0 auto 40px; line-height: 1.7;
  }

  /* Contact info  Inter 500, caption scale (per DS) */
  .cta-info {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 20px 40px;
    margin-bottom: 36px;
    font-family: var(--rasoaf-body); font-weight: 500;
    font-size: var(--rasoaf-caption-size); color: rgba(255,255,255,0.6);
  }
  .cta-info-item { display: flex; align-items: center; gap: 8px; }
  .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* Buttons  Inter 600, 0.95rem, letter-spacing 0.01em (per DS) */
  .cta-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 36px; border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--rasoaf-body); font-weight: 600;
    font-size: var(--rasoaf-button-size); letter-spacing: 0.01em;
    color: #111; background: linear-gradient(135deg, #F7C948, #D4A017);
    box-shadow: 0 4px 28px rgba(212,160,23,0.25);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .cta-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(212,160,23,0.4); }
  .cta-btn-primary:focus-visible { outline: 2px solid #F7C948; outline-offset: 3px; }
  .cta-btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 36px; border-radius: 14px; cursor: pointer;
    font-family: var(--rasoaf-body); font-weight: 600;
    font-size: var(--rasoaf-button-size); letter-spacing: 0.01em;
    color: #F7C948; background: transparent;
    border: 1.5px solid rgba(212,160,23,0.3);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .cta-btn-secondary:hover { background: rgba(212,160,23,0.08); border-color: #D4A017; transform: translateY(-2px); }
  .cta-btn-secondary:focus-visible { outline: 2px solid #F7C948; outline-offset: 3px; }

  @media (prefers-reduced-motion: reduce) {
    .cta-btn-primary, .cta-btn-secondary { transition-duration: 0.01ms !important; }
  }

  @media (max-width: 480px) {
    .cta-actions { flex-direction: column; align-items: center; }
    .cta-info { flex-direction: column; align-items: center; gap: 12px; }
  }
`;

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const handleConsultation = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate("/travel/contact"), 300);
  };

  const handleContact = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate("/travel/contact"), 300);
  };

  return (
    <>
      <style>{CSS}</style>
      <section className="cta-section" ref={ref} aria-label="Call to action">
        <div className="cta-orb cta-orb-1" />
        <div className="cta-orb cta-orb-2" />
        <div className="cta-orb cta-orb-3" />
        <motion.div className="cta-container" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="cta-badge">✦ Get In Touch</span>
          <h2 className="cta-title">Ready To <span className="cta-gold">Explore</span> The World?</h2>
          <p className="cta-subtitle">Begin your next unforgettable journey with RASOAF Travels & Tours. Our team is ready to assist you.</p>
          <div className="cta-info">
            <span className="cta-info-item"><Phone size={14} color="#F7C948" aria-hidden="true" /> +234-903-770-7888</span>
            <span className="cta-info-item"><Mail size={14} color="#F7C948" aria-hidden="true" /> info@rasoaf.com</span>
          </div>
          <div className="cta-actions">
            <button className="cta-btn-primary" onClick={handleConsultation} type="button">Book Consultation <ArrowRight size={18} aria-hidden="true" /></button>
            <button className="cta-btn-secondary" onClick={handleContact} type="button"><Phone size={18} aria-hidden="true" /> Contact Us</button>
          </div>
        </motion.div>
      </section>
    </>
  );
}