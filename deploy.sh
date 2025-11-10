#!/bin/bash

# Production Deployment Script
# Usage: ./deploy.sh [platform]
# Platforms: vercel, netlify, preview

set -e

PLATFORM=${1:-preview}

echo "🚀 Starting deployment process..."
echo "Platform: $PLATFORM"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env not found!"
    echo "Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your values!"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy based on platform
case $PLATFORM in
    vercel)
        echo "🚀 Deploying to Vercel..."
        npx vercel --prod
        ;;
    netlify)
        echo "🚀 Deploying to Netlify..."
        npx netlify deploy --prod --dir=dist
        ;;
    preview)
        echo "👀 Starting preview server..."
        echo "Visit: http://localhost:4173"
        npm run preview
        ;;
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Available platforms: vercel, netlify, preview"
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
