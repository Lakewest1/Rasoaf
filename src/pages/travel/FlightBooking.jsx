// src/pages/travel/FlightBooking.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Flight Booking Page
// Premium Rasoaf Typography · Booking Form · Contact Details
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Plane, Phone, Mail, MessageCircle, Clock, Shield, Globe, 
  Star, Sparkles, ArrowLeft, Headphones, CreditCard, Users,
  Send, CheckCircle, Loader2, Calendar, MapPin, Briefcase,
  GraduationCap, Heart, Building2, ChevronDown, Navigation
} from "lucide-react";
import { TravelHeroSection } from "../../components/travel";

const COUNTRY_CODES = [
  { code: "+234", country: "Nigeria" },
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+233", country: "Ghana" },
  { code: "+254", country: "Kenya" },
  { code: "+27", country: "South Africa" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+61", country: "Australia" },
];

const DESTINATIONS = [
  { value: "", label: "Select Destination" },
  { value: "canada", label: "Canada" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "uae", label: "United Arab Emirates" },
  { value: "turkey", label: "Turkey" },
  { value: "france", label: "France" },
  { value: "germany", label: "Germany" },
  { value: "italy", label: "Italy" },
  { value: "spain", label: "Spain" },
  { value: "china", label: "China" },
  { value: "japan", label: "Japan" },
  { value: "south_africa", label: "South Africa" },
  { value: "saudi_arabia", label: "Saudi Arabia" },
  { value: "other", label: "Other Destination" },
];

const TRAVEL_CLASS = [
  { value: "economy", label: "Economy" },
  { value: "premium_economy", label: "Premium Economy" },
  { value: "business", label: "Business Class" },
  { value: "first", label: "First Class" },
];

const TRIP_TYPES = [
  { value: "one_way", label: "One Way" },
  { value: "round_trip", label: "Round Trip" },
  { value: "multi_city", label: "Multi-City" },
];

const features = [
  {
    icon: Globe,
    title: "Global Airlines",
    desc: "Access to 100+ airlines worldwide with competitive fares",
    color: "#1A73E8"
  },
  {
    icon: Shield,
    title: "Best Price Guarantee",
    desc: "We match or beat any competitor's price on flights",
    color: "#059669"
  },
  {
    icon: Clock,
    title: "Instant Booking",
    desc: "Quick confirmation within minutes of your enquiry",
    color: "#7C3AED"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock assistance for all your travel needs",
    color: "#DC2626"
  },
];

const whyBookWithUs = [
  {
    icon: CreditCard,
    title: "Flexible Payment",
    desc: "Pay in installments or upfront — we work with your budget"
  },
  {
    icon: Users,
    title: "Group Bookings",
    desc: "Special rates for families, organizations, and large groups"
  },
  {
    icon: Star,
    title: "Loyalty Rewards",
    desc: "Earn points on every booking and enjoy exclusive perks"
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+234 802 235 2362",
    href: "tel:+2348022352362",
    color: "#D4A017",
    badge: "Fastest"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+234 802 235 2362",
    href: "https://wa.me/2348022352362",
    color: "#059669",
    badge: "Recommended"
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@rasoaf.com",
    href: "mailto:info@rasoaf.com",
    color: "#1A73E8",
    badge: "Detailed"
  },
];

const PremiumCSS = `
  /* ── Rasoaf Design Tokens ── */
  :root {
    --rasoaf-gold: #D4A017;
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-text-primary: #0B0F17;
    --rasoaf-text-secondary: #525252;
    --rasoaf-text-tertiary: #737373;
    --rasoaf-text-muted: #A3A3A3;
    --rasoaf-font-display: 'Manrope', system-ui, sans-serif;
    --rasoaf-font-body: 'Inter', system-ui, sans-serif;
    --rasoaf-shadow-card: 0 4px 20px rgba(0, 0, 0, 0.06);
    --rasoaf-shadow-card-hover: 0 12px 40px rgba(0, 0, 0, 0.1);
    --rasoaf-transition-smooth: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .rfb-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #FFF8E6 0%, #FFFAF0 50%, #FFF8E6 100%);
    font-family: var(--rasoaf-font-body);
    position: relative;
    overflow: hidden;
  }

  .rfb-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 80%, rgba(212, 160, 23, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(212, 160, 23, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .rfb-content {
    max-width: 1100px;
    margin: -40px auto 0;
    padding: 40px 24px 100px;
    position: relative;
    z-index: 20;
  }

  /* ── Two Column Layout ── */
  .rfb-two-col {
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 32px;
    align-items: start;
  }

  /* ── Info Card ── */
  .rfb-info-card {
    background: #FFFFFF;
    border-radius: 32px;
    padding: clamp(32px, 5vw, 48px);
    border: 1px solid rgba(212, 160, 23, 0.12);
    box-shadow: var(--rasoaf-shadow-card);
    position: relative;
    overflow: hidden;
    height: fit-content;
    position: sticky;
    top: 24px;
  }

  .rfb-info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--rasoaf-gold-light), var(--rasoaf-gold), var(--rasoaf-gold-dark));
  }

  .rfb-icon-wrap {
    position: relative;
    display: inline-flex;
    margin-bottom: 24px;
  }

  .rfb-icon-glow {
    position: absolute;
    inset: -10px;
    border-radius: 20px;
    background: rgba(212, 160, 23, 0.1);
    filter: blur(16px);
    animation: rfb-glow-pulse 3s ease-in-out infinite;
  }

  @keyframes rfb-glow-pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  .rfb-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .rfb-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.15);
    border-radius: 100px;
    color: var(--rasoaf-gold-dark);
    font-family: var(--rasoaf-font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .rfb-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(26px, 3.5vw, 36px);
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 12px;
  }

  .rfb-title-gradient {
    background: linear-gradient(
      135deg, 
      var(--rasoaf-gold-dark) 0%, 
      var(--rasoaf-gold) 40%, 
      var(--rasoaf-gold-light) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rfb-desc {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--rasoaf-text-secondary);
    line-height: 1.7;
    margin-bottom: 24px;
    font-weight: 400;
    letter-spacing: 0.005em;
  }

  /* ── Features ── */
  .rfb-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 24px;
    text-align: left;
  }

  .rfb-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px;
    background: rgba(212, 160, 23, 0.02);
    border: 1px solid rgba(212, 160, 23, 0.06);
    border-radius: 14px;
    transition: all var(--rasoaf-transition-smooth);
  }

  .rfb-feature-item:hover {
    background: rgba(212, 160, 23, 0.05);
    border-color: rgba(212, 160, 23, 0.15);
    transform: translateY(-2px);
  }

  .rfb-feature-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .rfb-feature-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 700;
    font-size: 0.78rem;
    color: var(--rasoaf-text-primary);
    margin-bottom: 2px;
    letter-spacing: -0.01em;
  }

  .rfb-feature-desc {
    font-family: var(--rasoaf-font-body);
    font-size: 0.68rem;
    color: var(--rasoaf-text-tertiary);
    font-weight: 400;
    line-height: 1.4;
  }

  /* ── Why Book With Us ── */
  .rfb-why-section {
    margin-bottom: 24px;
  }

  .rfb-why-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--rasoaf-text-primary);
    margin-bottom: 12px;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rfb-why-grid {
    display: grid;
    gap: 8px;
  }

  .rfb-why-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background: rgba(212, 160, 23, 0.02);
    border: 1px solid rgba(212, 160, 23, 0.06);
    border-radius: 12px;
    transition: all var(--rasoaf-transition-smooth);
  }

  .rfb-why-item:hover {
    background: rgba(212, 160, 23, 0.05);
    border-color: rgba(212, 160, 23, 0.15);
    transform: translateX(4px);
  }

  .rfb-why-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(212, 160, 23, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .rfb-why-item-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 700;
    font-size: 0.75rem;
    color: var(--rasoaf-text-primary);
  }

  .rfb-why-item-desc {
    font-family: var(--rasoaf-font-body);
    font-size: 0.68rem;
    color: var(--rasoaf-text-tertiary);
  }

  /* ── Address Section ── */
  .rfb-address-card {
    background: rgba(212, 160, 23, 0.03);
    border: 1px solid rgba(212, 160, 23, 0.1);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
  }

  .rfb-address-title {
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--rasoaf-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .rfb-address-text {
    font-family: var(--rasoaf-font-body);
    font-size: 0.8rem;
    color: var(--rasoaf-text-secondary);
    line-height: 1.6;
  }

  /* ── Divider ── */
  .rfb-divider {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 24px 0;
    color: var(--rasoaf-text-muted);
    font-family: var(--rasoaf-font-body);
    font-size: 0.68rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .rfb-divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 160, 23, 0.2), transparent);
  }

  /* ── Contact Cards ── */
  .rfb-contact-grid {
    display: grid;
    gap: 10px;
  }

  .rfb-contact-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: rgba(212, 160, 23, 0.02);
    border: 1px solid rgba(212, 160, 23, 0.08);
    border-radius: 16px;
    text-decoration: none;
    transition: all var(--rasoaf-transition-smooth);
    position: relative;
  }

  .rfb-contact-card:hover {
    background: rgba(212, 160, 23, 0.05);
    border-color: rgba(212, 160, 23, 0.25);
    transform: translateX(4px);
  }

  .rfb-contact-badge {
    position: absolute;
    top: 12px;
    right: 14px;
    padding: 3px 10px;
    background: rgba(212, 160, 23, 0.1);
    border: 1px solid rgba(212, 160, 23, 0.15);
    border-radius: 100px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.6rem;
    font-weight: 700;
    color: var(--rasoaf-gold-dark);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .rfb-contact-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .rfb-contact-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .rfb-contact-title {
    font-family: var(--rasoaf-font-body);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--rasoaf-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .rfb-contact-value {
    font-family: var(--rasoaf-font-display);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.01em;
  }

  /* ── Trust Bar ── */
  .rfb-trust-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    flex-wrap: wrap;
  }

  .rfb-trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.72rem;
    color: var(--rasoaf-text-muted);
    font-weight: 500;
  }

  /* ── Booking Form Card ── */
  .rfb-form-card {
    background: #FFFFFF;
    border-radius: 32px;
    padding: clamp(28px, 4vw, 40px);
    border: 1px solid rgba(212, 160, 23, 0.12);
    box-shadow: var(--rasoaf-shadow-card);
    position: relative;
    overflow: hidden;
  }

  .rfb-form-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--rasoaf-gold-light), var(--rasoaf-gold), var(--rasoaf-gold-dark));
  }

  .rfb-form-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 20px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(212, 160, 23, 0.1);
  }

  .rfb-form-header-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(212, 160, 23, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rfb-form-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: 1.15rem;
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.02em;
  }

  .rfb-form-subtitle {
    font-family: var(--rasoaf-font-body);
    font-size: 0.78rem;
    color: var(--rasoaf-text-tertiary);
  }

  /* ── Form Styles ── */
  .rfb-form-group {
    margin-bottom: 16px;
  }

  .rfb-label {
    display: block;
    font-family: var(--rasoaf-font-body);
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--rasoaf-text-primary);
    margin-bottom: 6px;
    letter-spacing: 0.01em;
  }

  .rfb-label-required {
    color: #DC2626;
    margin-left: 2px;
  }

  .rfb-input,
  .rfb-select,
  .rfb-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(212, 160, 23, 0.15);
    border-radius: 14px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.88rem;
    color: var(--rasoaf-text-primary);
    background: #FFFDF8;
    transition: all 0.3s ease;
    outline: none;
    box-sizing: border-box;
  }

  .rfb-input:focus,
  .rfb-select:focus,
  .rfb-textarea:focus {
    border-color: var(--rasoaf-gold);
    box-shadow: 0 0 0 3px rgba(212, 160, 23, 0.08);
    background: #FFFFFF;
  }

  .rfb-input::placeholder {
    color: var(--rasoaf-text-muted);
  }

  .rfb-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23B8860B' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 40px;
    cursor: pointer;
  }

  .rfb-textarea {
    resize: vertical;
    min-height: 80px;
  }

  .rfb-phone-group {
    display: flex;
    gap: 8px;
  }

  .rfb-phone-code {
    width: 130px;
    flex-shrink: 0;
  }

  .rfb-phone-input {
    flex: 1;
  }

  .rfb-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .rfb-row-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
  }

  /* ── Submit Button ── */
  .rfb-submit-btn {
    width: 100%;
    padding: 15px 0;
    border-radius: 16px;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 100%);
    border: 1px solid rgba(212, 160, 23, 0.2);
    color: var(--rasoaf-text-primary);
    font-family: var(--rasoaf-font-body);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all var(--rasoaf-transition-smooth);
    box-shadow: 0 4px 20px rgba(212, 160, 23, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.01em;
  }

  .rfb-submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(212, 160, 23, 0.35);
  }

  .rfb-submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .rfb-form-footer {
    text-align: center;
    margin-top: 14px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    color: var(--rasoaf-text-muted);
  }

  /* ── Success Message ── */
  .rfb-success-card {
    text-align: center;
    padding: 48px 24px;
  }

  .rfb-success-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #D1FAE5;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .rfb-success-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: 1.4rem;
    color: var(--rasoaf-text-primary);
    margin-bottom: 8px;
  }

  .rfb-success-desc {
    font-family: var(--rasoaf-font-body);
    color: var(--rasoaf-text-secondary);
    margin-bottom: 24px;
    line-height: 1.6;
    font-size: 0.9rem;
  }

  .rfb-reset-btn {
    padding: 10px 24px;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 12px;
    font-family: var(--rasoaf-font-body);
    font-weight: 600;
    color: var(--rasoaf-gold-dark);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.85rem;
  }

  .rfb-reset-btn:hover {
    background: rgba(212, 160, 23, 0.15);
  }

  /* ── Back Link ── */
  .rfb-back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--rasoaf-text-tertiary);
    font-family: var(--rasoaf-font-body);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    margin-top: 32px;
  }

  .rfb-back-link:hover {
    color: var(--rasoaf-gold-dark);
    gap: 12px;
  }

  .rfb-back-wrap {
    text-align: center;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .rfb-two-col {
      grid-template-columns: 1fr;
      gap: 24px;
    }
    
    .rfb-info-card {
      position: static;
      order: -1;
    }
    
    .rfb-features-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    .rfb-content {
      padding: 24px 16px 80px;
    }
    
    .rfb-info-card,
    .rfb-form-card {
      padding: 24px 20px;
      border-radius: 24px;
    }
    
    .rfb-features-grid {
      grid-template-columns: 1fr;
    }
    
    .rfb-row,
    .rfb-row-3 {
      grid-template-columns: 1fr;
    }
    
    .rfb-phone-group {
      flex-direction: column;
    }
    
    .rfb-phone-code {
      width: 100%;
    }
    
    .rfb-icon {
      width: 60px;
      height: 60px;
      border-radius: 16px;
    }
    
    .rfb-title {
      font-size: 22px;
    }
  }
`;

export default function TravelFlightBooking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+234",
    phone: "",
    tripType: "round_trip",
    departureCity: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelClass: "economy",
    adults: "1",
    children: "0",
    infants: "0",
    message: "",
    preferredContact: "whatsapp",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "", lastName: "", email: "", phoneCode: "+234",
        phone: "", tripType: "round_trip", departureCity: "", destination: "",
        departureDate: "", returnDate: "", travelClass: "economy",
        adults: "1", children: "0", infants: "0", message: "", preferredContact: "whatsapp",
      });
    }, 5000);
  };

  return (
    <>
      <style>{PremiumCSS}</style>
      
      <div className="rfb-page">
        <TravelHeroSection
          badge="Flight Booking"
          title="Book Your Flight"
          subtitle="Find the best fares on flights worldwide. Fill the form and our travel experts will get back to you with the best deals."
          backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109bb05?w=1920&h=800&fit=crop"
        />

        <div className="rfb-content">
          <div className="rfb-two-col">
            {/* Left Column - Info */}
            <motion.div 
              className="rfb-info-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="rfb-icon-wrap">
                <div className="rfb-icon-glow" />
                <div className="rfb-icon">
                  <Plane size={38} color="#B8860B" strokeWidth={1.8} />
                </div>
              </div>

              <span className="rfb-badge">
                <Sparkles size={12} />
                Flight Booking
                <Sparkles size={12} />
              </span>

              <h1 className="rfb-title">
                Best Fares{" "}
                <span className="rfb-title-gradient">Guaranteed</span>
              </h1>

              <p className="rfb-desc">
                Access exclusive deals on 100+ airlines worldwide. Our travel experts 
                ensure you get the best price for your journey. We compare prices across 
                multiple airlines to find the perfect flight for your schedule and budget.
              </p>

              {/* Features */}
              <div className="rfb-features-grid">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="rfb-feature-item">
                      <div className="rfb-feature-icon" style={{ background: feature.color + "12" }}>
                        <Icon size={16} color={feature.color} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="rfb-feature-title">{feature.title}</div>
                        <div className="rfb-feature-desc">{feature.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Why Book With Us */}
              <div className="rfb-why-section">
                <div className="rfb-why-title">
                  <Star size={14} color="#D4A017" />
                  Why Book With Rasoaf
                </div>
                <div className="rfb-why-grid">
                  {whyBookWithUs.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="rfb-why-item">
                        <div className="rfb-why-icon">
                          <Icon size={16} color="#D4A017" />
                        </div>
                        <div>
                          <div className="rfb-why-item-title">{item.title}</div>
                          <div className="rfb-why-item-desc">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Office Address */}
              <div className="rfb-address-card">
                <div className="rfb-address-title">
                  <Navigation size={12} color="#D4A017" />
                  Visit Our Office
                </div>
                <p className="rfb-address-text">
                  3 Bolaji Taylor Street, Off Alhaji Haruna Street,<br />
                  Ifako Ijaiye, Lagos, Nigeria
                </p>
              </div>

              {/* Divider */}
              <div className="rfb-divider">
                <span className="rfb-divider-line" />
                Contact Directly
                <span className="rfb-divider-line" />
              </div>

              {/* Contact Methods */}
              <div className="rfb-contact-grid">
                {contactMethods.map((method, i) => {
                  const Icon = method.icon;
                  return (
                    <motion.a
                      key={i}
                      href={method.href}
                      className="rfb-contact-card"
                      whileHover={{ x: 4 }}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <span className="rfb-contact-badge">{method.badge}</span>
                      <div className="rfb-contact-icon" style={{ background: method.color + "12" }}>
                        <Icon size={18} color={method.color} strokeWidth={1.8} />
                      </div>
                      <div className="rfb-contact-info">
                        <span className="rfb-contact-title">{method.title}</span>
                        <span className="rfb-contact-value">{method.value}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Trust Bar */}
              <div className="rfb-trust-bar">
                <span className="rfb-trust-item">
                  <Shield size={13} color="#D4A017" />
                  Best Price
                </span>
                <span className="rfb-trust-item">
                  <Users size={13} color="#D4A017" />
                  5000+ Served
                </span>
                <span className="rfb-trust-item">
                  <Star size={13} color="#D4A017" />
                  4.9 Rating
                </span>
              </div>
            </motion.div>

            {/* Right Column - Booking Form */}
            <motion.div 
              className="rfb-form-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            >
              {submitted ? (
                <motion.div 
                  className="rfb-success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="rfb-success-icon">
                    <CheckCircle size={36} color="#059669" />
                  </div>
                  <h3 className="rfb-success-title">Enquiry Submitted Successfully!</h3>
                  <p className="rfb-success-desc">
                    Thank you for your interest in our flight booking service. 
                    Our travel experts will contact you within 24 hours with the 
                    best flight deals tailored to your preferences.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="rfb-reset-btn">
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="rfb-form-header">
                    <div className="rfb-form-header-icon">
                      <Send size={20} color="#D4A017" />
                    </div>
                    <div>
                      <div className="rfb-form-title">Book Your Flight</div>
                      <div className="rfb-form-subtitle">Fill the form to get started</div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="rfb-row">
                    <div className="rfb-form-group">
                      <label className="rfb-label">First Name <span className="rfb-label-required">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="rfb-input" placeholder="John" />
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Last Name <span className="rfb-label-required">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="rfb-input" placeholder="Doe" />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="rfb-row">
                    <div className="rfb-form-group">
                      <label className="rfb-label">Email Address <span className="rfb-label-required">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="rfb-input" placeholder="john@example.com" />
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Phone Number <span className="rfb-label-required">*</span></label>
                      <div className="rfb-phone-group">
                        <select name="phoneCode" value={formData.phoneCode} onChange={handleChange} className="rfb-select rfb-phone-code">
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>{c.code} {c.country}</option>
                          ))}
                        </select>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="rfb-input rfb-phone-input" placeholder="802 235 2362" />
                      </div>
                    </div>
                  </div>

                  {/* Trip Type */}
                  <div className="rfb-form-group">
                    <label className="rfb-label">Trip Type <span className="rfb-label-required">*</span></label>
                    <select name="tripType" value={formData.tripType} onChange={handleChange} className="rfb-select">
                      {TRIP_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Route */}
                  <div className="rfb-row">
                    <div className="rfb-form-group">
                      <label className="rfb-label">Departure City <span className="rfb-label-required">*</span></label>
                      <input type="text" name="departureCity" value={formData.departureCity} onChange={handleChange} required className="rfb-input" placeholder="Lagos, Nigeria" />
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Destination <span className="rfb-label-required">*</span></label>
                      <select name="destination" value={formData.destination} onChange={handleChange} required className="rfb-select">
                        {DESTINATIONS.map((d) => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="rfb-row">
                    <div className="rfb-form-group">
                      <label className="rfb-label">Departure Date <span className="rfb-label-required">*</span></label>
                      <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required className="rfb-input" />
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Return Date</label>
                      <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className="rfb-input" />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="rfb-row">
                    <div className="rfb-form-group">
                      <label className="rfb-label">Travel Class</label>
                      <select name="travelClass" value={formData.travelClass} onChange={handleChange} className="rfb-select">
                        {TRAVEL_CLASS.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Preferred Contact <span className="rfb-label-required">*</span></label>
                      <select name="preferredContact" value={formData.preferredContact} onChange={handleChange} className="rfb-select">
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Phone Call</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="rfb-row-3">
                    <div className="rfb-form-group">
                      <label className="rfb-label">Adults <span className="rfb-label-required">*</span></label>
                      <select name="adults" value={formData.adults} onChange={handleChange} className="rfb-select">
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Children (2-11)</label>
                      <select name="children" value={formData.children} onChange={handleChange} className="rfb-select">
                        {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="rfb-form-group">
                      <label className="rfb-label">Infants (0-2)</label>
                      <select name="infants" value={formData.infants} onChange={handleChange} className="rfb-select">
                        {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="rfb-form-group">
                    <label className="rfb-label">Additional Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="rfb-textarea" placeholder="Any special requests or requirements..." />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="rfb-submit-btn"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Flight Enquiry
                      </>
                    )}
                  </motion.button>

                  <p className="rfb-form-footer">
                    By submitting, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

          {/* Back Link */}
          <div className="rfb-back-wrap">
            <Link to="/travel" className="rfb-back-link">
              <ArrowLeft size={16} />
              Back to Travel Home
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    </>
  );
}