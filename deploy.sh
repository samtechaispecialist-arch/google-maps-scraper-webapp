#!/bin/bash

# Production deployment script

set -e

echo "🚀 Starting production deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Build frontend
echo "🔨 Building frontend..."
cd client
npm run build
cd ..

# Start services
echo "🌍 Starting services..."

# Using PM2 for process management
npm install -g pm2
cd server
pm2 start src/index.js --name "maps-scraper-api"
cd ..

echo "✅ Deployment complete!"
echo "📊 Access your app at: http://localhost:3000"
echo "🔗 API available at: http://localhost:3001"
