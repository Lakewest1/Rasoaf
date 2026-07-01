// src/pages/VisaServices.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Visa Services Page
// Comprehensive visa processing services with detailed information
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Building2,
  Plane,
  Globe,
  Users,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  FileText,
  BadgeCheck,
  AlertCircle,
} from "lucide-react";

// ── Visa Type Data ────────────────────────────────────────────────────────────
const VISA_TYPES = [
  {
    id: "student",
    title: "Student Visa",
    icon: GraduationCap,
    description: "Comprehensive student visa assistance for international education opportunities in top destinations worldwide.",
    processingTime: "4-8 weeks",
    successRate: "95%",
    requirements: [
      "Valid Passport (6+ months)",
      "Letter of Acceptance",
      "Proof of Funds",
      "Academic Transcripts",
      "English Proficiency Test",
      "Passport Photos",
    ],
    features: [
      "Document Review",
      "Application Filing",
      "Interview Preparation",
      "Visa Tracking",
    ],
    color: "#D4A017",
  },
  {
    id: "work",
    title: "Work Visa",
    icon: Building2,
    description: "Professional work visa processing for employment opportunities abroad with expert guidance and support.",
    processingTime: "6-12 weeks",
    successRate: "92%",
    requirements: [
      "Valid Passport (6+ months)",
      "Employment Contract",
      "Qualifications Verified",
      "Medical Clearance",
      "Police Clearance",
      "CV/Resume",
    ],
    features: [
      "Employer Liaison",
      "Document Preparation",
      "Medical Booking",
      "Status Updates",
    ],
    color: "#B8860B",
  },
  {
    id: "tourist",
    title: "Tourist Visa",
    icon: Plane,
    description: "Hassle-free tourist visa processing for leisure and vacation travel to your dream destinations.",
    processingTime: "2-4 weeks",
    successRate: "98%",
    requirements: [
      "Valid Passport (6+ months)",
      "Return Flight Ticket",
      "Hotel Booking",
      "Proof of Funds",
      "Travel Itinerary",
      "Passport Photos",
    ],
    features: [
      "Application Filing",
      "Document Review",
      "Express Service",
      "Travel Insurance",
    ],
    color: "#F7C948",
  },
  {
    id: "business",
    title: "Business Visa",
    icon: Globe,
    description: "Efficient business visa services for corporate travel, conferences, and international business meetings.",
    processingTime: "3-6 weeks",
    successRate: "94%",
    requirements: [
      "Valid Passport (6+ months)",
      "Invitation Letter",
      "Company Registration",
      "Business Itinerary",
      "Proof of Funds",
      "Passport Photos",
    ],
    features: [
      "Corporate Support",
      "Invitation Assistance",
      "Expedited Processing",
      "Multi-Entry Support",
    ],
    color: "#D4A017",
  },
  {
    id: "family",
    title: "Family Visa",
    icon: Users,
    description: "Family visa processing for reunification and dependent travel with compassionate support and guidance.",
    processingTime: "8-16 weeks",
    successRate: "88%",
    requirements: [
      "Valid Passport (6+ months)",
      "Sponsor Documents",
      "Proof of Relationship",
      "Financial Support",
      "Medical Clearance",
      "Passport Photos",
    ],
    features: [
      "Relationship Verification",
      "Document Preparation",
      "Medical Booking",
      "Family Support",
    ],
    color: "#B8860B",
  },
];

// ── Visa Process Steps ──────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { step: "01", title: "Consultation", description: "Discuss your visa needs and determine the best pathway." },
  { step: "02", title: "Document Review", description: "We review all your documents for completeness and accuracy." },
  { step: "03", title: "Application Filing", description: "Your application is prepared and filed with the embassy." },
  { step: "04", title: "Tracking & Support", description: "We track your application and keep you informed." },
  { step: "05", title: "Visa Issued", description: "Receive your visa and prepare for your journey." },
];

