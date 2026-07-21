// src/pages/travel/TrainingDetail.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Training Detail Page
// 2026 Luxury · Cinematic Hero · Glass Cards · Editorial Layout · Sticky Sidebar
// Strict Rasoaf Global Design System Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft, Clock, Users, Award, CheckCircle, Sparkles,
  BookOpen, Globe, PenTool, Stethoscope,
  Star, Share2, Download,
  Phone, MessageCircle, Send, Target, Shield, Layers,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
//  TRAINING DATA (Preserved 100%)
// ══════════════════════════════════════════════════════════════════════════
const trainingData = {
  ielts: {
    id: "ielts",
    title: "IELTS Coaching",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&crop=center",
    description: "International English Language Testing System preparation for study, work, and immigration.",
    color: "#D4A017",
    details: {
      fullDescription: `The International English Language Testing System (IELTS) is one of the most widely accepted English language proficiency tests for international study, work, and immigration purposes, including Canada Express Entry.

To qualify under the Federal Skilled Worker Program through Express Entry, candidates generally need to achieve at least CLB 7, which corresponds to a minimum IELTS General Training score of 6.0 in each module: Listening, Reading, Writing, and Speaking. Achieving higher scores is strongly recommended, as it can significantly increase your Comprehensive Ranking System (CRS) score and improve your chances of receiving an Invitation to Apply (ITA) for Permanent Residence.

Meeting the minimum language requirement allows you to enter the Express Entry pool; however, successful candidates often target CLB 9 or higher to maximize their CRS points and remain competitive in Express Entry draws.

At RASOAF Travels and Tours Limited (RTTL), we provide professional training, guidance, and examination preparation strategies designed to help candidates achieve their desired IELTS scores. Our experienced team supports applicants with study plans, test preparation techniques, and immigration-related guidance to help them pursue their academic and immigration goals successfully.

If you require further information about how IELTS can support your study, work, or immigration journey, please feel free to contact us via email or book an appointment with one of our staff members. We will be pleased to assist you.`,
      keyPoints: [
        "Accepted for study, work, and immigration",
        "Required for Canada Express Entry",
        "CLB 7 minimum for Federal Skilled Worker",
        "CLB 9+ recommended for competitive CRS score",
        "Professional training and guidance available"
      ],
      duration: "8-12 weeks",
      format: "In-person & Online",
      rating: "4.9/5",
      modules: [
        "Listening - 30 minutes",
        "Reading - 60 minutes",
        "Writing - 60 minutes",
        "Speaking - 11-14 minutes"
      ],
      requirements: [
        "Valid passport",
        "Basic English proficiency",
        "Commitment to study schedule",
        "Access to study materials"
      ]
    }
  },
  toefl: {
    id: "toefl",
    title: "TOEFL Coaching",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop&crop=center",
    description: "Test of English as a Foreign Language preparation for university admissions and scholarships.",
    color: "#D4A017",
    details: {
      fullDescription: `International Uses of TOEFL

1. University and College Admissions
   - Undergraduate, postgraduate, and doctoral programs.

2. Scholarship Applications
   - Many scholarship providers require proof of English proficiency.

3. Professional Licensing and Certification
   - Some professional bodies and licensing authorities accept TOEFL scores.

4. Employment Opportunities
   - Certain international employers use TOEFL scores to assess English proficiency.

5. Immigration Programs
   - Some countries and immigration pathways may accept TOEFL as evidence of English ability, although requirements vary by country.

6. Exchange Programs
   - Student exchange and international training programs often accept TOEFL.

7. Internships and Research Programs
   - International organizations and research institutions may require TOEFL scores.

Local Uses of TOEFL

1. Employment Applications
   - Demonstrates English proficiency to employers, especially multinational organizations.

2. Professional Development
   - Strengthens a professional profile and international competitiveness.

3. Teacher and Academic Positions
   - Useful for educators seeking opportunities in international schools and institutions.

4. Corporate Training and Promotions
   - Some organizations consider English proficiency when selecting staff for training or leadership roles.`,
      keyPoints: [
        "Accepted by 11,500+ universities worldwide",
        "Required for many scholarship programs",
        "Recognized by professional bodies",
        "Valued by multinational employers",
        "Available in 165+ countries"
      ],
      duration: "6-10 weeks",
      format: "In-person & Online",
      rating: "4.8/5",
      modules: [
        "Reading - 60-80 minutes",
        "Listening - 60-90 minutes",
        "Speaking - 20 minutes",
        "Writing - 50 minutes"
      ],
      requirements: [
        "Valid ID",
        "Basic English proficiency",
        "Study commitment",
        "Access to online resources"
      ]
    }
  },
  pte: {
    id: "pte",
    title: "PTE Coaching",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop&crop=center",
    description: "Pearson Test of English preparation for study, immigration, and professional registration.",
    color: "#D4A017",
    details: {
      fullDescription: `PTE Academic (Pearson Test of English) has several uses beyond the study route.

International Uses of PTE

1. Immigration
   - Accepted for immigration purposes by countries such as Australia and New Zealand.
   - Accepted by Canada for certain immigration pathways, including Express Entry language requirements.

2. Work Visas
   - Used as proof of English proficiency for various work and skilled migration programs.

3. Professional Registration
   - Accepted by some professional and licensing bodies, particularly in healthcare and other regulated professions.

4. University and College Admissions
   - Widely accepted by universities and colleges in countries such as the United Kingdom, Australia, Canada, New Zealand, and the United States.

5. Scholarships and Exchange Programs
   - Can be used to satisfy English-language requirements for scholarships and international exchange opportunities.

Local Uses of PTE

1. Employment
   - Demonstrates English proficiency to local and multinational employers.

2. Career Development
   - Enhances a CV and can strengthen applications for promotions, training programs, and international assignments.

3. Professional Training
   - May be used as evidence of English ability when enrolling in professional courses.

Advantages of PTE
- Fully computer-based
- Fast results, often within 2–5 days
- AI-based scoring reduces human bias
- Widely accepted for study, work, and immigration purposes`,
      keyPoints: [
        "Fast results in 2-5 days",
        "AI-based scoring for accuracy",
        "Accepted for Canada Express Entry",
        "Recognized in Australia and New Zealand",
        "Fully computer-based test"
      ],
      duration: "6-8 weeks",
      format: "In-person & Online",
      rating: "4.7/5",
      modules: [
        "Speaking & Writing - 77-93 minutes",
        "Reading - 32-41 minutes",
        "Listening - 45-57 minutes",
        "Total test time - 3 hours"
      ],
      requirements: [
        "Valid ID",
        "Basic computer skills",
        "English proficiency",
        "Study materials access"
      ]
    }
  },
  oet: {
    id: "oet",
    title: "OET Coaching",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=600&fit=crop&crop=center",
    description: "Occupational English Test preparation for healthcare professionals worldwide.",
    color: "#D4A017",
    details: {
      fullDescription: `OET (Occupational English Test) is a specialized English-language test designed primarily for healthcare professionals. Unlike IELTS, TOEFL, and PTE, OET is not generally used for all professions.

International Uses of OET

1. Healthcare Professional Registration
   - Accepted by many healthcare regulatory bodies in countries such as United Kingdom, Australia, New Zealand, Ireland, and Canada for certain healthcare professions.

2. Work Visas for Healthcare Professionals
   - Can be used as proof of English proficiency when applying for healthcare-related jobs and immigration pathways.

3. Professional Licensing
   - Commonly accepted for professions such as:
     - Nurses
     - Doctors
     - Dentists
     - Pharmacists
     - Physiotherapists
     - Radiographers
     - Occupational Therapists
     - Veterinarians

4. Healthcare Recruitment
   - Many hospitals, clinics, and healthcare employers recognize OET because it assesses English in medical and clinical settings.

Local Uses of OET

1. Career Advancement
   - Healthcare professionals can use OET scores to demonstrate professional English proficiency.

2. Preparation for International Practice
   - Helps healthcare workers develop communication skills needed in English-speaking healthcare environments.

Why Choose OET?
- Healthcare-focused content
- Tests real-life medical communication skills
- Often preferred by healthcare professionals because the scenarios relate directly to their profession
- Recognized by many healthcare boards and employers worldwide`,
      keyPoints: [
        "Healthcare-focused content",
        "Recognized by UK, Australia, New Zealand, Canada",
        "For nurses, doctors, pharmacists, and more",
        "Tests real medical communication",
        "Preferred by many healthcare employers"
      ],
      duration: "6-10 weeks",
      format: "In-person & Online",
      rating: "4.8/5",
      modules: [
        "Listening - 50 minutes",
        "Reading - 60 minutes",
        "Writing - 45 minutes",
        "Speaking - 20 minutes"
      ],
      requirements: [
        "Valid passport",
        "Healthcare qualification",
        "Work experience",
        "Study commitment"
      ]
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ══════════════════════════════════════════════════════════════════════════
const t = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  charcoal: "#0B0F17",
  cream: "#FFF8E6",
  white: "#FFFFFF",
  textPrimary: "#0B0F17",
  // Currently unreferenced within this file's own rules (the page is dark
  // and uses rgba(255,255,255,x) directly), kept aligned to the DS muted
  // token in case a light-surface variant reuses these later.
  textSecondary: "#5F5F5F",
  textMuted: "#8B8B8B",
  glassBg: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
  shadowLg: "0 24px 60px rgba(0,0,0,0.12)",
  transition: "0.5s cubic-bezier(0.22,1,0.36,1)",
};

// ══════════════════════════════════════════════════════════════════════════
//  ANIMATED COUNTER
// ══════════════════════════════════════════════════════════════════════════
function AnimatedStat({ icon: Icon, value, label, delay = 0, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03 }}
      style={{
        background: t.cream,
        border: "1px solid rgba(212,160,23,0.15)",
        borderRadius: 20,
        padding: "clamp(20px, 2.5vw, 28px)",
        textAlign: "center",
        transition: `all ${t.transition}`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: "rgba(212,160,23,0.12)",
        border: "1px solid rgba(212,160,23,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 12px",
      }}>
        <Icon size={22} color={t.goldDark} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div style={{
        fontFamily: t.display, fontWeight: 800,
        fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
        color: t.goldDark, letterSpacing: "-0.01em",
      }}>{value}</div>
      {/* Micro-label — intentionally below the DS caption floor (0.875rem)
          since it sits in a tight 4-up stat row; deliberate exception. */}
      <div style={{
        fontFamily: t.body, fontSize: "0.75rem",
        fontWeight: 600, color: t.textSecondary,
        marginTop: 4, letterSpacing: "0.03em", textTransform: "uppercase",
      }}>{label}</div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  SECTION HEADING
// ══════════════════════════════════════════════════════════════════════════
function SectionHeading({ icon: Icon, title, subtitle, isInView, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 28 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: "rgba(212,160,23,0.08)",
          border: "1px solid rgba(212,160,23,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={18} color={t.gold} strokeWidth={1.8} aria-hidden="true" />
        </div>
        {/* H4/H5 tier per DS (Manrope 700–800, -0.02em tracking) */}
        <h2 style={{
          fontFamily: t.display, fontWeight: 800,
          fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)",
          color: t.textPrimary, margin: 0, letterSpacing: "-0.02em",
          lineHeight: 1.15,
        }}>{title}</h2>
      </div>
      {subtitle && (
        // Body-normal per DS (1rem), line-height 1.7
        <p style={{
          fontFamily: t.body, fontSize: "1rem",
          color: t.textSecondary, margin: 0,
          lineHeight: 1.7,
        }}>{subtitle}</p>
      )}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  PREMIUM CSS
// ══════════════════════════════════════════════════════════════════════════
const DetailCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  .td-page {
    background: #FFFFFF;
    min-height: 100vh;
    font-family: ${t.body};
    position: relative;
    overflow-x: hidden;
  }

  .td-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 80%, rgba(247,201,72,0.04) 0%, transparent 45%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Hero ── */
  .td-hero {
    position: relative;
    height: clamp(380px, 50vh, 520px);
    overflow: hidden;
  }

  .td-hero-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }

  .td-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, rgba(6,13,26,0.4) 0%, rgba(6,13,26,0.75) 60%, rgba(6,13,26,0.95) 100%);
    z-index: 1;
  }

  .td-hero-content {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: clamp(24px, 4vw, 48px) clamp(16px, 5vw, 80px) clamp(32px, 5vw, 56px);
    z-index: 2;
    max-width: 900px;
  }

  .td-hero-breadcrumb {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    color: rgba(255,255,255,0.7);
    font-family: ${t.body};
    font-size: 0.875rem; font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 16px;
    text-decoration: none;
  }

  .td-hero-breadcrumb:hover {
    background: rgba(255,255,255,0.14);
    border-color: rgba(212,160,23,0.3);
    color: ${t.goldLight};
    transform: translateX(-3px);
  }

  .td-hero-breadcrumb:focus-visible,
  .td-btn-gold:focus-visible,
  .td-btn-ghost:focus-visible {
    outline: 2px solid ${t.gold};
    outline-offset: 3px;
  }

  /* Eyebrow — Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .td-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 14px;
    background: rgba(212,160,23,0.12);
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 100px;
    color: ${t.goldLight};
    font-family: ${t.body};
    font-size: 0.8rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    margin-bottom: 14px;
    line-height: 1;
  }

  /* H1 — Manrope 800, clamp(3rem,6vw,4.75rem), letter-spacing -0.02em (per DS) */
  .td-hero-title {
    font-family: ${t.display};
    font-weight: 800;
    font-size: clamp(3rem, 6vw, 4.75rem);
    color: #FFFFFF;
    margin: 0 0 10px 0;
    letter-spacing: -0.02em;
    line-height: 1.05;
    text-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  /* Lead paragraph — DS body-large scale, line-height 1.7 */
  .td-hero-desc {
    font-family: ${t.body};
    font-size: clamp(1rem, 1.1vw, 1.125rem);
    font-weight: 400;
    color: rgba(255,255,255,0.7);
    max-width: 560px;
    line-height: 1.7;
  }

  /* ── Main Layout ── */
  .td-main {
    max-width: 1200px;
    margin: -40px auto 0;
    padding: 0 clamp(16px, 5vw, 80px) clamp(60px, 10vh, 100px);
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: clamp(24px, 3vw, 40px);
    align-items: start;
  }

  /* ── Content Column ── */
  .td-content-col {
    display: flex; flex-direction: column; gap: clamp(24px, 3vw, 36px);
  }

  /* ── Glass Card ── */
  .td-glass-card {
    background: #FFFFFF;
    border: 1px solid rgba(11,15,23,0.06);
    border-radius: 24px;
    padding: clamp(28px, 3.5vw, 40px);
    box-shadow: 0 4px 20px rgba(11,15,23,0.05);
    transition: all ${t.transition};
  }

  .td-glass-card:hover {
    border-color: rgba(212,160,23,0.25);
    box-shadow: 0 16px 48px rgba(11,15,23,0.08), 0 0 0 1px rgba(212,160,23,0.1);
  }

  /* ── Description — DS body-normal (1rem), line-height 1.7 ── */
  .td-description {
    font-family: ${t.body};
    font-size: 1rem;
    line-height: 1.7;
    color: ${t.textSecondary};
  }

  .td-description p { margin: 0 0 16px; }
  .td-description p:last-child { margin-bottom: 0; }

  /* H6 tier per DS (1.125rem) for inline section headers within the
     rich-text description (e.g. "International Uses of TOEFL") */
  .td-description h3 {
    font-family: ${t.display};
    font-weight: 700;
    font-size: 1.125rem;
    color: ${t.goldDark};
    margin: 28px 0 12px;
    letter-spacing: -0.01em;
  }

  .td-description h3:first-child { margin-top: 0; }

  .td-description ul { list-style: none; padding: 0; margin: 0 0 16px; }
  .td-description li {
    padding: 8px 0 8px 24px;
    position: relative;
    line-height: 1.6;
  }
  .td-description li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${t.gold};
  }

  /* ── Feature Grid ── */
  .td-feature-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(10px, 1.5vw, 14px);
  }

  .td-feature-item {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 14px 16px;
    background: ${t.cream};
    border: 1px solid rgba(212,160,23,0.1);
    border-radius: 14px;
    font-family: ${t.body};
    font-size: 0.875rem;
    color: ${t.textSecondary};
    transition: all ${t.transition};
    line-height: 1.5;
  }

  .td-feature-item:hover {
    background: rgba(212,160,23,0.08);
    border-color: rgba(212,160,23,0.25);
    transform: translateX(3px);
  }

  .td-feature-item svg { color: ${t.gold}; flex-shrink: 0; margin-top: 1px; }

  /* ── Module Card ── */
  .td-module-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(10px, 1.5vw, 14px);
  }

  .td-module-item {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 16px;
    background: ${t.cream};
    border: 1px solid rgba(212,160,23,0.1);
    border-radius: 14px;
    font-family: ${t.body};
    font-size: 0.875rem;
    color: ${t.textSecondary};
    transition: all ${t.transition};
  }

  .td-module-item:hover {
    background: rgba(212,160,23,0.08);
    border-color: rgba(212,160,23,0.25);
    transform: translateX(3px);
  }

  /* ── Sidebar ── */
  .td-sidebar {
    position: sticky; top: 100px;
    display: flex; flex-direction: column; gap: 16px;
  }

  .td-sidebar-card {
    background: #FFFFFF;
    border: 1px solid rgba(11,15,23,0.06);
    border-radius: 20px;
    padding: clamp(20px, 2.5vw, 28px);
    box-shadow: 0 4px 20px rgba(11,15,23,0.05);
  }

  /* H6 tier per DS (1.125rem) */
  .td-sidebar-title {
    font-family: ${t.display};
    font-weight: 700;
    font-size: 1.125rem;
    color: ${t.textPrimary};
    margin: 0 0 16px;
    letter-spacing: -0.01em;
  }

  .td-sidebar-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(11,15,23,0.06);
    font-family: ${t.body};
    font-size: 0.875rem;
    color: ${t.textSecondary};
  }

  .td-sidebar-row:last-child { border-bottom: none; }

  .td-sidebar-row svg { color: ${t.gold}; flex-shrink: 0; }

  /* Buttons — Inter 600, 0.95rem, letter-spacing 0.01em (per DS) */
  .td-btn-gold {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 24px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, ${t.goldLight}, ${t.gold});
    color: ${t.charcoal};
    font-family: ${t.body};
    font-size: 0.95rem; font-weight: 600; letter-spacing: 0.01em;
    cursor: pointer;
    width: 100%;
    transition: all ${t.transition};
    box-shadow: 0 4px 20px rgba(212,160,23,0.2);
  }

  .td-btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(212,160,23,0.4);
  }

  .td-btn-ghost {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 24px;
    border-radius: 14px;
    border: 1px solid rgba(11,15,23,0.15);
    background: transparent;
    color: ${t.textPrimary};
    font-family: ${t.body};
    font-size: 0.95rem; font-weight: 600; letter-spacing: 0.01em;
    cursor: pointer;
    width: 100%;
    transition: all ${t.transition};
  }

  .td-btn-ghost:hover {
    border-color: ${t.gold};
    color: ${t.goldDark};
    background: rgba(212,160,23,0.06);
  }

  /* ── CTA Section ── */
  .td-cta-section {
    background: linear-gradient(135deg, rgba(212,160,23,0.1), rgba(247,201,72,0.06));
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 28px;
    padding: clamp(32px, 4vw, 48px);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .td-cta-section::before {
    content: ''; position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle at center, rgba(212,160,23,0.08) 0%, transparent 60%);
    animation: td-cta-glow 4s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes td-cta-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  /* H3 tier per DS (clamp(1.75rem,3vw,2.25rem)) */
  .td-cta-title {
    font-family: ${t.display};
    font-weight: 800;
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    color: ${t.textPrimary};
    margin: 0 0 8px;
    letter-spacing: -0.02em;
    line-height: 1.15;
    position: relative;
    z-index: 1;
  }

  /* Body-large per DS, matching the subtitle treatment used across every
     other CTA section on the site */
  .td-cta-subtitle {
    font-family: ${t.body};
    font-size: clamp(1rem, 1.1vw, 1.125rem);
    color: ${t.textSecondary};
    line-height: 1.7;
    margin: 0 0 24px;
    position: relative;
    z-index: 1;
  }

  .td-cta-buttons {
    display: flex; gap: 12px; justify-content: center;
    flex-wrap: wrap; position: relative; z-index: 1;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .td-main { grid-template-columns: 1fr; }
    .td-sidebar { position: static; }
  }

  @media (max-width: 768px) {
    .td-hero { height: clamp(300px, 40vh, 400px); }
    .td-main { margin-top: -30px; }
    .td-feature-grid, .td-module-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .td-hero { height: 280px; }
    .td-hero-title { font-size: 2rem; }
    .td-glass-card { padding: 20px; }
    .td-cta-buttons { flex-direction: column; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  PARSE DESCRIPTION INTO SECTIONS
//
//  Fix 1: the original heading test only matched lines ending in a colon
//  (e.g. "Something:"). None of the real data uses that pattern — actual
//  section headers look like "International Uses of TOEFL" or
//  "Why Choose OET?", with no trailing colon. That meant every section
//  header in the TOEFL/PTE/OET content was silently rendering as a plain
//  paragraph instead of the intended gold heading. Broadened the test to
//  match any short line that doesn't end in sentence punctuation and
//  doesn't start with a digit/bullet — which reliably catches this
//  dataset's real headers without misclassifying ordinary prose (every
//  paragraph sentence in this data ends in '.', so nothing here collides).
//
//  Fix 2: numbered points + their indented sub-bullet were being split
//  into a new <ul> every time a blank line appeared, fragmenting one
//  logical list (e.g. all 7 "International Uses" points) into 7 separate
//  lists with their own margins. A post-process merge pass now combines
//  adjacent list sections that aren't separated by a real heading.
// ══════════════════════════════════════════════════════════════════════════
function parseDescription(text) {
  const lines = text.split('\n');
  const rawSections = [];
  let currentSection = { type: 'paragraphs', content: [] };

  const looksLikeHeading = (line) =>
    line.length > 0 &&
    line.length < 60 &&
    /^[A-Z]/.test(line) &&
    !/[.,;]$/.test(line) &&
    !/^\d+\./.test(line) &&
    !line.startsWith('-') &&
    !line.startsWith('•');

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentSection.content.length > 0) {
        rawSections.push({ ...currentSection });
        currentSection = { type: 'paragraphs', content: [] };
      }
      return;
    }

    if (looksLikeHeading(trimmed)) {
      if (currentSection.content.length > 0) rawSections.push({ ...currentSection });
      rawSections.push({ type: 'heading', content: trimmed });
      currentSection = { type: 'paragraphs', content: [] };
      return;
    }

    if (/^\d+\./.test(trimmed)) {
      currentSection.type = 'list';
      currentSection.content.push(trimmed);
      return;
    }

    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      currentSection.type = 'list';
      currentSection.content.push(trimmed.replace(/^[-•]\s*/, ''));
      return;
    }

    currentSection.type = 'paragraphs';
    currentSection.content.push(trimmed);
  });

  if (currentSection.content.length > 0) rawSections.push({ ...currentSection });

  // Merge consecutive list sections (only separated by blank lines, not
  // by an actual heading) into one continuous list.
  const merged = [];
  rawSections.forEach((section) => {
    const last = merged[merged.length - 1];
    if (section.type === 'list' && last && last.type === 'list') {
      last.content = last.content.concat(section.content);
    } else {
      merged.push({ ...section });
    }
  });

  return merged;
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function TrainingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = trainingData[id];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [shareStatus, setShareStatus] = useState(null); // null | "copied"

  const whatsappBase = "https://wa.me/2348022352362";

  const handleShareCourse = async () => {
    const shareData = {
      title: data ? data.title : "RASOAF Training",
      text: data ? data.description : "",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // AbortError just means the user closed the share sheet — not a failure.
        if (err && err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(shareData.url);
      setShareStatus("copied");
      setTimeout(() => setShareStatus(null), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const handleRequestBrochure = () => {
    // No brochure asset exists yet — routing to the real WhatsApp contact
    // channel with a pre-filled request rather than linking a fake/broken
    // file path.
    const message = `Hi, I'd like to request the brochure for ${data ? data.title : "your training programs"}.`;
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  if (!data) {
    return (
      <>
        <style>{DetailCSS}</style>
        <div className="td-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontFamily: t.display, fontWeight: 800, fontSize: "1.5rem", color: t.textPrimary, marginBottom: 16 }}>Training not found</h2>
            <button
              onClick={() => navigate('/travel/training')}
              className="td-btn-gold"
              style={{ width: 'auto', padding: '12px 28px' }}
              type="button"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back to Training
            </button>
          </div>
        </div>
      </>
    );
  }

  const Icon = data.icon;
  const details = data.details;
  const sections = parseDescription(details.fullDescription);

  return (
    <>
      <style>{DetailCSS}</style>

      <div className="td-page">
        {/* ═══════════ HERO ═══════════ */}
        <div className="td-hero">
          <img src={data.image} alt={data.title} className="td-hero-img" loading="eager" />
          <div className="td-hero-overlay" />
          <motion.div
            className="td-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="td-hero-breadcrumb" onClick={() => navigate('/travel/training')} type="button">
              <ArrowLeft size={14} aria-hidden="true" /> Training
            </button>

            <div className="td-hero-badge">
              <Sparkles size={12} aria-hidden="true" /> Premium Training
            </div>

            <h1 className="td-hero-title">{data.title}</h1>
            <p className="td-hero-desc">{data.description}</p>
          </motion.div>
        </div>

        {/* ═══════════ MAIN LAYOUT ═══════════ */}
        <div className="td-main" ref={sectionRef}>
          {/* Content Column */}
          <div className="td-content-col">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "clamp(10px, 1.5vw, 16px)",
              }}
            >
              <AnimatedStat icon={Clock} value={details.duration} label="Duration" isInView={isInView} delay={0} />
              <AnimatedStat icon={Users} value={details.format} label="Format" isInView={isInView} delay={0.08} />
              <AnimatedStat icon={Star} value={details.rating} label="Rating" isInView={isInView} delay={0.16} />
              <AnimatedStat icon={Award} value="Certified" label="Status" isInView={isInView} delay={0.24} />
            </motion.div>

            {/* Full Description */}
            <motion.div
              className="td-glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading icon={BookOpen} title="Overview" isInView={isInView} delay={0.2} />
              <div className="td-description">
                {sections.map((section, i) => {
                  if (section.type === 'heading') {
                    return <h3 key={i}>{section.content}</h3>;
                  }
                  if (section.type === 'list') {
                    return (
                      <ul key={i}>
                        {section.content.map((item, j) => <li key={j}>{item}</li>)}
                      </ul>
                    );
                  }
                  return section.content.map((para, j) => <p key={`${i}-${j}`}>{para}</p>);
                })}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              className="td-glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading icon={Target} title="Key Features" isInView={isInView} delay={0.3} />
              <div className="td-feature-grid">
                {details.keyPoints.map((point, idx) => (
                  <motion.div
                    key={idx}
                    className="td-feature-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.35 + idx * 0.06, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle size={16} aria-hidden="true" />
                    {point}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              className="td-glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading icon={Shield} title="Requirements" isInView={isInView} delay={0.4} />
              <div className="td-feature-grid">
                {details.requirements.map((req, idx) => (
                  <motion.div
                    key={idx}
                    className="td-feature-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + idx * 0.06, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle size={16} aria-hidden="true" />
                    {req}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Modules */}
            {details.modules && (
              <motion.div
                className="td-glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionHeading icon={Layers} title="Test Modules" isInView={isInView} delay={0.5} />
                <div className="td-module-grid">
                  {details.modules.map((module, idx) => (
                    <motion.div
                      key={idx}
                      className="td-module-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.55 + idx * 0.06, duration: 0.4 }}
                      whileHover={{ x: 4 }}
                    >
                      <CheckCircle size={16} aria-hidden="true" />
                      {module}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Section */}
            <motion.div
              className="td-cta-section"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="td-cta-title">Ready to Get Started?</h2>
              <p className="td-cta-subtitle">Enroll now and take the first step toward your goals.</p>
              <div className="td-cta-buttons">
                <button className="td-btn-gold" style={{ width: 'auto', padding: '14px 32px' }} onClick={() => navigate('/travel/contact')} type="button">
                  <Send size={16} aria-hidden="true" /> Enroll Now
                </button>
                <button className="td-btn-ghost" style={{ width: 'auto', padding: '14px 32px' }} onClick={() => navigate('/travel/training')} type="button">
                  <BookOpen size={16} aria-hidden="true" /> Browse All Training
                </button>
              </div>
            </motion.div>
          </div>

          {/* ═══════════ SIDEBAR ═══════════ */}
          <motion.div
            className="td-sidebar"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Course Summary */}
            <div className="td-sidebar-card">
              <h3 className="td-sidebar-title">Course Summary</h3>
              <div className="td-sidebar-row"><Clock size={16} aria-hidden="true" /><span>{details.duration}</span></div>
              <div className="td-sidebar-row"><Users size={16} aria-hidden="true" /><span>{details.format}</span></div>
              <div className="td-sidebar-row"><Star size={16} aria-hidden="true" /><span>{details.rating} Rating</span></div>
              <div className="td-sidebar-row"><Award size={16} aria-hidden="true" /><span>Certification</span></div>
            </div>

            {/* Quick Actions */}
            <div className="td-sidebar-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="td-btn-gold" onClick={() => navigate('/travel/contact')} type="button">
                <Send size={16} aria-hidden="true" /> Enroll Now
              </button>
              <button
                className="td-btn-ghost"
                onClick={() => window.open(whatsappBase, '_blank', 'noopener,noreferrer')}
                type="button"
              >
                <MessageCircle size={16} aria-hidden="true" /> Speak with an Advisor
              </button>
              <button className="td-btn-ghost" onClick={handleRequestBrochure} type="button">
                <Download size={16} aria-hidden="true" /> Request Brochure
              </button>
              <button className="td-btn-ghost" onClick={handleShareCourse} type="button">
                <Share2 size={16} aria-hidden="true" /> {shareStatus === "copied" ? "Link Copied!" : "Share Course"}
              </button>
            </div>

            {/* Contact */}
            <div className="td-sidebar-card">
              <h3 className="td-sidebar-title">Need Help?</h3>
              <div className="td-sidebar-row"><Phone size={16} aria-hidden="true" /><span>+234 802 235 2362</span></div>
              <div className="td-sidebar-row"><MessageCircle size={16} aria-hidden="true" /><span>WhatsApp Us</span></div>
              <div className="td-sidebar-row"><Send size={16} aria-hidden="true" /><span>info@rasoaf.com</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}