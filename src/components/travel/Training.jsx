// src/components/travel/Training.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Training Services
// Premium training cards · Glass overlay · Slide-up details · 2026 luxury
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { 
  BookOpen, Globe, Briefcase, Stethoscope, 
  ArrowUpRight, Sparkles, ChevronRight, Clock, Users, Award,
  GraduationCap, Languages, PenTool, FileText
} from "lucide-react";

const trainingData = [
  {
    id: "ielts",
    title: "IELTS Coaching",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center",
    description: "International English Language Testing System preparation for study, work, and immigration.",
    route: "/travel/training/ielts",
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
      rating: "4.9/5"
    }
  },
  {
    id: "toefl",
    title: "TOEFL Coaching",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&crop=center",
    description: "Test of English as a Foreign Language preparation for university admissions and scholarships.",
    route: "/travel/training/toefl",
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
      rating: "4.8/5"
    }
  },
  {
    id: "pte",
    title: "PTE Coaching",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&crop=center",
    description: "Pearson Test of English preparation for study, immigration, and professional registration.",
    route: "/travel/training/pte",
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
      rating: "4.7/5"
    }
  },
  {
    id: "oet",
    title: "OET Coaching",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center",
    description: "Occupational English Test preparation for healthcare professionals worldwide.",
    route: "/travel/training/oet",
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
      rating: "4.8/5"
    }
  }
];

