// src/pages/travel/FlightBooking.jsx
import { Link } from "react-router-dom";
import { Plane, ChevronRight } from "lucide-react";
import { TravelHeroSection } from "../../components/travel";

export default function TravelFlightBooking() {
  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6" }}>
      <TravelHeroSection
        badge="Coming Soon"
        title="Flight Booking"
        subtitle="Our flight booking portal is being built. In the meantime, contact us for the best fares."
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109bb05?w=1920&h=800&fit=crop"
      />

      <section style={{
        maxWidth: 700, margin: "-40px auto 0", padding: "40px 20px 80px",
        position: "relative", zIndex: 20, textAlign: "center",
      }}>
        <div style={{
          background: "#fff", borderRadius: 24, padding: 48,
          border: "1px solid #E6D5A8", boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: "rgba(212,160,23,0.1)", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <Plane size={40} color="#B8860B" />
          </div>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 28, color: "#111", marginBottom: 12 }}>
            Flight Booking Coming Soon
          </h2>
          <p style={{ fontSize: 16, color: "#5F5F5F", lineHeight: 1.7, marginBottom: 32 }}>
            We're building a seamless flight booking experience. For now, call us directly for the best deals on flights worldwide.
          </p>
          <a
            href="tel:+2349037707888"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 12,
              background: "#F7C948", color: "#111",
              fontFamily: "'Inter', sans-serif", fontWeight: 600,
              fontSize: 16, textDecoration: "none",
            }}
          >
            Call +234 903 770 7888
          </a>
        </div>

        <div style={{ marginTop: 32 }}>
          <Link to="/travel" style={{
            color: "#5F5F5F", fontSize: 14, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Travel Home
          </Link>
        </div>
      </section>
    </div>
  );
}