// ── Visa Card ─────────────────────────────────────────────────────────────────
function VisaCard({ visa, index }) {
  const [hovered, setHovered] = useState(false);
  const Icon = visa.icon;
  const delay = 0.08 * (index + 1);

  return (
    <div
      style={{
        opacity: 1,
        transform: "translateY(0)",
        transition: `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        height: "100%",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "28px 24px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${hovered ? "rgba(212,160,23,0.30)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.08)"
            : "0 1px 3px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.04)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${visa.color}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
            opacity: hovered ? 1 : 0.3,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            borderRadius: "0 0 3px 3px",
          }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: `rgba(212,160,23,0.08)`,
            border: `1px solid rgba(212,160,23,0.12)`,
            color: "#D4A017",
            marginBottom: "14px",
          }}
        >
          <Icon size={28} strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "1.15rem",
            color: "#111111",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          {visa.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "#5F5F5F",
            lineHeight: 1.6,
            marginBottom: "14px",
            flex: 1,
          }}
        >
          {visa.description}
        </p>

        {/* Processing & Success */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "14px",
            padding: "12px 14px",
            background: "rgba(212,160,23,0.04)",
            borderRadius: "12px",
            border: "1px solid rgba(212,160,23,0.06)",
          }}
        >
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                color: "#5F5F5F",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
              }}
            >
              Processing Time
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#111111",
              }}
            >
              {visa.processingTime}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 500,
                color: "#5F5F5F",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
              }}
            >
              Success Rate
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: visa.color,
              }}
            >
              {visa.successRate}
            </span>
          </div>
        </div>

        {/* Requirements */}
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "#5F5F5F",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Key Requirements
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4px",
            }}
          >
            {visa.requirements.slice(0, 4).map((req, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 450,
                  color: "#2d3748",
                }}
              >
                <CheckCircle size={10} color="#D4A017" />
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            const el = document.getElementById("visa-services");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{
            width: "100%",
            padding: "11px 0",
            background: "linear-gradient(135deg, #F7C948 0%, #D4A017 100%)",
            border: "none",
            borderRadius: "12px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#111111",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: "0 2px 12px rgba(212,160,23,0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,160,23,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(212,160,23,0.25)";
          }}
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}

// ── Process Step ─────────────────────────────────────────────────────────────
function ProcessStep({ step, index }) {
  const delay = 0.08 * (index + 1);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        opacity: 1,
        transform: "translateY(0)",
        transition: `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "48px",
          minHeight: "48px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #F7C948, #D4A017)",
          color: "#111111",
          fontFamily: "'Manrope', sans-serif",
          fontSize: "1rem",
          fontWeight: 800,
        }}
      >
        {step.step}
      </div>
      <div>
        <h4
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#111111",
            marginBottom: "4px",
          }}
        >
          {step.title}
        </h4>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "#5F5F5F",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function VisaServices() {
  const [activeVisa, setActiveVisa] = useState("student");
  const sectionRef = useRef(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .visa-page {
          padding-top: 80px;
          background: #ffffff;
          min-height: 100vh;
        }

        .visa-hero {
          position: relative;
          padding: clamp(60px, 10vh, 100px) clamp(20px, 5vw, 48px);
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
          text-align: center;
          overflow: hidden;
        }

        .visa-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 50%, rgba(212,160,23,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(212,160,23,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .visa-hero h1 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-bottom: 16px;
          position: relative;
        }

        .visa-hero h1 .highlight {
          color: #F7C948;
        }

        .visa-hero p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
          position: relative;
        }

        .visa-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(40px, 6vh, 64px) clamp(20px, 5vw, 48px);
        }

        .visa-content-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .visa-content-header .eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
          display: block;
          margin-bottom: 12px;
        }

        .visa-content-header h2 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          color: #111111;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .visa-content-header h2 em {
          font-style: italic;
          color: #D4A017;
        }

        .visa-content-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 1vw, 1rem);
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .visa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .process-section {
          padding: 40px;
          background: linear-gradient(135deg, #FFF8E6, #FFFBEF);
          border-radius: 20px;
          border: 1px solid rgba(212,160,23,0.1);
          margin-bottom: 48px;
        }

        .process-section h3 {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #111111;
          margin-bottom: 24px;
          text-align: center;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .visa-cta-section {
          padding: 40px;
          background: linear-gradient(135deg, #FFF8E6, #FFFBEF);
          border-radius: 20px;
          border: 1px solid rgba(212,160,23,0.1);
          text-align: center;
        }

        .visa-cta-section h3 {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #111111;
          margin-bottom: 8px;
        }

        .visa-cta-section p {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #5F5F5F;
          margin-bottom: 20px;
        }

        .visa-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          background: linear-gradient(135deg, #F7C948 0%, #D4A017 100%);
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #111111;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(212,160,23,0.25);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .visa-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(212,160,23,0.35);
        }

        @media (max-width: 600px) {
          .visa-grid {
            grid-template-columns: 1fr;
          }
          .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="visa-page" id="visa-services">
        {/* Hero Section */}
        <div className="visa-hero">
          <h1>
            Visa <span className="highlight">Services</span>
          </h1>
          <p>
            Professional visa processing for students, professionals, tourists,
            and families — with high success rates and end-to-end support.
          </p>
        </div>

        {/* Content */}
        <div className="visa-content">
          <div className="visa-content-header">
            <span className="eyebrow">Global Visa Solutions</span>
            <h2>
              Your <em>Visa Journey</em> Starts Here
            </h2>
            <p>
              We offer comprehensive visa processing services with expert guidance
              and support at every stage of your application.
            </p>
          </div>

          {/* Visa Types Grid */}
          <div className="visa-grid">
            {VISA_TYPES.map((visa, index) => (
              <VisaCard key={visa.id} visa={visa} index={index} />
            ))}
          </div>

          {/* Process Section */}
          <div className="process-section">
            <h3>Our Visa Processing Steps</h3>
            <div className="process-grid">
              {PROCESS_STEPS.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="visa-cta-section">
            <h3>Need a Visa?</h3>
            <p>Contact us today for professional visa assistance.</p>
            <button
              className="visa-cta-btn"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <Phone size={16} /> Speak with an Advisor
            </button>
          </div>
        </div>
      </div>
    </>
  );
}