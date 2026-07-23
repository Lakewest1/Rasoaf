// src/App.jsx (CLEAN - NO LOADING OVERLAYS)
// ─────────────────────────────────────────────────────────────────────────────
// Removed:
// - SmartNavigationOverlay (no more loading screen on every navigation)
// - useAggressivePreloader (no more background preloading)
// 
// Result:
// - Fast navigation without loading overlay
// - Pages load on-demand
// - Clean, fast user experience
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { EarthProvider } from "./context/EarthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";

const Gateway = lazy(() => import("./pages/Gateway"));
const HajjHome = lazy(() => import("./pages/hajj/Home"));
const HajjServices = lazy(() => import("./pages/hajj/Services"));
const HajjUmrah = lazy(() => import("./pages/hajj/HajjUmrah"));
const HajjContact = lazy(() => import("./pages/hajj/Contact"));
const HajjPackages = lazy(() => import("./pages/hajj/services/HajjPackages"));
const UmrahPackages = lazy(() => import("./pages/hajj/services/UmrahPackages"));
const HajjFlightBooking = lazy(() => import("./pages/hajj/services/FlightBooking"));
const HajjHotelReservation = lazy(() => import("./pages/hajj/services/HotelReservation"));
const TravelHome = lazy(() => import("./pages/travel/Home"));
const TravelServices = lazy(() => import("./pages/travel/Services"));
const TravelContact = lazy(() => import("./pages/travel/Contact"));
const StudentVisa = lazy(() => import("./pages/travel/StudentVisa"));
const WorkVisa = lazy(() => import("./pages/travel/WorkVisa"));
const TouristVisa = lazy(() => import("./pages/travel/TouristVisa"));
const BusinessVisa = lazy(() => import("./pages/travel/BusinessVisa"));
const FamilyVisa = lazy(() => import("./pages/travel/FamilyVisa"));
const TravelFlightBooking = lazy(() => import("./pages/travel/FlightBooking"));
const Training = lazy(() => import("./components/travel/Training"));
const TrainingDetail = lazy(() => import("./pages/travel/TrainingDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal loader with no animation
const PageLoader = () => (
  <div style={{ 
    minHeight: "100vh", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    background: "#FFF8E6" 
  }}>
    <div style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "'Manrope', sans-serif", color: "#111", margin: 0 }}>
        Loading...
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <EarthProvider>
      <Router>
        {/* NO SmartNavigationOverlay — no loading screen on navigation */}
        <Navbar />
        <main style={{ minHeight: "100vh" }}>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Gateway />} />
                <Route path="/hajj" element={<HajjHome />} />
                <Route path="/hajj/services" element={<HajjServices />} />
                <Route path="/hajj/umrah" element={<HajjUmrah />} />
                <Route path="/hajj/contact" element={<HajjContact />} />
                <Route path="/hajj/packages/hajj" element={<HajjPackages />} />
                <Route path="/hajj/packages/umrah" element={<UmrahPackages />} />
                <Route path="/hajj/flight-booking" element={<HajjFlightBooking />} />
                <Route path="/hajj/hotel-reservation" element={<HajjHotelReservation />} />
                <Route path="/travel" element={<TravelHome />} />
                <Route path="/travel/services" element={<TravelServices />} />
                <Route path="/travel/contact" element={<TravelContact />} />
                <Route path="/travel/student-visa" element={<StudentVisa />} />
                <Route path="/travel/work-visa" element={<WorkVisa />} />
                <Route path="/travel/tourist-visa" element={<TouristVisa />} />
                <Route path="/travel/business-visa" element={<BusinessVisa />} />
                <Route path="/travel/family-visa" element={<FamilyVisa />} />
                <Route path="/travel/flights" element={<TravelFlightBooking />} />
                <Route path="/travel/training" element={<Training />} />
                <Route path="/travel/training/:id" element={<TrainingDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </Router>
    </EarthProvider>
  );
}