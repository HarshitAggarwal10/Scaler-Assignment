#!/bin/bash
# Flipcart - Complete Setup & Run Guide
# This script helps setup and run Flipcart locally

echo "=========================================="
echo "    FLIPCART - COMPLETE SETUP GUIDE"
echo "=========================================="
echo ""

# Step 1: Environment variables
echo "[STEP 1] Setting up environment variables..."
echo ""

if [ ! -f "server/.env" ]; then
    echo "Creating server/.env..."
    cat > server/.env << 'EOF'
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=flipcart_db

# JWT
JWT_SECRET=flipcart_secret_key_at_least_32_characters_long
JWT_EXPIRE=7d

# Server
NODE_ENV=development
PORT=5000

# Optional Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EOF
    echo "✓ server/.env created"
    echo "  Please edit with your PostgreSQL password"
fi

if [ ! -f "client/.env" ]; then
    echo "Creating client/.env..."
    cat > client/.env << 'EOF'
VITE_API_URL=http://localhost:5000/api
EOF
    echo "✓ client/.env created"
fi

echo ""
echo "[STEP 2] Installing dependencies..."
echo ""

# Install server dependencies
cd server
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
    echo "✓ Server dependencies installed"
else
    echo "✓ Server dependencies already installed"
fi

# Install client dependencies
cd ../client
if [ ! -d "node_modules" ]; then
    echo "Installing client dependencies..."
    npm install
    echo "✓ Client dependencies installed"
else
    echo "✓ Client dependencies already installed"
fi

cd ..

echo ""
echo "=========================================="
echo "    SETUP COMPLETE!"
echo "=========================================="
echo ""
echo "To run the application:"
echo ""
echo "1. SETUP DATABASE (first time only):"
echo "   cd server"
echo "   npm run setup      # Create database & tables"
echo "   npm run seed       # Add sample products"
echo ""
echo "2. START BACKEND SERVER (terminal 1):"
echo "   cd server"
echo "   npm start          # Run on http://localhost:5000"
echo ""
echo "3. START FRONTEND (terminal 2):"
echo "   cd client"
echo "   npm run dev        # Run on http://localhost:5173"
echo ""
echo "4. OPEN BROWSER:"
echo "   http://localhost:5173"
echo ""
echo "=========================================="
