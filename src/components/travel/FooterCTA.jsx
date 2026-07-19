// src/components/travel/FooterCTA.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Footer
// ─────────────────────────────────────────────────────────────────────────────

import { Phone, Mail, MapPin, Heart } from "lucide-react";

const CSS = `
  .ft-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 4vw, 60px) clamp(30px, 5vh, 50px);
    background: #010612;
    font-family: 'Manrope', 'Inter', system-ui, sans-serif;
    color: rgba(255,255,255,0.55); position: relative; overflow: hidden;
  }
  .ft-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .ft-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .ft-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: clamp(24px, 4vw, 48px);
    margin-bottom: clamp(40px, 6vh, 60px);
  }
  .ft-col h4 {
    font-family: 'Manrope', sans-serif; font-weight: 700;
    font-size: 16px; color: #F7C948; margin-bottom: 16px;
    letter-spacing: 0.02em;
  }
  .ft-col p, .ft-col a {
    font-size: 13px; line-height: 1.8; color: rgba(255,255,255,0.5);
    text-decoration: none; display: block; transition: color 0.2s ease;
  }
  .ft-col a:hover { color: #F7C948; }
  .ft-contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 13px; }
  .ft-contact-item svg { flex-shrink: 0; margin-top: 2px; color: #F7C948; }
  .ft-social { display: flex; gap: 16px; margin-top: 16px; }
  .ft-social a {
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5); text-decoration: none;
    transition: all 0.3s ease; font-size: 14px; font-weight: 600;
  }
  .ft-social a:hover { background: rgba(212,160,23,0.12); border-color: rgba(212,160,23,0.3); color: #F7C948; }
  .ft-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 24px; text-align: center; font-size: 12px;
    color: rgba(255,255,255,0.3);
  }
  .ft-bottom span { color: #F7C948; }
  @media (max-width: 480px) { .ft-grid { grid-template-columns: 1fr; } }
`;

export default function FooterCTA() {
  return (
    <>
      <style>{CSS}</style>
      <footer className="ft-section">
        <div className="ft-container">
          <div className="ft-grid">
            {/* Company */}
            <div className="ft-col">
              <h4>RASOAF Travels & Tours</h4>
              <p>Solution For All Type Of Visas. Your trusted partner in international education, travel, and immigration support.</p>
              <div className="ft-social">
                <a href="https://x.com/Rasoaftravels" target="_blank" rel="noopener">𝕏</a>
                <a href="https://www.instagram.com/rasoaftravelsandtours/" target="_blank" rel="noopener">IG</a>
                <a href="https://www.facebook.com/profile.php?id=61590695552485" target="_blank" rel="noopener">FB</a>
                <a href="https://www.tiktok.com/@rasoaftravelsandtours" target="_blank" rel="noopener">TT</a>
              </div>
            </div>

            {/* Contact */}
            <div className="ft-col">
              <h4>Contact Us</h4>
              <div className="ft-contact-item"><MapPin size={14} /> 3 Bolaji Taylor Street, Off Alhaji Haruna Street, Ifako Ijaiye, Lagos State, Nigeria</div>
              <div className="ft-contact-item"><Phone size={14} /> +234-903-770-7888</div>
              <div className="ft-contact-item"><Phone size={14} /> +234-703-189-9529</div>
              <div className="ft-contact-item"><Mail size={14} /> info@rasoaf.com</div>
            </div>

            {/* Quick Links */}
            <div className="ft-col">
              <h4>Quick Links</h4>
              <a href="/travel/student-visa">Student Visa</a>
              <a href="/travel/work-visa">Work Visa</a>
              <a href="/travel/tourist-visa">Tourist Visa</a>
              <a href="/travel/business-visa">Business Visa</a>
              <a href="/travel/family-visa">Family Visa</a>
              <a href="/travel/flights">Flight Booking</a>
            </div>

            {/* International Offices */}
            <div className="ft-col">
              <h4>International Offices</h4>
              <p><strong style={{color:"#F7C948"}}>Canada</strong><br />+1-236-989-5756<br />7955 Suncrest Drive, Burnaby, BC</p>
              <p style={{marginTop:8}}><strong style={{color:"#F7C948"}}>Canada</strong><br />+1-204-915-5360<br />2303-33 Hargrave Street, Winnipeg, MB</p>
              <p style={{marginTop:8}}><strong style={{color:"#F7C948"}}>UK</strong><br />+44-758-732-9060<br />38 Kelso Road, Liverpool</p>
              <p style={{marginTop:8}}><strong style={{color:"#F7C948"}}>Ireland</strong><br />+353-851-967-323<br />Pinnock Hill, Swords, Co. Dublin</p>
            </div>
          </div>

          <div className="ft-bottom">
            &copy; {new Date().getFullYear()} <span>RASOAF Travels and Tours Limited</span>. All rights reserved. | Made with <Heart size={12} style={{display:"inline", color:"#F7C948"}} /> in Lagos, Nigeria.
          </div>
        </div>
      </footer>
    </>
  );
}