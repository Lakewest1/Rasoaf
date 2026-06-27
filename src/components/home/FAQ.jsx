// src/components/home/FAQ.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — FAQ Section
//
// A premium FAQ section that addresses common concerns and removes hesitation
// before booking a pilgrimage package.
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: Two-column accordion on desktop, single column on mobile
// Animation: Smooth expand/collapse with icon rotation
// Responsive: 2 → 1 columns (desktop → tablet/mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  X,
} from "lucide-react";

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    id: 1,
    category: "Visa & Documentation",
    question: "What are the visa requirements for Hajj and Umrah?",
    answer:
      "For Hajj and Umrah, pilgrims are required to have a valid passport with at least 6 months validity from the date of travel. Saudi Arabia issues specific pilgrimage visas that are processed through authorized travel agencies like RASAOF Travels and Tours Limited. We handle the entire visa application process on your behalf, including document preparation, submission, and follow-up. Required documents typically include passport-sized photographs, completed application forms, vaccination certificates (Meningitis and COVID-19), and proof of accommodation and travel arrangements. Our team will guide you through every step of the process.",
  },
  {
    id: 2,
    category: "Payment & Pricing",
    question: "What payment plans and installment options are available?",
    answer:
      "We understand that pilgrimage is a significant financial commitment. RASAOF Travels and Tours Limited offers flexible payment plans to make your journey more accessible. We provide installment payment options with a structured schedule that allows you to pay in stages leading up to your departure. A deposit is required to secure your booking, with the balance payable in agreed installments. We also accept various payment methods including bank transfers, credit/debit cards, and cash payments at our office. Contact our team for a personalized payment plan that suits your budget.",
  },
  {
    id: 3,
    category: "Packages",
    question: "What is included in each Hajj and Umrah package?",
    answer:
      "Our Hajj and Umrah packages are comprehensive and designed to provide a stress-free pilgrimage experience. Each package typically includes: return flights from your departure city, hotel accommodation in Makkah and Madinah, visa processing and fees, ground transportation between cities and holy sites, guided support from experienced tour leaders, meals as specified in the package, and 24/7 on-ground assistance. Premium packages include additional benefits such as 5-star hotels, private transportation, VIP access, and dedicated concierge services. We provide a detailed itinerary and inclusions list for each package before booking.",
  },
  {
    id: 4,
    category: "Flights & Travel",
    question: "How are flights arranged and which airlines do you use?",
    answer:
      "We arrange flights with reputable international airlines that offer direct or convenient connecting flights to Saudi Arabia. Our partnerships include major carriers such as Saudi Airlines, Emirates, Etihad, Qatar Airways, and other premium airlines. We carefully select flight schedules to minimize layover times and ensure a comfortable journey. Flight bookings are made in advance to secure the best rates and preferred seating. Our team coordinates group departures from major cities to ensure pilgrims travel together. For those requiring special assistance or traveling from other locations, we can arrange customized flight itineraries.",
  },
  {
    id: 5,
    category: "Support & Assistance",
    question: "Is there elderly assistance and medical support available?",
    answer:
      "Absolutely. We prioritize the comfort and safety of all pilgrims, especially the elderly and those with medical needs. Our packages include dedicated support for elderly pilgrims, including wheelchair assistance at airports and holy sites, priority access where available, and accommodation close to the Haram. We also provide medical support through our partnerships with local healthcare providers and have trained staff available 24/7 to assist with any health concerns. We recommend that pilgrims with existing medical conditions consult their healthcare provider before travel and inform us of any special requirements in advance.",
  },
  {
    id: 6,
    category: "Documents",
    question: "What documents are required for travel and religious purposes?",
    answer:
      "Pilgrims are required to provide the following documents: valid passport with 6+ months validity, passport-sized photographs (white background), completed visa application forms, vaccination certificates (Meningitis, COVID-19), proof of accommodation and travel arrangements, and medical fitness certificate (for pilgrims above 65 years). Additional documents may include marriage certificate (for women traveling with a mahram), birth certificates (for children), and travel insurance documents. Our team will provide you with a comprehensive checklist and assist you in preparing and verifying all required documentation before submission.",
  },
  {
    id: 7,
    category: "Booking",
    question: "What is the booking process and timeline?",
    answer:
      "The booking process with RASAOF Travels and Tours Limited is simple and transparent. Here's how it works: 1. Initial consultation to understand your needs and preferences, 2. Package selection and proposal, 3. Deposit payment to secure your booking, 4. Document collection and visa processing, 5. Balance payment according to the installment schedule, 6. Pre-departure briefing and orientation, 7. Final travel arrangements and departure. The entire process typically takes 2-4 months depending on the package and season. We recommend booking early to secure the best rates and availability. Our team will guide you through each step.",
  },
  {
    id: 8,
    category: "Policy",
    question: "What is the cancellation and refund policy?",
    answer:
      "We understand that circumstances can change. Our cancellation and refund policy is designed to be fair while accounting for costs incurred by the agency. Cancellation fees are calculated based on the time of cancellation and the services already booked. A full refund (less administrative fees) is available for cancellations made 60+ days before departure. Partial refunds are available for cancellations made 30-59 days before departure. Cancellations made within 30 days of departure may incur significant fees as airlines, hotels, and other services have already been confirmed. We recommend purchasing travel insurance to protect against unforeseen circumstances. Our team will provide you with the complete policy details before booking.",
  },
];

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQItem({ item, isOpen, onToggle, index, inView }) {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);
  const delay = 0.05 * index;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `
          opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        background: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)",
        borderRadius: "16px",
        border: `1px solid ${isOpen ? "rgba(212,160,23,0.2)" : "rgba(0,0,0,0.04)"}`,
        boxShadow: isOpen
          ? "0 4px 20px rgba(0,0,0,0.06), 0 2px 8px rgba(212,160,23,0.06)"
          : "0 1px 4px rgba(0,0,0,0.02)",
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        overflow: "hidden",
        marginBottom: "clamp(10px, 1.2vw, 14px)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Question Header */}
      <button
        className="faq-question"
        onClick={() => onToggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          width: "100%",
          padding: "clamp(16px, 2vw, 22px) clamp(18px, 2vw, 24px)",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.9rem, 1vw, 1rem)",
          fontWeight: 600,
          color: isOpen ? "#111111" : "#2d3748",
          textAlign: "left",
          transition: "color 0.3s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.color = "#111111";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.color = "#2d3748";
          }
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flex: 1,
          }}
        >
          {/* Category badge */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.5rem, 0.55vw, 0.65rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#D4A017",
              background: "rgba(212,160,23,0.08)",
              padding: "2px 10px",
              borderRadius: "50px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {item.category}
          </span>
          <span>{item.question}</span>
        </div>

        {/* Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: isOpen ? "rgba(212,160,23,0.08)" : "rgba(0,0,0,0.03)",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          {isOpen ? (
            <ChevronUp size={18} color="#D4A017" />
          ) : (
            <ChevronDown size={18} color="#5F5F5F" />
          )}
        </div>
      </button>

      {/* Answer Content */}
      <div
        id={`faq-answer-${item.id}`}
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${height}px` : "0",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "0 clamp(18px, 2vw, 24px) clamp(18px, 2vw, 24px)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
            fontWeight: 400,
            color: "#5F5F5F",
            lineHeight: 1.8,
            borderTop: "1px solid rgba(0,0,0,0.04)",
            paddingTop: "clamp(16px, 1.8vw, 20px)",
          }}
        >
          {item.answer}
        </div>
      </div>

      {/* Gold accent line - bottom when open */}
      {isOpen && (
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, #D4A017, rgba(212,160,23,0.1))",
            borderRadius: "0 0 16px 16px",
            width: "100%",
          }}
        />
      )}
    </div>
  );
}