const RasoafCSS = `
  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RASOAF DESIGN SYSTEM — Training Section                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  :root {
    --gold-primary: #D4A017;
    --gold-light: #F7C948;
    --gold-dark: #B8860B;
    --white: #FFFFFF;
    --bg-light: #F7F8FA;
    --navy-dark: #0D3C6E;
    --text-dark: #0A0F1A;
    --text-grey: #6B7280;
    --text-muted: #9CA3AF;
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.04);
    --shadow-hover: 0 12px 48px rgba(0, 0, 0, 0.12);
    
    --font-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    
    --radius-card: 24px;
    --radius-pill: 9999px;
    --transition-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  }

  .training-section {
    padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
    background: var(--bg-light);
    position: relative;
    overflow: hidden;
    z-index: 10;
  }

  .training-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── Header ── */
  .training-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 64px);
  }

  .training-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-primary);
    margin-bottom: 16px;
  }

  .training-eyebrow svg {
    width: 14px;
    height: 14px;
    color: var(--gold-primary);
  }

  .training-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    letter-spacing: -0.03em;
    line-height: 1.08;
    color: var(--text-dark);
    margin: 0 0 16px 0;
  }

  .training-title-accent {
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.15));
  }

  .training-subtitle {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.1vw, 1.1rem);
    font-weight: 400;
    color: var(--text-grey);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.7;
    letter-spacing: 0.01em;
  }

  /* ── Grid ── */
  .training-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  /* ── Card ── */
  .training-card {
    position: relative;
    border-radius: var(--radius-card);
    overflow: hidden;
    background: var(--white);
    box-shadow: var(--shadow-card);
    transition: all 0.5s var(--transition-smooth);
    cursor: pointer;
    height: 340px;
    will-change: transform, box-shadow;
  }

  .training-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover);
  }

  /* ── Image ── */
  .training-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s var(--transition-smooth);
    will-change: transform;
  }

  .training-card:hover .training-card-image {
    transform: scale(1.08);
  }

  /* ── Content Overlay ── */
  .training-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 20px 20px;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 2;
    pointer-events: none;
  }

  .training-card-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--white);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 4px 0;
  }

  .training-card-desc {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* ── Hover Overlay ── */
  .training-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 20px 20px;
    background: rgba(10, 60, 110, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-card);
    margin: 0 4px 4px;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.7s var(--transition-smooth);
    z-index: 3;
    pointer-events: none;
  }

  .training-card:hover .training-card-overlay {
    transform: translateY(0);
    pointer-events: auto;
  }

  .training-overlay-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--white);
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
  }

  .training-overlay-desc {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
    margin: 0 0 16px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .training-overlay-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--white);
    cursor: pointer;
    transition: all 0.4s var(--transition-smooth);
    width: fit-content;
    pointer-events: auto;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 5;
  }

  .training-overlay-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .training-overlay-btn span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .training-overlay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3);
    border-color: rgba(212, 160, 23, 0.3);
    color: var(--white);
  }

  .training-overlay-btn:hover::before {
    opacity: 1;
  }

  .training-overlay-btn svg {
    transition: transform 0.3s ease;
  }

  .training-overlay-btn:hover svg {
    transform: translateX(4px);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .training-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    
    .training-card {
      height: 320px;
    }
  }

  @media (max-width: 768px) {
    .training-section {
      padding: clamp(56px, 8vh, 80px) 20px;
    }

    .training-grid {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .training-card {
      height: 280px;
      border-radius: 20px;
    }

    .training-title {
      font-size: 1.8rem;
    }

    .training-subtitle {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    .training-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .training-grid {
      grid-template-columns: 1fr;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }

    .training-card {
      height: 300px;
    }

    .training-title {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 380px) {
    .training-card {
      height: 260px;
    }

    .training-title {
      font-size: 1.4rem;
    }

    .training-overlay-btn {
      padding: 6px 14px;
      font-size: 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .training-card {
      transition: none !important;
    }

    .training-card:hover {
      transform: none !important;
    }

    .training-card-image {
      transition: none !important;
    }

    .training-card:hover .training-card-image {
      transform: none !important;
    }

    .training-card-overlay {
      transition: none !important;
    }

    .training-card:hover .training-card-overlay {
      transform: translateY(100%) !important;
    }

    .training-overlay-btn {
      transition: none !important;
    }

    .training-overlay-btn:hover {
      transform: none !important;
    }
  }

  @media (hover: none) {
    .training-card .training-card-overlay {
      transform: translateY(100%);
      pointer-events: none;
    }

    .training-card.active .training-card-overlay {
      transform: translateY(0);
      pointer-events: auto;
    }

    .training-card.active .training-card-image {
      transform: scale(1.08);
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════

export default function Training() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleCardClick = useCallback((index) => {
    if (window.matchMedia('(hover: none)').matches) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  }, [activeIndex]);

  const handleNavigate = useCallback((route, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate]);

  return (
    <>
      <style>{RasoafCSS}</style>

      <section ref={ref} className="training-section" aria-label="Training services">
        <div className="training-container">
          {/* Header */}
          <motion.div
            className="training-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="training-eyebrow">
              <Sparkles size={12} />
              Check Our Training
              <Sparkles size={12} />
            </div>
            <h2 className="training-title">
              Get the Best{" "}
              <span className="training-title-accent">Coaching Service</span>{" "}
              Training with Our RASOAF
            </h2>
            <p className="training-subtitle">
              We provide professional training, guidance, and support for a wide range of 
              internationally recognized examinations, including IELTS, TOEFL, PTE, OET, 
              Duolingo English Test, TEF Canada, GMAC, GMAT, and GRE.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="training-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
          >
            {trainingData.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;
              const isTouchDevice = window.matchMedia('(hover: none)').matches;

              return (
                <motion.div
                  key={item.id}
                  className={`training-card ${isActive ? 'active' : ''}`}
                  variants={itemVariants}
                  role="listitem"
                  aria-label={item.title}
                  onClick={() => handleCardClick(index)}
                  whileHover={!isTouchDevice ? {
                    y: -6,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  } : {}}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="training-card-image"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Content Overlay */}
                  <div className="training-card-content">
                    <h3 className="training-card-title">{item.title}</h3>
                    <p className="training-card-desc">{item.description}</p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="training-card-overlay">
                    <h4 className="training-overlay-title">{item.title}</h4>
                    <p className="training-overlay-desc">{item.description}</p>
                    <button
                      className="training-overlay-btn"
                      onClick={(e) => handleNavigate(item.route, e)}
                      aria-label={`Learn more about ${item.title}`}
                      type="button"
                    >
                      <span>
                        More
                        <ArrowUpRight size={14} />
                      </span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}