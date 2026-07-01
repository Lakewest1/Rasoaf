// src/pages/services/UmrahPackages.jsx
import { motion } from "framer-motion";
import { Sparkles, Moon, Calendar, Hotel, Car, Utensils, Send, Shield, Phone, Mail, User, Users, Baby, MapPin, ChevronDown, ArrowDown } from "lucide-react";

const umrahPackages = [
  {
    name: "Quick Umrah",
    duration: "7 Days",
    price: "₦850,000",
    hotel: "3-Star Hotel",
    transport: "Group Bus",
    meals: "Breakfast Only",
    color: "#059669",
    description: "Perfect for a brief, focused spiritual retreat."
  },
  {
    name: "Standard Umrah",
    duration: "10 Days",
    price: "₦1,200,000",
    hotel: "4-Star Hotel",
    transport: "Shared Car",
    meals: "Half Board",
    color: "#2563EB",
    popular: true,
    description: "Our most balanced package for comfort and value."
  },
  {
    name: "Ramadan Umrah",
    duration: "15 Days",
    price: "₦1,800,000",
    hotel: "4-Star Hotel",
    transport: "Private Car",
    meals: "Full Board + Iftar",
    color: "#991B1B",
    description: "Experience the blessed month in the holiest cities."
  },
  {
    name: "Luxury Umrah",
    duration: "14 Days",
    price: "₦2,500,000",
    hotel: "5-Star Hotel",
    transport: "VIP Private Car",
    meals: "All Inclusive",
    color: "#D4A017",
    description: "Uncompromising comfort for the discerning pilgrim."
  }
];

const umrahPackageOptions = [
  { value: "", label: "Select..." },
  { value: "quick-umrah", label: "Quick Umrah — 7 Days (₦850,000)" },
  { value: "standard-umrah", label: "Standard Umrah — 10 Days (₦1,200,000)" },
  { value: "ramadan-umrah", label: "Ramadan Umrah — 15 Days (₦1,800,000)" },
  { value: "luxury-umrah", label: "Luxury Umrah — 14 Days (₦2,500,000)" }
];

const preferredMonthOptions = [
  { value: "", label: "Select..." },
  { value: "any", label: "Any Available" },
  { value: "ramadan", label: "Ramadan" },
  { value: "dhul-hijjah", label: "Dhul Hijjah" },
  { value: "rabi-al-awwal", label: "Rabi Al-Awwal" }
];

const countryCodes = [
  { value: "+234", label: "+234 Nigeria" },
  { value: "+1", label: "+1 USA" },
  { value: "+44", label: "+44 UK" },
  { value: "+966", label: "+966 Saudi Arabia" },
  { value: "+971", label: "+971 UAE" }
];

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" }
];

