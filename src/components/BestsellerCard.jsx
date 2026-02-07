export default function BestsellerCard({ product }) {
  return (
    <div className="bestseller-card">
      <div className="badge">Bestseller</div>

      <div className="image-box">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="card-info">
        <div className="name-rating">
          <h3>{product.name}</h3>
          <span className="rating">
            ⭐ {product.rating}
            <span className="reviews"> ({product.reviews})</span>
          </span>
        </div>

        <div className="price">{product.price}</div>
        <p className="specs">{product.specs}</p>
      </div>
    </div>
  );
}
