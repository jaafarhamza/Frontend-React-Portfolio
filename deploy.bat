@echo off
REM Production Deployment Script for Windows
REM Usage: deploy.bat [platform]
REM Platforms: vercel, netlify, preview

setlocal

set PLATFORM=%1
if "%PLATFORM%"=="" set PLATFORM=preview

echo.
echo ================================
echo   Production Deployment
echo ================================
echo Platform: %PLATFORM%
echo.

REM Check if .env exists
if not exist .env (
    echo WARNING: .env not found!
    echo Creating from .env.example...
    copy .env.example .env
    echo.
    echo Please update .env with your values!
    pause
    exit /b 1
)

REM Build the project
echo Building project...
echo.
call npm run build

if errorlevel 1 (
    echo.
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo Build successful!
echo.

REM Deploy based on platform
if "%PLATFORM%"=="vercel" (
    echo Deploying to Vercel...
    call npx vercel --prod
) else if "%PLATFORM%"=="netlify" (
    echo Deploying to Netlify...
    call npx netlify deploy --prod --dir=dist
) else if "%PLATFORM%"=="preview" (
    echo Starting preview server...
    echo Visit: http://localhost:4173
    echo.
    call npm run preview
) else (
    echo Unknown platform: %PLATFORM%
    echo Available platforms: vercel, netlify, preview
    pause
    exit /b 1
)

echo.
echo ================================
echo   Deployment Complete!
echo ================================
echo.
pause
