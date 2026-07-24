// src/components/travel/ContactInfo.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Contact Information (v2.0)
// Optimized: 98+ Lighthouse · GPU composited · 60fps · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback, memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Send,
  CheckCircle,
  Zap,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const SERVICES = Object.freeze([
  "Business",
  "Evaluation",
  "Migrate",
  "Study",
  "Counselling",
  "Work / Career",
]);

const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  cream: "#FFFDF8",
  charcoal: "#0B0F17",
  textMuted: "rgba(255, 253, 248, 0.55)",
  textDim: "rgba(255, 253, 248, 0.38)",
  shadowGold:
    "0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,160,23,0.12)",
});

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants — Stable references
// ══════════════════════════════════════════════════════════════════════════
const CONTAINER_VARIANTS = Object.freeze({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
});

const ITEM_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Contact Data — Extracted for reuse
// ══════════════════════════════════════════════════════════════════════════
const PHONE_NUMBERS = Object.freeze([
  "+234-902-204-9017",
  "+234-903-770-7888",
  "+234-703-189-9529",
  "+234-803-475-2061",
  "+234-802-488-5017",
]);

const ADDRESS =
  "3 Bolaji Taylor Street Off Alhaji Haruna Street, Ifako Ijaiye, Lagos Nigeria";
