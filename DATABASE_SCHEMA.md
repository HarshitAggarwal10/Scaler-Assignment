# Database Schema & Architecture Documentation

## Overview

The Flipcart platform uses **MongoDB** with **Mongoose** for data persistence. This document outlines the complete database design with relationships and indexing strategy.

---

## Collections Overview

```
users
├── Authentication & Profile info
├── Links to Orders & Cart
└── Role-based access control

products
├── Product details & pricing
├── Images & specifications
├── Inventory management
└── Category classification

orders
├── User order history
├── Order items with snapshots
├── Shipping & payment details
└── Order status tracking

carts
├── Shopping session data
├── Product references
└── Quantity tracking

wishlists
├── User's saved products
└── Personal collection
```

---

## Detailed Schema Design

### 1. USER Collection

**Fields:**
```javascript
{
  _id: ObjectId,
  
  // Personal Info
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (hashed, required, min 6 chars),
  phone: String,
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  
  // Metadata
  avatar: String (URL),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: now)
}
```

**Indexes:**
```javascript
{ email: 1 }  // For login lookups
```

**Key Features:**
- Password hashing with bcryptjs (10 salt rounds)
- Email verification ready
- Role-based access control (RBAC)
- Timestamps for audit trail

---

### 2. PRODUCT Collection

**Fields:**
```javascript
{
  _id: ObjectId,
  
  // Basic Info
  title: String (required),
  description: String (required),
  
  // Pricing & Discounts
  price: Number (required, min: 0),
  originalPrice: Number,
  discount: Number (0-100),
  
  // Images
  image: String (required, main image),
  images: [String], // Multiple product images
  
  // Classification
  category: String (enum: [
    'Electronics',
    'Fashion',
    'Home',
    'Books',
    'Sports',
    'Toys',
    'Beauty',
    'Groceries'
  ]),
  
  // Reviews & Ratings
  rating: Number (0-5, default: 4.5),
  reviews: [{
    user: ObjectId (ref: User),
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  
  // Inventory
  stock: Number (required, default: 0),
  
  // Specifications (Dynamic)
  specifications: Map<String, String>, // e.g., { "RAM": "8GB", "Color": "Blue" }
  
  // Seller Info
  seller: String,
  
  // Status
  isActive: Boolean (default: true),
  createdAt: Date (default: now)
}
```

**Indexes:**
```javascript
{ title: 'text', description: 'text' }  // Full-text search
{ category: 1 }                          // Category filtering
{ price: 1 }                             // Price sorting
```

**Calculations (Frontend):**
- Discount percentage: `(originalPrice - price) / originalPrice * 100`
- Effective price: `price * quantity`

---

### 3. ORDER Collection

**Fields:**
```javascript
{
  _id: ObjectId,
  
  // User Reference
  user: ObjectId (ref: User, required),
  
  // Order Items (Snapshot for consistency)
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number (required),
    price: Number, // Price at purchase time
    title: String,
    image: String
  }],
  
  // Shipping Address
  shippingAddress: {
    name: String (required),
    email: String,
    phone: String (required),
    street: String (required),
    city: String (required),
    state: String (required),
    zipCode: String (required),
    country: String (default: 'India')
  },
  
  // Pricing Breakdown
  subtotal: Number (required),
  shippingCost: Number (default: 0),
  tax: Number (default: 0),
  totalPrice: Number (required),
  
  // Payment & Status
  paymentMethod: String (enum: [
    'credit_card',
    'debit_card',
    'upi',
    'net_banking'
  ]),
  paymentStatus: String (enum: ['pending', 'completed', 'failed']),
  
  // Order Status
  orderStatus: String (enum: [
    'pending',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled'
  ]),
  
  // Tracking
  trackingId: String,
  notes: String,
  
  // Timestamps
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Indexes:**
```javascript
{ user: 1 }              // Get user's orders
{ createdAt: -1 }        // Sort by date
```

**Calculations:**
- Tax: `subtotal * 0.05` (5%)
- Shipping: `subtotal > 500 ? 0 : 40` (Free above ₹500)
- Total: `subtotal + tax + shipping`

---

### 4. CART Collection

**Fields:**
```javascript
{
  _id: ObjectId,
  
  // User Reference (One-to-one)
  user: ObjectId (ref: User, required, unique),
  
  // Items in Cart
  items: [{
    product: ObjectId (ref: Product, required),
    quantity: Number (required, min: 1, default: 1),
    price: Number, // Current price at time of adding
    addedAt: Date (default: now)
  }],
  
  // Summary
  totalPrice: Number (default: 0),
  
  // Metadata
  updatedAt: Date (default: now)
}
```

**Indexes:**
```javascript
{ user: 1 }  // Unique cart per user
```

**Auto-calculated (Frontend/Backend):**
- `totalPrice = SUM(item.price * item.quantity)`

---

### 5. WISHLIST Collection

**Fields:**
```javascript
{
  _id: ObjectId,
  
  // User Reference (One-to-one)
  user: ObjectId (ref: User, required, unique),
  
  // Wishlist Items
  items: [{
    product: ObjectId (ref: Product),
    addedAt: Date (default: now)
  }],
  
  // Metadata
  updatedAt: Date (default: now)
}
```

**Indexes:**
```javascript
{ user: 1 }  // Unique wishlist per user
```

---

## Relationships Diagram

```
User (1:Many) ← Orders
 ↓
