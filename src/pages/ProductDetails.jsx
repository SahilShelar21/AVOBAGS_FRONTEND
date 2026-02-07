import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { bestsellers } from "../data/bestsellers";
import { newArrivals } from "../data/newarrivals";
import Breadcrumb from "../components/Breadcrumb";
import JustForYou from "../components/JustForYou";
import { getSessionId } from "../utils/session";
import fitsInIcon from "../assets/bags/Products_details/fits_in.png";
import capacityIcon from "../assets/bags/Products_details/capacity.png";
import useIcon from "../assets/bags/Products_details/use_in.png";
import warrantyIcon from "../assets/bags/Products_details/warranty.png";
import returnIcon from "../assets/bags/Products_details/return.png";
import shippingIcon from "../assets/bags/Products_details/shipping.png";
import { useNavigate } from "react-router-dom";


import "../styles/product-details.css";

export default function ProductDetails({ fetchCart, openCart }) {
  console.log("fetchCart:", fetchCart);
  console.log("openCart:", openCart);

  const { slug } = useParams();
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();

  const allProducts = [...bestsellers, ...newArrivals];
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) return null;

  const displayImage = mainImage || product.image;
  const featureIcons = [fitsInIcon, capacityIcon, useIcon];

  const servicesData = [
    { text: "1-Year Warranty", icon: warrantyIcon },
    { text: "Easy 30-Day Return", icon: returnIcon },
    { text: "Free Express Shipping", icon: shippingIcon },
  ];

  const handleBuyNow = () => {
  navigate("/checkout", {
    state: {
      items: [
        {
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      ],
    },
  });
}; 
  // ✅ ADD TO CART (FINAL & WORKING)
  const handleAddToCart = async () => {
  try {
    await fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getSessionId(),
        productId: product.id,
        quantity: 1,
        price: Number(product.price), // 🔑 ensure number
      }),
    });

    await fetchCart();
    openCart();
  } catch (err) {
    console.error("ADD TO CART FAILED:", err);
  }
};


  return (
    <section className="product-page">
      <Breadcrumb
        items={[
          { name: "Bestsellers", link: "/bestsellers" },
          { name: product.name },
        ]}
      />

      <div className="product-wrapper">
        {/* LEFT */}
        <div className="gallery">
          <div className="thumbs">
            {product.gallery.map((img, i) => (
              <img key={i} src={img} alt="" onClick={() => setMainImage(img)} />
            ))}
          </div>

          <div className="main-image">
            <img src={displayImage} alt={product.name} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="info">
          <h1>{product.name}</h1>

          <div className="rating">
            ⭐⭐⭐⭐☆ <span>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className="price-row">
            <span className="price">₹{product.price}</span>
            {product.oldPrice && <span className="old">₹{product.oldPrice}</span>}
            <span className="save">Save 10%</span>
          </div>

          <div className="features">
            {product.features.map((feature, index) => (
              <div className="feature-pill" key={index}>
                <img src={featureIcons[index]} alt="" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="stock">🟠 Only {product.stock} left in stock</div>

          <div className="services">
            {servicesData.map((s, i) => (
              <div key={i} className="service-item">
                <img src={s.icon} alt="" />
                <span>{s.text}</span>
              </div>
            ))}
          </div>

          {/* ✅ FIXED BUTTON */}
          <div className="buttons">
            <motion.button
              className="add"whileHover={{scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",}}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => {
              console.log("ADD TO BAG CLICKED");
              handleAddToCart();  
              }}>Add to Bag </motion.button>

          <motion.button className="buy" whileHover={{scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",}}
              whileTap={{ scale: 0.96 }}
            onClick={handleBuyNow}>
            Buy Now
          </motion.button>
          </div>

          {/* TABS */}
          <div className="tabs-container">
            <div className="tab-headers">
              <button
                className={activeTab === "description" ? "active" : ""}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={activeTab === "specifications" ? "active" : ""}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "description" ? (
                <p>{product.description}</p>
              ) : (
                <ul>
                  {product.specifications.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40, marginBottom: 80 }}>
        <JustForYou />
      </div>
    </section>
  );
}
