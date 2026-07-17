// src/components/common/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Unified Hero Component
// v32 — Premium Modern Flow: Hero → Stats → Destinations → Popular Packages →
//       Services Grid → Journey Timeline → Gallery → Partners →
//       Testimonials → FAQ → Contact → CTA → Why Choose Us
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react";

// ── Sections — PREMIUM MODERN ORDER ─────────────────────────────────────
import Stats from "../home/Stats";                    // Social proof builds immediate trust
import Destinations from "../home/Destinations";       // Inspire exploration & dreaming
import PopularPackages from "../home/PopularPackages"; // Core product offering
import ServicesGrid from "../home/ServicesGrid";       // Detailed service breakdown
import HajjJourneyTimeline from "../home/HajjJourneyTimeline"; // Process visualization
import Gallery from "../home/Gallery";                 // Visual proof & emotional connection
import Partners from "../home/Partners";               // Authority & trust signals
import Testimonials from "../home/Testimonials";       // Social validation & stories
import FAQ from "../home/FAQ";                         // Address concerns & objections
import ContactStrip from "../../components/home/ContactStrip"; // Primary CTA
import CTA from "../home/CTA";                         // Final conversion push
import WhyChooseUs from "../home/whyChooseUs";         // Differentiator & memorable closer

gsap.registerPlugin(ScrollTrigger);

// ── Default Data ────────────────────────────────────────────────────────────
const DEFAULT_PANELS = [
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877282/jakman1-al-abrar-mecca-15082_1920_x58kgd.jpg", alt: "Desert landscape", label: "Destinations", tag: "50+ Countries" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_jlixwp.jpg", alt: "Hajj pilgrimage", label: "Hajj & Umrah", tag: "Sacred Journey" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782650885/Lakewest_SOAR_Platform_Case_Study_1_sgalpd.docx.jpg", alt: "International flight", label: "Visa Services", tag: "Any Country" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876161/meca-people_oe25kj.png", alt: "Premium travel", label: "Premium Tours", tag: "Curated Experience" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782597320/worktrhough-for-Engineers_q46mrq.jpg", alt: "Visa services", label: "Visa Services", tag: "Fast Processing" },
];

const DEFAULT_BG_VIDEOS = [
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647090/VID-20260628-WA0005_q9gvbi.mp4",
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782646887/VID-20260628-WA0000_tl1nxg.mp4",
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781351650/3473-170690984_medium_h9g9gt.mp4",
];

const DEFAULT_TV_VIDEO = "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781354114/3473-170690984_medium_vlr3ri.mp4";

const DEFAULT_VIDEO_SLIDES = [
  { src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647090/VID-20260628-WA0005_q9gvbi.mp4", type: "video/mp4" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782646485/Lakewest_SOAR_Platform_Case_Study_1_sgalpd.docx.mp4", type: "video/mp4" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782646551/VID-20260628-WA0001_f3w0wk.mp4", type: "video/mp4" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647090/VID-20260628-WA0005_q9gvbi.mp4", type: "video/mp4" },
];

const DEFAULT_BG_SLIDES = [
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_jlixwp.jpg", position: "50% 55%", type: "image" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876161/meca-people_oe25kj.png", position: "50% 50%", type: "image" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877246/meca-people_fizgef.jpg", position: "50% 60%", type: "image" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877301/mohamed_hassan-hajj-8794441_1920_gsrsap.png", position: "50% 45%", type: "image" },
  { src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877246/meca-people_fizgef.jpg", position: "50% 55%", type: "image" },
];

const DEFAULT_TRUST_BADGES = ["Licensed Agency", "Visa Assistance", "Flight & Hotel", "24/7 Support"];

