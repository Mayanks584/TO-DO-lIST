@echo off
echo ========================================
echo    TaskFlow Server Startup
echo ========================================
echo.
echo Checking prerequisites...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed

REM Check if MongoDB is running
echo Checking MongoDB connection...
timeout /t 2 >nul

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
) else (
    echo ✓ Dependencies already installed
)

echo.
echo Starting server...
echo Make sure MongoDB is running on localhost:27017
echo.
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

node server/server.js
pause
