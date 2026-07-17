// src/pages/hajj/Services.jsx
import { useNavigate } from "react-router-dom";
import { HajjHeroSection, ServiceCard } from "../../components/hajj";
import { SectionHeader } from "../../components/common";
import { Star, Plane, Hotel, Users, Compass, Globe } from "lucide-react";

const allServices = [
  { icon: Star, title: "Hajj Packages", description: "Complete Hajj pilgrimage packages for individuals and groups with full support.", color: "#D4A017", route: "/hajj/packages/hajj" },
  { icon: Star, title: "Umrah Packages", description: "Flexible Umrah packages available year-round including special Ramadan offers.", color: "#D4A017", route: "/hajj/packages/umrah" },
  { icon: Plane, title: "Flight Booking", description: "Direct and connecting flights to Saudi Arabia from all Nigerian cities.", color: "#1A73E8", route: "/hajj/flight-booking" },
  { icon: Hotel, title: "Hotel Reservation", description: "Quality hotels in Makkah and Madinah for every budget and preference.", color: "#0D9488", route: "/hajj/hotel-reservation" },
  { icon: Users, title: "Group Travel", description: "Special group rates and dedicated tour guides for families and organizations.", color: "#7C3AED", route: "/hajj/packages/hajj" },
  { icon: Compass, title: "VIP Packages", description: "Premium exclusive experiences with luxury accommodations and private transport.", color: "#DC2626", route: "/hajj/packages/hajj" },
];

export default function HajjServices() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8E6" }}>
      <HajjHeroSection
        badge="What We Offer"
        title="Hajj & Umrah Services"
        subtitle="Comprehensive travel services designed specifically for your spiritual journey."
        backgroundImage="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1920&h=800&fit=crop"
        ctaText="Book Now"
        onCtaClick={() => navigate("/hajj/contact")}
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
          subtitle="From flights to hotels, we handle every aspect of your pilgrimage."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {allServices.map((s, i) => (
            <ServiceCard key={i} {...s} onClick={() => navigate(s.route)} />
          ))}
        </div>
      </section>
    </div>
  );
}