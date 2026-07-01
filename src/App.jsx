// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages - Lazy loaded for better performance
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const HajjPackages = lazy(() => import("./pages/services/HajjPackages"));
const UmrahPackages = lazy(() => import("./pages/services/UmrahPackages"));
const FlightBooking = lazy(() => import("./pages/services/FlightBooking"));
const HotelReservation = lazy(() => import("./pages/services/HotelReservation"));
const HajjUmrah = lazy(() => import("./pages/HajjUmrah"));
const VisaServices = lazy(() => import("./pages/VisaServices"));

// Individual Visa Pages
const StudentVisa = lazy(() => import("./pages/visa/StudentVisa"));
const WorkVisa = lazy(() => import("./pages/visa/WorkVisa"));
const TouristVisa = lazy(() => import("./pages/visa/TouristVisa"));
const BusinessVisa = lazy(() => import("./pages/visa/BusinessVisa"));
const FamilyVisa = lazy(() => import("./pages/visa/FamilyVisa"));

// Contact Page
const Contact = lazy(() => import("./pages/Contact"));

const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600 font-['Inter']">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />
            
            {/* Services Index Page */}
            <Route path="/services" element={<Services />} />
            
            {/* Individual Service Pages */}
            <Route path="/services/hajj" element={<HajjPackages />} />
            <Route path="/services/umrah" element={<UmrahPackages />} />
            <Route path="/services/flight-booking" element={<FlightBooking />} />
            <Route path="/services/hotel-reservation" element={<HotelReservation />} />
            
            {/* Hajj & Umrah Overview Page */}
            <Route path="/hajj-umrah" element={<HajjUmrah />} />
            
            {/* Visa Services Index Page */}
            <Route path="/visa-services" element={<VisaServices />} />
            
            {/* Individual Visa Pages */}
            <Route path="/visa-services/student" element={<StudentVisa />} />
            <Route path="/visa-services/work" element={<WorkVisa />} />
            <Route path="/visa-services/tourist" element={<TouristVisa />} />
            <Route path="/visa-services/business" element={<BusinessVisa />} />
            <Route path="/visa-services/family" element={<FamilyVisa />} />
            
            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;