export default function UmrahPackages() {
  // Smooth scroll handler
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FFF8E6" }}>
      {/* ==================== HERO SECTION ==================== */}
      <section style={{
        position: "relative",
        paddingTop: "8rem",
        paddingBottom: "5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        background: "linear-gradient(to bottom right, #111111, #1a1a1a, #111111)",
        overflow: "hidden"
      }}>
        {/* Background Image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1920&h=800&fit=crop"
            alt="Umrah"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(17,17,17,0.9), transparent)"
          }} />
        </div>
        
        {/* Hero Content */}
        <div style={{
          maxWidth: "56rem",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
          textAlign: "center"
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <span style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(247, 201, 72, 0.2)",
              color: "#F7C948",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1rem",
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.18em"
            }}>
              <Sparkles style={{ width: "1rem", height: "1rem", display: "inline", marginRight: "0.5rem" }} />
              Blessed Journey
            </span>

            {/* Heading */}
            <h1 style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.3rem, 5vw, 3.5rem)",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.1
            }}>
              Umrah Packages{" "}
              <span style={{
                background: "linear-gradient(to right, #F7C948, #D4A017)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                2026-27
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "1.125rem",
              color: "#E6D5A8",
              maxWidth: "42rem",
              margin: "0 auto 2rem",
              lineHeight: 1.7,
              fontFamily: "Inter, sans-serif",
              fontWeight: 400
            }}>
              Perform Umrah with peace of mind. Choose from our flexible packages 
              available throughout the year, including special Ramadan packages.
            </p>

            {/* Hero Book Now Button */}
            <motion.button
              onClick={() => scrollToSection("packages-section")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "1rem 2.5rem",
                borderRadius: "12px",
                backgroundColor: "#F7C948",
                color: "#111111",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "0.01em",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(247, 201, 72, 0.3)",
                transition: "all 250ms ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FFE082";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(247, 201, 72, 0.45)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F7C948";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(247, 201, 72, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book Now
              <ArrowDown style={{ width: "1.125rem", height: "1.125rem" }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ==================== INTRODUCTION SECTION ==================== */}
      <section style={{
        maxWidth: "56rem",
        margin: "-2rem auto 0",
        padding: "0 1rem 4rem",
        position: "relative",
        zIndex: 20
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)",
            border: "1px solid #E6D5A8",
            padding: "2rem"
          }}
        >
          <h2 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            fontSize: "1.75rem",
            color: "#111111",
            marginBottom: "0.75rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.2
          }}>
            UMRAH Packages:
          </h2>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.7,
            color: "#111111",
            marginBottom: "1.5rem"
          }}>
            Affordable Umrah Packages for Every Season
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1.125rem",
            lineHeight: 1.7,
            color: "#5F5F5F",
            marginBottom: "1.5rem"
          }}>
            Whether you wish to perform Umrah monthly, quarterly, or annually,{" "}
            <strong style={{ color: "#111111", fontWeight: 600 }}>RASOAF Travels and Tours Limited</strong>{" "}
            has a special package designed to meet your needs. We proudly offer
            flexible, affordable, and well-organized Umrah packages for both first-time pilgrims and
            experienced travellers.
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#5F5F5F",
            marginBottom: "1.5rem"
          }}>
            Our commitment is to make your journey comfortable, stress-free, and spiritually rewarding.
            From visa processing and flight reservations to accommodation and travel guidance, we
            provide comprehensive support throughout your pilgrimage.
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#5F5F5F",
            marginBottom: "1.5rem"
          }}>
            At RASOAF Travels and Tours Limited, we believe that quality service should be
            affordable. That is why our loyal clients enjoy competitive pricing and exclusive discounts
            that make Umrah more accessible without compromising on service quality.
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#5F5F5F"
          }}>
            We encourage you to compare our services, pricing, and customer support with those of other
            travel agencies in Nigeria and beyond. We are confident that our professionalism,
            transparency, personalized attention, and value for money set us apart.
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#111111",
            fontWeight: 600,
            marginTop: "1.5rem"
          }}>
            Come. Compare. Experience the Difference.
          </p>
        </motion.div>
      </section>

      {/* ==================== PACKAGES GRID SECTION ==================== */}
      <section
        id="packages-section"
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem 5rem",
          position: "relative",
          zIndex: 20,
          scrollMarginTop: "2rem"
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span style={{
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontWeight: 700,
            fontSize: "0.8rem",
            color: "#B8860B",
            display: "block",
            marginBottom: "0.5rem"
          }}>
            Choose Your Journey
          </span>
          <h2 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            color: "#111111",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
          }}>
            Tailored Umrah Packages
          </h2>
        </motion.div>

        {/* Packages Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "5rem"
        }}>
          {umrahPackages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              style={{
                position: "relative",
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)",
                padding: "1.5rem",
                border: pkg.popular ? "2px solid #F7C948" : "1px solid #E6D5A8",
                display: "flex",
                flexDirection: "column",
                transition: "all 300ms ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.03)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: "absolute",
                  top: "-0.75rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "#D4A017",
                  color: "#FFFFFF",
                  padding: "0.25rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.01em"
                }}>
                  Most Popular
                </div>
              )}
              
              {/* Package Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem"
              }}>
                <Moon style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#D4A017"
                }} />
                <h3 style={{
                  fontWeight: 700,
                  color: "#111111",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "1.25rem",
                  letterSpacing: "-0.02em"
                }}>
                  {pkg.name}
                </h3>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                color: "#5F5F5F",
                marginBottom: "1rem"
              }}>
                {pkg.description}
              </p>
              
              {/* Price */}
              <div style={{ marginBottom: "1rem" }}>
                <span style={{
                  fontSize: "1.875rem",
                  fontWeight: 800,
                  color: "#111111",
                  fontFamily: "Manrope, sans-serif",
                  letterSpacing: "-0.02em"
                }}>
                  {pkg.price}
                </span>
                <span style={{
                  fontSize: "0.875rem",
                  color: "#5F5F5F",
                  fontFamily: "Inter, sans-serif"
                }}>
                  /person
                </span>
              </div>
              
              {/* Features List */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1.5rem",
                flex: 1
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#5F5F5F",
                  fontFamily: "Inter, sans-serif"
                }}>
                  <Calendar style={{ width: "1rem", height: "1rem", color: "#D4A017" }} />
                  {pkg.duration}
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#5F5F5F",
                  fontFamily: "Inter, sans-serif"
                }}>
                  <Hotel style={{ width: "1rem", height: "1rem", color: "#D4A017" }} />
                  {pkg.hotel}
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#5F5F5F",
                  fontFamily: "Inter, sans-serif"
                }}>
                  <Car style={{ width: "1rem", height: "1rem", color: "#D4A017" }} />
                  {pkg.transport}
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#5F5F5F",
                  fontFamily: "Inter, sans-serif"
                }}>
                  <Utensils style={{ width: "1rem", height: "1rem", color: "#D4A017" }} />
                  {pkg.meals}
                </div>
              </div>
              
              {/* Package Book Now Button - Scrolls to Form */}
              <button
                onClick={() => scrollToSection("booking-form-section")}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  padding: "0.75rem 0",
                  borderRadius: "12px",
                  color: "#111111",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                  backgroundColor: "#F7C948",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 200ms ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFE082";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F7C948";
                }}
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* ==================== BOOKING FORM + BANNER CTA SECTION ==================== */}
        <div
          id="booking-form-section"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            alignItems: "start",
            maxWidth: "80rem",
            margin: "0 auto",
            scrollMarginTop: "2rem"
          }}
        >
          {/* Banner Image CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              minHeight: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=1000&fit=crop"
              alt="Book Your Umrah Package"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px"
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.4) 50%, rgba(17,17,17,0.2) 100%)",
              borderRadius: "24px"
            }} />
            <div style={{
              position: "relative",
              zIndex: 2,
              padding: "2rem",
              color: "#FFFFFF"
            }}>
              <h3 style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "1rem",
                color: "#FFFFFF"
              }}>
                Book Umrah Package
              </h3>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "#E6D5A8",
                marginBottom: "1.5rem"
              }}>
                Fill the form below to get started
              </p>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  color: "#FFFFFF"
                }}>
                  <Shield style={{ width: "1.25rem", height: "1.25rem", color: "#F7C948" }} />
                  <span>Secure & Encrypted Booking</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  color: "#FFFFFF"
                }}>
                  <Phone style={{ width: "1.25rem", height: "1.25rem", color: "#F7C948" }} />
                  <span>24/7 Customer Support</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  color: "#FFFFFF"
                }}>
                  <MapPin style={{ width: "1.25rem", height: "1.25rem", color: "#F7C948" }} />
                  <span>Trusted by Thousands of Pilgrims</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form with Formspree */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.03)",
              border: "1px solid #E6D5A8",
              padding: "2rem"
            }}
          >
            <h3 style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#111111",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "0.5rem"
            }}>
              Book Umrah Package
            </h3>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "#5F5F5F",
              marginBottom: "2rem"
            }}>
              Fill the form below to get started
            </p>

            {/* Formspree Form */}
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem"
              }}
            >
              {/* First Name */}
              <div>
                <label
                  htmlFor="first-name"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  First Name <span style={{ color: "#D4A017" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <User style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1.125rem",
                    height: "1.125rem",
                    color: "#B8860B",
                    pointerEvents: "none"
                  }} />
                  <input
                    id="first-name"
                    type="text"
                    name="firstName"
                    placeholder="Saheed"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.75rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last-name"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Last Name <span style={{ color: "#D4A017" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <User style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1.125rem",
                    height: "1.125rem",
                    color: "#B8860B",
                    pointerEvents: "none"
                  }} />
                  <input
                    id="last-name"
                    type="text"
                    name="lastName"
                    placeholder="Mohammed"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.75rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Email Address <span style={{ color: "#D4A017" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Mail style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1.125rem",
                    height: "1.125rem",
                    color: "#B8860B",
                    pointerEvents: "none"
                  }} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Mohammed@example.com"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem 0.75rem 2.75rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Phone Number
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {/* Country Code */}
                  <div style={{ position: "relative", width: "160px", flexShrink: 0 }}>
                    <select
                      name="countryCode"
                      style={{
                        width: "100%",
                        padding: "0.75rem 2rem 0.75rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid #E6D5A8",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#111111",
                        backgroundColor: "#FFF8E6",
                        outline: "none",
                        appearance: "none",
                        cursor: "pointer",
                        boxSizing: "border-box",
                        transition: "border-color 200ms ease"
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                      defaultValue="+234"
                    >
                      {countryCodes.map((code) => (
                        <option key={code.value} value={code.value}>{code.label}</option>
                      ))}
                    </select>
                    <ChevronDown style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1rem",
                      height: "1rem",
                      color: "#B8860B",
                      pointerEvents: "none"
                    }} />
                  </div>
                  {/* Phone Input */}
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="800 123 4567"
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                  />
                </div>
              </div>

              {/* Preferred Departure & Return Date */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label
                    htmlFor="departure"
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#111111",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Preferred Departure <span style={{ color: "#D4A017" }}>*</span>
                  </label>
                  <input
                    id="departure"
                    type="date"
                    name="preferredDeparture"
                    placeholder="mm/dd/yyyy"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.875rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="return-date"
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#111111",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Return Date
                  </label>
                  <input
                    id="return-date"
                    type="date"
                    name="returnDate"
                    placeholder="mm/dd/yyyy"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.875rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                  />
                </div>
              </div>

              {/* Preferred Contact */}
              <div>
                <label
                  htmlFor="preferred-contact"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Preferred Contact <span style={{ color: "#D4A017" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="preferred-contact"
                    name="preferredContact"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 2rem 0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                    defaultValue="email"
                  >
                    {contactMethods.map((method) => (
                      <option key={method.value} value={method.value}>{method.label}</option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1rem",
                    height: "1rem",
                    color: "#B8860B",
                    pointerEvents: "none"
                  }} />
                </div>
              </div>

              {/* Adults, Children, Infants */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label
                    htmlFor="adults"
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#111111",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Adults <span style={{ color: "#D4A017" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Users style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1rem",
                      height: "1rem",
                      color: "#B8860B",
                      pointerEvents: "none"
                    }} />
                    <input
                      id="adults"
                      type="number"
                      name="adults"
                      min="1"
                      defaultValue="1"
                      required
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.25rem",
                        borderRadius: "12px",
                        border: "1px solid #E6D5A8",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#111111",
                        backgroundColor: "#FFF8E6",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 200ms ease"
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="children"
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#111111",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Children (2-11)
                  </label>
                  <div style={{ position: "relative" }}>
                    <Baby style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1rem",
                      height: "1rem",
                      color: "#B8860B",
                      pointerEvents: "none"
                    }} />
                    <input
                      id="children"
                      type="number"
                      name="children"
                      min="0"
                      defaultValue="0"
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.25rem",
                        borderRadius: "12px",
                        border: "1px solid #E6D5A8",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#111111",
                        backgroundColor: "#FFF8E6",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 200ms ease"
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="infants"
                    style={{
                      display: "block",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      color: "#111111",
                      marginBottom: "0.5rem"
                    }}
                  >
                    Infants (0-2)
                  </label>
                  <div style={{ position: "relative" }}>
                    <Baby style={{
                      position: "absolute",
                      left: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "1rem",
                      height: "1rem",
                      color: "#B8860B",
                      pointerEvents: "none"
                    }} />
                    <input
                      id="infants"
                      type="number"
                      name="infants"
                      min="0"
                      defaultValue="0"
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.25rem",
                        borderRadius: "12px",
                        border: "1px solid #E6D5A8",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#111111",
                        backgroundColor: "#FFF8E6",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 200ms ease"
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                    />
                  </div>
                </div>
              </div>

              {/* Umrah Package */}
              <div>
                <label
                  htmlFor="umrah-package"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Umrah Package <span style={{ color: "#D4A017" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="umrah-package"
                    name="umrahPackage"
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem 2rem 0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                    defaultValue=""
                  >
                    {umrahPackageOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1rem",
                    height: "1rem",
                    color: "#B8860B",
                    pointerEvents: "none"
                  }} />
                </div>
              </div>

              {/* Preferred Month */}
              <div>
                <label
                  htmlFor="preferred-month"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Preferred Month
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    id="preferred-month"
                    name="preferredMonth"
                    style={{
                      width: "100%",
                      padding: "0.75rem 2rem 0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #E6D5A8",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                      color: "#111111",
                      backgroundColor: "#FFF8E6",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                      transition: "border-color 200ms ease"
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                    defaultValue=""
                  >
                    {preferredMonthOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "1rem",
                    height: "1rem",
                    color: "#B8860B",
                    pointerEvents: "none"
                  }} />
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#111111",
                    marginBottom: "0.5rem"
                  }}
                >
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="additionalMessage"
                  placeholder="Any special requests or requirements..."
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid #E6D5A8",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.95rem",
                    color: "#111111",
                    backgroundColor: "#FFF8E6",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    transition: "border-color 200ms ease"
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#F7C948"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E6D5A8"; }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "12px",
                  backgroundColor: "#F7C948",
                  color: "#111111",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  letterSpacing: "0.01em",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "all 200ms ease",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.06)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFE082";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F7C948";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.06)";
                }}
              >
                <Send style={{ width: "1.125rem", height: "1.125rem" }} />
                Submit Enquiry
              </button>

              {/* Privacy Note */}
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                color: "#5F5F5F",
                textAlign: "center",
                marginTop: "0.5rem"
              }}>
                By submitting, you agree to our privacy policy and terms of service. We'll never share your information.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}