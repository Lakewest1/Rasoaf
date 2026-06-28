// src/components/home/Contact.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Contact Section
//
// A premium contact section with contact information and a contact form.
// Features: Responsive grid, mobile-optimized, formspree integration
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Send,
  MessageCircle,
  Building2,
  Clock,
  User,
  AtSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const GOLD = "#D4A017";
const GOLD_LIGHT = "#F7C948";
const NAVY = "#111111";
const NAVY_LIGHT = "#1a1a1a";
const WHITE = "#ffffff";

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return [ref, isInView];
}

// ── Hook: Detect screen size for responsive design ───────────────────────
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// ─────────────────────────────────────────────────────────────────────────────
// Contact Information Component (Responsive)
// ─────────────────────────────────────────────────────────────────────────────
function ContactInfo({ isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const { isMobile } = useScreenSize();

  const contactItems = [
    {
      icon: MapPin,
      label: "Office Address",
      value: "RASOAF Travels and Tours Limited",
      secondary: "Nigeria",
      action: "View on Map",
      link: "https://maps.google.com/?q=RASOAF+Travels+and+Tours+Limited+Nigeria",
      isLink: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+234 (0) 123 456 7890",
      secondary: "+234 (0) 987 654 3210",
      action: "Call Now",
      link: "tel:+2341234567890",
      isLink: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: "rasoaf24@gmail.com",
      action: "Copy Email",
      isLink: false,
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.rasoaf.com",
      action: "Visit Website",
      link: "https://www.rasoaf.com",
      isLink: true,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday - Friday: 9:00 AM - 6:00 PM",
      secondary: "Saturday: 10:00 AM - 4:00 PM",
      action: null,
      isLink: false,
    },
  ];

  const handleCopy = async (text, item) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => {
        setCopiedItem(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardPadding = isMobile ? "20px" : "24px";
  const headerIconSize = isMobile ? 40 : 44;
  const headerFontSize = isMobile ? 15 : 16;
  const contactItemGap = isMobile ? 14 : 16;
  const iconBoxSize = isMobile ? 32 : 36;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          background: WHITE,
          borderRadius: "20px",
          padding: cardPadding,
          height: "100%",
          border: `1px solid ${isHovered ? `rgba(212,160,23,0.35)` : "rgba(0,0,0,0.08)"}`,
          boxShadow: isHovered
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.08)"
            : "0 2px 12px rgba(0,0,0,0.04)",
          transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(212,160,23,0.15)",
          }}
        >
          <div
            style={{
              width: headerIconSize,
              height: headerIconSize,
              borderRadius: "14px",
              background: `linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: GOLD,
            }}
          >
            <MessageCircle size={isMobile ? 20 : 22} strokeWidth={1.6} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: headerFontSize,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 2,
                letterSpacing: "-0.01em",
              }}
            >
              Contact Information
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 10 : 11,
                color: "#5F5F5F",
              }}
            >
              Reach us through any channel
            </p>
          </div>
        </div>

        {/* Contact Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: contactItemGap }}>
          {contactItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? 10 : 12,
                }}
              >
                <div
                  style={{
                    width: iconBoxSize,
                    height: iconBoxSize,
                    borderRadius: "12px",
                    background: "rgba(212,160,23,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: GOLD,
                  }}
                >
                  <IconComponent size={isMobile ? 16 : 18} strokeWidth={1.6} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 9 : 10,
                      fontWeight: 600,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: "#888888",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: isMobile ? 12 : 13,
                      fontWeight: 500,
                      color: NAVY,
                      lineHeight: 1.4,
                      marginBottom: item.secondary ? 2 : 6,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.value}
                  </div>
                  {item.secondary && (
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: isMobile ? 11 : 12,
                        color: "#5F5F5F",
                        marginBottom: 6,
                      }}
                    >
                      {item.secondary}
                    </div>
                  )}
                  {item.isLink && item.action ? (
                    <a
                      href={item.link}
                      target={item.label === "Office Address" || item.label === "Website" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: isMobile ? 9 : 10,
                        fontWeight: 500,
                        color: GOLD,
                        textDecoration: "none",
                        background: "rgba(212,160,23,0.08)",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(212,160,23,0.18)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(212,160,23,0.08)";
                      }}
                    >
                      <span>{item.action}</span>
                      <ArrowRight size={8} />
                    </a>
                  ) : item.action === null ? null : (
                    <button
                      onClick={() => handleCopy(item.value, item.label)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: isMobile ? 9 : 10,
                        fontWeight: 500,
                        color: GOLD,
                        textDecoration: "none",
                        background: "rgba(212,160,23,0.08)",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {copiedItem === item.label ? (
                        <>
                          <Check size={8} />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={8} />
                          <span>{item.action}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form Component (Responsive)
// ─────────────────────────────────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useScreenSize();

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqapvgwk";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const cardPadding = isMobile ? "20px" : "24px";
  const headerIconSize = isMobile ? 40 : 44;
  const headerFontSize = isMobile ? 15 : 16;
  const inputPadding = isMobile ? "10px 12px" : "12px 14px";
  const textareaRows = isMobile ? 3 : 4;

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          background: WHITE,
          borderRadius: "20px",
          padding: cardPadding,
          height: "100%",
          border: `1px solid ${isHovered ? `rgba(212,160,23,0.35)` : "rgba(0,0,0,0.08)"}`,
          boxShadow: isHovered
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.08)"
            : "0 2px 12px rgba(0,0,0,0.04)",
          transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(212,160,23,0.15)",
          }}
        >
          <div
            style={{
              width: headerIconSize,
              height: headerIconSize,
              borderRadius: "14px",
              background: `linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: GOLD,
            }}
          >
            <Send size={isMobile ? 20 : 22} strokeWidth={1.6} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: headerFontSize,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 2,
                letterSpacing: "-0.01em",
              }}
            >
              Send us a Message
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 10 : 11,
                color: "#5F5F5F",
              }}
            >
              We'll respond within 24 hours
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div
            style={{
              textAlign: "center",
              padding: isMobile ? "30px 20px" : "40px 20px",
            }}
          >
            <div
              style={{
                width: isMobile ? 56 : 64,
                height: isMobile ? 56 : 64,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#10b981",
              }}
            >
              <CheckCircle size={isMobile ? 28 : 32} strokeWidth={1.6} />
            </div>
            <h4
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: isMobile ? 16 : 18,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 8,
              }}
            >
              Message Sent!
            </h4>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 12 : 13,
                color: "#5F5F5F",
              }}
            >
              Thank you for reaching out. We'll contact you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="name"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: NAVY,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <User size={12} style={{ color: GOLD }} />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fafafa",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: NAVY,
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = GOLD;
                  e.target.style.background = WHITE;
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.12)";
                  e.target.style.background = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="email"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: NAVY,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <AtSign size={12} style={{ color: GOLD }} />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fafafa",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: NAVY,
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = GOLD;
                  e.target.style.background = WHITE;
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.12)";
                  e.target.style.background = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="phone"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: NAVY,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Phone size={12} style={{ color: GOLD }} />
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 123 456 7890"
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fafafa",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: NAVY,
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = GOLD;
                  e.target.style.background = WHITE;
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.12)";
                  e.target.style.background = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label
                htmlFor="message"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500,
                  color: NAVY,
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <FileText size={12} style={{ color: GOLD }} />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={textareaRows}
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell us about your travel plans..."
                style={{
                  width: "100%",
                  padding: inputPadding,
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: "#fafafa",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? 13 : 14,
                  color: NAVY,
                  outline: "none",
                  resize: "vertical",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = GOLD;
                  e.target.style.background = WHITE;
                  e.target.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,0,0,0.12)";
                  e.target.style.background = "#fafafa";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <AlertCircle size={14} style={{ color: "#ef4444" }} />
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? 11 : 12,
                    color: "#ef4444",
                    margin: 0,
                  }}
                >
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: isMobile ? "12px 16px" : "14px 20px",
                borderRadius: "50px",
                border: "none",
                background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 13 : 14,
                fontWeight: 600,
                color: NAVY,
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 16px rgba(212,160,23,0.25)",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(212,160,23,0.35)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,160,23,0.25)";
              }}
            >
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Contact Component (Fully Responsive)
// ─────────────────────────────────────────────────────────────────────────────
export default function RasoafContact() {
  const [ref, inView] = useReveal(0.2);
  const headerControls = useAnimation();
  const { isMobile, isTablet } = useScreenSize();

  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
    }
  }, [inView, headerControls]);

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const getGridColumns = () => {
    if (isMobile) return "1fr";
    if (isTablet) return "repeat(2, 1fr)";
    return "2fr 3fr";
  };

  const getHeadingSize = () => {
    if (isMobile) return "clamp(1.3rem, 5vw, 1.6rem)";
    return "clamp(1.5rem, 3vw, 2rem)";
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        padding: isMobile
          ? "clamp(40px, 8vh, 60px) clamp(16px, 4vw, 80px)"
          : "clamp(60px, 12vh, 100px) clamp(16px, 5vw, 80px)",
        background: WHITE,
        overflow: "hidden",
      }}
    >
      {/* Subtle Background Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(212,160,23,0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(212,160,23,0.02) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Floating Decorative Orbs - Hidden on mobile */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,160,23,0.03), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              right: "5%",
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,160,23,0.02), transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Top Gold Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent)`,
          transformOrigin: "left",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: isMobile ? 10 : 12,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                height: 2,
                background: GOLD,
                borderRadius: 999,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Get In Touch
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 30 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                height: 2,
                background: GOLD,
                borderRadius: 999,
              }}
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: getHeadingSize(),
              fontWeight: 800,
              color: NAVY,
              letterSpacing: "-0.02em",
              marginBottom: isMobile ? 8 : 10,
              padding: isMobile ? "0 16px" : 0,
            }}
          >
            Plan Your Journey With{" "}
            <span
              style={{
                color: GOLD,
                position: "relative",
              }}
            >
              RASOAF Travels
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? 13 : 14,
              color: "#5F5F5F",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
              padding: isMobile ? "0 12px" : 0,
            }}
          >
            Reach out for Hajj & Umrah packages, visa assistance, or any travel inquiries
          </motion.p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(),
            gap: isMobile ? 20 : 24,
          }}
        >
          <ContactInfo isInView={inView} />
          <ContactForm />
        </div>

        {/* Bottom Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            marginTop: isMobile ? 36 : 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(212,160,23,0.2)", borderRadius: 999 }} />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: GOLD,
              opacity: 0.5,
            }}
          />
          <div style={{ width: 60, height: 1, background: "rgba(212,160,23,0.2)", borderRadius: 999 }} />
        </motion.div>
      </div>
    </section>
  );
}