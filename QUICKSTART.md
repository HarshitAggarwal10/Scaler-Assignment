# 🚀 Flipcart - Quick Start Guide

## ⚡ 5-Minute Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL (running locally on port 5432)

### Step 1: Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=flipcart_db
JWT_SECRET=flipcart_secret_key_at_least_32_characters_long
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
```

Initialize database:
```bash
npm run setup      # Create database and tables
npm run seed       # Add sample products
```

Start backend:
```bash
npm start          # Server on http://localhost:5000
```

### Step 2: Setup Frontend
In a new terminal:
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev         # Frontend on http://localhost:5173
```

## ✅ Testing the Application

### 1. Sign Up
- Go to http://localhost:5173
- Click "Sign Up"
- Enter email and password
- Submit

### 2. Browse Products
- View homepage with 20+ products
- Use search to find products
- Click category filters
- Click any product for details

### 3. Shopping
- Add product to cart
- View cart
- Update quantities
- Go to checkout

### 4. Order
- Fill shipping address
- Select payment method
- Place order
- See order ID confirmation

### 5. My Orders
- Click user dropdown
- Select "Orders"
- View all past orders

### 6. Wishlist
- Click heart icon on products
- View wishlist page
- Manage your favorites

## 🎯 Key Features

### Core Features ✅
- ✅ Product Listing with Search & Filter
- ✅ Product Detail Page with Images
- ✅ Shopping Cart Management
- ✅ Checkout & Order Placement
- ✅ Order Confirmation & ID

### Bonus Features ✅
- ✅ User Authentication
- ✅ Order History
- ✅ Wishlist
- ✅ Responsive Design
- ✅ Real Product Images
- ✅ Email Notifications

## 📦 What's Included

- 20+ Sample Products (from Unsplash)
- 8 Categories (Electronics, Fashion, Home, etc.)
- User Authentication with JWT
- Order Management System
- Wishlist Functionality
- Real-time Search
- Responsive UI (Mobile, Tablet, Desktop)

## 🔧 Helpful Commands

### Backend
```bash
cd server
npm run setup       # Initialize database
npm run seed        # Add sample data
npm start           # Start server
npm run dev         # Start with auto-reload
```

### Frontend
```bash
cd client
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

## ⚠️ Troubleshooting

### PostgreSQL Connection Error
```bash
# Ensure PostgreSQL is running
# Verify credentials in server/.env
# Run: npm run setup
```

### Port Already in Use
```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (Windows)
taskkill /PID <PID> /F
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🏗️ Project Structure

```
FlipCart/
├── server/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── controllers/   # Business logic
│   │   └── routes/        # API endpoints
│   ├── scripts/
│   │   ├── setupDatabase.js
│   │   └── seedDatabase.js
│   └── .env
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── stores/        # State management
│   │   └── utils/         # Utilities
│   └── .env
```

## 🔌 API Endpoints

### Public
- `GET /api/products` - All products
- `GET /api/products/:id` - Product details
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login

### Protected (need login)
- `GET /api/cart` - Your cart
- `POST /api/cart/add` - Add to cart
- `POST /api/orders` - Place order
- `GET /api/orders` - Your orders
- `GET /api/wishlist` - Your wishlist

## 📊 Sample Data

The database comes pre-seeded with:
- **20+ Products** across 8 categories
- **Real Images** from Unsplash
- **Realistic Pricing** with discounts
- **Product Info** including ratings and reviews
- **Stock Levels** for inventory tracking

## 🎨 Technologies

| Layer | Technology |
|-------|------------|
| Frontend | React 18.2, Tailwind CSS, React Router, Zustand |
| Backend | Node.js, Express, PostgreSQL, Sequelize |
| Auth | JWT, Bcryptjs |
| UI | React Icons, Responsive Design |

## 📞 Need Help?

1. **Check console** for error messages
2. **Verify .env files** are correctly created
3. **Ensure PostgreSQL** is running
4. **Try restarting** both servers
5. **Clear cache** and refresh browser

## 🚀 What's Next?

After setup:
1. ✅ Create account and browse
2. ✅ Add products to cart
3. ✅ Place an order
4. ✅ View order history
5. ✅ Explore wishlist

Enjoy! 🎉
