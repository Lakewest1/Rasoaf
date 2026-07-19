// src/components/travel/VisaServicesGrid.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Visa Services Grid
// Student, Work, Tourist, Business, Family, Flights
// Ultra-premium cards with Rasoaf Typography, micro-interactions, glassmorphism
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../common";
import {
  Plane, Globe, GraduationCap, Building2, Briefcase, Heart,
  CheckCircle, ChevronRight, Clock, Shield, Star, Sparkles,
  ArrowUpRight, BadgeCheck, MapPin, Users, Zap,
} from "lucide-react";

const services = [
  {
    id: "student",
    icon: GraduationCap,
    title: "Student Visa",
    description: "Transform your future with world-class education. We handle admissions, LOA, CAS, DS-160, and study permits for premier institutions in Canada, USA, UK, Australia, and Europe.",
    processingTime: "4-8 weeks",
    successRate: "95%",
    requirements: ["Valid Passport", "Letter of Acceptance", "Proof of Funds", "Academic Transcripts"],
    color: "#1A73E8",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    accentColor: "#667eea",
    route: "/travel/student-visa",
    testimonial: "Trusted by 5000+ students",
    popularity: "Most Popular",
    iconBg: "rgba(102, 126, 234, 0.1)",
  },
  {
    id: "work",
    icon: Briefcase,
    title: "Work Visa",
    description: "Accelerate your global career with premium work visa solutions. Expert handling of employment documentation, compliance, and fast-track processing for skilled professionals.",
    processingTime: "6-12 weeks",
    successRate: "92%",
    requirements: ["Valid Passport", "Employment Contract", "Qualifications", "Police Clearance"],
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
    accentColor: "#0D9488",
    route: "/travel/work-visa",
    testimonial: "98% client satisfaction",
    popularity: "In Demand",
    iconBg: "rgba(13, 148, 136, 0.1)",
  },
  {
    id: "tourist",
    icon: Globe,
    title: "Tourist Visa",
    description: "Experience the extraordinary with seamless tourist visa processing. From exotic destinations to cultural wonders, we make your travel dreams a reality.",
    processingTime: "2-4 weeks",
    successRate: "98%",
    requirements: ["Valid Passport", "Return Ticket", "Hotel Booking", "Proof of Funds"],
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    accentColor: "#7C3AED",
    route: "/travel/tourist-visa",
    testimonial: "10,000+ visas approved",
    popularity: "Trending",
    iconBg: "rgba(124, 58, 237, 0.1)",
  },
  {
    id: "business",
    icon: Building2,
    title: "Business Visa",
    description: "Elevate your corporate presence globally with premium business visa services. Specialized handling for conferences, trade missions, and international expansion.",
    processingTime: "3-6 weeks",
    successRate: "94%",
    requirements: ["Valid Passport", "Invitation Letter", "Company Registration", "Business Itinerary"],
    color: "#DC2626",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
    accentColor: "#DC2626",
    route: "/travel/business-visa",
    testimonial: "Preferred by enterprises",
    popularity: "Premium",
    iconBg: "rgba(220, 38, 38, 0.1)",
  },
  {
    id: "family",
    icon: Heart,
    title: "Family Visa",
    description: "Reunite with loved ones through our comprehensive family reunification services. We handle complex documentation for family residence and long-term stays with care.",
    processingTime: "8-16 weeks",
    successRate: "88%",
    requirements: ["Valid Passport", "Sponsor Documents", "Proof of Relationship", "Financial Support"],
    color: "#E11D48",
    gradient: "linear-gradient(135deg, #E11D48 0%, #EC4899 100%)",
    accentColor: "#E11D48",
    route: "/travel/family-visa",
    testimonial: "Family-focused expertise",
    popularity: "Essential",
    iconBg: "rgba(225, 29, 72, 0.1)",
  },
  {
    id: "flights",
    icon: Plane,
    title: "Flight Booking",
    description: "Discover exceptional flight deals with premier global airlines. Luxury and economy options with flexible booking, real-time tracking, and 24/7 concierge support.",
    processingTime: "Instant",
    successRate: "100%",
    requirements: ["Travel Dates", "Destination", "Passenger Details", "Payment"],
    color: "#0284C7",
    gradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    accentColor: "#0284C7",
    route: "/travel/flights",
    testimonial: "Best price guarantee",
    popularity: "Express",
    iconBg: "rgba(2, 132, 199, 0.1)",
  },
];

