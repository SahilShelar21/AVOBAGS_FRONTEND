import ProductCard from "./ProductCard";
import { bestsellers } from "../data/bestsellers";
import { newArrivals } from "../data/newarrivals";
import "../styles/products.css";

export default function JustForYou() {
  const products = [...bestsellers, ...newArrivals].slice(0, 4);

  return (
    <section className="bestsellers">
      <div className="bestsellers-header">
        <h2>Just For You</h2>
      </div>

      <div className="bestsellers-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
