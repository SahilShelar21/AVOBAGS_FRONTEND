import { useNavigate } from "react-router-dom";
import "../styles/collections.css";

import backpackImg from "../assets/bags/Collections/Collection_Backpack.png";
import laptopImg from "../assets/bags/Collections/Collection-Laptopbags.png";
import travelImg from "../assets/bags/Collections/Collection-Travelbags.png";
import trolleyImg from "../assets/bags/Collections/Collection-Trollybags.png";

export default function OurCollections() {
  const navigate = useNavigate();

  // Helper function to handle the new route structure
  const handleNavigation = (category) => {
    navigate(`/collection-detail?category=${category}`);
  };

  return (
    <section className="collections">
      <h2 className="collections-title">Our Collections</h2>

      {/* 🔥 ROW 1 */}
      <div className="collections-row row-1">
        <div
          className="collection-card large"
          style={{ backgroundImage: `url(${backpackImg})` }}
          onClick={() => handleNavigation("backpack")} // Updated
        >
          <CollectionContent title="Backpack" />
        </div>

        <div
          className="collection-card small"
          style={{ backgroundImage: `url(${laptopImg})` }}
          onClick={() => handleNavigation("laptop")} // Updated
        >
          <CollectionContent title="Laptop Bags" />
        </div>
      </div>

      {/* 🔥 ROW 2 */}
      <div className="collections-row row-2">
        <div
          className="collection-card small"
          style={{ backgroundImage: `url(${trolleyImg})` }}
          onClick={() => handleNavigation("trolley")} // Updated
        >
          <CollectionContent title="Trolley Bags" />
        </div>

        <div
          className="collection-card large"
          style={{ backgroundImage: `url(${travelImg})` }}
          onClick={() => handleNavigation("travel")} // Updated
        >
          <CollectionContent title="Travel Backpack" />
        </div>
      </div>
    </section>
  );
}

function CollectionContent({ title }) {
  return (
    <div className="collection-content">
      <h3>{title}</h3>
      <p>
        Everyday essentials meet modern design.
        <br />
        Built for comfort and crafted for style.
      </p>
      <button>
        Explore category <span>→</span>
      </button>
    </div>
  );
}