(1:1)
 ↓
Cart --- (Many:Many) --- Products
   
User (1:1) → Wishlist
             ↓
         (Many:Many)
             ↓
           Products
```

---

## MongoDB Atlas Setup

### Collections to Create:
1. `users` 
2. `products`
3. `orders`
4. `carts`
5. `wishlists`

### Index Strategy:

**Performance Optimization:**
```bash
# Users collection
db.users.createIndex({ "email": 1 }, { unique: true })

# Products collection
db.products.createIndex({ "title": "text", "description": "text" })
db.products.createIndex({ "category": 1 })
db.products.createIndex({ "price": 1 })

# Orders collection
db.orders.createIndex({ "user": 1 })
db.orders.createIndex({ "createdAt": -1 })

# Carts collection
db.carts.createIndex({ "user": 1 }, { unique: true })

# Wishlists collection
db.wishlists.createIndex({ "user": 1 }, { unique: true })
```

---

## Data Relationships

### User has many Orders
```javascript
const userOrders = await Order.find({ user: userId });
```

### Order has many Items (Product Snapshots)
```javascript
order.items = [
  {
    product: productId,
    quantity: 2,
    price: 4999,  // Price at purchase time
    title: "iPhone 14",
    image: "url"
  }
]
```

### User has one Cart
```javascript
const cart = await Cart.findOne({ user: userId }).populate('items.product');
```

### Cart has many Items (Live Products)
```javascript
cart.items = [
  {
    product: { _id, title, price, stock, ... },
    quantity: 1
  }
]
```

### User has one Wishlist
```javascript
const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product');
```

---

## Data Integrity Rules

### Constraints:
1. **Unique Emails**: No duplicate user emails
2. **Unique Carts**: One cart per user
3. **Unique Wishlists**: One wishlist per user
4. **Stock Management**: Update on order creation
5. **Price Snapshots**: Store in orders for historical accuracy

### Validation Rules:
```javascript
// Product
- price >= 0
- discount: 0-100
- stock >= 0
- category: must be from enum

// Order
- orderStatus: linear progression (pending → delivered)
- paymentStatus: final states only
- totalPrice = subtotal + tax + shipping

// Cart
- quantity: positive integer
- totalPrice: always up to date

// User
- email: valid format
- password: min 6 characters (hashed)
```

---

## Query Performance

### Common Queries:

```javascript
// Get products by category with pagination
db.products.find({ category: "Electronics", isActive: true })
  .skip((page-1)*limit)
  .limit(limit)
  .sort({ createdAt: -1 })

// Search products
db.products.find({ $text: { $search: "iPhone" } })

// Get user's orders with items
db.orders.aggregate([
  { $match: { user: ObjectId("...") } },
  { $lookup: {
      from: "products",
      localField: "items.product",
      foreignField: "_id",
      as: "itemDetails"
    }
  },
  { $sort: { createdAt: -1 } }
])

// Get cart with full product details
db.carts.findOne({ user: ObjectId("...") })
  .populate('items.product')
```

---

## TTL (Time To Live) Indexes (Optional)

For abandoned carts auto-deletion (14 days):
```javascript
db.carts.createIndex(
  { "updatedAt": 1 },
  { expireAfterSeconds: 1209600 }  // 14 days
)
```

---

## Backup & Recovery

### MongoDB Atlas Automatic Backups:
- Taken every 6 hours
- Stored for 35 days
- Point-in-time recovery available

### Manual Export:
```bash
# Export all collections
mongoexport --uri "mongodb+srv://..." --db flipcart-db --out backup.json --jsonArray
```

---

## Scaling Considerations

### Current Design Supports:
- ~100K products
- ~50K active users
- ~500K orders
- Queries return in <100ms with proper indexing

### Future Optimization:
- Sharding by `user` for 10M+ users
- Archiving old orders to separate collection
- Redis caching for frequently accessed products

---

## Sample Data

### User Example:
```json
{
  "_id": ObjectId("6458a1b2c9d3e4f5g6h7i8j9"),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$...",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "zipCode": "110001",
    "country": "India"
  },
  "role": "user",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Product Example:
```json
{
  "_id": ObjectId("6458a2d3e4f5g6h7i8j9k0l1"),
  "title": "Samsung 55\" 4K Smart TV",
  "price": 45999,
  "originalPrice": 65999,
  "discount": 30,
  "category": "Electronics",
  "rating": 4.5,
  "stock": 50,
  "specifications": {
    "Resolution": "4K UHD",
    "Refresh Rate": "60Hz"
  }
}
```

---

## Connection String

```
mongodb+srv://username:password@cluster.mongodb.net/flipcart-db?retryWrites=true&w=majority
```

---

**Last Updated**: 2024
