require('dotenv').config();
const Product = require('../src/models/Product');
const { connectDB, sequelize } = require('../src/config/database');

const products = [
  // ===== ELECTRONICS (15 products) =====
  {
    title: 'Samsung 55" 4K Smart TV',
    description: 'Ultra HD 4K Smart TV with voice control and smart apps, HDR support for stunning picture quality',
    price: 45999,
    originalPrice: 65999,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop'],
    category: 'Electronics',
    rating: 4.5,
    stock: 50,
    specifications: {
      'Screen Size': '55 inches',
      'Resolution': '4K UHD (3840x2160)',
      'Refresh Rate': '60Hz',
      'Smart Platform': 'Tizen',
      'Connectivity': 'WiFi, HDMI, USB',
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
      'https://images.unsplash.com/photo-1507842872343-583f20270319?w=400&h=400&fit=crop',
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
  {
    title: 'Organic Coffee Beans',
    description: 'Premium organic coffee beans from Brazil',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=400&h=400&fit=crop',
    ],
    category: 'Groceries',
    rating: 4.6,
    stock: 200,
    specifications: {
      Weight: '500g',
      Type: 'Ground',
      Origin: 'Brazil',
    },
    seller: 'Coffee House',
  },
  {
    title: 'Artisan Dark Chocolate',
    description: 'Premium dark chocolate with 85% cocoa',
    price: 399,
    originalPrice: 599,
    discount: 33,
    image:
      'https://images.unsplash.com/photo-1578926029696-e4c01e64ad0e?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578926029696-e4c01e64ad0e?w=400&h=400&fit=crop',
    ],
    category: 'Groceries',
    rating: 4.7,
    stock: 150,
    specifications: {
      Weight: '100g',
      'Cocoa Content': '85%',
      Type: 'Dark Chocolate',
    },
    seller: 'Gourmet Treats',
  },
  {
    title: 'Kids Building Blocks',
    description: 'Colorful building blocks for kids aged 3+',
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    image:
      'https://images.unsplash.com/photo-1594697318286-3d906e504d45?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594697318286-3d906e504d45?w=400&h=400&fit=crop',
    ],
    category: 'Toys',
    rating: 4.8,
    stock: 100,
    specifications: {
      'Age Group': '3+',
      'Piece Count': '200',
      Material: 'Plastic',
    },
    seller: 'Toy Land',
  },
  {
    title: 'Educational Robot Kit',
    description: 'Learn coding with interactive robot kit',
    price: 4999,
    originalPrice: 7999,
    discount: 37,
    image:
      'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=400&h=400&fit=crop',
    ],
    category: 'Toys',
    rating: 4.9,
    stock: 50,
    specifications: {
      'Age Group': '8+',
      'Programming': 'Visual & Python',
      'Battery Life': '6 hours',
    },
    seller: 'Tech Toys',
  },
  {
    title: 'Moisturizing Face Cream',
    description: 'Intensive moisturizing cream for all skin types',
    price: 599,
    originalPrice: 999,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    ],
    category: 'Beauty',
    rating: 4.6,
    stock: 120,
    specifications: {
      'Volume': '50ml',
      Type: 'Cream',
      'Skin Type': 'All Types',
    },
    seller: 'Beauty Plus',
  },
  {
    title: 'Organic Shampoo',
    description: 'Natural organic shampoo for healthy hair',
    price: 349,
    originalPrice: 699,
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop',
    ],
    category: 'Beauty',
    rating: 4.5,
    stock: 180,
    specifications: {
      'Volume': '250ml',
      Type: 'Organic',
      'Hair Type': 'All Hair Types',
    },
    seller: 'Natural Beauty',
  },
  {
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable Bluetooth speaker with 360 sound',
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    ],
    category: 'Electronics',
    rating: 4.7,
    stock: 90,
    specifications: {
      'Battery Life': '12 hours',
      Waterproof: 'IPX7',
      'Power': '20W',
    },
    seller: 'Audio Pro',
  },
  {
    title: '5D Home Theater Sofa',
    description: 'Comfortable 5-seater sofa perfect for home theater',
    price: 24999,
    originalPrice: 39999,
    discount: 37,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    ],
    category: 'Home',
    rating: 4.6,
    stock: 20,
    specifications: {
      'Seating Capacity': '5',
      Material: 'Premium Fabric',
      'Recliners': 'Yes',
    },
    seller: 'Furniture Plus',
  },
  {
    title: 'Kitchen Knife Set',
    description: 'Professional 6-piece kitchen knife set with holder',
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    image:
      'https://images.unsplash.com/photo-1596040707171-b0621a8a7c37?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596040707171-b0621a8a7c37?w=400&h=400&fit=crop',
    ],
    category: 'Home',
    rating: 4.5,
    stock: 60,
    specifications: {
      'Piece Count': '6',
      Material: 'Stainless Steel',
      Type: 'Professional',
    },
    seller: 'Kitchen Master',
  },
  {
    title: 'Cotton Bed Sheet Set',
    description: 'Premium Egyptian cotton bed sheet set (King size)',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1585799033842-bdb904a4df2d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585799033842-bdb904a4df2d?w=400&h=400&fit=crop',
    ],
    category: 'Home',
    rating: 4.7,
    stock: 100,
    specifications: {
      Size: 'King',
      Material: 'Egyptian Cotton',
      'Thread Count': '400',
    },
    seller: 'Bedding Store',
  },
  {
    title: 'Dumbbell Set (20kg)',
    description: 'Complete 20kg dumbbell set with stand',
    price: 3999,
    originalPrice: 6999,
    discount: 43,
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    ],
    category: 'Sports',
    rating: 4.6,
    stock: 40,
    specifications: {
      'Total Weight': '20kg',
      Material: 'Iron',
      'Includes Stand': 'Yes',
    },
    seller: 'Fitness Equipment',
  },
  {
    title: 'Cricket Bat',
    description: 'Professional cricket bat for tournament play',
    price: 2999,
    originalPrice: 5999,
    discount: 50,
    image:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=400&fit=crop',
    ],
    category: 'Sports',
    rating: 4.8,
    stock: 55,
    specifications: {
      Material: 'English Willow',
      Size: 'Standard',
      Grade: 'Grade A',
    },
    seller: 'Sports Pro',
  },
  {
    title: 'Designer Handbag',
    description: 'Premium leather designer handbag - perfect gift',
    price: 5999,
    originalPrice: 9999,
    discount: 40,
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    ],
    category: 'Fashion',
    rating: 4.7,
    stock: 30,
    specifications: {
      Material: 'Genuine Leather',
      Color: 'Black',
      Size: 'Medium',
    },
    seller: 'Fashion Designer',
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing products
    await Product.destroy({ where: {} });
    console.log('Cleared existing products');

    // Insert new products
    const createdProducts = await Product.bulkCreate(products);
    console.log(`${createdProducts.length} products inserted`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
