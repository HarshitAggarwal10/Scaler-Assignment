# Flipcart - Complete Setup Guide

## Prerequisites
- Node.js v16+
- PostgreSQL 12+
- npm or yarn

## Environment Setup

### 1. Server Configuration

Create `.env` file in `server/` directory:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=flipcart_db

# JWT
JWT_SECRET=your_jwt_secret_key_min_32_chars_long
JWT_EXPIRE=7d

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Server
NODE_ENV=development
PORT=5000
```

### 2. Client Configuration

Create `.env` file in `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation Steps

### Backend Setup

```bash
cd server
npm install

# Create database
node scripts/setupDatabase.js

# Seed sample products
node scripts/seedDatabase.js

# Start server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

## Testing the Application

### 1. Create Account
- Navigate to http://localhost:5173
- Click "Sign Up"
- Fill in email and password
- Account created successfully

### 2. Browse Products
- View all products on homepage
- Filter by category
- Search for products
- Click on product for details

### 3. Add to Cart
- Click "Add to Cart" on product
- Cart count updates in navbar
- View cart page

### 4. Checkout
- Go to cart page
- Click "Proceed to Checkout"
- Fill shipping address
- Select payment method
- Place order

### 5. View Orders
- After placing order, view in "Orders" page
- See order history and details

## Features Implemented

### Core Features ✅
- [x] Product Listing with grid layout
- [x] Product filtering by category
- [x] Product search functionality
- [x] Product detail page with carousel
- [x] Add to cart functionality
- [x] Shopping cart management
- [x] Checkout with address form
- [x] Order placement and confirmation
- [x] Order ID generation

### Bonus Features ✅
- [x] User authentication (Login/Signup)
- [x] Order history
- [x] Wishlist functionality
- [x] Responsive design (Mobile, Tablet, Desktop)
- [x] Email notifications on order (configured)

## Database Schema

### Users
- id, name, email, password, phone, address fields

### Products
- id, title, description, price, originalPrice, discount, image, images
- category, rating, reviews, stock, specifications, seller

### Orders
- id, userId, items, shippingAddress, totalPrice, paymentMethod
- paymentStatus, orderStatus, trackingId

### Cart
- id, userId, items, totalPrice

### Wishlist
- id, userId, items

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with search & filter)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/remove` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get order history
- `GET /api/orders/:id` - Get order details

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/remove` - Remove from wishlist

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Database Connection Failed
- Ensure PostgreSQL is running
- Check DATABASE_URL and credentials in .env
- Run: `node scripts/setupDatabase.js` again

### CORS Issues
- Check API_URL in client .env
- Ensure server allows CORS

## Production Deployment

### Build Frontend
```bash
cd client
npm run build
# Creates dist/ folder
```

### Environment Variables for Production
Update `.env` with production database and API URLs

## Support
For issues or questions, check the server logs and client console for error messages.
