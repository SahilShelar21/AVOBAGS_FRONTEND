import { Link } from "react-router-dom";
import "../styles/hero.css";
import bagImage from "../assets/hero_bag.png";

export default function Hero() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-watermark">AVOBAGS</div>

        <img
          src={bagImage}
          alt="AvoBags Duffel Bag"
          className="hero-bag"
        />

        <div className="hero-text">
          <h2>
            Carry Your Dreams<br />
            
          </h2>
          <p>Designed for Those Who Refuse Ordinary</p>
          <Link to="/all-products" style={{ textDecoration: "none" }}>
            <button className="hero-btn">Explore Collection</button>
          </Link>
        </div>
      </section>
    </>  );
}