const VIDEO_DISPLAY_DURATION = 4000;
const IMAGE_DISPLAY_DURATION = 3;

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

  .rh-root {
    --clr-primary-bg: #F7C948;
    --clr-accent: #D4A017;
    --clr-accent-2: #B8860B;
    --clr-hover-bg: #FFE082;
    --clr-dark-surface: #0a0a0a;
    --clr-glass-border: rgba(255,255,255,0.15);
    --clr-accent-glow: rgba(212,160,23,0.35);
    --clr-accent-glow-2: rgba(212,160,23,0.10);
    --ff-heading: 'Manrope', sans-serif;
    --ff-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --marquee-shadow: 0 4px 0 #8B6914, 0 7px 0 #6B4F0E, 0 10px 0 rgba(0,0,0,0.35), 0 14px 28px rgba(212,160,23,0.30), 0 18px 44px rgba(184,134,11,0.15);
    --marquee-shadow-hover: 0 6px 0 #8B6914, 0 10px 0 #6B4F0E, 0 14px 0 rgba(0,0,0,0.35), 0 20px 40px rgba(212,160,23,0.45), 0 28px 64px rgba(184,134,11,0.22);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .rh-root{font-family:var(--ff-body);background:#FFF8E6;width:100%;overflow-x:hidden;min-height:100vh}

  .rh-hero{position:relative;width:100%;min-height:92vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;overflow:visible;background:#fff;padding-top:clamp(80px,10vh,120px);padding-bottom:0;isolation:isolate}
  .rh-bg-wrapper{position:absolute;top:0;left:0;width:100%;height:55%;z-index:0;overflow:hidden;pointer-events:none}
  .rh-bgvid{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center;opacity:0;will-change:transform,opacity}
  .rh-bgvid.active{opacity:1}
  .rh-bgslide{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;will-change:transform,opacity;opacity:0}
  .rh-bgslide.active{opacity:1}
  .rh-glass-mask{position:absolute;top:0;left:0;width:100%;height:55%;z-index:1;pointer-events:none;background:radial-gradient(ellipse 65% 50% at 50% 45%,transparent 30%,rgba(0,0,0,0.60) 100%),radial-gradient(ellipse 55% 35% at 50% 48%,rgba(255,255,255,0.04) 0%,transparent 60%);mix-blend-mode:overlay}
  .rh-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 80% 35% at 50% 0%,rgba(0,0,0,0.52) 0%,transparent 100%),radial-gradient(ellipse 100% 55% at 50% 100%,rgba(0,0,0,0.80) 0%,transparent 100%),linear-gradient(180deg,rgba(0,0,0,0.50) 0%,rgba(0,0,0,0.12) 50%,rgba(0,0,0,0.70) 100%)}
  .rh-vignette{position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(ellipse 130% 110% at 0% 50%,rgba(212,160,23,0.09) 0%,transparent 55%),radial-gradient(ellipse 130% 110% at 100% 50%,rgba(212,160,23,0.09) 0%,transparent 55%),radial-gradient(ellipse 80% 60% at 50% 0%,rgba(184,134,11,0.05) 0%,transparent 50%)}

  .rh-content{position:relative;z-index:10;width:100%;text-align:center;padding:0 clamp(16px,4vw,48px);display:flex;flex-direction:column;align-items:center;margin-top:clamp(20px,3vh,40px);margin-bottom:clamp(16px,2vh,28px)}
  .rh-headline-wrapper{position:relative;display:inline-block;opacity:0}
  .rh-sup-text{font-family:var(--ff-body);font-size:0.8rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:rgba(212,160,23,0.90);display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:clamp(8px,1vw,12px);opacity:0;transform:translateY(8px)}
  .rh-sup-text::before,.rh-sup-text::after{content:'';display:block;width:2.5ch;height:1px;background:linear-gradient(90deg,transparent,rgba(212,160,23,0.45))}
  .rh-sup-text::after{transform:scaleX(-1)}
  .rh-headline{font-family:var(--ff-heading);font-weight:800;font-size:clamp(3rem,6vw,4.75rem);line-height:1.15;letter-spacing:-0.02em;color:#fff;margin:0 auto clamp(6px,1vw,12px);max-width:780px;opacity:0}
  .rh-headline .rh-word{display:inline-block;overflow:hidden;vertical-align:bottom}
  .rh-headline .rh-char{display:inline-block;will-change:transform,opacity}
  .rh-headline em{font-style:italic;font-weight:700;color:var(--clr-accent);text-shadow:0 0 48px rgba(212,160,23,0.18)}
  .rh-subtitle{font-family:var(--ff-body);font-size:clamp(1rem,1.4vw,1.125rem);font-weight:400;line-height:1.7;color:rgba(255,255,255,0.72);max-width:520px;margin:0 auto clamp(16px,2.5vw,28px);opacity:0;transform:translateY(14px)}
  .rh-cta-row{display:flex;align-items:center;justify-content:center;gap:clamp(12px,1.5vw,20px);flex-wrap:wrap;margin-bottom:clamp(16px,2.5vh,28px);opacity:0;transform:translateY(14px)}
  .rh-cta-primary{display:inline-flex;align-items:center;gap:10px;font-family:var(--ff-body);font-size:0.95rem;font-weight:600;letter-spacing:0.01em;color:#111;background:linear-gradient(135deg,var(--clr-primary-bg),var(--clr-accent));border:none;padding:clamp(11px,1vw,14px) clamp(24px,2.5vw,36px);border-radius:50px;cursor:pointer;transition:all 0.3s cubic-bezier(0.25,1,0.5,1);box-shadow:0 4px 20px var(--clr-accent-glow),inset 0 1px 0 rgba(255,255,255,0.22);position:relative;overflow:hidden}
  .rh-cta-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--clr-hover-bg),var(--clr-primary-bg));opacity:0;transition:opacity 0.4s ease}
  .rh-cta-primary:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 8px 32px rgba(212,160,23,0.48),inset 0 1px 0 rgba(255,255,255,0.30)}
  .rh-cta-primary:hover::before{opacity:1}
  .rh-cta-primary span,.rh-cta-primary svg{position:relative;z-index:1}
  .rh-cta-primary:hover svg{transform:translateX(4px)}
  .rh-cta-secondary{display:inline-flex;align-items:center;gap:10px;font-family:var(--ff-body);font-size:0.95rem;font-weight:600;letter-spacing:0.01em;color:rgba(255,255,255,0.88);background:transparent;backdrop-filter:blur(14px) saturate(180%);-webkit-backdrop-filter:blur(14px) saturate(180%);border:1.5px solid var(--clr-glass-border);padding:clamp(11px,1vw,14px) clamp(24px,2.5vw,36px);border-radius:50px;cursor:pointer;transition:all 0.3s cubic-bezier(0.25,1,0.5,1);position:relative;overflow:hidden}
  .rh-cta-secondary::before{content:'';position:absolute;inset:0;background:rgba(247,201,72,0.12);opacity:0;transition:opacity 0.4s ease;border-radius:50px}
  .rh-cta-secondary:hover{transform:translateY(-3px) scale(1.02);border-color:rgba(247,201,72,0.55);color:var(--clr-hover-bg);box-shadow:0 8px 28px rgba(0,0,0,0.2),0 0 0 0.5px rgba(247,201,72,0.25)}
  .rh-cta-secondary:hover::before{opacity:1}
  .rh-trust-row{display:flex;align-items:center;justify-content:center;gap:clamp(8px,1.2vw,14px);flex-wrap:wrap;opacity:0;transform:translateY(14px)}
  .rh-trust-badge{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.11);border-radius:100px;padding:6px 14px 6px 10px;font-family:var(--ff-body);font-size:clamp(0.7rem,0.8vw,0.8rem);font-weight:500;color:rgba(255,255,255,0.72);letter-spacing:0.02em;transition:all 0.3s ease}
  .rh-trust-badge:hover{border-color:rgba(212,160,23,0.45);background:rgba(212,160,23,0.10);color:var(--clr-accent);transform:translateY(-2px)}
  .rh-trust-badge .badge-check{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;background:rgba(212,160,23,0.18);color:var(--clr-accent)}

  /* MARQUEE */
  .rh-marquee-wrap{position:relative;z-index:10;width:100%;margin-top:auto;overflow:hidden;mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,0.15) 3%,#000 8%,#000 92%,rgba(0,0,0,0.15) 97%,transparent 100%);-webkit-mask-image:linear-gradient(to right,transparent 0%,rgba(0,0,0,0.15) 3%,#000 8%,#000 92%,rgba(0,0,0,0.15) 97%,transparent 100%);padding:clamp(6px,1vw,12px) 0}
  .rh-marquee-track{display:flex;gap:clamp(10px,1.6vw,20px);width:max-content;will-change:transform;padding:0 clamp(6px,1vw,12px)}
  .rh-panel{position:relative;flex-shrink:0;width:clamp(160px,15vw,210px);height:clamp(210px,26vw,300px);overflow:hidden;cursor:pointer;border-radius:18px;clip-path:ellipse(58% 92% at 50% 92%);will-change:clip-path,transform;box-shadow:var(--marquee-shadow);background:#1a1a1a;transition:box-shadow 0.5s ease,transform 0.5s ease;transform:rotate(var(--panel-rotate,0deg));border:1px solid rgba(255,255,255,0.10)}
  .rh-panel:nth-child(1){--panel-rotate:-2.5deg}.rh-panel:nth-child(2){--panel-rotate:3deg}.rh-panel:nth-child(3){--panel-rotate:-1.5deg}.rh-panel:nth-child(4){--panel-rotate:2deg}
  .rh-panel:hover{box-shadow:var(--marquee-shadow-hover);z-index:2;transform:rotate(var(--panel-rotate,0deg)) translateY(-6px)}
  .rh-panel img{width:100%;height:110%;object-fit:cover;object-position:center 65%;display:block;will-change:transform;transform:scale(1.05);transition:transform 0.7s cubic-bezier(0.25,1,0.5,1)}
  .rh-panel:hover img{transform:scale(1.18)}
  .rh-panel-grad{position:absolute;inset:0;pointer-events:none;background:linear-gradient(0deg,rgba(0,0,0,0.18) 0%,transparent 35%,transparent 55%,rgba(0,0,0,0.82) 100%);z-index:1;transition:background 0.5s ease}
  .rh-panel:hover .rh-panel-grad{background:linear-gradient(0deg,rgba(0,0,0,0.38) 0%,rgba(0,0,0,0.12) 35%,rgba(0,0,0,0.12) 55%,rgba(0,0,0,0.88) 100%)}
  .rh-panel-glow-top{position:absolute;top:0;left:0;right:0;height:50%;z-index:3;pointer-events:none;background:linear-gradient(180deg,rgba(247,201,72,0.72) 0%,rgba(212,160,23,0.55) 18%,rgba(212,160,23,0.35) 35%,rgba(184,134,11,0.18) 55%,rgba(212,160,23,0.05) 75%,transparent 100%);transition:all 0.6s cubic-bezier(0.25,1,0.5,1);filter:blur(0.8px)}
  .rh-panel:hover .rh-panel-glow-top{background:linear-gradient(180deg,rgba(247,201,72,0.15) 0%,rgba(212,160,23,0.08) 25%,rgba(212,160,23,0.03) 50%,transparent 100%);filter:blur(0px);height:35%}
  .rh-panel-glow-particles-top{position:absolute;top:0;left:0;right:0;height:45%;z-index:4;pointer-events:none;background:radial-gradient(ellipse 55% 35% at 25% 20%,rgba(255,215,0,0.28) 0%,transparent 70%),radial-gradient(ellipse 40% 25% at 65% 15%,rgba(255,215,0,0.20) 0%,transparent 65%),radial-gradient(ellipse 50% 30% at 50% 28%,rgba(247,201,72,0.22) 0%,transparent 60%);animation:glowPulseTop 3.5s ease-in-out infinite;transition:opacity 0.5s ease}
  .rh-panel:hover .rh-panel-glow-particles-top{opacity:0.15;animation:glowPulseTopHover 1.8s ease-in-out infinite}
  @keyframes glowPulseTop{0%,100%{opacity:0.65}50%{opacity:1}}
  @keyframes glowPulseTopHover{0%,100%{opacity:0.1}50%{opacity:0.25}}
  .rh-panel-light-rays{position:absolute;top:0;left:-20%;right:-20%;height:60%;z-index:2;pointer-events:none;background:linear-gradient(155deg,rgba(247,201,72,0.12) 0%,transparent 35%),linear-gradient(205deg,rgba(247,201,72,0.10) 0%,transparent 40%),linear-gradient(180deg,rgba(212,160,23,0.06) 0%,transparent 30%);opacity:0.5;transition:opacity 0.6s ease}
  .rh-panel:hover .rh-panel-light-rays{opacity:0}
  .rh-panel-shimmer{position:absolute;bottom:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,rgba(184,134,11,0.65),transparent);z-index:3;opacity:0;transition:opacity 0.4s ease}
  .rh-panel:hover .rh-panel-shimmer{opacity:1}
  .rh-panel-info{position:absolute;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}
  .rh-panel-label{font-family:var(--ff-heading);font-size:clamp(13px,1.4vw,17px);font-weight:700;color:#fff;letter-spacing:-0.01em;text-align:center;text-shadow:0 2px 8px rgba(0,0,0,0.45),0 0 24px rgba(212,160,23,0.35);animation:rhHeartPump 2.4s ease-in-out infinite}
  .rh-panel-tag{font-family:var(--ff-body);font-size:clamp(6.5px,0.6vw,8.5px);font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.80);text-shadow:0 1px 4px rgba(0,0,0,0.35)}
  .rh-panel-num{position:absolute;bottom:14px;right:16px;z-index:7;font-family:var(--ff-body);font-size:10px;font-weight:500;color:rgba(255,255,255,0.48);letter-spacing:0.08em;text-shadow:0 1px 3px rgba(0,0,0,0.3)}
  .rh-panel-corner{position:absolute;bottom:0;left:0;width:0;height:0;border-style:solid;border-width:28px 0 0 28px;border-color:transparent transparent transparent var(--clr-accent);z-index:4;opacity:0;transform:scale(0.6);transition:opacity 0.3s ease,transform 0.35s cubic-bezier(0.34,1.56,0.64,1);transform-origin:bottom left}
  .rh-panel:hover .rh-panel-corner{opacity:1;transform:scale(1)}
  .rh-panel-register{position:absolute;bottom:clamp(12px,1.8vw,18px);left:clamp(10px,1.4vw,14px);z-index:7;display:flex;align-items:center;gap:5px;background:rgba(0,0,0,0.55);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(212,160,23,0.52);border-radius:100px;padding:5px 11px 5px 8px;font-family:var(--ff-body);font-size:clamp(8px,0.85vw,10px);font-weight:600;letter-spacing:0.10em;text-transform:uppercase;color:var(--clr-accent);cursor:pointer;opacity:0;transform:translateY(6px) scale(0.92);transition:all 0.32s cubic-bezier(0.25,1,0.5,1);box-shadow:0 2px 10px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.06)}
  .rh-panel-register::before{content:'';flex-shrink:0;width:5px;height:5px;border-radius:50%;background:var(--clr-accent);box-shadow:0 0 5px rgba(212,160,23,0.7)}
  .rh-panel:hover .rh-panel-register{opacity:1;transform:translateY(0) scale(1)}
  .rh-panel-register:hover{background:rgba(212,160,23,0.22);border-color:rgba(212,160,23,0.82);color:var(--clr-primary-bg)}
  .rh-shimmer-sweep{position:absolute;top:0;left:-150%;width:60%;height:100%;z-index:5;pointer-events:none;background:linear-gradient(105deg,transparent 0%,transparent 35%,rgba(212,160,23,0.10) 45%,rgba(247,201,72,0.22) 50%,rgba(212,160,23,0.10) 55%,transparent 65%,transparent 100%)}
  @keyframes rh-marquee-css{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes rhHeartPump{0%,100%{transform:scale(1)}15%{transform:scale(1.06)}30%{transform:scale(1)}45%{transform:scale(1.05)}60%{transform:scale(1)}}

  /* TV SECTION */
  .rh-tv-section{position:relative;z-index:10;width:100%;display:flex;align-items:center;justify-content:center;padding:clamp(12px,2vw,24px) clamp(16px,4vw,48px);margin-top:clamp(12px,2vh,24px)}
  .rh-tv-container{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;max-width:420px;margin:0 auto;z-index:200}
  .rh-tv-screen{position:relative;width:100%;border-radius:16px;overflow:hidden;border:2px solid rgba(212,160,23,0.55);box-shadow:0 0 0 1px rgba(212,160,23,0.14),0 0 32px var(--clr-accent-glow),0 0 64px var(--clr-accent-glow-2),0 24px 52px -12px rgba(0,0,0,0.55);background:var(--clr-dark-surface);z-index:201;aspect-ratio:16/9;animation:rh-tv-glow 4s ease-in-out infinite}
  @keyframes rh-tv-glow{0%,100%{box-shadow:0 0 0 1px rgba(212,160,23,0.14),0 0 32px var(--clr-accent-glow),0 0 64px var(--clr-accent-glow-2),0 24px 52px -12px rgba(0,0,0,0.55)}50%{box-shadow:0 0 0 1px rgba(212,160,23,0.22),0 0 44px rgba(212,160,23,0.48),0 0 88px rgba(184,134,11,0.16),0 24px 52px -12px rgba(0,0,0,0.55)}}
  .rh-tv-video{width:100%;height:100%;display:block;object-fit:cover;background:var(--clr-dark-surface)}
  .rh-tv-stand{width:70%;height:6px;background:linear-gradient(180deg,#3a3a3a,#1a1a1a);border-radius:4px;margin-top:12px;box-shadow:0 4px 10px rgba(0,0,0,0.3);position:relative;z-index:199}
  .rh-tv-stand::before{content:'';position:absolute;bottom:-35px;left:50%;transform:translateX(-50%);width:50px;height:35px;background:linear-gradient(180deg,#2a2a2a,#0a0a0a);border-radius:8px;box-shadow:0 4px 10px rgba(0,0,0,0.3)}
  .rh-tv-stand::after{content:'';position:absolute;bottom:-45px;left:50%;transform:translateX(-50%);width:80px;height:10px;background:linear-gradient(180deg,#3a3a3a,#1a1a1a);border-radius:5px;box-shadow:0 2px 8px rgba(0,0,0,0.2)}
  .rh-tv-leg-left,.rh-tv-leg-right{position:absolute;bottom:-30px;width:12px;height:30px;background:linear-gradient(180deg,#3a3a3a,#1a1a1a);border-radius:3px;box-shadow:0 2px 8px rgba(0,0,0,0.3)}
  .rh-tv-leg-left{left:25%}.rh-tv-leg-right{right:25%}
  .rh-tv-controls{position:absolute;bottom:clamp(8px,1.2vw,14px);left:clamp(8px,1.2vw,14px);display:flex;gap:8px;z-index:210}
  .rh-tv-control-btn{width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,0.76);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1.5px solid rgba(212,160,23,0.45);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--clr-accent);transition:all 0.3s ease;padding:0}
  .rh-tv-control-btn:hover{transform:scale(1.08);background:rgba(212,160,23,0.22);border-color:rgba(212,160,23,0.72)}
  .rh-tv-badge{position:absolute;top:clamp(8px,1.2vw,14px);right:clamp(8px,1.2vw,14px);background:rgba(0,0,0,0.76);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);padding:4px 12px;border-radius:100px;border:1px solid rgba(212,160,23,0.45);font-family:var(--ff-body);font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--clr-accent);z-index:210}
  .rh-tv-glass{position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.07),rgba(0,0,0,0.14));pointer-events:none}

  /* RESPONSIVE */
  @media(max-width:1200px){.rh-hero{min-height:85vh}.rh-panel{width:clamp(150px,14vw,190px);height:clamp(200px,24vw,270px)}}
  @media(max-width:1024px) and (min-width:769px){.rh-hero{min-height:80vh;padding-top:clamp(70px,8vh,100px)}.rh-bg-wrapper{height:58%}.rh-bgvid,.rh-bgslide{transform:scale(1.45);transform-origin:center top}.rh-panel{width:clamp(130px,18vw,170px);height:clamp(170px,24vw,230px)}.rh-tv-container{max-width:360px}}
  @media(max-width:768px){
    .rh-hero{min-height:70vh;padding-top:clamp(80px,10vh,110px);overflow:hidden}
    .rh-bg-wrapper{height:65%}.rh-bgvid{display:none!important}
    .rh-bgslide{transform:scale(1.9);transform-origin:center top}
    .rh-tv-screen{animation:none!important}
    .rh-panel{will-change:auto;contain:layout;box-shadow:0 3px 0 #8B6914,0 5px 0 #6B4F0E,0 7px 0 rgba(0,0,0,0.30),0 10px 20px rgba(212,160,23,0.20)}
    .rh-panel img{will-change:auto}.rh-panel-label{animation:none!important}
    .rh-panel:hover img{transform:scale(1.05)}
    .rh-marquee-track{animation:rh-marquee-css 28s linear infinite}
    .rh-marquee-track:hover{animation-play-state:paused}
    .rh-panel-register{opacity:1!important;transform:translateY(0) scale(1)!important}
    .rh-panel-glow-top{height:40%}.rh-panel-glow-particles-top{height:35%;animation:none}
    .rh-tv-container{max-width:300px}.rh-headline{font-size:clamp(2rem,7vw,2.8rem)}
    .rh-panel{width:clamp(100px,30vw,140px);height:clamp(130px,38vw,180px)}
    .rh-tv-stand{width:60%;height:5px;margin-top:10px}
    .rh-tv-stand::before{width:40px;height:28px;bottom:-28px}
    .rh-tv-stand::after{width:60px;height:8px;bottom:-36px}
    .rh-tv-leg-left,.rh-tv-leg-right{width:10px;height:25px;bottom:-25px}
    .rh-tv-leg-left{left:28%}.rh-tv-leg-right{right:28%}
  }
  @media(max-width:480px){
    .rh-hero{min-height:65vh;padding-top:clamp(90px,12vh,130px);overflow:hidden}
    .rh-bg-wrapper{height:60%}.rh-bgslide{transform:scale(2.15);transform-origin:center top}
    .rh-headline{font-size:clamp(1.8rem,6.5vw,2.4rem)}
    .rh-panel{width:clamp(80px,35vw,120px);height:clamp(110px,44vw,160px);box-shadow:0 2px 0 #8B6914,0 4px 0 #6B4F0E,0 5px 0 rgba(0,0,0,0.25),0 8px 14px rgba(212,160,23,0.15)}
    .rh-panel:nth-child(1){--panel-rotate:-1.5deg}.rh-panel:nth-child(2){--panel-rotate:2deg}.rh-panel:nth-child(3){--panel-rotate:-1deg}.rh-panel:nth-child(4){--panel-rotate:1.5deg}
    .rh-tv-container{max-width:240px}.rh-tv-stand{width:50%}
    .rh-tv-stand::before{width:35px;height:25px;bottom:-25px}
    .rh-tv-stand::after{width:50px;height:7px;bottom:-32px}
    .rh-tv-leg-left,.rh-tv-leg-right{width:8px;height:22px;bottom:-22px}
    .rh-tv-leg-left{left:30%}.rh-tv-leg-right{right:30%}
    .rh-panel-glow-top{height:35%}.rh-panel-glow-particles-top{height:28%;animation:none}
  }
  @media(min-width:1441px){.rh-hero{min-height:78vh;padding-top:clamp(100px,12vh,140px)}.rh-bg-wrapper{height:50%}.rh-panel{width:clamp(170px,16vw,240px);height:clamp(220px,28vw,320px)}.rh-tv-container{max-width:480px}}
  @media(prefers-reduced-motion:reduce){
    .rh-headline,.rh-sup-text,.rh-subtitle,.rh-trust-row,.rh-cta-row,.rh-headline-wrapper{opacity:1!important;transform:none!important;animation:none!important}
    .rh-marquee-track{animation:none!important}
    .rh-panel,.rh-panel img,.rh-panel-info,.rh-panel-shimmer,.rh-panel-num,.rh-panel-corner,.rh-tv-control-btn,.rh-shimmer-sweep,.rh-bgslide,.rh-bgvid,.rh-tv-screen,.rh-tv-container,.rh-trust-badge,.rh-panel-glow-top,.rh-panel-glow-particles-top,.rh-panel-light-rays{transition:none!important;animation:none!important}
    .rh-panel-register{opacity:1!important;transform:none!important}
    .rh-panel-label{animation:none!important}
    .rh-panel:hover img{transform:none!important}
  }
`;

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

// ══════════════════════════════════════════════════════════════════════════
export default function Hero({
  simple = false,
  badge = "Sacred Journeys",
  title = "Your Trusted Hajj & Umrah Partner",
  subtitle = "Embark on a blessed pilgrimage with premium packages, expert guidance, and complete peace of mind.",
  backgroundImage = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=800&fit=crop",
  ctaText = "Explore Packages",
  onCtaClick,
  variant = "hajj",
  headline = "One Sacred Journey at a <em>Time</em>",
  supText = "Your Gateway to The World",
  description = "Experience Hajj, Umrah, and international travel with trusted guidance, personalised support, and seamless planning from departure to return.",
  primaryCtaText = "Plan Your Umrah",
  secondaryCtaText = "Explore Packages",
  onPrimaryCta,
  onSecondaryCta,
  panels = DEFAULT_PANELS,
  bgVideos = DEFAULT_BG_VIDEOS,
  tvVideo = DEFAULT_TV_VIDEO,
  videoSlides = DEFAULT_VIDEO_SLIDES,
  bgSlides = DEFAULT_BG_SLIDES,
  trustBadges = DEFAULT_TRUST_BADGES,
  showTv = true,
  showMarquee = true,
}) {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const promoVideoRef = useRef(null);
  const tvVideoRef = useRef(null);
  const tvContainerRef = useRef(null);
  const supTextRef = useRef(null);
  const headlineWrapperRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRowRef = useRef(null);
  const trustRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const tvSectionRef = useRef(null);
  const lenisRef = useRef(null);
  const panelRefs = useRef([]);
  const shimmerRef = useRef(null);
  const marqueeTween = useRef(null);
  const scrollTimerRef = useRef(null);
  const bgSlideARef = useRef(null);
  const bgSlideBRef = useRef(null);
  const bgSlideIndex = useRef(0);
  const bgModeRef = useRef("video");
  const videoSlideIndex = useRef(0);
  const bgVideoIndex = useRef(0);
  const mobileSlideIdxRef = useRef(1);
  const rafHandleRef = useRef(null);
  const magnetMapRef = useRef(new Map());

  const [isTvPlaying, setIsTvPlaying] = useState(true);
  const [isTvMuted, setIsTvMuted] = useState(false);
  const [tvVideoError, setTvVideoError] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const isMobileRef = useRef(false);

  const MARQUEE_PANELS = [...panels, ...panels];

  useEffect(() => { isMobileRef.current = window.innerWidth <= 768; }, []);

  // Lenis
  useEffect(() => {
    if (isMobileRef.current || simple) return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)), orientation: "vertical", smoothWheel: true });
    lenisRef.current = lenis;
    const tick = (time) => { lenis.raf(time); ScrollTrigger.update(); rafHandleRef.current = requestAnimationFrame(tick); };
    rafHandleRef.current = requestAnimationFrame(tick);
    lenis.on("scroll", ScrollTrigger.update);
    return () => { cancelAnimationFrame(rafHandleRef.current); lenis.off("scroll", ScrollTrigger.update); lenis.destroy(); };
  }, [simple]);

  const toggleTvPlay = useCallback(() => { if (!tvVideoRef.current) return; if (isTvPlaying) tvVideoRef.current.pause(); else tvVideoRef.current.play().catch(() => {}); setIsTvPlaying(p => !p); }, [isTvPlaying]);
  const toggleTvMute = useCallback(() => { if (!tvVideoRef.current) return; tvVideoRef.current.muted = !isTvMuted; setIsTvMuted(m => !m); }, [isTvMuted]);
  const handleTvVideoError = useCallback(() => setTvVideoError(true), []);

  const slowMarquee = useCallback(() => {
    if (!marqueeTween.current) return;
    gsap.to(marqueeTween.current, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => { if (marqueeTween.current) gsap.to(marqueeTween.current, { timeScale: 1, duration: 1.2, ease: "power2.inOut" }); }, 800);
  }, []);
  useEffect(() => { const lenis = lenisRef.current; if (!lenis) return; lenis.on("scroll", slowMarquee); return () => { lenis.off("scroll", slowMarquee); clearTimeout(scrollTimerRef.current); }; }, [slowMarquee]);

  const pauseMarquee = useCallback(() => { setMarqueePaused(true); if (marqueeTween.current) { clearTimeout(scrollTimerRef.current); scrollTimerRef.current = null; gsap.to(marqueeTween.current, { timeScale: 0, duration: 0.4, ease: "power2.out" }); } }, []);
  const resumeMarquee = useCallback(() => { setMarqueePaused(false); if (marqueeTween.current) gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.6, ease: "power2.inOut" }); }, []);

  // Background cycling
  useEffect(() => {
    if (simple) return;
    const ve = videoRef.current, pe = promoVideoRef.current, sa = bgSlideARef.current, sb = bgSlideBRef.current;
    if (!ve || !sa || !sb || !pe) return;
    pe.muted = true; pe.playsInline = true; pe.style.opacity = "0"; pe.className = "rh-bgslide";
    ve.src = bgVideos[0];
    gsap.set(ve, { opacity: 1, className: "rh-bgvid active" });
    gsap.set(sa, { opacity: 0, className: "rh-bgslide" });
    gsap.set(sb, { opacity: 0, className: "rh-bgslide" });
    gsap.set(pe, { opacity: 0, className: "rh-bgslide" });

    if (isMobileRef.current) {
      gsap.set(ve, { opacity: 0, className: "rh-bgvid" });
      const fs = bgSlides[0]; sa.src = fs.src; sa.style.objectPosition = fs.position;
      gsap.set(sa, { opacity: 1, className: "rh-bgslide active" });
      let mct = null;
      const rmc = () => {
        const idx = mobileSlideIdxRef.current % bgSlides.length, sd = bgSlides[idx];
        const se = bgSlideIndex.current % 2 === 0 ? sb : sa, pse = bgSlideIndex.current % 2 === 0 ? sa : sb;
        se.src = sd.src; se.style.objectPosition = sd.position;
        gsap.set(se, { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
        gsap.to(se, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" });
        if (pse.classList.contains("active")) gsap.to(pse, { opacity: 0, scale: 1.02, duration: 1.5, ease: "power2.inOut", onComplete: () => gsap.set(pse, { className: "rh-bgslide" }) });
        bgSlideIndex.current++; mobileSlideIdxRef.current++;
        mct = gsap.delayedCall(3, rmc);
      };
      mct = gsap.delayedCall(3, rmc);
      return () => { if (mct) mct.kill(); };
    }

    let nsi = 0, ct = null;
    const ppv = () => {
      const vd = videoSlides[videoSlideIndex.current % videoSlides.length];
      pe.src = vd.src; pe.load();
      return new Promise(r => {
        pe.oncanplay = () => { pe.play().catch(() => {}); };
        const fs = setTimeout(() => { if (pe) { pe.pause(); pe.currentTime = 0; } r(); }, VIDEO_DISPLAY_DURATION);
        pe.onended = () => { clearTimeout(fs); r(); };
      });
    };
    const rc = async () => {
      if (bgModeRef.current === "video") {
        videoSlideIndex.current++; bgModeRef.current = "promo";
        gsap.set(pe, { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
        gsap.to(ve, { opacity: 0, duration: 1.5, ease: "power3.inOut", onComplete: () => gsap.set(ve, { className: "rh-bgvid" }) });
        gsap.to(pe, { opacity: 1, scale: 1, duration: 2.0, ease: "power3.out" });
        await ppv();
        ct = gsap.delayedCall(0.5, rc);
      } else if (bgModeRef.current === "promo") {
        const sd = bgSlides[nsi % bgSlides.length], se = bgSlideIndex.current % 2 === 0 ? sa : sb;
        se.src = sd.src; se.style.objectPosition = sd.position;
        gsap.set(se, { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
        gsap.to(pe, { opacity: 0, duration: 1.8, ease: "power3.inOut", onComplete: () => gsap.set(pe, { className: "rh-bgslide" }) });
        gsap.to(se, { opacity: 1, scale: 1, duration: 2.4, ease: "power3.out" });
        bgSlideIndex.current++; nsi++; bgModeRef.current = "image";
        ct = gsap.delayedCall(IMAGE_DISPLAY_DURATION, rc);
      } else if (bgModeRef.current === "image") {
        const nbv = bgVideos[bgVideoIndex.current % bgVideos.length];
        ve.src = nbv; bgVideoIndex.current++;
        const pse = (bgSlideIndex.current - 1) % 2 === 0 ? sa : sb;
        gsap.set(ve, { opacity: 0, className: "rh-bgvid active" });
        gsap.to(ve, { opacity: 1, duration: 1.8, ease: "power3.inOut" });
        gsap.to(pse, { opacity: 0, scale: 1.02, duration: 2.0, ease: "power3.inOut", onComplete: () => gsap.set(pse, { className: "rh-bgslide" }) });
        bgModeRef.current = "video";
        ct = gsap.delayedCall(5, rc);
      }
    };
    ct = gsap.delayedCall(5, rc);
    return () => { if (ct) ct.kill(); };
  }, [simple, bgVideos, bgSlides, videoSlides]);

  // Magnet effect
  const bindMagnet = useCallback((el) => {
    if (!el || isMobileRef.current || magnetMapRef.current.has(el) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const om = (e) => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - r.left - r.width/2)*0.04, y: (e.clientY - r.top - r.height/2)*0.03, duration: 0.55, ease: "power2.out", overwrite: "auto" }); };
    const ol = () => gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "power2.out", overwrite: "auto" });
    el.addEventListener("mousemove", om); el.addEventListener("mouseleave", ol);
    magnetMapRef.current.set(el, [om, ol]);
  }, []);
  useEffect(() => { panelRefs.current.forEach(bindMagnet); return () => { magnetMapRef.current.forEach(([om, ol], el) => { el.removeEventListener("mousemove", om); el.removeEventListener("mouseleave", ol); }); magnetMapRef.current.clear(); }; }, [bindMagnet]);

  // Entrance animations
  useEffect(() => {
    if (simple) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const mobile = isMobileRef.current, tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headlineWrapperRef.current, { opacity: 1, duration: 0.6 }, 0.10);
        tl.to(supTextRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.15);
        const he = headlineRef.current;
        if (he) {
          he.style.opacity = "1";
          he.querySelectorAll(".rh-word").forEach((w, wi) => {
            const t = w.textContent || ""; w.innerHTML = "";
            [...t].forEach(ch => { const s = document.createElement("span"); s.className = "rh-char"; s.textContent = ch === " " ? "\u00A0" : ch; w.appendChild(s); });
            tl.fromTo(w.querySelectorAll(".rh-char"), { opacity: 0, y: 36, filter: "blur(3px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: { amount: 0.18 } }, 0.25 + wi * 0.10);
          });
        }
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.65);
        tl.to(ctaRowRef.current, { opacity: 1, y: 0, duration: 0.80 }, 0.80);
        tl.to(trustRef.current, { opacity: 1, y: 0, duration: 0.80 }, 0.95);
        if (marqueeTrackRef.current && !mobile) marqueeTween.current = gsap.to(marqueeTrackRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
        if (tvContainerRef.current && !mobile) gsap.to(tvContainerRef.current, { y: -8, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        if (tvSectionRef.current) gsap.fromTo(tvSectionRef.current, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.85, scrollTrigger: { trigger: tvSectionRef.current, start: "top 85%", toggleActions: "play none none none" } });
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [simple]);

  const scrollTo = useCallback((id) => { const el = document.getElementById(id); if (!el) return; if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 }); else el.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);

  const handlePrimaryClick = () => { if (onPrimaryCta) onPrimaryCta(); else if (onCtaClick) onCtaClick(); else scrollTo("services"); };
  const handleSecondaryClick = () => { if (onSecondaryCta) { onSecondaryCta(); } else { scrollTo("stats"); } };

  // ── SIMPLE MODE ──────────────────────────────────────────────────────────
  if (simple) {
    return (
      <section style={{
        position: "relative", padding: "clamp(100px,14vw,180px) 20px clamp(60px,8vw,100px)",
        background: variant === "hajj" ? "linear-gradient(135deg,#0d0d0d 0%,#1a1a1a 40%,#1a1207 100%)" : "linear-gradient(135deg,#0A1929 0%,#0D2137 50%,#0A1929 100%)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={backgroundImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} loading="eager" />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "120px", background: "linear-gradient(to top, #FFF8E6, transparent)" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px", background: "rgba(212,160,23,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(212,160,23,0.25)", borderRadius: 50, marginBottom: 24 }}>
              <Sparkles size={14} color="#F7C948" />
              <span style={{ color: "#F7C948", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>{badge}</span>
            </span>
            <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "clamp(32px,6vw,56px)", color: "#fff", marginBottom: 16, lineHeight: 1.1, letterSpacing: "-0.02em" }}>{title}</h1>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.7)", maxWidth: 650, margin: "0 auto 40px", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>{subtitle}</p>
            {(onCtaClick || ctaText) && (
              <button onClick={handlePrimaryClick} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", borderRadius: 12, background: "#F7C948", color: "#111", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, letterSpacing: "0.01em", border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(247,201,72,0.35)", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(247,201,72,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(247,201,72,0.35)"; }}
              >{ctaText} <ArrowRight size={18} /></button>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // ── FULL MODE ────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="rh-root" ref={rootRef}>
        {/* ── HERO ── */}
        <section className="rh-hero" id="home" aria-label="RASOAF Travels — Hero">
          <div className="rh-bg-wrapper" aria-hidden="true">
            <img ref={bgSlideARef} className="rh-bgslide" src={bgSlides[0]?.src} alt="" style={{ objectPosition: bgSlides[0]?.position }} />
            <img ref={bgSlideBRef} className="rh-bgslide" src={bgSlides[1]?.src} alt="" style={{ objectPosition: bgSlides[1]?.position }} />
            <video ref={promoVideoRef} className="rh-bgslide" muted playsInline preload="auto" />
            <video ref={videoRef} className="rh-bgvid active" loop muted playsInline preload="auto" />
          </div>
          <div className="rh-glass-mask" /><div className="rh-overlay" /><div className="rh-vignette" />
          <div className="rh-content">
            <div className="rh-headline-wrapper" ref={headlineWrapperRef}>
              <span className="rh-sup-text" ref={supTextRef}>{supText}</span>
              <h1 className="rh-headline" ref={headlineRef} dangerouslySetInnerHTML={{ __html: headline }} />
            </div>
            <p className="rh-subtitle" ref={subtitleRef}>{description}</p>
            <div className="rh-cta-row" ref={ctaRowRef}>
              <button className="rh-cta-primary" onClick={handlePrimaryClick}><span>{primaryCtaText}</span><ArrowIcon /></button>
              {secondaryCtaText && <button className="rh-cta-secondary" onClick={handleSecondaryClick}><span>{secondaryCtaText}</span><ArrowIcon /></button>}
            </div>
            <div className="rh-trust-row" ref={trustRef}>
              {trustBadges.map((b, i) => (
                <div key={i} className="rh-trust-badge"><span className="badge-check"><CheckIcon /></span><span>{typeof b === "string" ? b : b.text}</span></div>
              ))}
            </div>
          </div>
          {showMarquee && (
            <div className={`rh-marquee-wrap${marqueePaused ? " rh-marquee-paused" : ""}`} onMouseEnter={pauseMarquee} onMouseLeave={resumeMarquee} onTouchStart={pauseMarquee} onTouchEnd={resumeMarquee}>
              <div className="rh-marquee-track" ref={marqueeTrackRef}>
                {MARQUEE_PANELS.map((panel, i) => (
                  <div key={i} className="rh-panel" ref={(el) => { if (i < panels.length) panelRefs.current[i] = el; }} tabIndex={0} onClick={() => scrollTo("register")}>
                    <img src={panel.src} alt={panel.alt} loading="lazy" />
                    <div className="rh-panel-grad" />
                    <div className="rh-panel-glow-top" />
                    <div className="rh-panel-glow-particles-top" />
                    <div className="rh-panel-light-rays" />
                    <div className="rh-panel-shimmer" />
                    <div className="rh-panel-corner" />
                    <span className="rh-panel-num">{String((i % panels.length) + 1).padStart(2, "0")}</span>
                    <div className="rh-panel-info"><span className="rh-panel-label">{panel.label}</span><span className="rh-panel-tag">{panel.tag}</span></div>
                    <button className="rh-panel-register" onClick={(e) => { e.stopPropagation(); scrollTo("register"); }}>Register</button>
                  </div>
                ))}
              </div>
              <div className="rh-shimmer-sweep" ref={shimmerRef} />
            </div>
          )}
          {showTv && (
            <div className="rh-tv-section" ref={tvSectionRef}>
              <div className="rh-tv-container" ref={tvContainerRef}>
                <div className="rh-tv-screen">
                  {tvVideoError ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#D4A017", fontFamily: "'Inter', sans-serif", flexDirection: "column", gap: 8 }}>
                      <span style={{ fontSize: 32 }}>✈️</span><span>Video loading…</span>
                    </div>
                  ) : (
                    <video ref={tvVideoRef} className="rh-tv-video" autoPlay loop playsInline muted={isTvMuted} onError={handleTvVideoError}>
                      <source src={tvVideo} type="video/mp4" />
                    </video>
                  )}
                  <div className="rh-tv-glass" />
                  {!tvVideoError && (
                    <div className="rh-tv-controls">
                      <button className="rh-tv-control-btn" onClick={toggleTvPlay}>{isTvPlaying ? <Pause size={16} /> : <Play size={16} />}</button>
                      <button className="rh-tv-control-btn" onClick={toggleTvMute}>{isTvMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
                    </div>
                  )}
                  <div className="rh-tv-badge">✈️ WANDERLUST</div>
                </div>
                <div className="rh-tv-stand" />
                <div className="rh-tv-leg-left" /><div className="rh-tv-leg-right" />
              </div>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PREMIUM MODERN PAGE FLOW
            Hero → Stats → Destinations → Popular Packages → Services Grid →
            Journey Timeline → Gallery → Partners → Testimonials →
            FAQ → Contact → CTA → Why Choose Us
        ═══════════════════════════════════════════════════════════════ */}
        <Stats />
        <Destinations />
        <PopularPackages />
        <ServicesGrid />
        <HajjJourneyTimeline />
        <Gallery />
        <Partners />
        <Testimonials />
        <FAQ />
        <ContactStrip />
        <CTA />
        <WhyChooseUs />
      </div>
    </>
  );
}