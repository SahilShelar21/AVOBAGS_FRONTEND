import { bestsellers } from "../data/bestsellers";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";

export default function Products() {
  return (
    <>
      {/* 🔥 Breadcrumb */}
      <Breadcrumb current="Bestsellers" />

      <section className="products-page">
        {/* 🔥 Filters bar */}
        <Filters total={bestsellers.length} />

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
