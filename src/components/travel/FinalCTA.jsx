// src/components/travel/FinalCTA.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Final Premium CTA
// Luxury Gold + Charcoal Black · Strong closing
// Strict Rasoaf Global Design System Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  :root {
    /* Rasoaf DS type families */
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;

    /* Type scale (per Rasoaf Global Design System) */
    --rasoaf-h2-size: clamp(2.3rem, 5vw, 3.5rem);
    --rasoaf-body-large: clamp(1rem, 1.1vw, 1.125rem);
    --rasoaf-body-normal: 1rem;
    --rasoaf-caption-size: 0.875rem;
    --rasoaf-eyebrow-size: 0.8rem;
    --rasoaf-button-size: 0.95rem;
  }

  .fc-section {
    padding: clamp(80px, 12vh, 160px) clamp(16px, 4vw, 60px);
    background: linear-gradient(135deg, #0B0F17 0%, #101826 40%, #1B1A0F 100%);
    font-family: var(--rasoaf-body);
    text-align: center; position: relative; overflow: hidden;
    z-index: 10;
  }
  .fc-orb {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
  }
  .fc-orb-1 { top: -150px; right: -150px; width: 500px; height: 500px; background: rgba(212,160,23,0.05); }
  .fc-orb-2 { bottom: -150px; left: -100px; width: 450px; height: 450px; background: rgba(212,160,23,0.04); }
  .fc-orb-3 { top: 40%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 300px; background: rgba(247,201,72,0.03); }
  .fc-container { max-width: 750px; margin: 0 auto; position: relative; z-index: 1; }

  /* Eyebrow — Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .fc-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 18px; background: rgba(212,160,23,0.1); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212,160,23,0.2); border-radius: 100px;
    font-family: var(--rasoaf-body);
    color: #F7C948; font-size: var(--rasoaf-eyebrow-size); font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 20px;
    line-height: 1;
  }

  /* H2 — Manrope 800, clamp(2.3rem,5vw,3.5rem), letter-spacing -0.02em, line-height 1.15 (per DS) */
  .fc-title {
    font-family: var(--rasoaf-display); font-weight: 800;
    font-size: var(--rasoaf-h2-size); color: #FFFDF8;
    letter-spacing: -0.02em; margin-bottom: 16px; line-height: 1.15;
  }
  .fc-title span {
    background: linear-gradient(135deg, #F7C948, #D4A017, #B8860B);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  /* Subtitle — Inter 400, body-large scale, line-height 1.7 (per DS) */
  .fc-subtitle {
    font-family: var(--rasoaf-body); font-weight: 400;
    font-size: var(--rasoaf-body-large); color: rgba(255,253,248,0.5);
    max-width: 520px; margin: 0 auto 40px; line-height: 1.7;
  }

  /* Contact info — Inter 500, caption scale (per DS) */
  .fc-info {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 32px;
    margin-bottom: 36px;
    font-family: var(--rasoaf-body); font-weight: 500;
    font-size: var(--rasoaf-caption-size); color: rgba(255,253,248,0.5);
  }
  .fc-info-item { display: flex; align-items: center; gap: 8px; }
  .fc-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* Buttons — Inter 600, 0.95rem, letter-spacing 0.01em (per DS) */
  .fc-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 36px; border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--rasoaf-body); font-weight: 600;
    font-size: var(--rasoaf-button-size); letter-spacing: 0.01em;
    color: #0B0F17; background: linear-gradient(135deg, #F7C948, #D4A017, #B8860B);
    box-shadow: 0 4px 28px rgba(212,160,23,0.25);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
    position: relative; overflow: hidden;
  }
  .fc-btn-primary::after {
    content: ''; position: absolute; top: 0; left: -100%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: fc-shine 3s ease-in-out infinite;
  }
  @keyframes fc-shine { 0%, 100% { left: -100%; } 50% { left: 120%; } }
  .fc-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(212,160,23,0.4); }
  .fc-btn-primary:focus-visible { outline: 2px solid #F7C948; outline-offset: 3px; }
  .fc-btn-secondary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 36px; border-radius: 14px; cursor: pointer;
    font-family: var(--rasoaf-body); font-weight: 600;
    font-size: var(--rasoaf-button-size); letter-spacing: 0.01em;
    color: #F7C948; background: transparent;
    border: 1.5px solid rgba(212,160,23,0.25);
    transition: all 0.4s cubic-bezier(0.25,1,0.5,1);
  }
  .fc-btn-secondary:hover { background: rgba(212,160,23,0.08); border-color: #D4A017; transform: translateY(-2px); }
  .fc-btn-secondary:focus-visible { outline: 2px solid #F7C948; outline-offset: 3px; }

  .fc-newsletter { margin-top: clamp(40px, 6vh, 60px); max-width: 480px; margin-left: auto; margin-right: auto; }

  /* Newsletter note — Inter 400, caption scale (per DS) */
  .fc-newsletter p {
    font-family: var(--rasoaf-body); font-weight: 400;
    font-size: var(--rasoaf-caption-size); color: rgba(255,253,248,0.35);
    line-height: 1.6; margin-bottom: 12px;
  }
  .fc-newsletter-form { display: flex; gap: 8px; }

  /* Newsletter input — Inter 400, body-normal scale (per DS) */
  .fc-newsletter-input {
    flex: 1; padding: 13px 18px; border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
    color: #FFFDF8; font-size: var(--rasoaf-body-normal); font-family: var(--rasoaf-body);
    font-weight: 400; outline: none;
    transition: border-color 0.3s ease;
  }
  .fc-newsletter-input:focus { border-color: rgba(212,160,23,0.4); }
  .fc-newsletter-input::placeholder { color: rgba(255,253,248,0.25); }

  /* Newsletter button — Inter 600, 0.95rem, letter-spacing 0.01em (per DS button spec) */
  .fc-newsletter-btn {
    padding: 13px 24px; border-radius: 12px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #F7C948, #D4A017);
    color: #0B0F17; font-weight: 600; font-size: var(--rasoaf-button-size);
    letter-spacing: 0.01em;
    font-family: var(--rasoaf-body); transition: all 0.3s ease;
  }
  .fc-newsletter-btn:hover { opacity: 0.9; }
  .fc-newsletter-btn:focus-visible,
  .fc-newsletter-input:focus-visible { outline: 2px solid #F7C948; outline-offset: 2px; }

  @media (prefers-reduced-motion: reduce) {
    .fc-btn-primary::after { animation: none; }
    .fc-btn-primary, .fc-btn-secondary, .fc-newsletter-btn, .fc-newsletter-input { transition-duration: 0.01ms !important; }
  }

  @media (max-width: 480px) {
    .fc-actions { flex-direction: column; align-items: center; }
    .fc-info { flex-direction: column; align-items: center; gap: 12px; }
    .fc-newsletter-form { flex-direction: column; }
  }
`;

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  };

  return (
    <>
      <style>{CSS}</style>
      <section className="fc-section" ref={ref} aria-label="Final call to action">
        <div className="fc-orb fc-orb-1" />
        <div className="fc-orb fc-orb-2" />
        <div className="fc-orb fc-orb-3" />
        <motion.div className="fc-container" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <span className="fc-badge">✦ Get In Touch</span>
          <h2 className="fc-title">Ready To <span>Explore</span> The World?</h2>
          <p className="fc-subtitle">RASOAF Travels and Tours Limited is here at your doorstep. We do not charge fees for consultation we are ready to make your journey seamless.</p>

          <div className="fc-info">
            <span className="fc-info-item"><Phone size={14} color="#F7C948" aria-hidden="true" /> +234-903-770-7888</span>
            <span className="fc-info-item"><Mail size={14} color="#F7C948" aria-hidden="true" /> info@rasoaf.com</span>
            <span className="fc-info-item"><MapPin size={14} color="#F7C948" aria-hidden="true" /> Lagos, Nigeria</span>
          </div>

          <div className="fc-actions">
            <button className="fc-btn-primary" onClick={() => handleNavigate("/travel/contact")} type="button">Book Consultation <ArrowRight size={18} aria-hidden="true" /></button>
            <button className="fc-btn-secondary" onClick={() => handleNavigate("/travel/contact")} type="button"><Phone size={18} aria-hidden="true" /> Contact Us</button>
          </div>

          <div className="fc-newsletter">
            <p>Subscribe to our newsletter for the latest information about fully and partially funded scholarships across the Globe.</p>
            <div className="fc-newsletter-form">
              <label htmlFor="fc-newsletter-email" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                Email address
              </label>
              <input id="fc-newsletter-email" type="email" placeholder="Your email address" className="fc-newsletter-input" />
              <button className="fc-newsletter-btn" type="button">Subscribe</button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}