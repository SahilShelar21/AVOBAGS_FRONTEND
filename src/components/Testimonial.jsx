import React from "react";
import "../styles/testimonial.css";
import avatar1 from "../assets/bags/testimonals/user1.png";
import whatsappIcon from "../assets/Whatsapp_logo.png"; // Make sure path is correct

export default function Testimonial() {
  
  const handleWhatsAppClick = () => {
    const message = "Hi AvoBags! I'm interested in your premium collection. Can you help me?";
    window.open(
      `https://wa.me/918591103161?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <header className="testimonial-header">
          <span className="badge-logo">Testimonials</span>
          <h2>Voices of our Users</h2>
          <p>Real stories from people who trust our gear every day.</p>
        </header>

        <div className="testimonial-grid">
          <TestimonialCard
            image={avatar1}
            name="Rohit Sharma"
            role="Product Designer"
            emoji="✨"
            text="The quality is absolutely top-notch. It fits my laptop perfectly and looks premium even after daily use."
          />
          <TestimonialCard
            image={avatar1}
            name="Ananya Verma"
            role="Frequent Traveler"
            emoji="✈️"
            text="I’ve used this bag on multiple trips. Comfortable, spacious, and stylish — exactly what I needed."
          />
          <TestimonialCard
            image={avatar1}
            name="Karan Patel"
            role="Corporate Professional"
            emoji="💼"
            text="Minimal design with great build quality. The compartments are well thought out. Worth every rupee."
          />
        </div>
      </div>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="whatsapp-float" onClick={handleWhatsAppClick}>
        <div className="wa-pulse"></div>
        <img src={whatsappIcon} alt="WhatsApp Support" />
        <span className="wa-tooltip">Chat with us</span>
      </div>
    </section>
  );
}

function TestimonialCard({ image, name, role, emoji, text }) {
  return (
    <div className="testimonial-card">
      <div className="card-top">
        <div className="user-info">
          <img src={image} alt={name} className="avatar" />
          <div className="user-details">
            <h4>{name}</h4>
            <span>{role}</span>
          </div>
        </div>
        <span className="reaction-emoji">{emoji}</span>
      </div>
      <p className="testimonial-text">“{text}”</p>
    </div>
  );
}