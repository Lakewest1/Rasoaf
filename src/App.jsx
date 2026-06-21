// src/App.jsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home"; // ← Import the Home page, not Hero

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <Navbar />
      <main>
        <Home /> {/* ← Now this renders everything including Stats */}
      </main>
      <FloatingWhatsApp />
      
      <Footer /> 
    </div>
  );
}