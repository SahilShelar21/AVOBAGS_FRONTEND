import { useRef, useState } from "react";
import "../styles/contact.css";
import bagImg from "../assets/hero_bag.png";
import whatsapp from "../assets/Whatsapp_logo.png";

export default function Contact() {
  const contactRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleWhatsApp = () => {
    const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/918591103161?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="contact-page">
      {/* Soft Logo-Color Gradients in Background */}
      <div className="bg-glow-light blob-light-1"></div>
      <div className="bg-glow-light blob-light-2"></div>

      <div className="main-wrapper">
        {/* ================= HERO SECTION ================= */}
        <section className="about-hero">
          <div className="hero-content">
            <div className="hero-text-area">
              <span className="badge-logo">Premium Collection</span>
              <h1>Design that <br/><span className="gradient-text">Moves with You</span></h1>
              <p>AvoBags combines technical precision with high-fashion aesthetics. Built for the modern traveler.</p>
              <div className="hero-btns">
                <button className="primary-btn" onClick={() => contactRef.current.scrollIntoView({ behavior: "smooth" })}>Get in Touch</button>
                <button className="secondary-btn-light">Explore Story</button>
              </div>
            </div>
            <div className="hero-visual">
              <img src={bagImg} alt="AvoBags" className="floating-bag" />
            </div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="stats-bar-light">
          <div className="stat-card"><h2>50k+</h2><p>Users</p></div>
          <div className="stat-card"><h2>120+</h2><p>Retailers</p></div>
          <div className="stat-card"><h2>15yr</h2><p>Warranty</p></div>
          <div className="stat-card"><h2>Eco</h2><p>Certified</p></div>
        </section>

        {/* ================= STORY SECTION ================= */}
        <section className="story-section">
          <div className="glass-card-light">
            <span className="section-label">Our Philosophy</span>
            <h2>Movement is Life</h2>
            <p>Every AvoBag is a masterpiece of ergonomics. We eliminate the weight of the world so you can focus on the destination.</p>
          </div>
        </section>

        {/* ================= VALUES GRID ================= */}
        <section className="values-grid">
          <div className="value-item-light">
            <h3>Military Grade</h3>
            <p>Ballistic nylon zippers that survive any weather and any journey.</p>
          </div>
          <div className="value-item-light">
            <h3>Ergonomic Fit</h3>
            <p>Smart weight distribution technology for maximum comfort.</p>
          </div>
          <div className="value-item-light">
            <h3>Sustainable</h3>
            <p>Crafted from recycled ocean plastics with premium finishing.</p>
          </div>
        </section>

        {/* ================= CONTACT FORM ================= */}
        <section className="contact-container" ref={contactRef}>
          <div className="contact-glass-light">
            <div className="form-header">
              <h2>Support Hub</h2>
              <p>One message away from your solution.</p>
            </div>
            <div className="inputs">
              <div className="input-row">
                <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea placeholder="Message..." rows="4" onChange={(e) => setForm({ ...form, message: e.target.value })} />
              
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