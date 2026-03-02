import { useLocation } from "react-router-dom";
import { allProducts } from "../data/allProducts";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/collection-detail.css";

export default function CollectionDetail() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const category = query.get("category");

  // Filter products based on the URL category
  const filteredProducts = allProducts.filter((p) => p.category === category);

  // Capitalize title for the Breadcrumb and Header
  const displayTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : "Collection";

  return (
    <>
      {/* Dynamic Breadcrumb */}
      <Breadcrumb current={displayTitle} />

      <section className="products-page">
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: "500", marginBottom: "24px", color: "#24394C", marginTop: "20px" }}>
          {displayTitle} Bags ({filteredProducts.length} bags)
        </div>

        {/* 4-column product layout */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // You can change badge based on category if you like
              badgeType={category === "backpack" ? "New Arrival" : "Bestseller"}
            />
          ))}
          
          {filteredProducts.length === 0 && (
            <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "50px", color: "#8F8F8F" }}>
              No products found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}