import "../styles/features.css";
import shield from "../assets/bags/Frame.png";
import Laptop from "../assets/bags/Laptop.png";
import Bag from "../assets/bags/Bag.png";

export default function Features() {
  return (
    <section className="features-section">
      <div className="feature-item">
        <img src={shield} alt="Premium Craftsmanship" />
        <h3>Premium Craftsmanship</h3>
        <p>
          Crafted with high-grade materials for long-lasting durability
        </p>
      </div>

      <div className="feature-item">
        <img src={Laptop} alt="Fits 15.6 Laptops" />
        <h3>Fits 15.6” Laptops</h3>
        <p>
          Securely fits up to 15.6” laptops for work & travel
        </p>
      </div>

      <div className="feature-item">
        <img src={Bag} alt="Smart Travel Organization" />
        <h3>Smart Travel Organization</h3>
        <p>
          Multiple compartments designed for effortless organization
        </p>
      </div>
    </section>
  );
}
