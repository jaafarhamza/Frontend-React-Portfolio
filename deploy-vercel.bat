@echo off
echo ========================================
echo   VERCEL DEPLOYMENT SCRIPT
echo ========================================

REM Check environment
if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env with your backend URL
    pause
    exit /b 1
)

echo.
echo 1. Installing dependencies...
call npm install

echo.
echo 2. Building for production...
call npm run build

if errorlevel 1 (
    echo BUILD FAILED!
    pause
    exit /b 1
)

echo.
echo 3. Deploying to Vercel...
call npx vercel --prod

echo.
echo ========================================
echo   DEPLOYMENT COMPLETED!
echo ========================================
pause