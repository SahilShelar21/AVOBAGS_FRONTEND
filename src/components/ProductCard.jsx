import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, badgeType = "Bestseller" }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="product-card"
      onClick={() => navigate(`/product/${product.slug}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: { duration: 0.25 },
      }}
      whileTap={{ scale: 0.97 }}
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
    </motion.div>
  );
}
