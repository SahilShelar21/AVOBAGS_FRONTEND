import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'; // Accessible icons
import "../styles/footer.css";
import logo from "../assets/bags/avobags_logo.png";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Brand Info & Socials */}
        <div className="footer-brand">
          <img src={logo} alt="AVO BAGS" className="footer-logo" />
          <p>
            Clarity gives you the blocks and components you need to create 
            a truly professional website.
          </p>
          
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/career">Career</a></li>
              <li><a href="/feedback">Feedback</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li><a href="/support">Customer Support</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
  <hr />
  <div className="footer-credits">
    <p>© Copyright 2026, All Rights Reserved by AVO BAGS</p>
    <p>Design & Develop by Rohit Sawant & Sahil Shelar</p>
  </div>
</div>
    </footer>
  );
}