const PremiumCSS = `
  /* ── Rasoaf Design Tokens ── */
  :root {
    --rasoaf-gold-primary: #D4A017;
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-surface-primary: #FFF8E6;
    --rasoaf-surface-white: #FFFFFF;
    --rasoaf-surface-cream: #FFFDF5;
    --rasoaf-text-primary: #0B0F17;
    --rasoaf-text-secondary: #525252;
    --rasoaf-text-tertiary: #737373;
    --rasoaf-text-muted: #A3A3A3;
    --rasoaf-font-display: 'Manrope', system-ui, sans-serif;
    --rasoaf-font-body: 'Inter', system-ui, sans-serif;
    --rasoaf-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --rasoaf-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
    --rasoaf-shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.08);
    --rasoaf-shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.12);
    --rasoaf-shadow-gold: 0 8px 32px rgba(212, 160, 23, 0.15);
    --rasoaf-radius-sm: 10px;
    --rasoaf-radius-md: 16px;
    --rasoaf-radius-lg: 24px;
    --rasoaf-radius-xl: 32px;
    --rasoaf-transition-smooth: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    --rasoaf-transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Section ── */
  .premium-visa-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(80px, 12vh, 120px) 32px;
    position: relative;
    z-index: 20;
    background: linear-gradient(180deg, #FFF8E6 0%, #FFFDF5 50%, #FFF8E6 100%);
    overflow: hidden;
    font-family: var(--rasoaf-font-body);
  }

  /* Luxurious background patterns */
  .premium-visa-section::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(212, 160, 23, 0.03) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: rasoaf-float 20s ease-in-out infinite;
  }

  .premium-visa-section::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(247, 201, 72, 0.04) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    animation: rasoaf-float 25s ease-in-out infinite reverse;
  }

  @keyframes rasoaf-float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }

  /* ── Header ── */
  .premium-header-wrap {
    position: relative;
    z-index: 25;
    margin-bottom: clamp(48px, 6vw, 64px);
  }

  /* ── Stats Bar ── */
  .premium-stats-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 800px;
    margin: 0 auto 48px;
    position: relative;
    z-index: 25;
  }

  .premium-stat-item {
    text-align: center;
    padding: 24px 20px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: var(--rasoaf-radius-md);
    transition: all var(--rasoaf-transition-smooth);
    position: relative;
    overflow: hidden;
  }

  .premium-stat-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--rasoaf-gold-light), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .premium-stat-item:hover {
    transform: translateY(-4px);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: var(--rasoaf-shadow-lg);
  }

  .premium-stat-item:hover::before {
    opacity: 1;
  }

  .premium-stat-number {
    font-family: var(--rasoaf-font-display);
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    font-weight: 800;
    background: linear-gradient(135deg, #D4A017 0%, #F7C948 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }

  .premium-stat-label {
    font-family: var(--rasoaf-font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--rasoaf-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  /* ── Grid ── */
  .premium-visa-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: clamp(20px, 2.5vw, 32px);
    position: relative;
    z-index: 25;
  }

  /* ── Cards ── */
  .premium-visa-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border-radius: var(--rasoaf-radius-lg);
    padding: clamp(24px, 3vw, 32px);
    border: 1px solid rgba(212, 160, 23, 0.1);
    box-shadow: var(--rasoaf-shadow-sm);
    transition: all var(--rasoaf-transition-smooth);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .premium-visa-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--rasoaf-radius-lg);
    padding: 1px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.3), transparent 40%, transparent 60%, rgba(212, 160, 23, 0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .premium-visa-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--rasoaf-shadow-xl), 0 0 0 1px rgba(212, 160, 23, 0.08);
    background: rgba(255, 255, 255, 0.97);
  }

  .premium-visa-card:hover::before {
    opacity: 1;
  }

  /* Card shimmer effect */
  .premium-visa-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .premium-visa-card:hover::after {
    left: 100%;
  }

  /* ── Card Badge ── */
  .premium-card-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 6px 14px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.12), rgba(247, 201, 72, 0.08));
    border: 1px solid rgba(212, 160, 23, 0.18);
    border-radius: 100px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--rasoaf-gold-dark);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 5;
    transition: all 0.3s ease;
  }

  .premium-visa-card:hover .premium-card-badge {
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.18), rgba(247, 201, 72, 0.12));
    border-color: rgba(212, 160, 23, 0.3);
  }

  /* ── Icon Container ── */
  .premium-icon-container {
    position: relative;
    display: inline-flex;
    margin-bottom: 20px;
  }

  .premium-icon-glow {
    position: absolute;
    inset: -8px;
    border-radius: 16px;
    opacity: 0;
    transition: all 0.5s ease;
    filter: blur(16px);
  }

  .premium-visa-card:hover .premium-icon-glow {
    opacity: 0.25;
    transform: scale(1.3);
  }

  .premium-visa-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(48px, 5.5vw, 60px);
    height: clamp(48px, 5.5vw, 60px);
    border-radius: 16px;
    border: 1px solid rgba(212, 160, 23, 0.15);
    position: relative;
    z-index: 2;
    transition: all var(--rasoaf-transition-smooth);
  }

  .premium-visa-card:hover .premium-visa-icon {
    transform: scale(1.08) rotate(-3deg);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
  }

  /* ── Title Row ── */
  .premium-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .premium-visa-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(1.15rem, 1.5vw, 1.35rem);
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.02em;
    line-height: 1.2;
    transition: all 0.3s ease;
  }

  .premium-visa-card:hover .premium-visa-title {
    background: linear-gradient(135deg, var(--rasoaf-text-primary) 0%, var(--rasoaf-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .premium-title-arrow {
    opacity: 0;
    transform: translateX(-12px);
    transition: all var(--rasoaf-transition-bounce);
    flex-shrink: 0;
  }

  .premium-visa-card:hover .premium-title-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ── Description ── */
  .premium-visa-desc {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(0.8rem, 0.95vw, 0.9rem);
    font-weight: 400;
    color: var(--rasoaf-text-secondary);
    line-height: 1.7;
    margin-bottom: 20px;
    flex: 1;
    letter-spacing: 0.005em;
  }

  /* ── Info Panel ── */
  .premium-info-panel {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    padding: 16px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.04), rgba(247, 201, 72, 0.02));
    border-radius: var(--rasoaf-radius-md);
    border: 1px solid rgba(212, 160, 23, 0.08);
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .premium-visa-card:hover .premium-info-panel {
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.06), rgba(247, 201, 72, 0.03));
    border-color: rgba(212, 160, 23, 0.15);
  }

  .premium-info-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 160, 23, 0.3), transparent);
  }

  .premium-info-item {
    flex: 1;
    position: relative;
  }

  .premium-info-label {
    font-family: var(--rasoaf-font-body);
    font-size: 0.625rem;
    font-weight: 700;
    color: var(--rasoaf-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 6px;
  }

  .premium-info-value {
    font-family: var(--rasoaf-font-display);
    font-size: clamp(0.9rem, 1.1vw, 1.05rem);
    font-weight: 700;
    color: var(--rasoaf-text-primary);
    display: flex;
    align-items: baseline;
    gap: 6px;
    letter-spacing: -0.01em;
  }

  .premium-info-trend {
    font-family: var(--rasoaf-font-body);
    font-size: 0.65rem;
    font-weight: 600;
    color: #059669;
    display: flex;
    align-items: center;
    gap: 3px;
    letter-spacing: 0.02em;
  }

  /* ── Requirements ── */
  .premium-req-section {
    margin-bottom: 20px;
  }

  .premium-req-header {
    font-family: var(--rasoaf-font-body);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--rasoaf-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 10px;
  }

  .premium-req-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .premium-req-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(212, 160, 23, 0.02);
    border: 1px solid rgba(212, 160, 23, 0.06);
    border-radius: var(--rasoaf-radius-sm);
    font-family: var(--rasoaf-font-body);
    font-size: 0.725rem;
    font-weight: 500;
    color: var(--rasoaf-text-secondary);
    transition: all 0.3s ease;
    letter-spacing: 0.01em;
  }

  .premium-req-item:hover {
    background: rgba(212, 160, 23, 0.05);
    border-color: rgba(212, 160, 23, 0.15);
    transform: translateX(6px);
  }

  .premium-req-check {
    color: var(--rasoaf-gold-primary);
    flex-shrink: 0;
  }

  /* ── CTA Button ── */
  .premium-cta-button {
    width: 100%;
    padding: clamp(10px, 1.2vw, 14px) 0;
    background: linear-gradient(135deg, #D4A017 0%, #F7C948 100%);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 14px;
    font-family: var(--rasoaf-font-body);
    font-size: clamp(0.8rem, 0.95vw, 0.9rem);
    font-weight: 700;
    color: #0B0F17;
    cursor: pointer;
    transition: all var(--rasoaf-transition-smooth);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    position: relative;
    overflow: hidden;
    min-height: 48px;
    letter-spacing: -0.005em;
  }

  .premium-cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .premium-cta-button:hover::before {
    opacity: 1;
  }

  .premium-cta-button span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .premium-cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(212, 160, 23, 0.35);
    border-color: rgba(212, 160, 23, 0.4);
  }

  .premium-cta-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(212, 160, 23, 0.2);
  }

  .premium-cta-arrow {
    transition: transform 0.3s ease;
  }

  .premium-cta-button:hover .premium-cta-arrow {
    transform: translateX(4px);
  }

  /* ── Trust Indicator ── */
  .premium-trust-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
    padding: 8px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--rasoaf-text-muted);
    opacity: 0;
    transform: translateY(10px);
    transition: all var(--rasoaf-transition-smooth);
    letter-spacing: 0.02em;
  }

  .premium-visa-card:hover .premium-trust-indicator {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .premium-visa-grid {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
    
    .premium-stats-bar {
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
  }

  @media (max-width: 768px) {
    .premium-visa-grid {
      grid-template-columns: 1fr;
    }
    
    .premium-stats-bar {
      grid-template-columns: 1fr;
      max-width: 400px;
      gap: 12px;
    }
    
    .premium-visa-section {
      padding: clamp(60px, 8vh, 80px) 20px;
    }
    
    .premium-stat-item {
      padding: 20px 16px;
    }
  }

  @media (max-width: 480px) {
    .premium-req-grid {
      grid-template-columns: 1fr;
    }
    
    .premium-visa-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }
    
    .premium-info-panel {
      flex-direction: column;
      gap: 12px;
    }
    
    .premium-visa-card {
      padding: 20px;
    }
    
    .premium-card-badge {
      top: 12px;
      right: 12px;
      font-size: 0.6rem;
    }
  }
`;

