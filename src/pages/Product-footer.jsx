import "../styles/static-pages.css";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <div className="static-page">
      <div className="static-container">
        <h1>Our Collection</h1>
        <p>Explore our curated collection of premium backpacks designed for work, travel, and everyday life.</p>
        <div style={{marginTop: '40px'}}>
            <Link to="/all-products" className="static-btn">Shop All Products</Link>
        </div>
      </div>
    </div>
  );
}