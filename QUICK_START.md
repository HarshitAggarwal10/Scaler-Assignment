# Quick Start Guide - Flipcart E-Commerce Platform

## ⚡ 5-Minute Setup

### Prerequisites Check
```bash
node --version  # Should be v16+
npm --version   # Should be v8+
git --version
```

### Step 1: Project Setup (1 minute)
```bash
# Clone the repository
git clone https://github.com/HarshitAggarwal10/Scaler-Assignment.git
cd ScalerAILabs

# View all commits
git log --oneline
```

### Step 2: Backend Setup (2 minutes)
```bash
cd server

# Install dependencies
npm install

# Create and configure .env
cp .env.example .env

# Edit .env with your MongoDB URI and JWT Secret
# Linux/Mac: nano .env
# Windows: notepad .env
```

**Get MongoDB URI:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 tier is free)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Update `.env` with your credentials

### Step 3: Install & Start Backend (1-2 minutes)
```bash
# From server directory
npm run dev

# Expected output:
# Server running on port 5000
# MongoDB Connected
```

### Step 4: Frontend Setup (1 minute)
Open a NEW terminal and run:
```bash
cd client

# Install dependencies
npm install

# Create .env
cp .env.example .env

# No changes needed - already points to http://localhost:5000/api
```

### Step 5: Start Frontend (30 seconds)
```bash
# From client directory
npm run dev

# Expected output:
# ➜  Local:   http://localhost:3000/
```

### Step 6: Access the Application
Open browser: **http://localhost:3000**

---

## 🔑 Demo Credentials

```
Email: demo@example.com
Password: password123
```

First-time? Signup with new email instead!

---

## 📦 Database Seeding

To add sample products:
```bash
cd server
npm run seed

# You'll see: "Database seeded successfully!"
```

---

## 🌐 API Testing (Optional)

Test health check:
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000/5000 in use | Kill process: `lsof -i :3000` then `kill -9 <PID>` |
| MongoDB connection error | Check URI in `.env` and IP whitelist |
| npm install fails | Try `npm cache clean --force` then `npm install` |
| CORS error | Restart both servers |
| No products showing | Run `npm run seed` in server directory |

---

## 📁 Important Files

```
server/.env          # Backend config (DON'T COMMIT)
client/.env          # Frontend config (DON'T COMMIT)
server/src/index.js  # Backend entry point (PORT 5000)
client/src/main.jsx  # Frontend entry point (PORT 3000)
```

---

## 🎯 What to Test First

1. **Browse Products**: Go to home page, products should load
2. **Search**: Try searching for "iPhone" in navbar
3. **Filter by Category**: Click category in sidebar
4. **View Product**: Click on any product card
5. **Add to Cart**: Add 2-3 items to cart
6. **Checkout**: Click cart icon → "Proceed to Checkout"
7. **Signup** (if not logged in): Create new account
8. **Place Order**: Complete checkout form
9. **View Orders**: Click "Orders" in navbar after login
10. **Wishlist**: Click heart icon on products

---

## 💾 Git Commit History

View the incremental commits:
```bash
git log --oneline --all

# 13 commits showing step-by-step build:
# 1. Backend models
# 2. Middleware & utilities
# 3. Controllers
# 4. Routes & server
# 5. Database seeding
# 6. Frontend setup
# 7. State management
# 8. Components
# 9-11. Pages
# 12. App setup
# 13. Documentation
```

---

## 📚 Key Features to Explore

✅ **Product Browsing**
- Grid layout similar to Flipkart
- Search functionality
- Category filtering
- Pagination ready

✅ **Shopping Cart**
- Persistent storage (localStorage)
- Update quantities
- Remove items
- Real-time total calculation

✅ **User Authentication**
- JWT-based login/signup
- Secure password storage
- User profile management

✅ **Order Management**
- Complete checkout flow
- Order confirmation email
- Order history
- Order status tracking

✅ **Wishlist**
- Save favorite products
- Reusable wishlist page

---

## 🚀 Next Steps

### Deploy Backend to Render
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://render.com
# 3. Connect GitHub repository
# 4. Create new Web Service
# 5. Add environment variables
# 6. Deploy
```

### Deploy Frontend to Vercel
```bash
# 1. Go to https://vercel.com
# 2. Import project
# 3. Set VITE_API_URL to your Render backend URL
# 4. Deploy
```

---

## 💡 Important Notes

- 🔒 **Never commit `.env` files** - use `.env.example` as template
- 📧 **Email notifications** require Gmail App Password (setup in `.env`)
- 💾 **Cart data** stored in localStorage (frontend)
- 🔑 **JWT tokens** stored in localStorage
- 🗄️ **MongoDB indexes** automatically created for performance

---

## ❓ Need Help?

1. Check README.md for detailed documentation
2. Review API documentation in README
3. Check console for error messages
4. Verify `.env` configuration
5. Ensure MongoDB is connected

---

## 📞 Support

For issues or questions:
- Check README.md FAQ section
- Review git commits for implementation details
- Check browser console for errors
- Check server terminal for backend errors

---

**Happy coding! 🎉**

Last updated: 2024
