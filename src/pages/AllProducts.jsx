import { allProducts } from "../data/allProducts";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/collection-detail.css"; 

export default function AllProducts() {
  return (
    <div className="our-collection">
      {/* 1. Breadcrumb at the top */}
      <Breadcrumb current="All Products" />

      {/* 2. Header Section */}
      <header className="collection-header" style={{ marginBottom: "10px" }}>
        <h1>All Products</h1>
      </header>

      {/* 3. Filter Bar (Pass total count) */}
      <Filters total={allProducts.length} />

      {/* 4. The 4-Column Grid */}
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