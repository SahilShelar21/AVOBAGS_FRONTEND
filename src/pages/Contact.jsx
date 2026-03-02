import { useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/contact.css";
import ContactBag from "../assets/bags/Contact_page_bag.png";
import whatsapp from "../assets/Whatsapp_logo.png";

// Placeholder for team photos - replace with actual paths
import p1 from "../assets/bags/testimonals/user1.png";
import p2 from "../assets/bags/testimonals/user1.png";
import p3 from "../assets/bags/testimonals/user1.png";
import p4 from "../assets/bags/testimonals/user1.png";
import p5 from "../assets/bags/testimonals/user1.png";
import p6 from "../assets/bags/testimonals/user1.png";

export default function Contact() {
  const contactRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const team = [
    { name: "Arya Bagde", photo: p1 },
    { name: "Om Sahane", photo: p2 },
    { name: "Aditya Gomane", photo: p3 },
    { name: "Arya Bhagwat", photo: p4 },
    { name: "Sagar Thombre", photo: p5 },
    { name: "Sakshi Paritkar", photo: p6 },
  ];

  const handleWhatsApp = () => {
    const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/918591103161?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="contact-page">
      <div className="bg-glow-light blob-light-1"></div>
      <div className="bg-glow-light blob-light-2"></div>

      <div className="main-wrapper">
        {/* ================= HERO SECTION ================= */}
        <section className="about-hero">
          <div className="hero-content">
            <div className="hero-text-area">
              <span className="badge-logo">Est. 2025</span>
              <h1>Designed for Those Who <br/><span className="gradient-text">Refuse Ordinary</span></h1>
              <p className="hero-description">
                In 2025, six ambitious minds redefined the backpack. Predictable wasn't enough. 
                We believed a bag should be <strong>Engineered. Intentional. Purpose-driven.</strong>
              </p>
              <div className="hero-btns">
                <button className="primary-btn" onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth" })}>Get in Touch</button>
                <button className="secondary-btn-light">View Collection</button>
              </div>
            </div>
            <div className="hero-visual">
              <img src={ContactBag} alt="AvoBags" className="floating-bag" />
            </div>
          </div>
        </section>

        {/* ================= CRAFTED IN INDIA ================= */}
        <section className="manifesto-section">
          <div className="manifesto-card">
            <span className="section-label">Our Origin</span>
            <h2>Crafted in India. Built for Movement.</h2>
            <p>
              Avo is proudly manufactured in India. From premium <strong>Nylon + PU waterproof fabrics</strong> to reinforced 
              stress points—every choice is deliberate. Because ambition doesn’t pause, and neither should your gear.
            </p>
          </div>
        </section>

        {/* ================= WHY AVO (VALUES) ================= */}
        <section className="values-grid">
          <div className="value-item-light">
            <div className="value-number">01</div>
            <h3>Engineered Utility</h3>
            <p>Expandable storage, hidden security, and USB integration. Every feature exists for a reason.</p>
          </div>
          <div className="value-item-light">
            <div className="value-number">02</div>
            <h3>Premium Without Pretension</h3>
            <p>Luxury is experience, not logos. Pay for engineering—not branding theatrics.</p>
          </div>
          <div className="value-item-light">
            <div className="value-number">03</div>
            <h3>Modern Achiever</h3>
            <p>Students, Professionals, Creators. Avo adapts because you don't live in one lane.</p>
          </div>
          <div className="value-item-light">
            <div className="value-number">04</div>
            <h3>Designed by Thinkers</h3>
            <p>We are manufacturers. We control quality. We obsess over the detail.</p>
          </div>
        </section>

        {/* ================= TEAM SECTION ================= */}
        <section className="team-section">
          <div className="section-header">
            <span className="section-label">The Visionaries</span>
            <h2>Meet The Team</h2>
            <p>Six builders who believed Indian manufacturing could lead the world.</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-photo">
                   <img src={member.photo} alt={member.name} />
                </div>
                <h4>{member.name}</h4>
                <p>Co-Founder</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PHILOSOPHY ================= */}
        <section className="philosophy-strip">
          <div className="philosophy-content">
             <h2>A backpack carries more than belongings. <br/>It carries <span>Dreams.</span></h2>
          </div>
        </section>

        {/* ================= CONTACT FORM ================= */}
        <section className="contact-container" ref={contactRef}>
          <div className="contact-glass-light">
            <div className="form-header">
              <span className="section-label">Connect</span>
              <h2>Support Hub</h2>
              <p>One message away from your solution.</p>
            </div>
            <div className="inputs">
              <div className="input-row">
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea placeholder="Tell us how we can help..." rows="4" onChange={(e) => setForm({ ...form, message: e.target.value })} />
              
              <button className="wa-submit-gradient" onClick={handleWhatsApp}>
                <img src={whatsapp} className="wa-mini-icon" alt="" />
                Launch WhatsApp Support
              </button>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}