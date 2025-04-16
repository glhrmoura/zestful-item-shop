
import { Product } from "../types";

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation for an immersive audio experience.",
    price: 24999,
    imageUrl: "/images/products/headphones.jpg",
    category: "Electronics",
    features: ["Noise cancellation", "40h battery life", "Bluetooth 5.2", "Comfortable design"],
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness goals and stay connected with this stylish smartwatch.",
    price: 19999,
    imageUrl: "/images/products/smartwatch.jpg",
    category: "Electronics",
    features: ["Heart rate monitor", "GPS tracking", "Water resistant", "7-day battery life"],
    inStock: true
  },
  {
    id: 3,
    name: "Designer Backpack",
    description: "Stylish and functional backpack perfect for everyday use or short trips.",
    price: 8999,
    imageUrl: "/images/products/backpack.jpg",
    category: "Fashion",
    features: ["Water resistant", "Laptop compartment", "Multiple pockets", "Adjustable straps"],
    inStock: true
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    description: "Hand-crafted ceramic mug, perfect for your morning coffee or tea.",
    price: 1499,
    imageUrl: "/images/products/mug.jpg",
    category: "Home",
    features: ["Dishwasher safe", "Microwave safe", "12oz capacity"],
    inStock: true
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    description: "Compact yet powerful speaker with crystal clear sound quality.",
    price: 7999,
    imageUrl: "/images/products/speaker.jpg",
    category: "Electronics",
    features: ["10h battery life", "Water resistant", "Built-in microphone", "Compact design"],
    inStock: true
  },
  {
    id: 6,
    name: "Scented Candle Set",
    description: "Set of 3 premium scented candles to create a relaxing atmosphere.",
    price: 3499,
    imageUrl: "/images/products/candles.jpg",
    category: "Home",
    features: ["Natural soy wax", "30h burn time each", "Handmade"],
    inStock: true
  },
  {
    id: 7,
    name: "Yoga Mat",
    description: "Premium non-slip yoga mat for comfortable practice.",
    price: 2999,
    imageUrl: "/images/products/yogamat.jpg",
    category: "Fitness",
    features: ["Non-slip surface", "Eco-friendly materials", "Carrying strap included"],
    inStock: true
  },
  {
    id: 8,
    name: "Digital Camera",
    description: "High-resolution digital camera for capturing your precious moments.",
    price: 59999,
    imageUrl: "/images/products/camera.jpg",
    category: "Electronics",
    features: ["24MP sensor", "4K video", "Wi-Fi connectivity", "Compact design"],
    inStock: false
  }
];
