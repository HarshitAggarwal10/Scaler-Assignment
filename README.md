# FlipCart: Full-Stack E-Commerce Platform

> A production-ready, full-stack e-commerce platform built with modern web technologies, demonstrating enterprise-level architecture, best practices, and scalable design patterns.

![Version](https://img.shields.io/badge/version-1.0.0-3498db?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-27ae60?style=flat-square)
![Status](https://img.shields.io/badge/status-active-2ecc71?style=flat-square)
![Node Version](https://img.shields.io/badge/node-v16+-f39c12?style=flat-square)

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Prerequisites & Requirements](#prerequisites--requirements)
6. [Installation & Configuration](#installation--configuration)
7. [Environment Setup](#environment-setup)
8. [Running the Application](#running-the-application)
9. [Database Management](#database-management)
10. [API Documentation](#api-documentation)
11. [Project Structure & Organization](#project-structure--organization)
12. [Development Workflow](#development-workflow)
13. [Deployment Guide](#deployment-guide)
14. [Performance Optimization](#performance-optimization)
15. [Security Best Practices](#security-best-practices)
16. [Troubleshooting](#troubleshooting)
17. [Contributing Guidelines](#contributing-guidelines)
18. [License](#license)

---

## Project Overview

**FlipKart** is a comprehensive, production-grade e-commerce application that demonstrates modern full-stack web development practices. Built with React, Node.js, Express, and PostgreSQL, the platform provides a seamless shopping experience with advanced features including product discovery, shopping cart management, order processing, wishlist functionality, and user authentication.

### Key Objectives:
- ✅ Implement a responsive, user-friendly e-commerce interface
- ✅ Demonstrate secure backend API design with JWT authentication
- ✅ Showcase database modeling and optimization techniques
- ✅ Implement real-time state management across the application
- ✅ Provide comprehensive error handling and validation
- ✅ Follow SOLID principles and clean code architecture

---

## Key Features

### Core Functionality

#### **Product Management**
- Browse 12+ product categories with 200+ items
- Advanced search functionality with real-time filtering
- Detailed product information pages with specifications
- High-quality product images and descriptions
- Product ratings and reviews system
- Category-based filtering and sorting

#### **Shopping Cart**
- Add/remove products dynamically
- Quantity management with validation
- Persistent cart storage (localStorage)
- Real-time cart totals and pricing
- Cart item count indicators in navbar
- Bulk operations support

#### **Checkout & Ordering**
- Multi-step checkout process
- Shipping address management
- Multiple payment method support
- Order summary and confirmation
- Order ID generation and tracking
- Email confirmation notifications

#### **User Authentication & Management**
- Secure JWT-based authentication
- User registration with email validation
- Password encryption using bcryptjs
- User profile management
- Order history tracking
- Personal address book management

#### **Wishlist Functionality**
- Save favorite products
- Quick access to saved items
- Seamless product addition from wishlist to cart
- Persistent wishlist storage

#### **Order Management**
- Order history and status tracking
- Order details with product information
- Order cancellation capabilities
- Order confirmation page
- Order tracking timeline

### Advanced Features

#### **Security**
- JWT token-based authentication
- Password hashing with bcryptjs
- Secure API endpoints with middleware
- Request validation and sanitization
- CORS configuration
- Environment variable protection

#### **Responsive Design**
- Mobile-first approach
- Desktop, tablet, and mobile optimization
- Flexible grid layouts
- Touch-friendly interface elements
- Cross-browser compatibility

#### **Performance**
- Lazy loading for images
- Code splitting and bundling optimization
- Efficient state management
- API response caching
- Database indexing
- Pagination for product listings

#### **User Experience**
- Intuitive navigation
- Real-time search suggestions
- Toast notifications for user feedback
- Loading states and spinners
- Error boundary components
- Modal dialogs for confirmations

---

## Technology Stack

### Frontend Architecture

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI library and framework |
| Vite | 5.x | Build tool and dev server |
| React Router | 6.x | Client-side routing |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| Zustand | Latest | State management library |
| Axios | Latest | HTTP client for API calls |
| React Icons | Latest | Icon library |
| Vite Plugin React | Latest | React support for Vite |

### Backend Architecture

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 16+ | JavaScript runtime |
| Express.js | 4.x | Web application framework |
| PostgreSQL | 12+ | Relational database |
| Sequelize | Latest | ORM for PostgreSQL |
| JWT | Latest | Token-based authentication |
| bcryptjs | Latest | Password hashing |
| Nodemailer | Latest | Email service |
| Dotenv | Latest | Environment variable management |
| Cors | Latest | Cross-origin resource sharing |
| Express Validator | Latest | Input validation middleware |

### Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version control |
| npm | Package management |
| Eslint | Code linting |
| Prettier | Code formatting |
| Postman | API testing |
| pgAdmin | Database visualization |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Pages        │  │ Components   │  │ Stores       │      │
│  │ (HomePage,   │  │ (Navbar,     │  │ (Auth,       │      │
│  │  ProductPage │  │  ProductCard)│  │  Cart,       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────────────────────────────────────┬┘
                           │
                    AXIOS HTTP CLIENT
                           │
┌────────────────────────────────────────────────────────────┬┘
│                   API LAYER (Express.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Routes       │  │ Controllers  │  │ Middleware   │      │
│  │ (/auth       │  │ (Business    │  │ (Auth,       │      │
│  │  /products)  │  │  Logic)      │  │  Validation) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────────────────────────────────────┬┘
                           │
                    Sequelize ORM
                           │
┌────────────────────────────────────────────────────────────┬┘
│              DATABASE LAYER (PostgreSQL)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Users    │  │ Products │  │ Orders   │  │ Carts    │   │
│  │ Table    │  │ Table    │  │ Table    │  │ Table    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## Prerequisites & Requirements

### System Requirements
- **CPU**: Modern multi-core processor (2+ GHz)
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free disk space
- **OS**: Windows 10+, macOS 10.12+, or Linux (Ubuntu 18.04+)
- **Internet**: Required for npm package downloads and PostgreSQL setup

### Software Requirements

#### Required
- **Node.js**: v16.x or higher ([Download](https://nodejs.org/))
- **npm**: v8.x or higher (installed with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

#### External Services
- **PostgreSQL Database**: Local instance or cloud hosting
  - Install PostgreSQL 12 or higher ([Download](https://www.postgresql.org/download/))
  - Create a database user and credentials
  - Configure connection settings
  
- **Email Service** (Optional but recommended)
  - Gmail account with 2FA enabled
  - Google App Password ([Generate](https://support.google.com/accounts/answer/185833))

### Verify Installation

```bash
# Check Node.js version
node --version
# Should output: v16.x.x or higher

# Check npm version
npm --version
# Should output: v8.x.x or higher

# Check Git version
git --version
# Should output: git version 2.x.x or higher
```

---

## Installation & Configuration

### Step 1: Repository Setup

```bash
# Clone the repository
git clone https://github.com/HarshitAggarwal10/Scaler-Assignment.git

# Navigate to project directory
cd ScalerAILabs

# Verify project structure
ls -la
```

### Step 2: Backend Configuration

```bash
# Navigate to server directory
cd server

# Install all dependencies
npm install

# Create environment configuration file
cp .env.example .env

# Open .env and configure all variables
nano .env  # or use your preferred editor
```

### Step 3: Frontend Configuration

```bash
# Navigate back to root, then to client
cd ../client

# Install all dependencies
npm install

# Create environment configuration file
cp .env.example .env

# Edit .env with required variables
```

### Step 4: Database Verification

```bash
# Test PostgreSQL connection (from server directory)
cd server

# Run migrations to create tables
npm run migrate

# Run seed script to populate database
npm run seed
```

Expected output:
```
✅ PostgreSQL Connected Successfully
✓ Database migrated
Cleared existing products
✅ Successfully seeded 195+ products!

📊 Products by Category:
   Electronics: 30 products
   Fashion: 30 products
   Beauty: 20 products
   ...
✨ Database seeding completed successfully!
```

---

## Environment Setup

### Backend Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flipcart-db
DB_USER=postgres
DB_PASSWORD=your_secure_password

# JWT Authentication
JWT_SECRET=your_very_secure_random_jwt_secret_key_min_32_chars_12345
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration (Gmail SMTP)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_FROM=noreply@flipcart.com

# Email Templates
EMAIL_FROM_NAME=FlipCart
EMAIL_FROM_ADDRESS=noreply@flipcart.com

# API Configuration
API_VERSION=v1
API_TIMEOUT=30000

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### Frontend Environment Variables (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=30000

# Application Configuration
VITE_APP_NAME=FlipCart
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_LOGGING=true

# Image Configuration
VITE_IMAGE_CDN_URL=https://images.unsplash.com
```

### Important Notes

⚠️ **Security Considerations:**
- Never commit `.env` files to version control
- Use strong, unique JWT secret (minimum 32 characters)
- Rotate JWT secret periodically in production
- Use environment-specific configurations
- Keep sensitive data in secure vaults

📌 **Gmail App Password Setup:**
1. Enable 2-Factor Authentication on Gmail account
2. Visit: https://support.google.com/accounts/answer/185833
3. Generate app-specific password
4. Use this password in `SMTP_PASSWORD` variable

---

## Running the Application

### Development Environment

#### Terminal 1: Start Backend Server

```bash
cd server
npm run dev
```

Expected output:
```
[nodemon] watching extension: js,json
Server running on port 5000
✅ PostgreSQL Connected Successfully
Ready to accept requests
```

#### Terminal 2: Start Frontend Development Server

```bash
cd client
npm run dev
```

Expected output:
```
  VITE v5.4.21  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

#### Terminal 3: Monitor Database (Optional)

```bash
# Open pgAdmin or use PostgreSQL CLI
# Connection string: postgresql://username:password@localhost:5432/flipcart-db
```

### Access the Application

1. **Frontend**: http://localhost:5173/
2. **Backend API**: http://localhost:5000/api
3. **API Documentation**: http://localhost:5000/api/docs

### Production Build

```bash
# Frontend
cd client
npm run build
# Output: dist/ folder ready for deployment

# Verify production build
npm run preview
# Output: Preview server at http://localhost:4173/
```

---

## Database Management

### Seeding the Database

```bash
cd server
npm run seed
```

**What gets seeded:**
- 12 categories
- 200+ products with complete specifications
- Sample users (optional)
- Indexes for optimal query performance

### Database Backup

```bash
# Export database
pg_dump -U postgres -h localhost -d flipcart-db > ./backup/flipcart-db.sql

# Import database
psql -U postgres -h localhost -d flipcart-db < ./backup/flipcart-db.sql
```

### Database Indexes

Indexes are automatically created for:
- `users.email` - Unique index
- `products.category` - Query optimization
- `orders.user_id` - User order lookup
- `carts.user_id` - User cart lookup

### PostgreSQL Tables Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_addresses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  address_line1 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(10),
  is_default BOOLEAN DEFAULT false
);
```

#### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  discount DECIMAL(5, 2),
  category VARCHAR(100),
  rating DECIMAL(3, 1),
  stock INTEGER,
  seller VARCHAR(255),
  warranty VARCHAR(100),
  delivery_time VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_price DECIMAL(10, 2),
  status VARCHAR(50),
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER,
  price DECIMAL(10, 2)
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
```

---

## API Documentation

### Base URL

**Development**: `http://localhost:5000/api`
**Production**: `https://api.flipcart.com/api`

### Authentication

All protected endpoints require JWT token in header:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### API Endpoints Reference

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| GET | `/auth/me` | Get current user info | ✅ |
| PUT | `/auth/profile` | Update user profile | ✅ |
| POST | `/auth/logout` | User logout | ✅ |
| POST | `/auth/forgot-password` | Request password reset | ❌ |

#### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------|
| GET | `/products` | Get all products | ❌ |
| GET | `/products/:id` | Get product details | ❌ |
| GET | `/products?category=Electronics` | Filter by category | ❌ |
| GET | `/products?search=laptop` | Search products | ❌ |
| GET | `/categories` | Get all categories | ❌ |

#### Cart Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------|
| GET | `/cart` | Get current cart | ✅ |
| POST | `/cart/add` | Add item to cart | ✅ |
| PUT | `/cart/update/:itemId` | Update cart item | ✅ |
| DELETE | `/cart/remove/:itemId` | Remove item from cart | ✅ |
| DELETE | `/cart/clear` | Clear entire cart | ✅ |

#### Order Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------|
| POST | `/orders` | Create new order | ✅ |
| GET | `/orders` | Get user's orders | ✅ |
| GET | `/orders/:id` | Get order details | ✅ |
| PUT | `/orders/:id/cancel` | Cancel order | ✅ |
| GET | `/orders/:id/status` | Get order status | ✅ |

#### Wishlist Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------|
| GET | `/wishlist` | Get wishlist items | ✅ |
| POST | `/wishlist/add` | Add to wishlist | ✅ |
| DELETE | `/wishlist/remove/:productId` | Remove from wishlist | ✅ |

### Example API Requests

#### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

#### Get Products with Filters
```bash
curl "http://localhost:5000/api/products?category=Electronics&search=phone&limit=20&page=1"
```

#### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "123", "quantity": 2}
    ],
    "shippingAddress": {
      "addressLine1": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001"
    },
    "paymentMethod": "credit_card"
  }'
```

---

## Project Structure & Organization

```
flipcart/
│
├── client/                              # React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Main navigation component
│   │   │   ├── ProductCard.jsx         # Reusable product card component
│   │   │   ├── Loader.jsx              # Loading spinner
│   │   │   ├── Footer.jsx              # Footer component
│   │   │   ├── OrderConfirmationModal.jsx
│   │   │   └── DeliveryAddressSidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # Product listing & browsing
│   │   │   ├── ProductPage.jsx         # Product detail view
│   │   │   ├── CartPage.jsx            # Shopping cart management
│   │   │   ├── CheckoutPage.jsx        # Checkout process
│   │   │   ├── OrderConfirmationPage.jsx
│   │   │   ├── OrdersPage.jsx          # Order history
│   │   │   ├── WishlistPage.jsx        # Wishlist display
│   │   │   ├── LoginPage.jsx           # User login
│   │   │   └── SignupPage.jsx          # User registration
│   │   │
│   │   ├── stores/                     # Zustand State Management
│   │   │   ├── authStore.js            # Authentication state
│   │   │   ├── cartStore.js            # Shopping cart state
│   │   │   └── wishlistStore.js        # Wishlist state
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js                  # Axios HTTP client configuration
│   │   │   └── toast.js                # Toast notification utility
│   │   │
│   │   ├── data/
│   │   │   └── mockProducts.js         # Mock data for development
│   │   │
│   │   ├── assets/                     # Images and icons
│   │   │   ├── home1.png               # Flipkart logo
│   │   │   ├── home2to4.png            # Service icons
│   │   │   └── homeicon1-14.png        # Category icons
│   │   │
│   │   ├── App.jsx                     # Root component
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   │
│   ├── index.html
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── package.json
│   └── .env.example
│
├── server/                              # Express Backend Application
│   ├── src/
│   │   ├── controllers/                # Business logic
│   │   │   ├── authController.js       # Authentication logic
│   │   │   ├── productController.js    # Product operations
│   │   │   ├── cartController.js       # Cart management
│   │   │   ├── orderController.js      # Order processing
│   │   │   └── wishlistController.js   # Wishlist operations
│   │   │
│   │   ├── routes/                     # API Routes
│   │   │   ├── auth.js                 # Auth endpoints
│   │   │   ├── product.js              # Product endpoints
│   │   │   ├── cart.js                 # Cart endpoints
│   │   │   ├── order.js                # Order endpoints
│   │   │   └── wishlist.js             # Wishlist endpoints
│   │   │
│   │   ├── models/                     # Sequelize Models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   ├── Order.js
│   │   │   ├── Wishlist.js
│   │   │   └── index.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js                 # JWT verification
│   │   │   ├── errorHandler.js         # Global error handling
│   │   │   └── validation.js           # Input validation
│   │   │
│   │   ├── config/
│   │   │   └── database.js             # PostgreSQL connection
│   │   │
│   │   ├── utils/
│   │   │   └── emailService.js         # Email notifications
│   │   │
│   │   ├── constants/
│   │   │   ├── errors.js               # Error messages
│   │   │   └── messages.js             # Success messages
│   │   │
│   │   └── index.js                    # Server entry point
│   │
│   ├── scripts/
│   │   ├── seedDatabase.js             # Database population
│   │   └── setupDatabase.js
│   │
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── SETUP_GUIDE.md                       # Detailed setup instructions
├── SYSTEM_ARCHITECTURE.md               # Architecture documentation
├── README.md                            # This file
└── .gitignore

```

### Directory Responsibilities

| Directory | Responsibility |
|-----------|-----------------|
| `client/src/components` | UI components (reusable) |
| `client/src/pages` | Page-level components (routes) |
| `client/src/stores` | Global state management |
| `server/src/controllers` | Request handling & business logic |
| `server/src/routes` | API endpoint definitions |
| `server/src/models` | Database schema definitions |
| `server/src/middleware` | Cross-cutting concerns |

---

## Development Workflow

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Code Style & Standards

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Development Commands

#### Backend
```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run database seed
npm run seed

# Run tests (when implemented)
npm test
```

#### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test
```

---

## Deployment Guide

### Frontend Deployment (Vercel)

```bash
# Prerequisites
npm install -g vercel

# Deploy
vercel

# Or through GitHub integration
# 1. Push to GitHub
# 2. Connect Vercel to GitHub repository
# 3. Set environment variables in Vercel dashboard
# 4. Automatic deployment on push
```

### Backend Deployment (Render/Heroku)

```bash
# Using Render
1. Connect GitHub repository to Render
2. Configure environment variables
3. Deploy automatically on push

# Or Manual deployment
vercel env pull
vercel deploy --prod
```

### Production Environment Variables

Set these in deployment platform's environment settings:

```env
NODE_ENV=production
# PostgreSQL Production Configuration
DB_HOST=prod-db-host
DB_PORT=5432
DB_NAME=flipcart-prod
DB_USER=prod-user
DB_PASSWORD=your_production_password
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://yourdomain.com
SMTP_EMAIL=production_email@gmail.com
```

---

## Performance Optimization

### Frontend Optimization

- ✅ Code splitting with React.lazy()
- ✅ Image optimization with next-gen formats
- ✅ Caching with service workers
- ✅ Tree-shaking unused dependencies
- ✅ Minification and compression

### Backend Optimization

- ✅ Database indexing
- ✅ Query optimization
- ✅ Response caching
- ✅ Pagination for large datasets
- ✅ Connection pooling

### Performance Metrics

Target metrics:
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **API Response Time**: < 200ms

---

## Security Best Practices

### Authentication & Authorization
- ✅ Use strong JWT secrets
- ✅ Implement refresh tokens
- ✅ Set appropriate token expiration
- ✅ Use HTTPS in production
- ✅ Validate all user inputs

### Data Protection
- ✅ Hash passwords with bcryptjs
- ✅ Never store sensitive data in localStorage
- ✅ Implement rate limiting
- ✅ Use environment variables for secrets
- ✅ Enable CORS properly

### API Security
- ✅ Input validation on all endpoints
- ✅ SQL injection prevention (NoSQL injection)
- ✅ CSRF token implementation
- ✅ Security headers configuration
- ✅ Regular security audits

---

## Troubleshooting

### Common Issues & Solutions

#### PostgreSQL Connection Error

**Problem**: `Error: connect ECONNREFUSED` or `role "postgres" does not exist`

**Solution:**
- Check PostgreSQL server is running (`pg_isready -h localhost`)
- Verify database credentials in .env file
- Ensure database exists (create with `createdb flipcart-db`)
- Check network connectivity to DB host

#### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify CORS_ORIGIN in backend .env
- Check frontend API URL in frontend .env
- Ensure backend is running

#### JWT Token Expired
```
Error: jwt malformed / jwt expired
```
**Solution:**
- Clear localStorage and login again
- Check JWT_EXPIRE value
- Verify JWT_SECRET hasn't changed

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

#### npm Install Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Contributing Guidelines

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/flipcart.git`
3. **Create** feature branch: `git checkout -b feature/amazing-feature`
4. **Commit** changes: `git commit -m 'Add amazing feature'`
5. **Push** to branch: `git push origin feature/amazing-feature`
6. **Open** Pull Request

### Code of Conduct

- Be respectful and professional
- Provide clear commit messages
- Test your code before submitting
- Follow existing code style
- Document your changes

### Commit Message Format

```
type(scope): subject

feat: add user authentication
fix: resolve cart calculation bug
docs: update installation guide
style: format code with prettier
refactor: optimize product filtering
test: add authentication tests
```

---

## License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## Contact & Support

### Project Maintainer
**Harshit Aggarwal**
- GitHub: [@HarshitAggarwal10](https://github.com/HarshitAggarwal10)
- Email: harshit.aggarwal@example.com

### Support & Questions
- 📧 Email: support@flipcart.com
- 💬 GitHub Issues: [Create Issue](https://github.com/HarshitAggarwal10/Scaler-Assignment/issues)
- 📚 Documentation: [Full Docs](./SETUP_GUIDE.md)

### Useful Resources
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Additional Resources

### Related Documentation
- [SYSTEM_ARCHITECTURE.md](./SYSTEM_ARCHITECTURE.md) - Detailed architecture overview
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Step-by-step setup instructions
- [API_DOCS.md](./docs/API_DOCS.md) - Comprehensive API reference

### Learning Resources
- [Full-Stack Web Development with Node.js & Express](https://expressjs.com/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Performance Optimization](https://react.dev/reference/react)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-04-16 | Initial release |

---

**Last Updated**: April 16, 2024
**Status**: ✅ Production Ready
**Maintainer**: Harshit Aggarwal
