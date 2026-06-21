// src/pages/Home.jsx
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import TrustBadges from "../components/home/TrustBadges";
import WhyChooseUs from "../components/home/whyChooseUs";
import RecruitmentProcess from "../components/home/RecruitmentProcess";
import FeaturedJobs from "../components/home/FeaturedJobs";
import Testimonials from "../components/home/Testimonials";
import Partners from "../components/home/Partners";
import CTA from "../components/home/CTA";
import FAQ from "../components/home/FAQ";
import ContactStrip from "../components/home/ContactStrip";
import ForEmployersSection from '../components/home/ForEmployersSection';
import PopularPackages from "../components/home/PopularPackages";
import HajjJourneyTimeline from "../components/home/HajjJourneyTimeline";
import ServicesGrid from "../components/home/ServicesGrid";
import Destinations from "../components/home/Destinations"; 
import Gallery from "../components/home/Gallery";


export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
       <PopularPackages />
       <WhyChooseUs />
       <HajjJourneyTimeline /> 
       <ServicesGrid />
        <Destinations />
        <Gallery />
        <Testimonials />
        <FAQ />
          <CTA />
          <Partners />
        
      {/** 
      <TrustBadges/>
      
      <ForEmployersSection /> 
      <RecruitmentProcess />
      <FeaturedJobs />
      
      
    
      
      <ContactStrip />*/}
    </>
  );
}