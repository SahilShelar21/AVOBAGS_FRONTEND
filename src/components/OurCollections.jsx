import { useNavigate } from "react-router-dom";
import "../styles/collections.css";

import backpackImg from "../assets/bags/Collections/Collection_Backpacks.png";
import laptopImg from "../assets/bags/Collections/Collection_Laptopbags.png";
import travelImg from "../assets/bags/Collections/Collection-Travelbags.png";
import trolleyImg from "../assets/bags/Collections/Collection_Trolleybags.png";

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
          onClick={() => handleNavigation("Expedition Series")}
        >
          <CollectionContent title="Expedition Series" />
        </div>

        <div
          className={`collection-card small coming-soon`}
          style={{ backgroundImage: `url(${laptopImg})` }}
        >
          <div className="coming-soon-badge">Coming&nbsp;Soon</div>
          <CollectionContent title="Laptop Bags" />
        </div>
      </div>

      {/* 🔥 ROW 2 */}
      <div className="collections-row row-2">
        <div
          className="collection-card small coming-soon"
          style={{ backgroundImage: `url(${trolleyImg})` }}
        >
          <div className="coming-soon-badge">Coming&nbsp;Soon</div>
          <CollectionContent title="Trolley Bags" />
        </div>

        <div
          className="collection-card large"
          style={{ backgroundImage: `url(${travelImg})` }}
          onClick={() => handleNavigation("Essential Series")}
        >
          <CollectionContent title="Essential Series" />
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