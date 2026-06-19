import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronRight, Clock, CheckCircle, Users, Award, Phone, Mail, Globe, Sparkles } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Floating WhatsApp Button — RASAOF Travel & Tour Support
// Premium Design matching hero page: Gold (#FFD700), Dark theme, Modern fonts
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
        
        @keyframes waPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }
        
        @keyframes waRing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        @keyframes goldPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(255, 215, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse, .wa-ring {
            animation: none !important;
          }
        }
      `}</style>

      {/* Tooltip / Quick Message Card - Premium Dark Design */}
      <AnimatePresence>
        {showTooltip && !isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              position: "fixed",
              bottom: 100,
              right: 28,
              zIndex: 998,
              background: "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,215,0,0.2)",
              width: 320,
              overflow: "hidden",
              cursor: "pointer",
              border: "1px solid rgba(255,215,0,0.2)",
            }}
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            {/* Header with RASAOF branding - Gold gradient */}
            <div
              style={{
                background: "linear-gradient(135deg, #FFD700, #FFC700)",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} style={{ color: "#000" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#000",
                    letterSpacing: "-0.02em",
                  }}
                >
                  RASOAF Travel Support
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    color: "rgba(0,0,0,0.7)",
                    fontWeight: 500,
                  }}
                >
                  ✨ Premium Concierge · Quick Response
                </div>
              </div>
              <button
                onClick={handleCloseTooltip}
                style={{
                  background: "rgba(0,0,0,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: 26,
                  height: 26,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#000",
                }}
              >
                <X size={12} />
              </button>
            </div>

            {/* Content - Premium Dark */}
            <div style={{ padding: "16px 18px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "waPulse 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                  }}
                >
                  Travel consultants ready to assist
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                ✈️ Need help with travel processing, Hajj/Umrah packages, or visa assistance? Chat with our travel experts directly on WhatsApp.
              </p>
              
              {/* Quick Services Grid - Gold accents */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 14,
                  padding: "8px 0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Work Visas</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Study Abroad</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Hajj/Umrah</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Tourism</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255,215,0,0.15)",
                }}
              >
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock size={10} style={{ color: "#FFD700" }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 500,
                      }}
                    >
                      24/7
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Users size={10} style={{ color: "#FFD700" }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 500,
                      }}
                    >
                      Expert Team
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Award size={10} style={{ color: "#FFD700" }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 10,
                        color: "rgba(255,255,255,0.5)",
                        fontWeight: 500,
                      }}
                    >
                      Premium
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#FFD700",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                    }}
                  >
                    Chat Now
                  </span>
                  <ChevronRight size={12} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button - Premium Gold Branded */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, -5, 5, 0] : 0,
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
          width: isMobile ? 56 : 64,
          height: isMobile ? 56 : 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(37,211,102,0.4), 0 0 0 2px rgba(255,215,0,0.3)",
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
            width: "calc(100% + 4px)",
            height: "calc(100% + 4px)",
            borderRadius: "50%",
            border: "2px solid rgba(255,215,0,0.4)",
            pointerEvents: "none",
          }}
        />

        {/* Inner icon container */}
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageCircle
            size={isMobile ? 28 : 32}
            strokeWidth={1.8}
            style={{ color: "#fff" }}
          />
        </motion.div>

        {/* Premium notification badge with gold */}
        <div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD700, #FFC700)",
            border: "2px solid #fff",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={7} style={{ color: "#000" }} />
        </div>
      </motion.a>

      {/* CSS for reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse, .wa-ring {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}