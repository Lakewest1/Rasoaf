// components/FloatingWhatsApp.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASAOF Travels and Tours — Floating WhatsApp Button
//
// Premium floating support button with tooltip and quick contact options.
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Clock, CheckCircle, Users, Award, Phone, Mail, Globe, Sparkles, ArrowUp } from "lucide-react";

// ── Scroll to Top Button ──────────────────────────────────────────────────
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            bottom: 100,
            right: 28,
            zIndex: 997,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4A017, #F7C948)",
            border: "none",
            color: "#111111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(212,160,23,0.3), 0 0 0 1px rgba(255,215,0,0.2)",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(212,160,23,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,160,23,0.3), 0 0 0 1px rgba(255,215,0,0.2)";
          }}
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating WhatsApp Button — Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 6000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseTooltip = (e) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  // RASAOF Travel contact details
  const whatsappNumber = "8065246060";
  const phoneNumber = "+2348065246060";
  const emailAddress = "rasoaf24@gmail.com";
  const websiteUrl = "https://www.rasoaf.com";
  
  const whatsappMessage = "Hello! I'm interested in learning more about RASAOF Travels and Tours services - Travel processing, Hajj/Umrah packages, or tourism.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <style>{`
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');
        
        @keyframes waPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        
        @keyframes waRing {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse, .wa-ring { animation: none !important; }
        }
      `}</style>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Tooltip / Quick Message Card - Premium Design (Reduced Size) */}
      <AnimatePresence>
        {showTooltip && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: "fixed",
              bottom: 90,
              right: 28,
              zIndex: 998,
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "18px",
              boxShadow: "0 16px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,160,23,0.2)",
              width: 280,
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid rgba(212,160,23,0.15)",
            }}
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            {/* Header - Gold gradient */}
            <div
              style={{
                background: "linear-gradient(135deg, #D4A017, #F7C948)",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={14} style={{ color: "#111" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#111",
                    letterSpacing: "-0.02em",
                  }}
                >
                  RASOAF Support
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9,
                    color: "rgba(17,17,17,0.7)",
                    fontWeight: 500,
                  }}
                >
                  ✨ Quick Response
                </div>
              </div>
              <button
                onClick={handleCloseTooltip}
                style={{
                  background: "rgba(0,0,0,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#111",
                }}
              >
                <X size={10} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "12px 14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "waPulse 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                  }}
                >
                  Travel consultants ready
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  marginBottom: 10,
                }}
              >
                ✈️ Need help with travel, Hajj/Umrah, or visas? Chat with our experts.
              </p>
              
              {/* Quick Services Grid - Gold accents */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 6,
                  marginBottom: 10,
                  padding: "6px 0",
                }}
              >
                {["Work Visas", "Study Abroad", "Hajj/Umrah", "Tourism"].map((service) => (
                  <div key={service} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#D4A017" }} />
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{service}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 8,
                  borderTop: "1px solid rgba(212,160,23,0.12)",
                }}
              >
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={8} style={{ color: "#D4A017" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>24/7</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Users size={8} style={{ color: "#D4A017" }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>Experts</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#D4A017" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.02em" }}>Chat</span>
                  <ChevronRight size={10} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button - Premium Gold Branded (Reduced Size) */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? [0, -3, 3, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          rotate: { duration: 0.3 },
        }}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 999,
          width: isMobile ? 48 : 54,
          height: isMobile ? 48 : 54,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(37,211,102,0.35), 0 0 0 1.5px rgba(212,160,23,0.3)",
          textDecoration: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        {/* Pulsing rings with gold accent */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(37,211,102,0.4)",
            animation: "waPulse 1.8s infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(37,211,102,0.2)",
            animation: "waRing 2s infinite",
            pointerEvents: "none",
            animationDelay: "0.5s",
          }}
        />
        {/* Gold outer ring */}
        <div
          style={{
            position: "absolute",
            width: "calc(100% + 3px)",
            height: "calc(100% + 3px)",
            borderRadius: "50%",
            border: "1.5px solid rgba(212,160,23,0.4)",
            pointerEvents: "none",
          }}
        />

        {/* Inner icon container */}
        <motion.div
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <MessageCircle size={isMobile ? 22 : 26} strokeWidth={1.8} style={{ color: "#fff" }} />
        </motion.div>

        {/* Premium notification badge with gold */}
        <div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D4A017, #F7C948)",
            border: "2px solid #fff",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={6} style={{ color: "#111" }} />
        </div>
      </motion.a>

      {/* CSS for reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse, .wa-ring { animation: none !important; }
        }
      `}</style>
    </>
  );
}