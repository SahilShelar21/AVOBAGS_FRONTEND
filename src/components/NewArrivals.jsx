import { Link } from "react-router-dom";
import { newArrivals } from "../data/newarrivals";
import "../styles/bestsellers.css";

export default function NewArrivals() {
  return (
    <section className="bestsellers">
      <div className="bestsellers-header">
        <h2>New Arrivals</h2>
        <Link to="/new-arrivals" className="view-all">
          View all products →
        </Link>
      </div>

      <div className="bestsellers-grid">
        {newArrivals
          .filter(item => item.showOnHome)
          .slice(0, 4)
          .map(item => {
            // ✅ NORMALIZE FEATURES (array or string)
            const features = Array.isArray(item.features)
              ? item.features
              : Array.isArray(item.specs)
              ? item.specs
              : typeof item.features === "string"
              ? item.features.split("•")
              : typeof item.specs === "string"
              ? item.specs.split("•")
              : [];

            return (
              <div key={item.id} className="product-card">
                <span className="badge new">New</span>

                {/* IMAGE */}
                <div className="product-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-default"
                  />
                  {item.hoverImage && (
                    <img
                      src={item.hoverImage}
                      alt={item.name}
                      className="img-hover"
                    />
                  )}
                </div>

                {/* INFO */}
                <div className="product-info">
                  <div className="name-rating">
                    <h3>{item.name}</h3>
                    <span className="rating">
                      ⭐ {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="price">₹{item.price}</div>

                  <div className="features">
                    {(Array.isArray(item.features) ? item.features : item.specs || []).map((f, i) => (
                      <span key={i}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