// ── Search Bar ──────────────────────────────────────────────────────────────
function SearchBar({ onSearch, onClear, query }) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: "480px",
        margin: "0 auto clamp(28px, 4vh, 40px)",
      }}
    >
      <Search
        size={18}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#5F5F5F",
        }}
      />
      <input
        type="text"
        placeholder="Search for questions..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "clamp(12px, 1.2vw, 14px) 16px clamp(12px, 1.2vw, 14px) 46px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
          fontWeight: 400,
          color: "#111111",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: "50px",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(212,160,23,0.3)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,160,23,0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)";
        }}
        aria-label="Search frequently asked questions"
      />
      {query && (
        <button
          onClick={onClear}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#5F5F5F",
            padding: "4px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// ── CTA Section ──────────────────────────────────────────────────────────────
function CTASection({ inView }) {
  return (
    <div
      style={{
        marginTop: "clamp(40px, 6vh, 56px)",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.6s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
        padding: "clamp(32px, 4vh, 48px)",
        background: "linear-gradient(135deg, #FFF8E6 0%, #FFFBEF 100%)",
        borderRadius: "20px",
        border: "1px solid rgba(212,160,23,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(212,160,23,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D4A017",
            }}
          >
            <MessageCircle size={20} />
          </div>
          <div>
            {/* ── Heading: Manrope ── */}
            <h4
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
                fontWeight: 700,
                color: "#111111",
                marginBottom: "2px",
                letterSpacing: "-0.01em",
              }}
            >
              Still Have Questions?
            </h4>
            {/* ── Subtext: Inter ── */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
                color: "#5F5F5F",
                marginBottom: 0,
              }}
            >
              Our team is here to help you plan your perfect journey.
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {/* ── Primary Button: Yellow background, black text ── */}
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "#111111",
              background: "linear-gradient(135deg, #F7C948 0%, #D4A017 100%)",
              padding: "clamp(10px, 1vw, 12px) clamp(24px, 2.5vw, 32px)",
              borderRadius: "50px",
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(212,160,23,0.25)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(212,160,23,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,160,23,0.25)";
            }}
          >
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </a>

          {/* ── Secondary Button: Outline ── */}
          <a
            href="tel:+2341234567890"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
              fontWeight: 500,
              color: "#111111",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)",
              borderRadius: "50px",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,160,23,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.7)";
            }}
          >
            <Phone size={16} />
            <span>Call Now</span>
          </a>

          <a
            href="mailto:rasoaf24@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
              fontWeight: 500,
              color: "#111111",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)",
              borderRadius: "50px",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,160,23,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.7)";
            }}
          >
            <Mail size={16} />
            <span>Email Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function FAQ() {
  const [sectionRef, inView] = useInView(0.08);
  const [headerInView, setHeaderInView] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const toggleItem = useCallback((id) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  }, []);

  const filteredFAQs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const midPoint = Math.ceil(filteredFAQs.length / 2);
  const leftColumn = filteredFAQs.slice(0, midPoint);
  const rightColumn = filteredFAQs.slice(midPoint);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setOpenItemId(null);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <style>{`
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .faq-section {
          padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF8E6 0%, #FFFBEF 50%, #FFFDF5 100%);
          position: relative;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 40%, rgba(212,160,23,0.04) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(212,160,23,0.04) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .faq-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .faq-header {
          text-align: center;
          margin-bottom: clamp(32px, 5vh, 48px);
        }

        .faq-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .faq-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #D4A017;
          border-radius: 999px;
        }

        /* ── Eyebrow: Inter, uppercase, 0.18em ── */
        .faq-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

        /* ── Heading: Manrope, 700-800 weight, -0.02em ── */
        .faq-header h2 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #111111;
          margin-bottom: 12px;
        }

        .faq-header h2 .highlight {
          color: #D4A017;
          position: relative;
        }

        .faq-header h2 .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2));
          border-radius: 3px;
        }

        /* ── Supporting Text: Inter, 400 weight, 1.7 line-height ── */
        .faq-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
        }

        .faq-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── FAQ Grid ────────────────────────────────────────────────────── */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.5vw, 18px);
        }

        .faq-column {
          display: flex;
          flex-direction: column;
        }

        /* ── No Results ──────────────────────────────────────────────────── */
        .faq-no-results {
          text-align: center;
          padding: clamp(40px, 5vh, 60px);
          font-family: 'Inter', sans-serif;
          color: #5F5F5F;
        }

        .faq-no-results .icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .faq-no-results p {
          margin-bottom: 4px;
          font-size: clamp(18px, 1.5vw, 22px);
          font-weight: 600;
          color: #111111;
        }

        .faq-no-results .sub {
          font-size: 14px;
          color: #5F5F5F;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 1 column */
        @media (max-width: 1024px) {
          .faq-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .faq-section {
            padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
          }
          .faq-header h2 {
            font-size: 1.4rem;
          }
          .faq-header p {
            font-size: 13px;
          }
          .faq-grid {
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .faq-section {
            padding: 28px 12px 40px;
          }
          .faq-grid {
            gap: 8px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .faq-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .faq-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .faq-question {
            transition: none !important;
          }
          .faq-item {
            transition: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .faq-item {
            transition: none !important;
          }
          .faq-question {
            transition: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="faq-section"
        aria-labelledby="faq-heading"
        id="faq"
      >
        <div className="faq-container">
          {/* Section Header */}
          <div className="faq-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">Frequently Asked Questions</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <h2 id="faq-heading">
                Your Questions, <span className="highlight">Answered</span>
              </h2>

              <p>
                Everything you need to know about planning your Hajj, Umrah, or
                international travel journey with us.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            query={searchQuery}
          />

          {/* FAQ Grid */}
          {filteredFAQs.length > 0 ? (
            <div className="faq-grid">
              {/* Left Column */}
              <div className="faq-column">
                {leftColumn.map((item, index) => (
                  <FAQItem
                    key={item.id}
                    item={item}
                    isOpen={openItemId === item.id}
                    onToggle={toggleItem}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>

              {/* Right Column */}
              <div className="faq-column">
                {rightColumn.map((item, index) => (
                  <FAQItem
                    key={item.id}
                    item={item}
                    isOpen={openItemId === item.id}
                    onToggle={toggleItem}
                    index={index + leftColumn.length}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="faq-no-results">
              <div className="icon">🔍</div>
              <p>No results found</p>
              <p className="sub">Try adjusting your search terms</p>
            </div>
          )}

          {/* CTA Section */}
          <CTASection inView={inView} />

          {/* Bottom Divider */}
          <div
            style={{
              marginTop: "clamp(32px, 4vh, 48px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 20px)",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.12))",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#D4A017",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(212,160,23,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}