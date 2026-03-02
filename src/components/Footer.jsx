import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import "../styles/footer.css";
import logo from "../assets/bags/avobag_logo_footer.png";

export default function Footer() {
  
  // Helper to scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand Info & Socials */}
        <div className="footer-brand">
          <Link to="/" onClick={scrollToTop}>
            <img src={logo} alt="AVO BAGS" className="footer-logo" />
          </Link>
          <p>
            Premium backpacks for modern explorers. 
            Crafting durability and elegance into every stitch.
          </p>
          
          <div className="social-icons">
            <a href="https://www.instagram.com/avobags?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about" onClick={scrollToTop}>About Us</Link></li>
              <li><Link to="/products" onClick={scrollToTop}>Products</Link></li>
              <li><Link to="/career" onClick={scrollToTop}>Career</Link></li>
              <li><Link to="/feedback" onClick={scrollToTop}>Feedback</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li><Link to="/support" onClick={scrollToTop}>Customer Support</Link></li>
              <li><Link to="/terms" onClick={scrollToTop}>Terms & Conditions</Link></li>
              <li><Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <div className="footer-credits">
          <p>© Copyright 2026, All Rights Reserved by Avo Bags</p>
          <p>Design & Developed by Rohit Sawant & Sahil Shelar</p>
        </div>
      </div>
    </footer>
  );
}