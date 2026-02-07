import bag1 from "../assets/bags/Backpack.png";
import bag1Hover from "../assets/bags/Backpack Lady.png";
import bag2 from "../assets/bags/Backpack.png";
import bag2Hover from "../assets/bags/Backpack Lady.png";
import bag3 from "../assets/bags/Backpack.png";
import bag3Hover from "../assets/bags/Backpack Lady.png";
import bag4 from "../assets/bags/Backpack.png";
import bag4Hover from "../assets/bags/Backpack Lady.png";
import bag5 from "../assets/bags/Backpack.png";
import bag5Hover from "../assets/bags/Backpack Lady.png";
import bag6 from "../assets/bags/Backpack.png";
import bag6Hover from "../assets/bags/Backpack Lady.png";
import bagHover from "../assets/bags/Backpack Lady.png";


export const allProducts = [
  {
    id: 1,
    slug: "classic-travel-backpack-v1",
    name: "Classic Travel Backpack",
    category: "backpack", // Matches navigation from OurCollections
    price: 189.99,
    oldPrice: 209.99,
    rating: 4.2,
    reviews: 128,
    stock: 15,
    color: "Jet Black",
    image: bag1,
    hoverImage: bag1Hover,
    gallery: [bag1, bag1Hover, bag1, bag1Hover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "The ultimate companion for the daily commuter. Designed with ergonomics in mind and built with water-resistant polyester.",
    specifications: [
      "Capacity: 24L",
      "Material: Premium Polyester",
      "Weight: 850g",
      "Warranty: 1 Year"
    ],
    showOnHome: true
  },
  {
    id: 2,
    slug: "urban-explorer-pack",
    name: "Urban Explorer Pack",
    category: "backpack",
    price: 189.99,
    oldPrice: 189.99,
    rating: 4.5,
    reviews: 89,
    stock: 8,
    color: "Charcoal",
    image: bag2,
    hoverImage: bag2Hover,
    gallery: [bag2, bag2Hover, bag2, bag2Hover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "Navigate the city streets with confidence. Features hidden pockets and a sleek, minimal silhouette.",
    specifications: [
      "Capacity: 24L",
      "Material: High-Grade Nylon",
      "Weight: 900g",
      "Features: Hidden Zippers"
    ],
    showOnHome: true
  },
  {
    id: 3,
    slug: "professional-commuter",
    name: "Professional Commuter",
    category: "laptop", // Assigned to Laptop category
    price: 189.99,
    oldPrice: 220.00,
    rating: 4.8,
    reviews: 210,
    stock: 12,
    color: "Navy Blue",
    image: bag3,
    hoverImage: bag3Hover,
    gallery: [bag3, bag3Hover, bag3, bag3Hover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "A premium backpack for the high-end professional. Includes a dedicated padded compartment for tech gear.",
    specifications: [
      "Capacity: 24L",
      "Material: Ballistic Nylon",
      "Weight: 950g",
      "Warranty: 2 Years"
    ],
    showOnHome: true
  },
  {
    id: 4,
    slug: "daily-essential-bag",
    name: "Daily Essential Bag",
    category: "laptop",
    price: 189.99,
    oldPrice: 189.99,
    rating: 4.2,
    reviews: 56,
    stock: 20,
    color: "Grey",
    image: bag4,
    hoverImage: bag4Hover,
    gallery: [bag4, bag4Hover, bag4, bag4Hover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "Simple, effective, and stylish. The perfect bag for students and light travelers alike.",
    specifications: [
      "Capacity: 24L",
      "Material: Eco-Canvas",
      "Weight: 700g",
      "Style: Minimalist"
    ],
    showOnHome: true
  },
  {
    id: 5,
    slug: "hiking-adventure-pack",
    name: "Hiking Adventure Pack",
    category: "travel", // Assigned to Travel Backpack category
    price: 189.99,
    oldPrice: 299.99,
    rating: 4.9,
    reviews: 340,
    stock: 5,
    color: "Forest Green",
    image: bag5,
    hoverImage: bag5Hover,
    gallery: [bag5, bag5Hover, bag5, bag5Hover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "Built for the wild. This heavy-duty pack includes a rain cover and specialized gear loops for hiking equipment.",
    specifications: [
      "Capacity: 40L",
      "Material: Ripstop Nylon",
      "Weight: 1.2kg",
      "Weather: Fully Waterproof"
    ],
    showOnHome: false
  },
  {
    id: 6,
    slug: "compact-daypack-mini",
    name: "Compact Daypack",
    category: "trolley", // Example assignment for Trolley category
    price: 189.99,
    oldPrice: 119.99,
    rating: 4.0,
    reviews: 41,
    stock: 25,
    color: "Tan",
    image: bag6,
    hoverImage: bag6Hover,
    gallery: [bag6, bag6Hover, bag6, bag6Hover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "When you only need the essentials. This mini-pack is perfect for quick trips and weekend walks.",
    specifications: [
      "Capacity: 12L",
      "Material: Soft Polyester",
      "Weight: 450g",
      "Type: Daypack"
    ],
    showOnHome: false
  }, 

  {
    id: 7,
    slug: "classic-travel-backpack-v1",
    name: "Classic Travel Backpack",
    category: "backpack",
    price: 189.99,
    oldPrice: 209.99,
    rating: 4.2,
    reviews: 128,
    stock: 15,
    color: "Jet Black",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "The ultimate companion for the daily commuter. Designed with ergonomics in mind and built with water-resistant polyester.",
    specifications: ["Capacity: 24L", "Material: Premium Polyester", "Weight: 850g", "Warranty: 1 Year"],
    showOnHome: true
  },
  {
    id: 8,
    slug: "professional-commuter",
    name: "Professional Commuter",
    category: "laptop",
    price: 189.99,
    oldPrice: 220.00,
    rating: 4.8,
    reviews: 210,
    stock: 12,
    color: "Navy Blue",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "A premium backpack for the high-end professional. Includes a dedicated padded compartment for tech gear.",
    specifications: ["Capacity: 24L", "Material: Ballistic Nylon", "Weight: 950g", "Warranty: 2 Years"],
    showOnHome: true
  },

  /* --- NEW ARRIVALS (Mapped to Categories) --- */
  {
    id: 9,
    slug: "classic-travel-backpack-na",
    name: "Classic Travel Backpack",
    category: "backpack",
    price: 179.99,
    oldPrice: 209.99,
    rating: 4.2,
    reviews: 128,
    stock: 20,
    color: "Jet Black",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "Designed for modern professionals, this backpack blends durability with style for the perfect daily carry.",
    specifications: ["Material: Water-resistant fabric", "Laptop Sleeve: Padded", "Back Panel: Breathable Mesh", "Warranty: 1 Year"],
    showOnHome: true
  },
  {
    id: 10,
    slug: "urban-laptop-backpack-v2",
    name: "Urban Laptop Backpack",
    category: "laptop",
    price: 179.99,
    oldPrice: 199.99,
    rating: 4.5,
    reviews: 96,
    stock: 12,
    color: "Space Grey",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "Stay connected on the go with an integrated charging port and premium waterproof protection.",
    specifications: ["Port: External USB", "Rating: IPX4 Waterproof", "Security: Hidden Anti-theft Pocket", "Warranty: 2 Years"],
    showOnHome: true
  },
  {
    id: 11,
    slug: "minimal-office-pack-slim",
    name: "Minimal Office Backpack",
    category: "laptop",
    price: 179.99,
    oldPrice: 185.00,
    rating: 4.1,
    reviews: 64,
    stock: 15,
    color: "Navy Blue",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "A sleek, low-profile design that packs everything you need for the office without the bulk.",
    specifications: ["Profile: 12cm Slim", "Finish: Premium Matte", "Internal dividers: Organized", "Weight: 650g"],
    showOnHome: true
  },
  {
    id: 12,
    slug: "daily-travel-pack-v4",
    name: "Daily Travel Pack",
    category: "travel",
    price: 179.99,
    oldPrice: 179.99,
    rating: 4.3,
    reviews: 88,
    stock: 18,
    color: "Charcoal",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "The versatile choice for commuters who head straight from the office to the gym or weekend trips.",
    specifications: ["Base: Reinforced Material", "Pockets: Quick-access Side", "Straps: Ergonomic Shoulder", "Capacity: 24L"],
    showOnHome: true
  },
  {
    id: 13,
    slug: "explorer-backpack-heavy-duty",
    name: "Explorer Backpack",
    category: "trolley", // Assigning to Trolley to populate that category
    price: 179.99,
    oldPrice: 240.00,
    rating: 4.6,
    reviews: 112,
    stock: 10,
    color: "Olive Drab",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "Our most spacious arrival yet, built to withstand harsh conditions while keeping your gear safe.",
    specifications: ["Capacity: 30L", "Material: Ripstop Nylon", "Travel: Luggage Strap Included", "Durability: Heavy Duty"],
    showOnHome: false
  },
    {
    id: 14,
    slug: "daily-travel-pack-v4",
    name: "Daily Travel Pack",
    category: "travel",
    price: 179.99,
    oldPrice: 179.99,
    rating: 4.3,
    reviews: 88,
    stock: 18,
    color: "Charcoal",
    image: bag1,
    hoverImage: bagHover,
    gallery: [bag1, bagHover, bag1, bagHover],
    features: ["Fits 15.6”", "24L", "Office use"],
    description: "The versatile choice for commuters who head straight from the office to the gym or weekend trips.",
    specifications: ["Base: Reinforced Material", "Pockets: Quick-access Side", "Straps: Ergonomic Shoulder", "Capacity: 24L"],
    showOnHome: false
  },
];
