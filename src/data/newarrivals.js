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


export const newArrivals = [
  {
    id: 5,
    slug: "avo-expedition-shadoow-grey",
    name: "Avo Expedition Shadow-Grey",
    category: "Expedition Series",
    price: 5499.99,
    oldPrice: 8999.99,
    rating: 4.2,
    reviews: 128,
    stock: 100,
    color: "Grey",
    image: bagface,
    hoverImage: bagfacehover,
    gallery: [bagface, bag1_2, bag1_3, bag1_4],
    features: ["Fits 15.6” Laptop", "Travel"],
    description: "The Avo Expedition Shadow-Grey is designed for travelers, professionals and students who need space, smart organization and security in one premium bag. Built with high-quality Nylon + PU waterproof material, 35L backpack combines durability, smart organization and modern functionality.",
    specifications: [
      "2 Front Quick-Access Compartments",
      "Secrate Anti-Theft Pocket",
      "Dedicated Tablet + Laptop Sections",
      "Power Bank Holder",
      "3 Internal Sections",
      "25% Expandable Storage",
      "Dedicated 15.8-inch Laptop Compartment",
      "Hidden Anti-Theft Pocket",
      "USB Charging Port",
      "Available in Cosmic Black | Signature Blue | Shadow Grey"
    ],
    showOnHome: true
  },

  {
    id: 6,
    slug: "avo-expedition-signaturee-blue",
    name: "Avo Expedition Signature-Blue",
    category: "Expedition Series",
    price: 5499.99,
    oldPrice: 8999.99,
    rating: 4.2,
    reviews: 128,
    stock: 100,
    color: "Blue",
    image: bag3face,
    hoverImage: bag3facehover,
    gallery: [bag3face, bag3_2, bag3_3, bag3_4],
    features: ["Fits 15.6” Laptop", "Travel"],
    description: "Designed for modern explorers, The Avo Expedition Signature-Blue offers expandable storage, Waterproof compartments and secure laptop protection for business and travel.",
    specifications: [
      "2 Front Quick-Access Compartments",
      "Secrate Anti-Theft Pocket",
      "Dedicated Tablet + Laptop Sections",
      "Power Bank Holder",
      "3 Internal Sections",
      "25% Expandable Storage",
      "Dedicated 15.8-inch Laptop Compartment",
      "Hidden Anti-Theft Pocket",
      "USB Charging Port",
      "Available in Cosmic Black | Signature Blue | Shadow Grey"
    ],
    showOnHome: true
  },

  {
    id: 7,
    slug: "avo-expedition-cosmic-black",
    name: "Avo Expedition Cosmic Black",
    category: "Expedition Series",
    price: 5499.99,
    oldPrice: 8999.99,
    rating: 4.2,
    reviews: 128,
    stock: 100,
    color: "Black",
    image: bag4face,
    hoverImage: bag4facehover,
    gallery: [bag4face, bag4_2, bag4_3, bag4_4],
    features: ["Fits 15.6” Laptop", "Travel"],
    description: "A bold and powerful travel companion, The Avo Expedition Cosmic Black is built for durability, security and modern professional needs.",
    specifications: [
      "2 Front Quick-Access Compartments",
      "Secrate Anti-Theft Pocket",
      "Dedicated Tablet + Laptop Sections",
      "Power Bank Holder",
      "3 Internal Sections",
      "25% Expandable Storage",
      "Dedicated 15.8-inch Laptop Compartment",
      "Hidden Anti-Theft Pocket",
      "USB Charging Port",
      "Available in Cosmic Black | Signature Blue | Shadow Grey"
    ],
    showOnHome: true
  },
  {
    id: 8,
    slug: "avo-essential-signature-blue",
    name: "Avo Essential Signature Blue",
    category: "Essential Series",
    price: 1,
    oldPrice: 7999.99,
    rating: 4.2,
    reviews: 128,
    stock: 100,
    color: "Blue",
    image: bag2face,
    hoverImage: bag2facehover,
    gallery: [bag2face, bag2_2, bag2_3, bag2_4],
    features: ["Fits 15.6” Laptop", "Travel"],
    description: "The Avo Essential Signature Blue is crafted for daily professionals and students who need sleek design, comfort and efficient organization.",
    specifications: [
      "2 Front Quick-Access Compartments",
      "Secrate Anti-Theft Pocket",
      "Dedicated Tablet + Laptop Sections",
      "Power Bank Holder",
      "3 Internal Sections",
      "25% Expandable Storage",
      "Dedicated 15.8-inch Laptop Compartment",
      "Hidden Anti-Theft Pocket",
      "USB Charging Port",
      "Available in Signature Blue"
    ],
    showOnHome: true
  }
];