export default function PremiumVisaServicesGrid() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const handleNavigate = useCallback((route) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = document.querySelectorAll(".premium-visa-card");
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `all 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{PremiumCSS}</style>
      
      <section 
        ref={sectionRef}
        id="premium-travel-services" 
        className="premium-visa-section"
      >
        {/* Header with enhanced styling */}
        <div className="premium-header-wrap">
          <SectionHeader
            badge="✦ World-Class Visa Solutions ✦"
            badgeIcon={<Sparkles size={14} color="#D4A017" />}
            title="Elevate Your Journey, Beyond Boundaries"
            subtitle="RASOAF Travels and Tours Limited orchestrates extraordinary travel experiences with white-glove service. Complimentary consultation, meticulous documentation, and unwavering support because your journey deserves nothing less than perfection."
          />
        </div>

        {/* Stats Bar */}
        <div className="premium-stats-bar">
          <div className="premium-stat-item">
            <div className="premium-stat-number">15K+</div>
            <div className="premium-stat-label">Visas Approved</div>
          </div>
          <div className="premium-stat-item">
            <div className="premium-stat-number">50+</div>
            <div className="premium-stat-label">Countries Covered</div>
          </div>
          <div className="premium-stat-item">
            <div className="premium-stat-number">98%</div>
            <div className="premium-stat-label">Success Rate</div>
          </div>
        </div>

        {/* Premium Cards Grid */}
        <div className="premium-visa-grid">
          {services.map((service) => {
            const IconComponent = service.icon;
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                className="premium-visa-card"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleNavigate(service.route)}
              >
                {/* Popularity Badge */}
                <div className="premium-card-badge">
                  <Zap size={11} />
                  {service.popularity}
                </div>

                {/* Icon with glow effect */}
                <div className="premium-icon-container">
                  <div 
                    className="premium-icon-glow"
                    style={{ background: service.accentColor }}
                  />
                  <div 
                    className="premium-visa-icon"
                    style={{ background: service.iconBg }}
                  >
                    <IconComponent 
                      size={28} 
                      color={service.color} 
                      strokeWidth={1.5}
                      style={{ filter: `drop-shadow(0 2px 4px ${service.accentColor}40)` }}
                    />
                  </div>
                </div>

                {/* Title with hover arrow */}
                <div className="premium-title-row">
                  <h3 className="premium-visa-title">
                    {service.title}
                  </h3>
                  <ArrowUpRight 
                    size={18} 
                    className="premium-title-arrow"
                    color={service.accentColor}
                  />
                </div>

                {/* Description */}
                <p className="premium-visa-desc">
                  {service.description}
                </p>

                {/* Info Panel */}
                <div className="premium-info-panel">
                  <div className="premium-info-item">
                    <span className="premium-info-label">
                      <Clock size={10} />
                      Processing
                    </span>
                    <span className="premium-info-value">
                      {service.processingTime}
                      {service.processingTime === "Instant" && (
                        <span className="premium-info-trend">
                          <Zap size={10} />
                          Fast
                        </span>
                      )}
                    </span>
                  </div>
                  
                  <div className="premium-info-item">
                    <span className="premium-info-label">
                      <Shield size={10} />
                      Success Rate
                    </span>
                    <span 
                      className="premium-info-value"
                      style={{ color: service.color }}
                    >
                      {service.successRate}
                      <span className="premium-info-trend">
                        <BadgeCheck size={10} />
                      </span>
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="premium-req-section">
                  <span className="premium-req-header">
                    <MapPin size={12} />
                    Essential Requirements
                  </span>
                  <div className="premium-req-grid">
                    {service.requirements.map((req, idx) => (
                      <div key={idx} className="premium-req-item">
                        <CheckCircle size={12} className="premium-req-check" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  className="premium-cta-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(service.route);
                  }}
                >
                  <span>
                    Explore {service.title}
                    <ChevronRight size={16} className="premium-cta-arrow" />
                  </span>
                </button>

                {/* Trust Indicator (appears on hover) */}
                <div className="premium-trust-indicator">
                  <Users size={12} color="#D4A017" />
                  {service.testimonial}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}