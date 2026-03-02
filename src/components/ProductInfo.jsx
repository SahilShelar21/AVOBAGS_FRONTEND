export default function ProductInfo({ product }) {
  return (
    <div className="product-info-panel">

      <h1>{product.name}</h1>

      <div className="rating">
        ⭐⭐⭐⭐☆ {product.rating} ({product.reviews} reviews)
      </div>

      <div className="price-row">
        <span className="price">₹{product.price}</span>
        <span className="old">₹{product.oldPrice}</span>
        <span className="discount">Save {product.discount}%</span>
      </div>

      <div className="colors">
        <strong>Colour:</strong> {product.color}
        <div className="color-dots">
          <span />
          <span />
          <span />
        </div>
      </div>

     <div className="features-inline">
  {(product.features || product.specs || []).join(" • ")}
</div>


      <div className="stock">
        🔴 Only {product.stock} left in stock
      </div>

      <div className="properties">
        {product.properties.map(p => (
          <span key={p}>{p}</span>
        ))}
      </div>

      <div className="buttons">
        <button className="add">Add to Bag</button>
        <button className="buy">Buy Now</button>
      </div>

      <div className="tabs">
        <h4>Description</h4>
        <p>{product.description}</p>

        <h4>Specifications</h4>
        <pre>{product.specifications}</pre>
      </div>

    </div>
  );
}
