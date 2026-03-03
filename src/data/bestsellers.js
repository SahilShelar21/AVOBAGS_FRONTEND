import bagface from "../assets/bags/Grey_Bag/Grey_show.png";
import bagfacehover from "../assets/bags/Grey_Bag/Grey_BagHover.png";
import bag1_2 from "../assets/bags/Grey_Bag/Grey_feature.png";
import bag1_3 from "../assets/bags/Grey_Bag/Grey_3.png";
import bag1_4 from "../assets/bags/Grey_Bag/Grey_4.png";

import bag2face from "../assets/bags/Blue_Bag/Blue_Show.png";
import bag2facehover from "../assets/bags/Blue_Bag/Blue_Hover.png";
import bag2_2 from "../assets/bags/Blue_Bag/Blue_Main.png";
import bag2_3 from "../assets/bags/Blue_Bag/Blue_3.png";
import bag2_4 from "../assets/bags/Blue_Bag/Blue_4.png";

import bag3face from "../assets/bags/extend_series/BlueBag_Show.png";
import bag3facehover from "../assets/bags/extend_series/BlueBag_Hover.png";
import bag3_2 from "../assets/bags/extend_series/BlueBag_1_2.png";
import bag3_3 from "../assets/bags/extend_series/BlueBag_1_4.png";
import bag3_4 from "../assets/bags/extend_series/BlueBag_1_6.png";

import bag4face from "../assets/bags/Black_Bag/Black_Show.png";
import bag4facehover from "../assets/bags/Black_Bag/Black_Hover.png";
import bag4_2 from "../assets/bags/Black_Bag/Black_1_2.png";
import bag4_3 from "../assets/bags/Black_Bag/Black_1_3.png";
import bag4_4 from "../assets/bags/Black_Bag/Black_1_4.png";


export const bestsellers = [
  {
    id: 1,
    slug: "avo-expedition-pro-grey",
    name: "Avo Expedition Pro– Grey",
    category: "Expedition Series",
    price: 5499.99,
    oldPrice: 6000,
    rating: 4.2,
    reviews: 128,
    stock: 50,
    color: "Grey",
    image: bagface,
    hoverImage: bagfacehover,
    gallery: [bagface, bag1_2, bag1_3, bag1_4],
    features: ["Fits 15.6” Laptop", "Travel"],
    description: "The Avo Expedition Series Backpack is designed for travelers, professionals, and students who need space, smart organization, and security in one premium bag. Built with high-quality Nylon + PU waterproof material, this 35L backpack combines durability, smart organization, and modern functionality.",
    specifications: [
      "2 Front Quick-Access Compartments",
      "25% Expandable Storage",
      "Dedicated 16-inch Laptop Compartment",
      "Hidden Anti-Theft Pocket",
      "USB Charging Port",
      "Available in Black | Blue | Grey"
    ],
    showOnHome: true
  },

  {
    id: 2,
    slug: "avo-expedition-xplorer-blue",
    name: "Avo Expedition Xplorer– Blue",
    category: "Expedition Series",
    price: 5499.99,
    oldPrice: 6000,
    rating: 4.2,
    reviews: 128,
    stock: 50,
    color: "Blue",
    image: bag3face,
    hoverImage: bag3facehover,
    gallery: [bag3face, bag3_2, bag3_3, bag3_4],
    features: ["Fits 15.6” Laptop", "Travel"],
    description: "Designed for modern explorers, the Avo Expedition Xplorer v2 offers expandable storage, waterproof compartments, and secure laptop protection for business and travel.",
    specifications: [
      "Expandable Storage +25%",
      "Power Bank Holder",
      "3 Internal Sections",
      "Secret Anti-Theft Pocket",
      "Premium Water-Resistant Material"
    ],
    showOnHome: true
  },
];
export const products = bestsellers;