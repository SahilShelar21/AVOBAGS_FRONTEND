import { useState } from "react";

export default function ProductGallery({ gallery = [] }) {
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <div className="product-gallery">
      {/* THUMBNAILS */}
      <div className="gallery-thumbs">
        {gallery.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Product thumbnail"
            className={`thumb ${activeImage === img ? "active" : ""}`}
            onClick={() => setActiveImage(img)}
          />
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="gallery-main">
        <img src={activeImage} alt="Selected product" />
      </div>
    </div>
  );
}