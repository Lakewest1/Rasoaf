// src/components/home/Stats.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Stats Section  (production rewrite)
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Trust indicators in single-line marquee to save space on larger screens
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Star, Plane, Calendar, Shield, Clock, Award, Heart } from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const GOLD      = "#D4A017";
const GOLD_DARK = "#B8860B";
const NAVY      = "#111111";
const BG_LIGHT  = "#ffffff"; // Changed to white

// ── Module-level stable components ───────────────────────────────────────────
const KaabaIcon = memo(function KaabaIcon({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="1" />
      <path d="M4 6 12 2l8 4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <rect x="9" y="13" width="6" height="7" />
    </svg>
  );
});

const Ico = {
  Globe: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )),
  Mail: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )),
  FB: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )),
  IG: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )),
  X: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  )),
  TikTok: memo(() => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  )),
};

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 10000, suffix: "+", label: "Happy Travellers",    desc: "Pilgrims & explorers served worldwide", icon: "pilgrim" },
  { value: 98,    suffix: "%", label: "Satisfaction Rate",   desc: "Verified post-journey survey",          icon: "star"    },
  { value: 15,    suffix: "+", label: "Years Experience",    desc: "Trusted in Hajj & Umrah services",      icon: "kaaba"   },
  { value: 50,    suffix: "+", label: "Global Destinations", desc: "Flights, hotels & visa worldwide",       icon: "plane"   },
];

const TRUST_INDICATORS = [
  { id: 1, label: "10,000+ Pilgrims Served",     Icon: Users    },
  { id: 2, label: "15+ Years Experience",         Icon: Calendar },
  { id: 3, label: "Saudi Visa Assistance",        Icon: Shield   },
  { id: 4, label: "24/7 Customer Support",        Icon: Clock    },
  { id: 5, label: "IATA / Government Registered", Icon: Award    },
  { id: 6, label: "98% Client Satisfaction",      Icon: Heart    },
];

const SOCIAL_LINKS = [
  { label: "Website",   href: "https://www.rasoaf.com",                                 Icon: Ico.Globe   },
  { label: "Email",     href: "mailto:rasoaf24@gmail.com",                              Icon: Ico.Mail    },
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61590695552485", Icon: Ico.FB      },
  { label: "Instagram", href: "https://www.instagram.com/rasoaftravelsandtours/",       Icon: Ico.IG      },
  { label: "X",         href: "https://x.com/Rasoaftravels",                            Icon: Ico.X       },
  { label: "TikTok",    href: "https://www.tiktok.com/@rasoaftravelsandtours",           Icon: Ico.TikTok  },
];

const SLIDE_DISTANCE = 80;

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref    = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useSequentialReveal(enabled, total, interval = 600) {
  const [revealed, setRevealed] = useState(0);
  const iRef = useRef(null);
  const tRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    let cur = 0;
    tRef.current = setTimeout(() => {
      setRevealed(++cur);
      iRef.current = setInterval(() => {
        setRevealed(++cur);
        if (cur >= total) clearInterval(iRef.current);
      }, interval);
    }, 300);
    return () => { clearTimeout(tRef.current); clearInterval(iRef.current); };
  }, [enabled, total, interval]);
  return revealed;
}

function useCounter(target, duration = 2200, enabled = false) {
  const [count, setCount] = useState(0);
  const [done,  setDone]  = useState(false);
  const rafRef  = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMob   = window.innerWidth < 768;
    if (reduced || isMob) { setCount(target); setDone(true); return; }
    const t0   = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(e * target));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else setDone(true);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, target, duration]);
  return { count, done };
}

function useScrollParallax(speed = 0.3) {
  const ref    = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          setOffset((window.innerHeight - rect.top) * speed);
        }
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);
  return [ref, offset];
}

// ── StatIcon ──────────────────────────────────────────────────────────────────
function StatIcon({ type, size = 24 }) {
  if (type === "pilgrim") return <Users    size={size} strokeWidth={1.5} />;
  if (type === "star")    return <Star     size={size} strokeWidth={1.5} />;
  if (type === "kaaba")   return <KaabaIcon size={size} />;
  if (type === "plane")   return <Plane    size={size} strokeWidth={1.5} />;
  return null;
}

// ── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ stat, isVisible, index, fromLeft }) {
  const { count, done } = useCounter(stat.value, 2200, isVisible);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--tx", `${((e.clientX - r.left) / r.width  * 100).toFixed(1)}%`);
    el.style.setProperty("--ty", `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`);
  }, []);

  const displayCount = useMemo(() => {
    if (stat.value >= 1000) {
      const k = count / 1000;
      return k < 1 ? count : `${Math.round(k)}K`;
    }
    return count;
  }, [count, stat.value]);

  const hiddenX = fromLeft ? `-${SLIDE_DISTANCE}px` : `${SLIDE_DISTANCE}px`;

  return (
    <article
      ref={cardRef}
      className={[
        "rs-card",
        !isVisible  ? "rs-card--hidden"  : "",
        hovered     ? "rs-card--hovered" : "",
      ].join(" ")}
      style={{ "--hidden-x": hiddenX, "--tx": "50%", "--ty": "50%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
    >
      <div className="rs-card__bar"   aria-hidden="true" />
      <div className="rs-card__glow"  aria-hidden="true" />
      <div className="rs-card__shine" style={{ animationDelay: `${index * 3}s` }} aria-hidden="true" />

      <div className={`rs-card__icon${isVisible ? " rs-card__icon--on" : ""}`}>
        <StatIcon type={stat.icon} size={24} />
      </div>

      <div
        aria-live="polite" aria-atomic="true"
        className={`rs-card__counter${isVisible ? " rs-card__counter--on" : ""}${done ? " rs-glow" : ""}`}
      >
        <span>{displayCount}</span>
        <span className="rs-card__suffix">{stat.suffix}</span>
      </div>

      <div className={`rs-card__label${isVisible ? " rs-card__label--on" : ""}`}>{stat.label}</div>
      <div className={`rs-card__desc${isVisible  ? " rs-card__desc--on"  : ""}`}>{stat.desc}</div>
      <div className={`rs-card__sep${isVisible   ? " rs-card__sep--on"   : ""}`} aria-hidden="true" />
    </article>
  );
}

// ── TrustChip — CSS-only hover, zero per-chip state ──────────────────────────
const TrustChip = memo(function TrustChip({ indicator, index, visible }) {
  const { Icon } = indicator;
  return (
    <div
      className="rs-chip"
      role="listitem"
      style={{
        transitionDelay: `${0.04 * index}s`,
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <span className="rs-chip__icon" aria-hidden="true">
        <Icon size={11} strokeWidth={2.5} />
      </span>
      <span>{indicator.label}</span>
    </div>
  );
});

// ── Main component ────────────────────────────────────────────────────────────
export default function RasoafStats() {
  const navigate = useNavigate();
  const [dotRef,  dotOffset] = useScrollParallax(0.18);
  const [orbRef,  orbOffset] = useScrollParallax(0.09);
  const [secRef,  inView]    = useInView(0.12);

  const setRefs = useCallback((el) => {
    secRef.current = el;
    dotRef.current = el;
    orbRef.current = el;
  }, []);

  const [lineOn,   setLineOn]   = useState(false);
  const [trustOn,  setTrustOn]  = useState(false);
  const [ctasOn,   setCtasOn]   = useState(false);
  const isMobRef = useRef(false);

  useEffect(() => { isMobRef.current = window.innerWidth < 768; }, []);

  const revealedCount = useSequentialReveal(inView, STATS.length, isMobRef.current ? 300 : 600);

  useEffect(() => {
    if (!inView) return;
    const m = isMobRef.current;
    const t1 = setTimeout(() => setLineOn(true),  m ? 200  : 400);
    const t2 = setTimeout(() => setTrustOn(true), m ? 400  : 600);
    const t3 = setTimeout(() => setCtasOn(true),  m ? 700  : 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  const handleBookTrip = () => {
    navigate("/hajj/packages/hajj");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSeePackages = () => {
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/hajj/services");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={setRefs}
        className="rs-section"
        id="stats"
        aria-label="RASOAF Travels key statistics"
      >
        <div className="rs-deco rs-deco--br" aria-hidden="true"><KaabaIcon size={200} /></div>
        <div className="rs-deco rs-deco--tl" aria-hidden="true"><KaabaIcon size={160} /></div>

        <div className="rs-dots" aria-hidden="true"
          style={{ transform: `translateY(${dotOffset * 0.18}px)` }} />

        <div className="rs-orb rs-orb--tl" aria-hidden="true"
          style={{ transform: `translateY(${orbOffset * 0.09}px)` }} />
        <div className="rs-orb rs-orb--br" aria-hidden="true"
          style={{ transform: `translateY(${-orbOffset * 0.06}px)` }} />

        <div className="rs-inner">

          <header className={`rs-hdr${inView ? " rs-hdr--on" : ""}`}>
            <div className="rs-eyebrow">
              <span className="rs-eyebrow__line" aria-hidden="true" />
              <span className="rs-eyebrow__text">Our Impact</span>
              <span className="rs-eyebrow__line" aria-hidden="true" />
            </div>
            <h2 id="stats-heading" className="rs-h2">
              Sacred Journeys,{" "}
              <span className="rs-h2__shimmer">Trusted Numbers</span>
            </h2>
            <p className="rs-subp">
              We bring reality to your journey — from sacred Hajj &amp; Umrah
              pilgrimages to seamless global visa services and premium travel
              experiences. No templates, no repeated routes, no shortcuts.
            </p>
          </header>

          {/* ── Trust Marquee ────────────────────────────────────────────── */}
          <div className={`rs-trust-marquee${trustOn ? " rs-trust-marquee--on" : ""}`} role="list" aria-label="Trust indicators">
            <div className="rs-trust-track">
              {/* First set */}
              {TRUST_INDICATORS.map((ind, i) => (
                <TrustChip key={`first-${ind.id}`} indicator={ind} index={i} visible={true} />
              ))}
              {/* Duplicate for seamless loop */}
              {TRUST_INDICATORS.map((ind, i) => (
                <TrustChip key={`second-${ind.id}`} indicator={ind} index={i} visible={true} />
              ))}
            </div>
          </div>

          <div className="rs-div" aria-hidden="true">
            <div className={`rs-div__l${lineOn ? " rs-div__l--on" : ""}`} />
            <div className={`rs-div__d${lineOn ? " rs-div__d--on" : ""}`} />
            <div className={`rs-div__r${lineOn ? " rs-div__r--on" : ""}`} />
          </div>

          <div className="rs-grid" role="list">
            {STATS.map((s, i) => (
              <div key={s.label} role="listitem">
                <StatCard stat={s} isVisible={i < revealedCount} index={i} fromLeft={i % 2 === 0} />
              </div>
            ))}
          </div>

          <div className={`rs-ctas${ctasOn ? " rs-ctas--on" : ""}`}>
            <button type="button" className="rs-btn rs-btn--fill"
              onClick={handleBookTrip} aria-label="Book a trip">
              ✈ Book a Trip
            </button>
            <button type="button" className="rs-btn rs-btn--out"
              onClick={handleSeePackages} aria-label="See Packages">
              See Packages
            </button>
          </div>

          <div className={`rs-soc${ctasOn ? " rs-soc--on" : ""}`}>
            <div className="rs-soc__rule" aria-hidden="true" />
            <div className="rs-soc__row" role="list" aria-label="RASOAF social media links">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="rs-soc__chip" aria-label={`RASOAF on ${label}`} role="listitem">
                  <Icon /><span>{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={`rs-rule${inView ? " rs-rule--on" : ""}`} aria-hidden="true">
            <div className="rs-rule__l" /><div className="rs-rule__d" /><div className="rs-rule__l" />
          </div>

        </div>
      </section>
    </>
  );
}

// ── Static stylesheet ──────────────────────────────────────────────────────
const STYLES = `
/* ── Rasoaf Design System Typography ── */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

@keyframes rsCounterGlow {
  0%,100% { text-shadow:none; }
  35% { text-shadow:0 0 22px rgba(212,160,23,0.55),0 0 44px rgba(212,160,23,0.25); }
}
@keyframes rsShine {
  0%,88% { left:-20%;opacity:0; } 89% { opacity:0.5; } 94%,100% { left:130%;opacity:0; }
}
@keyframes rsShimmer {
  0% { background-position:200% center; } 100% { background-position:-200% center; }
}
@keyframes rsPulse {
  0%,100% { box-shadow:0 0 6px rgba(212,160,23,0.3); }
  50%      { box-shadow:0 0 16px rgba(212,160,23,0.55); }
}
@keyframes rsMarquee {
  0% { transform:translateX(0); }
  100% { transform:translateX(-50%); }
}

.rs-section {
  position:relative;
  background:#ffffff;
  overflow:hidden;
  padding:clamp(56px,10vh,112px) clamp(16px,5vw,80px) clamp(56px,9vh,104px);
}

/* ── Remove background on smaller screens ── */
@media(max-width:768px) {
  .rs-section {
    background:transparent;
    padding:clamp(40px,6vh,56px) clamp(12px,3vw,24px) clamp(40px,6vh,56px);
  }
}
@media(max-width:480px) {
  .rs-section {
    background:transparent;
    padding:clamp(28px,4vh,40px) clamp(8px,2vw,16px) clamp(28px,4vh,40px);
  }
}

.rs-deco { position:absolute; pointer-events:none; opacity:0.025; z-index:0; color:#D4A017; }
.rs-deco--br { bottom:-40px; right:-40px; }
.rs-deco--tl { top:-30px; left:-30px; transform:rotate(45deg); }
@media(max-width:768px){
  .rs-deco--br svg { width:120px;height:120px; } .rs-deco--br { bottom:-20px;right:-20px; }
  .rs-deco--tl svg { width:100px;height:100px; } .rs-deco--tl { top:-15px;left:-15px; }
}
@media(max-width:480px){
  .rs-deco--br svg { width:80px;height:80px; } .rs-deco--tl svg { width:60px;height:60px; }
}

.rs-dots {
  position:absolute;inset:0;z-index:0;pointer-events:none;will-change:transform;
  background-image:radial-gradient(circle,rgba(212,160,23,0.06) 1px,transparent 1px);
  background-size:36px 36px;
}
@media(max-width:768px){ .rs-dots,.rs-orb { display:none; } }
.rs-orb { position:absolute;border-radius:50%;pointer-events:none;z-index:0;will-change:transform; }
.rs-orb--tl { top:-12%;left:-5%;width:clamp(260px,45vw,480px);height:clamp(260px,45vw,480px);background:radial-gradient(circle,rgba(212,160,23,0.05) 0%,transparent 70%); }
.rs-orb--br { bottom:-10%;right:-6%;width:clamp(200px,35vw,360px);height:clamp(200px,35vw,360px);background:radial-gradient(circle,rgba(17,17,17,0.03) 0%,transparent 70%); }

.rs-inner { position:relative;z-index:1;max-width:1200px;margin:0 auto; }

/* ── Header ── */
.rs-hdr {
  text-align:center;margin-bottom:clamp(20px,3vh,32px);
  opacity:0;transform:translateY(16px);
  transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1);
}
.rs-hdr--on { opacity:1;transform:none; }

.rs-eyebrow {
  display:inline-flex;align-items:center;gap:10px;margin-bottom:12px;
}
.rs-eyebrow__line {
  height:1.5px;background:#D4A017;border-radius:999px;width:clamp(24px,3vw,36px);
}
.rs-eyebrow__text {
  font-family:'Inter',sans-serif;
  font-size:clamp(0.7rem,0.8vw,0.8rem);
  font-weight:700;
  letter-spacing:0.18em;
  text-transform:uppercase;
  color:#D4A017;
  white-space:nowrap;
}

.rs-h2 {
  font-family:'Manrope',sans-serif;
  font-weight:800;
  font-size:clamp(2rem,3.5vw,3rem);
  letter-spacing:-0.02em;
  line-height:1.1;
  color:#111111;
  margin:0 0 12px;padding:0 clamp(8px,2vw,24px);
}
.rs-h2__shimmer {
  background:linear-gradient(90deg,#9a6e1a 0%,#D4A017 40%,#F7C948 60%,#D4A017 80%,#9a6e1a 100%);
  background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:rsShimmer 4s linear infinite;
}

.rs-subp {
  font-family:'Inter',sans-serif;
  font-size:clamp(0.9rem,1vw,1rem);
  font-weight:400;
  line-height:1.7;
  color:#5F5F5F;
  max-width:520px;margin:0 auto;padding:0 clamp(8px,2vw,24px);
}

/* ── Trust Marquee ── */
.rs-trust-marquee {
  width:100%;overflow:hidden;margin:clamp(8px,1.5vh,16px) auto clamp(16px,2.5vh,24px);
  opacity:0;transform:translateY(8px);
  transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);
}
.rs-trust-marquee--on { opacity:1;transform:none; }

.rs-trust-track {
  display:flex;gap:clamp(16px,2vw,28px);width:max-content;
  animation:rsMarquee 28s linear infinite;
  padding:4px 0;
}
.rs-trust-track:hover { animation-play-state:paused; }

.rs-chip {
  display:inline-flex;align-items:center;gap:7px;flex-shrink:0;
  background:rgba(255,255,255,0.9);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  border:1px solid rgba(0,0,0,0.06);border-radius:50px;padding:5px 14px 5px 8px;
  font-family:'Inter',sans-serif;
  font-size:clamp(0.7rem,0.8vw,0.8rem);
  font-weight:450;
  color:#2d3748;
  letter-spacing:.01em;white-space:nowrap;cursor:default;
  box-shadow:0 2px 8px rgba(0,0,0,0.04);
  transition:border-color .25s ease,box-shadow .25s ease,background .25s ease,transform .25s ease;
}
.rs-chip:hover {
  border-color:rgba(212,160,23,0.35);background:#fff;
  box-shadow:0 4px 16px rgba(0,0,0,0.08),0 2px 8px rgba(212,160,23,0.08);
  transform:translateY(-2px);
}
.rs-chip__icon {
  display:inline-flex;align-items:center;justify-content:center;
  width:16px;height:16px;border-radius:50%;background:rgba(212,160,23,0.08);
  color:#D4A017;flex-shrink:0;transition:background .25s ease;
}
.rs-chip:hover .rs-chip__icon { background:linear-gradient(135deg,rgba(212,160,23,0.18),rgba(212,160,23,0.06)); }

/* ── Divider ── */
.rs-div { display:flex;align-items:center;gap:clamp(10px,1.5vw,18px);max-width:380px;margin:0 auto clamp(28px,4vh,48px); }
.rs-div__l,.rs-div__r { flex:1;height:1.5px;border-radius:999px;transform:scaleX(0);transition:transform .8s cubic-bezier(.16,1,.3,1); }
.rs-div__l { background:linear-gradient(90deg,transparent,#D4A017);transform-origin:right; }
.rs-div__r { background:linear-gradient(90deg,#D4A017,transparent);transform-origin:left; }
.rs-div__l--on,.rs-div__r--on { transform:scaleX(1); }
.rs-div__d { width:6px;height:6px;border-radius:50%;background:#D4A017;flex-shrink:0;opacity:0;transform:scale(0);transition:opacity .4s ease .4s,transform .4s cubic-bezier(.34,1.56,.64,1) .4s; }
.rs-div__d--on { opacity:1;transform:scale(1);animation:rsPulse 3s ease-in-out infinite; }

/* ── Grid ── */
.rs-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(14px,2vw,28px); }
@media(max-width:1024px){ .rs-grid { grid-template-columns:repeat(2,1fr); } }
@media(max-width:520px) { .rs-grid { grid-template-columns:repeat(2,1fr);gap:12px; } }

/* ── StatCard ── */
.rs-card {
  position:relative;background:#fff;border:1px solid rgba(0,0,0,0.08);
  border-radius:20px;
  padding:clamp(24px,3.5vw,40px) clamp(16px,2.5vw,28px) clamp(20px,3vw,32px);
  text-align:center;overflow:hidden;
  opacity:0;transform:translateX(var(--hidden-x));
  transition:opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1),border-color .3s ease,box-shadow .3s ease;
  will-change:opacity,transform;
}
/* ── Remove card background on smaller screens ── */
@media(max-width:768px) {
  .rs-card {
    background:rgba(255,255,255,0.85);
    backdrop-filter:blur(4px);
    -webkit-backdrop-filter:blur(4px);
    border:1px solid rgba(255,255,255,0.3);
    box-shadow:0 4px 20px rgba(0,0,0,0.06);
  }
}
@media(max-width:480px) {
  .rs-card {
    background:rgba(255,255,255,0.75);
    backdrop-filter:blur(4px);
    -webkit-backdrop-filter:blur(4px);
    border:1px solid rgba(255,255,255,0.2);
    padding:clamp(16px,3vw,24px) clamp(12px,2vw,18px) clamp(14px,2.5vw,20px);
    border-radius:14px;
  }
}
.rs-card:not(.rs-card--hidden) { opacity:1;transform:translateX(0) scale(1); }
.rs-card--hovered:not(.rs-card--hidden) {
  transform:translateY(-4px) scale(1.01);
  border-color:rgba(212,160,23,0.5);
  box-shadow:0 20px 50px rgba(0,0,0,0.1),0 4px 14px rgba(212,160,23,0.12);
  transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
}
.rs-card__bar {
  position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#D4A017,#F7C948,#D4A017);
  border-radius:20px 20px 0 0;transform-origin:left;transform:scaleX(0);opacity:.6;
  transition:transform .6s cubic-bezier(.16,1,.3,1),opacity .3s ease;
}
.rs-card--hovered .rs-card__bar { transform:scaleX(1);opacity:1; }
.rs-card__glow {
  position:absolute;inset:0;border-radius:20px;pointer-events:none;
  background:radial-gradient(circle at var(--tx) var(--ty),rgba(212,160,23,0.08),transparent 60%);
  opacity:0;transition:opacity .4s ease;
}
.rs-card--hovered .rs-card__glow { opacity:1; }
.rs-card__shine {
  position:absolute;top:50%;left:-20%;width:60%;height:120%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);
  transform:skewX(-15deg) translateY(-50%);animation:rsShine 12s ease-in-out infinite;
  pointer-events:none;z-index:1;
}

.rs-card__icon {
  display:inline-flex;align-items:center;justify-content:center;
  width:clamp(44px,6.5vw,64px);height:clamp(44px,6.5vw,64px);border-radius:50%;
  background:rgba(212,160,23,0.06);border:1px solid rgba(212,160,23,0.15);color:#D4A017;
  margin-bottom:clamp(12px,1.8vw,18px);position:relative;z-index:2;
  opacity:0;transform:scale(0.5) rotate(-10deg);
  transition:opacity .4s ease,transform .4s cubic-bezier(.34,1.56,.64,1),background .3s ease,border-color .3s ease;
}
.rs-card__icon--on { opacity:1;transform:scale(1) rotate(0deg); }
.rs-card--hovered .rs-card__icon { transform:scale(1.08) rotate(2deg);background:linear-gradient(135deg,rgba(212,160,23,0.16),rgba(212,160,23,0.07));border-color:rgba(212,160,23,0.3); }

.rs-card__counter {
  font-family:'Manrope',sans-serif;
  font-weight:800;
  font-size:clamp(1.8rem,3.2vw,3.2rem);
  letter-spacing:-0.02em;
  line-height:1.1;
  color:#111111;
  margin-bottom:clamp(6px,1vw,10px);position:relative;z-index:2;
  opacity:0;transform:translateY(10px);
  transition:opacity .6s ease .6s,transform .6s cubic-bezier(.16,1,.3,1) .6s;
}
.rs-card__counter--on { opacity:1;transform:none; }
.rs-card__suffix { color:#D4A017;font-size:.72em;font-weight:600; }
.rs-glow { animation:rsCounterGlow 1s cubic-bezier(.22,1,.36,1) forwards; }

.rs-card__label {
  font-family:'Inter',sans-serif;
  font-size:clamp(0.8rem,1vw,0.95rem);
  font-weight:600;
  color:#111111;
  letter-spacing:.01em;line-height:1.3;
  margin-bottom:clamp(4px,.8vw,7px);position:relative;z-index:2;
  opacity:0;transform:translateY(8px);
  transition:opacity .6s ease .8s,transform .6s cubic-bezier(.16,1,.3,1) .8s;
}
.rs-card__label--on { opacity:1;transform:none; }

.rs-card__desc {
  font-family:'Inter',sans-serif;
  font-size:clamp(0.7rem,0.9vw,0.85rem);
  font-weight:400;
  color:#5F5F5F;
  line-height:1.5;font-style:italic;position:relative;z-index:2;
  opacity:0;transform:translateY(6px);
  transition:opacity .6s ease 1s,transform .6s cubic-bezier(.16,1,.3,1) 1s;
}
.rs-card__desc--on { opacity:1;transform:none; }

.rs-card__sep {
  height:1.5px;background:linear-gradient(90deg,transparent,#D4A017,transparent);border-radius:999px;
  margin:clamp(14px,2vw,22px) auto 0;width:28%;opacity:0;transform:scaleX(0);
  transition:width .4s ease,opacity .5s ease 1.1s,transform .5s cubic-bezier(.16,1,.3,1) 1.1s;
  position:relative;z-index:2;
}
.rs-card__sep--on { opacity:.6;transform:scaleX(1); }
.rs-card--hovered .rs-card__sep { width:55%; }
@media(max-width:768px){ .rs-card__sep--on { opacity:.45;width:40%; } }

/* ── CTAs ── */
.rs-ctas {
  display:flex;align-items:center;justify-content:center;gap:clamp(14px,2vw,24px);flex-wrap:wrap;
  margin-top:clamp(36px,5vh,60px);opacity:0;transform:translateY(16px);
  transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);
}
.rs-ctas--on { opacity:1;transform:none; }

.rs-btn {
  display:inline-flex;align-items:center;gap:8px;
  font-family:'Inter',sans-serif;
  font-size:clamp(0.85rem,1vw,0.95rem);
  font-weight:600;
  letter-spacing:0.01em;
  border-radius:100px;
  padding:clamp(10px,1.4vw,13px) clamp(22px,3vw,32px);
  cursor:pointer;border:none;text-decoration:none;
  transition:background .25s ease,transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease;
}
.rs-btn:focus-visible { outline:2px solid #D4A017;outline-offset:3px; }
.rs-btn:active { transform:scale(0.97) !important;transition-duration:.1s; }

.rs-btn--fill {
  color:#111111;
  background:linear-gradient(135deg,#F7C948 0%,#D4A017 100%);
  box-shadow:0 4px 18px rgba(212,160,23,0.28);
}
.rs-btn--fill:hover {
  background:#F7C948;
  transform:translateY(-2px) scale(1.03);
  box-shadow:0 8px 28px rgba(212,160,23,0.35);
}

.rs-btn--out {
  color:#D4A017;
  background:transparent;
  border:1.5px solid rgba(212,160,23,0.52);
}
.rs-btn--out:hover {
  border-color:#D4A017;
  background:rgba(212,160,23,0.06);
  transform:translateY(-2px) scale(1.03);
  box-shadow:0 4px 16px rgba(212,160,23,0.12);
}

/* ── Social ── */
.rs-soc { position:relative;margin-top:clamp(28px,4vh,48px);padding-top:clamp(20px,3vh,36px);border-top:1px solid rgba(0,0,0,0.06);opacity:0;transition:opacity .8s ease .2s; }
.rs-soc--on { opacity:1; }
.rs-soc__rule { position:absolute;top:-1px;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(212,160,23,0.2) 20%,rgba(212,160,23,0.12) 50%,rgba(212,160,23,0.2) 80%,transparent); }
.rs-soc__row { display:flex;align-items:center;justify-content:center;gap:clamp(6px,1.2vw,12px);flex-wrap:wrap; }
.rs-soc__chip {
  display:inline-flex;align-items:center;gap:6px;
  font-family:'Inter',sans-serif;
  font-size:clamp(0.65rem,0.8vw,0.75rem);
  font-weight:450;
  color:rgba(17,17,17,0.55);
  text-decoration:none;
  background:rgba(255,255,255,0.8);border:1px solid rgba(0,0,0,0.08);border-radius:100px;padding:6px 13px;
  transition:all .28s cubic-bezier(.25,1,.5,1);position:relative;overflow:hidden;white-space:nowrap;
}
.rs-soc__chip::before {
  content:'';position:absolute;top:0;left:-80%;width:60%;height:100%;
  background:linear-gradient(105deg,transparent 30%,rgba(212,160,23,0.16) 50%,transparent 70%);
  transform:skewX(-15deg);transition:left .5s ease;pointer-events:none;
}
.rs-soc__chip svg { color:currentColor;flex-shrink:0;transition:transform .28s ease; }
.rs-soc__chip:hover { border-color:rgba(212,160,23,0.4);color:#B8860B;background:rgba(212,160,23,0.05);transform:translateY(-2px);box-shadow:0 3px 12px rgba(212,160,23,0.12); }
.rs-soc__chip:hover::before { left:120%; }
.rs-soc__chip:hover svg { transform:scale(1.12); }
.rs-soc__chip:focus-visible { outline:2px solid #D4A017;outline-offset:2px; }

/* ── Bottom rule ── */
.rs-rule { display:flex;align-items:center;gap:clamp(10px,1.5vw,18px);margin-top:clamp(40px,5vh,64px);opacity:0;transition:opacity 1s ease .5s; }
.rs-rule--on { opacity:1; }
.rs-rule__l { flex:1;height:1px;background:rgba(0,0,0,0.07); }
.rs-rule__d { width:6px;height:6px;border-radius:50%;background:#D4A017;box-shadow:0 0 6px rgba(212,160,23,0.4);flex-shrink:0; }

/* ── Mobile ── */
@media(max-width:768px){
  .rs-soc__chip::before { display:none; }
  .rs-card { border-radius:16px; }
  .rs-card--hovered:not(.rs-card--hidden) { transform:none;box-shadow:none; }
  .rs-card__shine { display:none; }
  .rs-trust-track { animation-duration:20s; gap:12px; }
  .rs-chip { font-size:0.6rem; padding:4px 10px 4px 6px; }
  .rs-chip__icon { width:14px;height:14px; }
}
@media(max-width:480px){
  .rs-trust-track { gap:8px; animation-duration:16s; }
  .rs-chip { font-size:0.55rem; padding:3px 8px 3px 5px; }
  .rs-chip__icon { width:12px;height:12px; }
  .rs-chip__icon svg { width:9px;height:9px; }
}

/* ── Reduced Motion ── */
@media(prefers-reduced-motion:reduce){
  .rs-hdr,.rs-card,.rs-card__icon,.rs-card__counter,
  .rs-card__label,.rs-card__desc,.rs-card__sep,
  .rs-chip,.rs-ctas,.rs-soc,.rs-rule {
    opacity:1!important;transform:none!important;transition:none!important;animation:none!important;
  }
  .rs-trust-track { animation:none!important; }
  .rs-div__l,.rs-div__r { transform:scaleX(1)!important; }
  .rs-div__d { opacity:1!important;transform:scale(1)!important; }
  .rs-h2__shimmer { animation:none; }
  .rs-glow { animation:none!important; }
}

/* ── Touch devices ── */
@media(hover:none){
  .rs-card--hovered:not(.rs-card--hidden) { transform:none!important; }
  .rs-chip:hover { transform:none!important; }
  .rs-soc__chip:hover { transform:none; }
  .rs-btn:hover { transform:none; }
}
`;