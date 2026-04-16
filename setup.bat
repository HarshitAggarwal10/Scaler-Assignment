@echo off
REM Flipcart Complete Setup Script for Windows

echo.
echo ========================================
echo   FLIPCART - SETUP CONFIGURATION
echo ========================================
echo.

REM Check if .env file exists in server directory
if not exist "server\.env" (
    echo.
    echo [!] Creating server/.env file...
    echo.
    echo Enter your PostgreSQL credentials:
    set /p DB_HOST="DB_HOST (default: localhost): "
    if "%DB_HOST%"=="" set DB_HOST=localhost
    
    set /p DB_PORT="DB_PORT (default: 5432): "
    if "%DB_PORT%"=="" set DB_PORT=5432
    
    set /p DB_USER="DB_USER (default: postgres): "
    if "%DB_USER%"=="" set DB_USER=postgres
    
    set /p DB_PASSWORD="DB_PASSWORD: "
    
    set /p DB_NAME="DB_NAME (default: flipcart_db): "
    if "%DB_NAME%"=="" set DB_NAME=flipcart_db
    
    (
        echo DB_HOST=%DB_HOST%
        echo DB_PORT=%DB_PORT%
        echo DB_USER=%DB_USER%
        echo DB_PASSWORD=%DB_PASSWORD%
        echo DB_NAME=%DB_NAME%
        echo.
        echo JWT_SECRET=flipcart_secret_key_atleast_32_characters_long_key
        echo JWT_EXPIRE=7d
        echo.
        echo NODE_ENV=development
        echo PORT=5000
    ) > "server\.env"
    
    echo [✓] server/.env created successfully!
)

REM Check if .env file exists in client directory
if not exist "client\.env" (
    echo [✓] Creating client/.env file...
    (
        echo VITE_API_URL=http://localhost:5000/api
    ) > "client\.env"
    echo [✓] client/.env created successfully!
)

echo.
echo ========================================
echo   INSTALLING DEPENDENCIES
echo ========================================
echo.

REM Install server dependencies
cd server
if not exist "node_modules" (
    echo Installing server dependencies...
    call npm install
) else (
    echo Server dependencies already installed.
)
cd ..

REM Install client dependencies
cd client
if not exist "node_modules" (
    echo Installing client dependencies...
    call npm install
) else (
    echo Client dependencies already installed.
)
cd ..

echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Make sure PostgreSQL is running
echo.
echo 2. Setup Database (run in separate terminal):
echo    cd server
echo    node scripts/setupDatabase.js
echo.
echo 3. Seed Sample Data (run in separate terminal):
echo    cd server
echo    node scripts/seedDatabase.js
echo.
echo 4. Start Backend Server (run in separate terminal):
echo    cd server
echo    npm start
echo    (Server will run on http://localhost:5000)
echo.
echo 5. Start Frontend Dev Server (run in separate terminal):
echo    cd client
echo    npm run dev
echo    (Frontend will run on http://localhost:5173)
echo.
echo ========================================
echo.
pause
