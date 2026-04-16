# 🚀 QUICK START GUIDE - Flipcart E-Commerce

## Start Backend Server

```bash
cd d:\ScalerAILabs\server
npm install  # Only first time
npm start
```

**Expected Output:**
```
Server running on http://localhost:5000
Database connected successfully
84 products loaded
```

---

## Start Frontend Server

**In a New Terminal:**

```bash
cd d:\ScalerAILabs\client
npm install  # Only first time
npm run dev
```

**Expected Output:**
```
VITE v5.4.21  ready in 759 ms
Local:   http://localhost:5174/
```

---

## Open in Browser

👉 **Visit**: http://localhost:5174/

---

## 🎯 First-Time User Flow

### 1️⃣ Sign Up
- Click **"Login"** in navbar
- Click **"New Customer? Sign Up"**
- Enter: Email, Password, Name, Phone
- Click **Sign Up**

### 2️⃣ Browse Products
- Home page shows 84 products
- Try searching: `iphone`, `shirt`, `book`
- Click category icons to filter

### 3️⃣ Add to Cart
- Click any product
- Click **"Add to Cart"**
- Green notification confirms
- See cart badge in navbar

### 4️⃣ Checkout
- Click **Cart** in navbar
- Click **"Proceed to Checkout"**
- Select delivery address
- Choose payment method (UPI, Card, etc.)
- Review and confirm order

### 5️⃣ View Order
- Logged in → Navbar dropdown
- See "Recent Orders" section
- Click order to view details

---

## 💡 Feature Highlights

| Feature | How to Access |
|---------|---------------|
| **Search** | Navbar search bar |
| **Cart** | Navbar → Cart icon |
| **Wishlist** | Navbar → User Menu → Wishlist |
| **Orders** | Navbar → User Menu → My Orders |
| **SuperCoins** | Navbar (💰 display) or Checkout |
| **Addresses** | Checkout → Select Location → Sidebar |
| **Profile** | Navbar → User Menu → My Profile |

---

## 📧 Email Notifications

After placing an order, you'll receive an email with:
- Order confirmation details
- Items and total amount
- Delivery address
- Estimated delivery date

*Check spam folder if not in inbox*

---

## 🆘 Troubleshooting

### ❌ "Cannot find module 'react'"
```bash
cd client
npm install
```

### ❌ "Port already in use"
```bash
# Kill existing processes
Get-Process node | Stop-Process -Force
```

### ❌ "API Error" in console
- Ensure backend is running (`npm start` in server folder)
- Backend must run before frontend

### ❌ Search not working
- Ensure backend has loaded products
- Check browser console for errors
- Refresh page

---

## 🎨 UI Quick Reference

**Colors:**
- 🔵 Primary Blue: Buttons, Links (#2874F0)
- 💛 Yellow Accent: Important items (#FFB800)
- ✅ Green: Success messages
- ❌ Red: Errors

**Navbar Layout:**
```
[Logo] [Search Bar] [Location] [SuperCoins] [User ▼] [More ▼] [Cart]
```

---

## ✨ Pro Tips

1. **Save Addresses**: Checkout → Select Location → Add new address → Use later
2. **Earn SuperCoins**: Every order gives 5% as SuperCoins
3. **Use SuperCoins**: Checkout → Check "Use SuperCoins" → Instant discount
4. **Mobile**: App is fully responsive on phones
5. **Search Tips**: Try `electronics`, `fashion`, `home`, `beauty`

---

## 📊 What's Included

✅ 14 Core Features (All Complete)
✅ 6 Bonus Features (Notifications, SuperCoins, Address Book, etc.)
✅ 84 Products across 8 Categories
✅ Full Authentication System
✅ Payment Integration
✅ Email Notifications
✅ Order Management
✅ Mobile Responsive Design

---

## 🏆 You're All Set!

Enjoy exploring Flipcart! 🛍️

For detailed documentation, see **FEATURES_COMPLETE_GUIDE.md**

*Happy Shopping!* 🎉
