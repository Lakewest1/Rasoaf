// pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Home Page — RASOAF Travels and Tours
// ─────────────────────────────────────────────────────────────────────────────

import Hero from "../components/Hero"; // Updated path to the modular Hero
import TrustBadges from "../components/home/TrustBadges";
import Stats from "../components/home/Stats";
import WhyChooseUs from "../components/home/whyChooseUs";
import RecruitmentProcess from "../components/home/RecruitmentProcess";
import FeaturedJobs from "../components/home/FeaturedJobs";
import Testimonials from "../components/home/Testimonials";
import Partners from "../components/home/Partners";
import CTA from "../components/home/CTA";
import FAQ from "../components/home/FAQ";
import ContactStrip from "../components/home/ContactStrip";
import ForEmployersSection from '../components/home/ForEmployersSection';

export default function Home() {
  return (
    <>
      <Hero />
      {/* 
      <TrustBadges/>
      <Stats />
      <WhyChooseUs />
      <ForEmployersSection /> 
      <RecruitmentProcess />
      <FeaturedJobs />
      <Testimonials />
      <Partners />
      <CTA />
      <FAQ />
      <ContactStrip />
      */}
    </>
  );
}