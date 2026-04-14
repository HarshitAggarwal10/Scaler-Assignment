# PostgreSQL Migration Guide

## Overview
This document describes the migration from MongoDB to PostgreSQL using Sequelize ORM for the Flipkart-style e-commerce platform.

## Changes Made

### 1. Database Drivers
- **Removed**: `mongoose` (MongoDB ORM)
- **Added**: `sequelize` (SQL ORM) and `pg` (PostgreSQL driver)

### 2. Models Migration
All Mongoose models have been converted to Sequelize models:

#### User Model
- Changed from MongoDB document to PostgreSQL table
- Address fields converted from nested object to individual columns
- Password hashing remains the same with bcryptjs

#### Product Model
- Catalog of products stored in relational tables
- Reviews stored as JSON array in database
- Specifications stored as JSON object
- Full-text search using ILIKE operator

#### Cart Model
- One cart per user (unique constraint on userId)
- Items stored as JSON array
- Foreign key relationship with User table

#### Order Model
- Orders linked to users via userId foreign key
- Items stored as JSON array with snapshot data
- Shipping address stored as JSON object
- Order and payment status tracked with ENUM types

#### Wishlist Model
- One wishlist per user (unique constraint)
- Items stored as JSON array
- Timestamps for tracking additions

### 3. Database Configuration
**File**: `server/src/config/database.js`

```javascript
// PostgreSQL Connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);
```

### 4. Environment Variables
**Update `.env` file**:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flipcart_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 5. Controllers Updates
All controllers have been updated to use Sequelize queries:

- `findById()` → `findByPk()`
- `findOne()` → `findOne({ where: {...} })`
- `updateOne()` → `update()`
- `save()` → `save()`
- Pagination: `skip/limit` → `offset/limit`
- Case-insensitive search: `$text` → `Op.iLike`

### 6. Middleware Changes
Auth middleware updated to use Sequelize query methods

### 7. Seeding Script
Database seeding script updated to:
- Use `Product.bulkCreate()` instead of `insertMany()`
- Use `destroy({ where: {} })` for clearing data

## Setup Instructions

### 1. Install PostgreSQL
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql`

### 2. Create Database
```bash
createdb flipcart_db
```

Or use pgAdmin GUI:
1. Right-click "Databases"
2. New → Database
3. Name: `flipcart_db`

### 3. Install Dependencies
```bash
cd server
npm install
```

### 4. Configure Environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 5. Seed Database
```bash
npm run seed
```

### 6. Start Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Database Tables Created

Sequelize will automatically create:
- `Users` - User accounts
- `Products` - Product catalog
- `Carts` - Shopping carts
- `Orders` - Order history
- `Wishlists` - Saved products

## API Endpoints
All API endpoints remain the same and backward compatible.

### Authentication
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/auth/me`
- PUT `/api/auth/profile`

### Products
- GET `/api/products`
- GET `/api/products/:id`
- GET `/api/products/categories`
- POST `/api/products` (admin)
- PUT `/api/products/:id` (admin)

### Cart
- GET `/api/cart`
- POST `/api/cart/add`
- POST `/api/cart/remove`
- PUT `/api/cart/update`
- DELETE `/api/cart/clear`

### Orders
- POST `/api/orders`
- GET `/api/orders`
- GET `/api/orders/:id`
- PUT `/api/orders/cancel/:id`

### Wishlist
- GET `/api/wishlist`
- POST `/api/wishlist/add`
- POST `/api/wishlist/remove`

## Key Differences

| Feature | MongoDB | PostgreSQL |
|---------|---------|-----------|
| Query Language | JavaScript | SQL-like |
| Relationships | Manual refs | Foreign keys |
| Types | Flexible | Strict schemas |
| Transactions | Limited | Full ACID |
| Scaling | Horizontal | Vertical + Horizontal |
| Cost | Free Atlas tier | Free tier available |
| Deployment | Atlas | Railway, Render, Heroku |

## Troubleshooting

### Connection Error
```
Error: connection refused
```
**Solution**: Ensure PostgreSQL is running and credentials are correct.

### Table Already Exists
```
Error: relation "Users" already exists
```
**Solution**: Run `sequelize db:drop` or manually drop tables.

### Password Issues
```
Error: password authentication failed
```
**Solution**: Verify DB_USER and DB_PASSWORD in .env

## Performance Considerations

1. **Indexes**: Created on frequently queried fields
   - email (Users)
   - category, price, title (Products)
   - userId (Cart, Order, Wishlist)

2. **JSON Storage**: Complex nested objects stored as JSON
   - Reviews, specifications in products
   - Items in cart/orders

3. **Connection Pooling**: Sequelize uses connection pooling by default

## Production Deployment

For production, use managed PostgreSQL:
- **Render**: `postgresql://user:pass@host/db`
- **Railway**: Automatic PostgreSQL provisioning
- **Heroku**: Heroku Postgres add-on
- **AWS RDS**: Managed PostgreSQL service
- **Azure Database**: Azure PostgreSQL Single Server

Update connection string in `.env`:
```
DB_HOST=your-prod-host.com
DB_USER=prod_user
DB_PASSWORD=secure_password
DB_NAME=flipcart_prod
```

## Migration Complete ✅

The application is now fully migrated to PostgreSQL with Sequelize ORM and ready for production deployment.
