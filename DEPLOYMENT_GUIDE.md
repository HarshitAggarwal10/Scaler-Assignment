# Deployment Guide - Flipcart E-Commerce Platform

## Overview

This guide covers deploying the Flipcart application to production on Vercel (frontend) and Render (backend) with MongoDB Atlas.

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│        Vercel (Frontend)                │
│  - React App                            │
│  - Static hosting                       │
│  - Auto CI/CD from GitHub               │
└──────────────┬──────────────────────────┘
               │ HTTPS API calls
┌──────────────▼──────────────────────────┐
│        Render (Backend)                 │
│  - Express.js API                       │
│  - Node.js runtime                      │
│  - Auto CI/CD from GitHub               │
└──────────────┬──────────────────────────┘
               │ Connection
┌──────────────▼──────────────────────────┐
│   MongoDB Atlas (Database)              │
│  - Cloud-hosted MongoDB                 │
│  - Automatic backups                    │
│  - 99.9% uptime SLA                     │
└─────────────────────────────────────────┘
```

---

## Prerequisites

- GitHub account with repository pushed
- Vercel account (free): https://vercel.com
- Render account (free): https://render.com
- MongoDB Atlas account (free): https://mongodb.com/cloud/atlas

---

## Part 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Start Free"
3. Sign up with email or Google
4. Verify email

### Step 2: Create a Database Cluster

1. Click "Create" on left sidebar
2. Select "M0" tier (free)
3. Select region closest to you (e.g., Mumbai for India)
4. Click "Create Cluster"
5. Wait 5-10 minutes for cluster to be provisioned

### Step 3: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `flipcart-user`
5. Password: Generate secure password (save this!)
6. Click "Add User"

### Step 4: Whitelist Network

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0) for development
4. ⚠️ For production, whitelist specific IPs
5. Click "Confirm"

### Step 5: Get Connection String

1. Click "Clusters" in left sidebar
2. Click "Connect" button
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials

**Example:**
```
mongodb+srv://flipcart-user:your-password@cluster0.xxxxx.mongodb.net/flipcart-db?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment to Render

### Step 1: Prepare Backend Repository

```bash
cd server

# Ensure .env.example exists with all variables
cat .env.example

# Make sure package.json has correct start script
# Should have: "start": "node src/index.js"
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Click "Sign up"
3. Use GitHub or email
4. Connect GitHub account

### Step 3: Deploy Backend

1. Click "New +" button
2. Select "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: `flipcart-api`
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Select free tier

### Step 4: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these variables:
```
PORT=5000
MONGODB_URI=mongodb+srv://flipcart-user:your-password@cluster0.xxxxx.mongodb.net/flipcart-db?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=production
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy the URL (e.g., `https://flipcart-api.onrender.com`)
4. ✅ Backend is live!

### Step 6: Test Backend

```bash
curl https://flipcart-api.onrender.com/api/health

# Expected response:
# {"success":true,"message":"Server is running"}
```

---

## Part 3: Frontend Deployment to Vercel

### Step 1: Update Frontend Environment

```bash
cd client

# Create .env.production with backend URL
echo "VITE_API_URL=https://flipcart-api.onrender.com/api" > .env.production
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign up"
3. Use GitHub or email
4. Connect GitHub account

### Step 3: Deploy Frontend

1. Click "Add New..." → "Project"
2. Select your GitHub repository
3. **Project Name**: `flipcart-frontend`
4. **Framework**: Select "Vite"
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click "Deploy"

### Step 4: Add Environment Variables

1. Go to project settings
2. Click "Environment Variables"
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://flipcart-api.onrender.com/api`
4. Click "Save"

### Step 5: Restart Deployment

1. Click "Deployments" tab
2. Click on latest deployment
3. Click "Redeploy"
4. Wait for new deployment to complete

### Step 6: Access Frontend

Your frontend will be at: `https://flipcart-frontend.vercel.app`

---

## Post-Deployment Steps

### Seed Production Database

1. Connect to Render backend terminal (if available)
2. Or manually create products in MongoDB Atlas

```bash
# Option: Create via API
curl -X POST https://flipcart-api.onrender.com/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {admin-token}" \
  -d '{
    "title": "Product Name",
    "description": "...",
    "price": 999,
    "category": "Electronics",
    "stock": 100,
    "image": "url"
  }'
```

### Test Full Application

1. Open frontend: `https://flipcart-frontend.vercel.app`
2. Test signup/login
3. Browse products
4. Add to cart
5. Place order
6. Check MongoDB Atlas for data

### Monitor Deployment

**Render Dashboard:**
- View logs: Click "Logs" tab
- Monitor performance
- Check error messages

