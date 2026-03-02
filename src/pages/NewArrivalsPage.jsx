import { newArrivals } from "../data/newarrivals";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";

export default function NewArrivalsPage() {
  return (
    <>
      <Breadcrumb current="New Arrivals" />

      <section className="products-page">
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: "500", marginBottom: "24px", color: "#24394C" }}>
          New Arrivals ({newArrivals.length} bags)
        </div>

        <div className="products-grid">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} badgeType="New" />
          ))}
        </div>
      </section>
    </>
  );
}
