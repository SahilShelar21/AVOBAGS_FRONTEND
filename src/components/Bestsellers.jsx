import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { bestsellers } from "../data/bestsellers";
import "../styles/bestsellers.css";

export default function Bestsellers() {
  const navigate = useNavigate();
  const homeProducts = bestsellers.filter(p => p.showOnHome);

  return (
    <section className="bestsellers">
      <div className="bestsellers-header">
        <h2>Bestsellers</h2>
        <Link to="/products" className="view-all">
          View all products →
        </Link>
      </div>

      <div className="bestsellers-grid">
        {homeProducts.map(item => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/product/${item.slug}`)}
            style={{ cursor: "pointer" }}
          >
            <span className="badge badge-bestseller">Bestseller</span>
            <div className="product-image">
              <img src={item.image} className="img-default" alt={item.name} />
              <img src={item.hoverImage} className="img-hover" alt={item.name} />
            </div>

            <div className="product-info">
              <div className="name-rating">
                <h3>{item.name}</h3>
                <span>⭐ {item.rating} ({item.reviews})</span>
              </div>

              <div className="price">{item.price}</div>

              <div className="features">
                {item.features.map((f, i) => (
                  <span key={i}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
