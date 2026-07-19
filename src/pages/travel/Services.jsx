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
  { icon: Hotel, title: "Hotel Reservation", description: "Quality accommodation options for every destination and budget.", color: "#059669", route: "/travel/hotel-reservation" },
];

const CSS = `
  .rts-services-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #050A14 0%, #08111E 50%, #0B1525 100%);
    position: relative;
  }

  .rts-services-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 80%, rgba(212, 160, 23, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(212, 160, 23, 0.04) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  .rts-content {
    max-width: 1200px;
    margin: -40px auto 0;
    padding: 40px 20px 80px;
    position: relative;
    z-index: 20;
  }

  .rts-header-card {
    background: #FFFFFF;
    border-radius: 24px;
    padding: clamp(32px, 5vw, 48px);
    border: 1px solid rgba(212, 160, 23, 0.12);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: clamp(28px, 3vw, 36px);
    position: relative;
    overflow: hidden;
  }

  .rts-header-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F7C948, #D4A017, #B8860B);
  }

  .rts-header-wrap {
    position: relative;
    z-index: 25;
  }

  .rts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    position: relative;
    z-index: 25;
  }

  @media (max-width: 768px) {
    .rts-content {
      padding: 32px 16px 60px;
    }
    
    .rts-header-card {
      padding: 28px 24px;
      border-radius: 20px;
    }
    
    .rts-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  @media (max-width: 480px) {
    .rts-content {
      padding: 24px 12px 48px;
    }
    
    .rts-header-card {
      padding: 24px 20px;
      border-radius: 18px;
    }
  }
`;

export default function TravelServices() {
  const navigate = useNavigate();

  return (
    <>
      <style>{CSS}</style>
      <div className="rts-services-page">
        <TravelHeroSection
          badge="What We Offer"
          title="Travel & Tour Services"
          subtitle="Comprehensive travel solutions for every journey, every destination."
          backgroundImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop"
          ctaText="Get Started"
          onCtaClick={() => navigate("/travel/contact")}
        />

        <section className="rts-content">
          {/* Header wrapped in white card for visibility */}
          <div className="rts-header-card">
            <div className="rts-header-wrap">
              <SectionHeader
                badge="All Services"
                badgeIcon={<Globe size={14} />}
                title="Complete Travel Solutions"
                subtitle="Everything you need for international travel, visas, and bookings."
              />
            </div>
          </div>

          {/* Cards grid */}
          <div className="rts-grid">
            {allServices.map((s, i) => (
              <TravelServiceCard key={i} {...s} onClick={() => navigate(s.route)} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}