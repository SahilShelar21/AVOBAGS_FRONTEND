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

export const bestsellers = [
  {
    id: 1,
    slug: "classic-travel-backpack-v1",
    name: "Classic Travel Backpack",
    price:189.99,
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
    price:189.99,
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
    price:189.99,
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
    price:189.99,
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
    price:189.99,
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
    price:189.99,
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
  }
];

export const products = bestsellers;