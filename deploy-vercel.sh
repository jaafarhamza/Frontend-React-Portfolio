#!/bin/bash

echo "========================================"
echo "   VERCEL DEPLOYMENT SCRIPT"
echo "========================================"

# Check environment
if [ ! -f .env ]; then
    echo "ERROR: .env file not found!"
    echo "Please create .env with your backend URL"
    exit 1
fi

echo ""
echo "1. Installing dependencies..."
npm install

echo ""
echo "2. Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "BUILD FAILED!"
    exit 1
fi

echo ""
echo "3. Deploying to Vercel..."
npx vercel --prod

echo ""
echo "========================================"
echo "   DEPLOYMENT COMPLETED!"
echo "========================================"