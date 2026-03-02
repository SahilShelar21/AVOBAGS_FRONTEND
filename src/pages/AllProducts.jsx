import { allProducts } from "../data/allProducts";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/collection-detail.css"; 

export default function AllProducts() {
  return (
    <div className="our-collection">
      {/* 1. Breadcrumb at the top */}
      <Breadcrumb current="All Products" />

      {/* 2. Header Section with product count */}
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: "500", marginBottom: "24px", color: "#24394C", marginTop: "20px" }}>
        All Products ({allProducts.length} bags)
      </div>

      {/* 3. The 4-Column Grid */}
      <div className="products-grid">
        {allProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            badgeType={product.showOnHome ? "Bestseller" : "New Arrival"}
          />
        ))}
      </div>
    </div>
  );
}