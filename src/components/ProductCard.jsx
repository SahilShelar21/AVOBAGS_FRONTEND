import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, badgeType = "Bestseller" }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.slug}`)}
      style={{ cursor: "pointer" }}
    >
      {/* Badge */}
      <span
        className={`badge badge-${badgeType
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        {badgeType}
      </span>

      {/* Images */}
      <div className="product-image">
        <img
          className="img-default"
          src={product.image}
          alt={product.name}
        />
        <img
          className="img-hover"
          src={product.hoverImage}
          alt={product.name}
        />
      </div>

      {/* Info */}
      <div className="product-info">
        <div className="name-rating">
          <h3>{product.name}</h3>
          <span>
            ⭐ {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="price">₹{product.price}</div>

        <div className="features">
          {product.features.join(" • ")}
        </div>
      </div>
    </div>
  );
}
