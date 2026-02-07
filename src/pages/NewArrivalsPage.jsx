import { newArrivals } from "../data/newarrivals";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";

export default function NewArrivalsPage() {
  return (
    <>
      <Breadcrumb current="New Arrivals" />

      <section className="products-page">
        <Filters total={newArrivals.length} />

        <div className="products-grid">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} badgeType="New" />
          ))}
        </div>
      </section>
    </>
  );
}
