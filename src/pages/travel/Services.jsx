// src/pages/travel/Services.jsx
import { useNavigate } from "react-router-dom";
import { TravelHeroSection, TravelServiceCard } from "../../components/travel";
import { SectionHeader } from "../../components/common";
import { Plane, Globe, GraduationCap, Building2, Briefcase, Heart, Hotel } from "lucide-react";

const allServices = [
  { icon: GraduationCap, title: "Student Visa", description: "Complete student visa processing for UK, USA, Canada, Australia, and more.", color: "#1A73E8", route: "/travel/student-visa" },
  { icon: Briefcase, title: "Work Visa", description: "Professional work visa guidance for skilled workers and professionals.", color: "#0D9488", route: "/travel/work-visa" },
  { icon: Globe, title: "Tourist Visa", description: "Hassle-free tourist visa applications for your dream vacation destinations.", color: "#7C3AED", route: "/travel/tourist-visa" },
  { icon: Building2, title: "Business Visa", description: "Fast-track business visa services for corporate travellers and entrepreneurs.", color: "#DC2626", route: "/travel/business-visa" },
  { icon: Heart, title: "Family Visa", description: "Family reunification visa processing with care and precision.", color: "#E11D48", route: "/travel/family-visa" },
  { icon: Plane, title: "Flight Booking", description: "Competitive airfares for domestic and international flights worldwide.", color: "#0284C7", route: "/travel/flights" },
  { icon: Hotel, title: "Hotel Reservation", description: "Quality accommodation options for every destination and budget.", color: "#059669", route: "/travel/flights" },
];

export default function TravelServices() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6" }}>
      <TravelHeroSection
        badge="What We Offer"
        title="Travel & Tour Services"
        subtitle="Comprehensive travel solutions for every journey, every destination."
        backgroundImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop"
        ctaText="Get Started"
        onCtaClick={() => navigate("/travel/contact")}
      />

      <section
        style={{
          maxWidth: 1200,
          margin: "-40px auto 0",
          padding: "40px 20px 80px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <SectionHeader
          badge="All Services"
          badgeIcon={<Globe size={14} />}
          title="Complete Travel Solutions"
          subtitle="Everything you need for international travel, visas, and bookings."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {allServices.map((s, i) => (
            <TravelServiceCard key={i} {...s} onClick={() => navigate(s.route)} />
          ))}
        </div>
      </section>
    </div>
  );
}