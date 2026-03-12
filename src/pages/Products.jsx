import { bestsellers } from "../data/bestsellers";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";

export default function Products() {
  return (
    <>
      {/* 🔥 Breadcrumb */}
      <Breadcrumb current="Bestsellers" />

      <section className="products-page">
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: "500", marginBottom: "24px", color: "#24394C" }}>
          Bestsellers ({bestsellers.length} bags)
        </div>

        {/* 🔥 4-column product layout */}
        <div className="products-grid">
          {bestsellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}
