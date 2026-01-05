import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ENV } from "../config/env.js";

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and rich sound quality. Ideal for work, travel, and entertainment.",
    price: 149.99,
    stock: 50,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
    ],
    averageRating: 4.5,
    totalReviews: 128,
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness smartwatch with heart rate monitoring, sleep tracking, GPS, and water resistance. Designed for everyday health tracking.",
    price: 199.99,
    stock: 40,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    ],
    averageRating: 4.6,
    totalReviews: 210,
  },
  {
    name: "Leather Wallet",
    description:
      "Slim genuine leather wallet with multiple card slots and RFID protection. Stylish, durable, and perfect for everyday use.",
    price: 39.99,
    stock: 100,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      "https://images.unsplash.com/photo-1601592996847-7f7c8b1e53f8?w=500",
    ],
    averageRating: 4.4,
    totalReviews: 85,
  },
  {
    name: "Stylish Sunglasses",
    description:
      "Modern UV-protected sunglasses with a lightweight frame. Designed to provide comfort and eye protection in bright conditions.",
    price: 59.99,
    stock: 70,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500",
    ],
    averageRating: 4.3,
    totalReviews: 64,
  },
  {
    name: "Men's Casual Shirt",
    description:
      "Comfortable cotton casual shirt with a modern fit. Suitable for daily wear, office casuals, and social outings.",
    price: 49.99,
    stock: 90,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500",
      "https://images.unsplash.com/photo-1495121605193-b116b5b09a4c?w=500",
    ],
    averageRating: 4.2,
    totalReviews: 72,
  },
  {
    name: "Women's Summer Dress",
    description:
      "Lightweight floral summer dress designed for comfort and elegance. Perfect for warm weather and casual occasions.",
    price: 69.99,
    stock: 60,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1520975682031-a7f50c3c7f54?w=500",
      "https://images.unsplash.com/photo-1520975434756-43b8a68ef3b4?w=500",
    ],
    averageRating: 4.6,
    totalReviews: 110,
  },
  {
    name: "Running Shoes",
    description:
      "Lightweight running shoes with breathable material and cushioned soles. Designed for comfort, durability, and performance.",
    price: 119.99,
    stock: 75,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500",
    ],
    averageRating: 4.7,
    totalReviews: 190,
  },
  {
    name: "Yoga Mat",
    description:
      "Non-slip yoga mat with excellent grip and cushioning. Ideal for yoga, pilates, and home workouts.",
    price: 29.99,
    stock: 120,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500",
      "https://images.unsplash.com/photo-1554344058-2d7b70d1f6a5?w=500",
    ],
    averageRating: 4.4,
    totalReviews: 98,
  },
  {
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with most smartphones. Compact design for desks and bedside tables.",
    price: 34.99,
    stock: 80,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
      "https://images.unsplash.com/photo-1610792516286-524726503fb2?w=500",
    ],
    averageRating: 4.3,
    totalReviews: 56,
  },
  {
    name: "Sports Water Bottle",
    description:
      "Durable stainless steel water bottle with temperature retention. Keeps drinks cold or hot for hours during workouts.",
    price: 24.99,
    stock: 150,
    category: "Sports",
    images: [
      "https://images.unsplash.com/photo-1526401485004-2aa7f3b8a53f?w=500",
      "https://images.unsplash.com/photo-1610622714205-c5e8a2f3e8e6?w=500",
    ],
    averageRating: 4.5,
    totalReviews: 140,
  },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(ENV.DB_URL);
        console.log("✅ Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log(" Cleared existing products");

        // Insert seed products 
        await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${products.length} products`);

        // Display summary
        const categories = [...new Set(products.map(p => p.category))];
        console.log("\nSeeded Products Summary:");
        console.log(`Total Products: ${products.length}`);
        console.log(`Categories: ${categories.join(", ")}`);

        // Close connection
        await mongoose.connection.close();
        console.log("\n✅ Database seeding completed and connection closed");
        process.exit(0);
    } catch (error) {
        console.error("⛔ Error seeding database: ", error);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();