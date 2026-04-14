require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const User = require('../src/models/User');
const connectDB = require('../src/config/database');

const products = [
  {
    title: 'Samsung 55" 4K Smart TV',
    description: 'Ultra HD 4K Smart TV with voice control and smart apps',
    price: 45999,
    originalPrice: 65999,
    discount: 30,
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.5,
    stock: 50,
    specifications: {
      Resolution: '4K UHD',
      'Refresh Rate': '60Hz',
      'Smart Platform': 'Tizen',
      Connectivity: 'WiFi, HDMI, USB',
    },
    seller: 'Samsung',
  },
  {
    title: 'iPhone 14 Pro Max',
    description: 'Latest Apple smartphone with advanced camera system',
    price: 99999,
    originalPrice: 119999,
    discount: 17,
    image:
      'https://images.unsplash.com/photo-1592286927505-1def25e82f7d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25e82f7d?w=400&h=400&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.8,
    stock: 100,
    specifications: {
      RAM: '6GB',
      Storage: '128GB',
      'Camera': '48MP',
      'Battery': '3200mAh',
    },
    seller: 'Apple',
  },
  {
    title: 'Sony WH-1000XM4 Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 24990,
    originalPrice: 29990,
    discount: 17,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.7,
    stock: 75,
    specifications: {
      'Noise Cancellation': 'Active',
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
    },
    seller: 'Sony',
  },
  {
    title: 'Mens Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt for everyday wear',
    price: 399,
    originalPrice: 699,
    discount: 43,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    ],
    category: 'Fashion',
    rating: 4.3,
    stock: 200,
    specifications: {
      Material: '100% Cotton',
      Sizes: 'XS-XXL',
      'Available Colors': '5',
    },
    seller: 'Fashion Hub',
  },
  {
    title: 'Women Summer Dress',
    description: 'Elegant summer dress perfect for casual outings',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    image:
      'https://images.unsplash.com/photo-1595528871973-50c08432c891?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595528871973-50c08432c891?w=400&h=400&fit=crop',
    ],
    category: 'Fashion',
    rating: 4.6,
    stock: 150,
    specifications: {
      Material: 'Polyester Blend',
      Fit: 'Regular',
      'Available Sizes': '6-16',
    },
    seller: 'Fashion Couture',
  },
  {
    title: 'Wooden Coffee Table',
    description: 'Modern wooden coffee table with storage',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    ],
    category: 'Home',
    rating: 4.4,
    stock: 30,
    specifications: {
      Material: 'Solid Wood',
      Dimensions: '100x50x45cm',
      Finish: 'Matte',
    },
    seller: 'Home Decor Co',
  },
  {
    title: 'Smart LED Bulb',
    description: 'WiFi controlled LED bulb with 16M colors',
    price: 599,
    originalPrice: 999,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1565636192335-14c02ff12002?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565636192335-14c02ff12002?w=400&h=400&fit=crop',
    ],
    category: 'Home',
    rating: 4.5,
    stock: 120,
    specifications: {
      'Color Options': '16M',
      Brightness: '800 Lumens',
      'Connectivity': 'WiFi',
    },
    seller: 'Smart Home',
  },
  {
    title: 'Running Shoes',
    description: 'Professional running shoes with comfortable sole',
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    ],
    category: 'Sports',
    rating: 4.7,
    stock: 80,
    specifications: {
      Material: 'Mesh & Synthetic',
      'Sole Type': 'Rubber',
      'Available Sizes': '5-13',
    },
    seller: 'Sports Gear',
  },
  {
    title: 'Yoga Mat',
    description: 'Non-slip yoga mat for fitness and meditation',
    price: 799,
    originalPrice: 1499,
    discount: 47,
    image:
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    ],
    category: 'Sports',
    rating: 4.4,
    stock: 160,
    specifications: {
      'Thickness': '5mm',
      'Material': 'Natural Rubber',
      'Size': '173x61cm',
    },
    seller: 'Fitness Plus',
  },
  {
    title: 'Programming in Python',
    description: 'Comprehensive guide to Python programming',
    price: 599,
    originalPrice: 999,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-150784272343-583f20270319?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=400&fit=crop',
    ],
    category: 'Books',
    rating: 4.6,
    stock: 50,
    specifications: {
      Pages: '500',
      Author: 'John Doe',
      'Publication Year': '2023',
    },
    seller: 'Tech Books',
  },
  {
    title: 'The Art of Minimalism',
    description: 'Learn the principles of minimalist living',
    price: 349,
    originalPrice: 599,
    discount: 42,
    image:
      'https://images.unsplash.com/photo-1544524885-2833d68aba8d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544524885-2833d68aba8d?w=400&h=400&fit=crop',
    ],
    category: 'Books',
    rating: 4.5,
    stock: 75,
    specifications: {
      Pages: '300',
      Author: 'Jane Smith',
      'Publication Year': '2022',
    },
    seller: 'Lifestyle Books',
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products inserted`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
