// src/pages/travel/Home.jsx
import { useNavigate } from "react-router-dom";
import { TravelHeroSection, TravelServiceCard } from "../../components/travel";
import { SectionHeader } from "../../components/common";
import { Plane, Globe, GraduationCap, Building2, Briefcase, Heart } from "lucide-react";

const services = [
  { icon: GraduationCap, title: "Student Visa", description: "Study abroad with expert guidance from application to approval.", color: "#1A73E8", route: "/travel/student-visa" },
  { icon: Briefcase, title: "Work Visa", description: "Build your career internationally with professional visa processing.", color: "#0D9488", route: "/travel/work-visa" },
  { icon: Globe, title: "Tourist Visa", description: "Explore the world with hassle-free tourist visa applications.", color: "#7C3AED", route: "/travel/tourist-visa" },
  { icon: Building2, title: "Business Visa", description: "Corporate travel made easy with fast-track business visa services.", color: "#DC2626", route: "/travel/business-visa" },
  { icon: Heart, title: "Family Visa", description: "Reunite with loved ones through our family visa processing services.", color: "#E11D48", route: "/travel/family-visa" },
  { icon: Plane, title: "Flight Booking", description: "Affordable flights worldwide with the best deals and flexible options.", color: "#0284C7", route: "/travel/flights" },
];

export default function TravelHome() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6" }}>
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        backgroundImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop"
        ctaText="Explore Services"
        onCtaClick={() => {
          const el = document.getElementById("travel-services");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <section
        id="travel-services"
        style={{
          maxWidth: 1200,
          margin: "-40px auto 0",
          padding: "40px 20px 80px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <SectionHeader
          badge="Our Services"
          badgeIcon={<Globe size={14} />}
          title="Premium Travel Solutions"
          subtitle="From visa applications to flight bookings, we provide end-to-end travel services."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((s, i) => (
            <TravelServiceCard key={i} {...s} onClick={() => navigate(s.route)} />
          ))}
        </div>
      </section>
    </div>
  );
}