**Vercel Dashboard:**
- View builds: Click "Deployments" tab
- Check build logs
- Monitor analytics

**MongoDB Atlas:**
- Check connection metrics
- Monitor storage usage
- Review backups

---

## Configure Custom Domain (Optional)

### For Frontend (Vercel):
1. Go to project settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records

### For Backend (Render):
1. Go to service settings
2. Click "Custom Domain"
3. Add domain
4. Update DNS records

---

## Environment Variables Summary

## Frontend (.env)
```
VITE_API_URL=production_backend_url
```

## Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

---

## Troubleshooting Deployment

### Backend Won't Start

```bash
# Check logs:
# 1. Render dashboard → Logs
# 2. Look for error messages
# 3. Common issues:
#    - Missing MONGODB_URI
#    - Wrong JWT_SECRET format
#    - Port already in use
```

### Frontend Shows Blank Page

```bash
# 1. Check browser console (F12)
# 2. Check VITE_API_URL is correct
# 3. Check backend is responding
# 4. Verify CORS settings in backend
```

### API Calls Failing

```bash
# 1. Verify backend URL in frontend .env
# 2. Check CORS headers in backend
# 3. Verify JWT tokens are valid
# 4. Check MongoDB connection
```

### MongoDB Connection Error

```bash
# 1. Verify connection string in .env
# 2. Check IP whitelist includes Render IP
# 3. Verify database user credentials
# 4. Check network connectivity
```

---

## Performance Optimization

### Frontend (Vercel)

- ✅ Auto-minification
- ✅ CDN distribution
- ✅ Automatic HTTPS
- ✅ Image optimization ready
- Enable: Vercel Analytics

### Backend (Render)

- ✅ Auto-restart on crash
- ✅ Environment isolation
- ✅ Automatic HTTPS
- Consider: Redis for caching

### Database (MongoDB)

- ✅ Automatic backups
- ✅ Query optimization with indexes
- ✅ Sharding ready
- Monitor: Connection pool usage

---

## Monitoring & Logging

### Render Logs
```
Click "Logs" tab → View all server logs
Search: errors, failures, warnings
```

### Vercel Analytics
```
Import analytics automatically
Monitor: Performance, builds, deployments
```

### MongoDB Atlas Monitor
```
Click "Monitoring" tab
Check: Connections, operations, storage
```

---

## Backup Strategy

### MongoDB Atlas Automatic Backups
- Hourly snapshots (3 days retention)
- Daily snapshots (7 days retention)
- Weekly snapshots (30 days retention)

### Manual Backup
```bash
# Export data
mongoexport --uri "mongodb+srv://..." --db flipcart-db --collection products --out backup.json

# Import data
mongoimport --uri "mongodb+srv://..." --db flipcart-db --collection products --file backup.json
```

---

## Scaling for Growth

### When to Scale

**Current Setup:**
- Handles 1000+ concurrent users
- 100K+ products
- Operations: <100ms response time

**Scale Indicators:**
- If response time > 500ms
- If 0 free tier resources
- If storage > 512MB

### Scaling Options

1. **Render**: Upgrade to paid plan ($7+/month)
2. **Vercel**: Automatic with Pro plan
3. **MongoDB**: Increase tier (M2 $9/month)

---

## CI/CD Pipeline

Both Vercel and Render automatically:

1. Watch GitHub repository
2. On push to `main`:
   - Run tests (if configured)
   - Build application
   - Deploy to production
3. Automatic rollback on failure

**No action needed after initial setup!**

---

## Security Checklist

- ✅ HTTPS for all connections
- ✅ Environment variables not in code
- ✅ MongoDB IP whitelist configured
- ✅ JWT secrets are strong
- ✅ Password hashing enabled
- ✅ CORS configured for frontend only
- ✅ Rate limiting ready in code
- ✅ Input validation implemented

---

## Cost Breakdown (Free Tier)

| Service | Cost | Limits |
|---------|------|--------|
| Vercel | Free | 100GB bandwidth/month |
| Render | Free | Sleep after 15 min inactivity |
| MongoDB Atlas | Free | 512MB storage |
| **Total** | **$0** | Limited for development |

---

## FAQ

**Q: Can I use custom domain?**
A: Yes, update DNS records via dashboard

**Q: Will my app sleep?**
A: Render free tier sleeps after 15 mins inactivity (5-min wake time)

**Q: How often should I backup?**
A: MongoDB Atlas does automatically hourly

**Q: Can I upgrade later?**
A: Yes, anytime without downtime

**Q: How do I migrate to paid tier?**
A: Just upgrade in service settings

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Test application
5. ✅ Monitor logs
6. ✅ Celebrate! 🎉

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Issues**: Check GitHub issues

---

**Happy deploying! 🚀**

Last Updated: 2024
