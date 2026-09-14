# Deployment Guides

## Quick Start

### 1. Deploy Frontend to Vercel

```bash
npm install -g vercel
cd client
vercel
```

### 2. Deploy Backend to Railway

```bash
# Go to https://railway.app
# Connect GitHub
# Select this repo
# Set ROOT_DIR to 'server'
# Add MongoDB and Redis from marketplace
```

### 3. Environment Variables

Set these in your backend hosting platform:
```
NODE_ENV=production
MONGO_URI=<your-mongodb-atlas-uri>
REDIS_URL=<your-upstash-redis-url>
JWT_SECRET=<strong-random-secret>
CORS_ORIGIN=<your-vercel-frontend-url>
```

## Full Setup Guide

See [SETUP.md](./SETUP.md) for detailed instructions.