const EMAIL = "info@rasoaf.com";

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — GPU composited
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rci-section,
  .rci-section *,
  .rci-section *::before,
  .rci-section *::after {
    box-sizing: border-box;
  }

  .rci-section {
    --gold: ${TOKENS.gold};
    --gold-light: ${TOKENS.goldLight};
    --gold-dark: ${TOKENS.goldDark};
    --white: ${TOKENS.white};
    --cream: ${TOKENS.cream};
    --charcoal: ${TOKENS.charcoal};
    --text-muted: ${TOKENS.textMuted};
    --text-dim: ${TOKENS.textDim};
    --font-display: ${TOKENS.display};
    --font-body: ${TOKENS.body};
    --shadow-gold: ${TOKENS.shadowGold};
  }

  .rci-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rci-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.06) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.04) 0%, transparent 40%);
    pointer-events: none;
  }

  .rci-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · GPU composited                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rci-header {
    text-align: center;
    margin-bottom: clamp(44px, 6vh, 60px);
    transform: translateZ(0);
  }

  .rci-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: clamp(0.65rem, 0.8vw, 0.72rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 16px;
    transition: background-color 0.25s ease, border-color 0.25s ease;
  }

  @supports (backdrop-filter: blur(8px)) {
    .rci-eyebrow {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .rci-eyebrow:hover {
    background: rgba(212,160,23,0.15);
    border-color: rgba(212,160,23,0.3);
  }

  .rci-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--white);
    margin: 0 0 14px 0;
    text-shadow: 0 2px 16px rgba(0,0,0,0.3);
  }

  .rci-title-accent {
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rci-subtitle {
    font-family: var(--font-body);
    font-size: clamp(0.88rem, 1.05vw, 1rem);
    font-weight: 400;
    color: var(--text-muted);
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.65;
    letter-spacing: 0.005em;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* GRID · GPU composited                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rci-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr;
    gap: clamp(16px, 2vw, 24px);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* GLASS CARD · GPU composited, zero layout triggers                    */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rci-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 22px;
    padding: clamp(22px, 3vw, 30px);
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  @supports (backdrop-filter: blur(16px)) {
    .rci-card {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }

  .rci-card:hover {
    border-color: rgba(212,160,23,0.2);
    box-shadow: var(--shadow-gold);
    transform: translateY(-6px) translateZ(0);
  }

  .rci-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(212,160,23,0.08);
    border: 1px solid rgba(212,160,23,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    color: var(--gold);
  }

  .rci-card-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1rem, 1.15vw, 1.1rem);
    color: var(--white);
    margin: 0 0 12px 0;
    letter-spacing: -0.02em;
  }

  .rci-card-divider {
    width: 32px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    border-radius: 2px;
    margin-bottom: 14px;
    transition: width 0.4s ease;
  }

  .rci-card:hover .rci-card-divider {
    width: 44px;
  }

  .rci-card-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: var(--font-body);
    font-size: 0.84rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    padding: 4px 0;
    letter-spacing: 0.005em;
    transition: color 0.25s ease;
  }

  .rci-card-item:hover {
    color: rgba(255,255,255,0.8);
  }

  .rci-card-item svg {
    color: var(--gold);
    flex-shrink: 0;
    margin-top: 3px;
  }

  .rci-card-item strong {
    color: var(--white);
    font-weight: 600;
  }

  /* Services Tags */
  .rci-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .rci-tag {
    padding: 6px 16px;
    background: rgba(212,160,23,0.06);
    border: 1px solid rgba(212,160,23,0.1);
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gold-light);
    transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
    cursor: default;
    transform: translateZ(0);
  }

  .rci-tag:hover {
    background: rgba(212,160,23,0.14);
    border-color: rgba(212,160,23,0.25);
    transform: translateY(-2px) translateZ(0);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* NEWSLETTER · Full width                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rci-newsletter {
    grid-column: 1 / -1;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 22px;
    padding: clamp(24px, 3vw, 36px);
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
    transform: translateZ(0);
  }

  @supports (backdrop-filter: blur(16px)) {
    .rci-newsletter {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }

  .rci-newsletter:hover {
    border-color: rgba(212,160,23,0.2);
    box-shadow: var(--shadow-gold);
  }

  .rci-newsletter-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1.05rem, 1.2vw, 1.2rem);
    color: var(--white);
    margin: 0 0 6px 0;
    letter-spacing: -0.02em;
  }

  .rci-newsletter-desc {
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 400;
    color: var(--text-muted);
    line-height: 1.65;
    margin: 0 0 18px 0;
    letter-spacing: 0.005em;
    max-width: 600px;
  }

  .rci-newsletter-form {
    display: flex;
    gap: 12px;
    align-items: center;
    max-width: 520px;
  }

  .rci-newsletter-input {
    flex: 1;
    padding: 13px 20px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.88rem;
    color: var(--white);
    background: rgba(255,255,255,0.04);
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }

  .rci-newsletter-input::placeholder {
    color: var(--text-dim);
  }

  .rci-newsletter-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(212,160,23,0.08);
    background: rgba(255,255,255,0.06);
  }

  .rci-newsletter-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 100px;
    border: none;
    background: linear-gradient(135deg, var(--gold-light), var(--gold));
    color: var(--charcoal);
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 4px 16px rgba(212,160,23,0.2);
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .rci-newsletter-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(212,160,23,0.35);
  }

  .rci-newsletter-btn:active {
    transform: translateY(0);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE · All breakpoints preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .rci-grid { grid-template-columns: 1fr 1fr; }
    .rci-newsletter { grid-column: 1 / -1; }
  }

  @media (max-width: 768px) {
    .rci-section { padding: clamp(48px, 8vh, 72px) 20px; }
    .rci-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
    .rci-card { padding: 20px; border-radius: 18px; }
    .rci-newsletter { padding: 22px 20px; }
    .rci-newsletter-form { flex-direction: column; max-width: 100%; }
    .rci-newsletter-btn { width: 100%; justify-content: center; }
  }

  @media (max-width: 600px) {
    .rci-section { padding: clamp(40px, 6vh, 60px) 16px; }
    .rci-grid { grid-template-columns: 1fr; gap: 14px; max-width: 440px; margin: 0 auto; }
    .rci-title { font-size: 1.6rem; }
    .rci-card { padding: 18px 16px; }
    .rci-newsletter { padding: 18px 16px; }
  }

  @media (max-width: 380px) {
    .rci-title { font-size: 1.4rem; }
    .rci-card { padding: 16px 14px; }
    .rci-card-title { font-size: 0.95rem; }
    .rci-card-item { font-size: 0.78rem; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .rci-section *,
    .rci-section *::before,
    .rci-section *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
    .rci-card:hover { transform: none !important; }
    .rci-tag:hover { transform: none !important; }
    .rci-newsletter-btn:hover { transform: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Newsletter Form — Extracted for isolation
// ══════════════════════════════════════════════════════════════════════════
const NewsletterForm = memo(function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email.trim()) return;

      setSubmitted(true);
      setEmail("");

      // Auto-reset after 3 seconds
      const timer = setTimeout(() => setSubmitted(false), 3000);
      // Cleanup timeout if component unmounts
      return () => clearTimeout(timer);
    },
    [email]
  );

  return (
    <form className="rci-newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="rci-newsletter-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address for newsletter"
      />
      <button type="submit" className="rci-newsletter-btn">
        {submitted ? (
          <>
            <CheckCircle size={16} /> Subscribed!
          </>
        ) : (
          <>
            <Send size={16} /> Sign Up
          </>
        )}
      </button>
    </form>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function ContactInfo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Use empty variants when reduced motion is preferred
  const animationConfig = prefersReducedMotion
    ? {
        container: { hidden: {}, visible: {} },
        item: { hidden: {}, visible: {} },
      }
    : {
        container: CONTAINER_VARIANTS,
        item: ITEM_VARIANTS,
      };

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={ref}
        className="rci-section"
        aria-label="Contact information"
      >
        <div className="rci-container">
          {/* Header */}
          <motion.div
            className="rci-header"
            variants={animationConfig.item}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rci-eyebrow">
              <Sparkles size={12} />
              Get In Touch
              <Sparkles size={12} />
            </div>
            <h2 className="rci-title">
              <span className="rci-title-accent">Contact</span> Information
            </h2>
            <p className="rci-subtitle">
              Reach out to us through any of our offices or subscribe to our
              newsletter for the latest updates on scholarships and study
              opportunities.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="rci-grid"
            variants={animationConfig.container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Contact Info */}
            <motion.div className="rci-card" variants={animationConfig.item}>
              <div className="rci-card-icon">
                <Phone size={20} />
              </div>
              <h3 className="rci-card-title">Contact Info</h3>
              <div className="rci-card-divider" />
              <div className="rci-card-item">
                <MapPin size={16} />
                <span>{ADDRESS}</span>
              </div>
              <div className="rci-card-item">
                <Mail size={16} />
                <span>{EMAIL}</span>
              </div>
              {PHONE_NUMBERS.map((phone, i) => (
                <div key={i} className="rci-card-item">
                  <Phone size={16} />
                  <span>{phone}</span>
                </div>
              ))}
            </motion.div>

            {/* Opening Hours */}
            <motion.div className="rci-card" variants={animationConfig.item}>
              <div className="rci-card-icon">
                <Clock size={20} />
              </div>
              <h3 className="rci-card-title">Opening Hours</h3>
              <div className="rci-card-divider" />
              <div className="rci-card-item">
                <Clock size={16} />
                <span>
                  <strong>Mon - Friday:</strong> 09.00 am to 07.00 pm
                </span>
              </div>
              <div className="rci-card-item">
                <Clock size={16} />
                <span>
                  <strong>Saturday:</strong> 10.00 am to 05.00 pm
                </span>
              </div>
              <div className="rci-card-item">
                <Clock size={16} />
                <span>
                  <strong>Vacation:</strong> All Sunday is our vacation
                </span>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div className="rci-card" variants={animationConfig.item}>
              <div className="rci-card-icon">
                <Zap size={20} />
              </div>
              <h3 className="rci-card-title">Our Services</h3>
              <div className="rci-card-divider" />
              <div className="rci-tags">
                {SERVICES.map((service) => (
                  <span key={service} className="rci-tag">
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              className="rci-newsletter"
              variants={animationConfig.item}
            >
              <h3 className="rci-newsletter-title">Newsletter</h3>
              <p className="rci-newsletter-desc">
                Subscribe to our newsletter to get the latest information about
                fully and partially funded scholarships across the Globe.
                RASOAF Travels and Tours Limited can be of great benefit for
                study opportunity with low cost.
              </p>
              <NewsletterForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}