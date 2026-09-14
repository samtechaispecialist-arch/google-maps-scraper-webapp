# Setup & Deployment Guide

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud - MongoDB Atlas)
- Redis (local or cloud)
- Chrome/Chromium browser
- Git

### Step 1: Clone & Install

```bash
# Clone repository
git clone https://github.com/samtechaispecialist-arch/google-maps-scraper-webapp.git
cd google-maps-scraper-webapp

# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### Step 2: Environment Setup

```bash
# Setup server environment
cp server/.env.example server/.env

# Edit server/.env with your configuration
# Key variables:
# MONGO_URI=mongodb://localhost:27017/maps-scraper
# REDIS_URL=redis://localhost:6379
# JWT_SECRET=your_secure_random_key

# Setup client environment
cp client/.env.example client/.env
```

### Step 3: Start Services

#### Option A: Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

#### Option B: Manual

```bash
# Terminal 1 - MongoDB
mongod --dbpath ./data

# Terminal 2 - Redis
redis-server

# Terminal 3 - Backend
cd server && npm run dev

# Terminal 4 - Frontend
cd client && npm run dev
```

## 📦 Deployment on Vercel

### ⚠️ Important Note
Vercel is best for serverless frontend deployment. For the full-stack app, consider:
- **Frontend** → Vercel (recommended)
- **Backend** → Heroku, Railway, Render, or DigitalOcean
- **Database** → MongoDB Atlas (free tier available)
- **Redis** → Upstash Redis (free tier available)

### Vercel Frontend Deployment

#### Step 1: Prepare Frontend

```bash
# In client directory, ensure vercel.json exists
cat > client/vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
EOF
```

#### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd client
vercel

# Follow prompts and set environment variables in Vercel dashboard
```

#### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add `VITE_API_URL` pointing to your backend URL

### Backend Deployment Options

#### Option 1: Heroku (Easier, Free tier ending)

```bash
# Create Heroku app
heroku login
heroku create your-app-name

# Add Procfile
cat > Procfile << 'EOF'
web: cd server && npm start
EOF

# Deploy
git push heroku main

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set REDIS_URL=your_redis_url
heroku config:set JWT_SECRET=your_secret
```

#### Option 2: Railway.app (Recommended)

```bash
# 1. Go to https://railway.app
# 2. Connect GitHub account
# 3. Create new project from repo
# 4. Add MongoDB and Redis plugins
# 5. Set environment variables
# 6. Deploy automatically
```

#### Option 3: Render.com

```bash
# 1. Go to https://render.com
# 2. Create new Web Service
# 3. Connect GitHub repository
# 4. Build Command: cd server && npm install
# 5. Start Command: npm start
# 6. Add environment variables
# 7. Create PostgreSQL and Redis instances
```

#### Option 4: DigitalOcean App Platform

```bash
# 1. Go to https://www.digitalocean.com
# 2. Create App Platform project
# 3. Connect GitHub repo
# 4. Configure service for backend (server directory)
# 5. Add managed databases
# 6. Deploy
```

### Database Setup

#### MongoDB Atlas (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Update `MONGO_URI` in backend

```
mongodb+srv://user:password@cluster.mongodb.net/maps-scraper?retryWrites=true&w=majority
```

#### Upstash Redis (Free)

1. Go to https://upstash.com
2. Create Redis database
3. Copy connection URL
4. Update `REDIS_URL` in backend

```
redis://default:password@host:port
```

## 🐳 Docker Deployment

### Build Docker Images

```bash
# Build server image
docker build -t maps-scraper-server ./server

# Build client image
docker build -t maps-scraper-client ./client

# Tag for registry
docker tag maps-scraper-server your-registry/maps-scraper-server:latest
docker tag maps-scraper-client your-registry/maps-scraper-client:latest

# Push to registry
docker push your-registry/maps-scraper-server:latest
docker push your-registry/maps-scraper-client:latest
```

### Deploy to Docker Swarm or Kubernetes

```bash
# Docker Swarm
docker stack deploy -c docker-compose.yml maps-scraper

# Kubernetes (with Helm)
helm install maps-scraper ./helm-chart
```

## 🔐 Production Checklist

- [ ] Set strong `JWT_SECRET`
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for sensitive data
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Test all API endpoints
- [ ] Security audit

## 📊 Monitoring

### Vercel Monitoring
- Built-in analytics dashboard
- Performance monitoring
- Error tracking

### Backend Monitoring

```bash
# Add to package.json
npm install --save pm2

# Start with PM2
pm2 start src/index.js --name "maps-scraper-api"
pm2 monit
```

## 🆘 Troubleshooting

### Chrome not found in production
```bash
# Heroku buildpack for Chrome
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-chromedriver
heroku buildpacks:add https://github.com/jontewks/puppeteer-heroku-buildpack
```

### Redis connection issues
```bash
# Test connection
redis-cli ping

# Check connection string format
# Should be: redis://user:password@host:port/db
```

### MongoDB connection issues
```bash
# Test connection with mongosh
mongosh "mongodb+srv://user:password@cluster.mongodb.net/maps-scraper"

# Check network access in MongoDB Atlas
```

## 🚀 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install && cd server && npm install && cd ../client && npm install
      
      - name: Build frontend
        run: cd client && npm run build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: npm install -g vercel && vercel --prod --token $VERCEL_TOKEN
```

## 📈 Scaling Considerations

1. **Horizontal Scaling**: Run multiple backend instances behind load balancer
2. **Database Optimization**: Add MongoDB indexes for common queries
3. **Caching**: Use Redis for proxy lists and session management
4. **CDN**: Use CDN for static assets
5. **Rate Limiting**: Implement aggressive rate limiting
6. **Job Queue**: Use Bull or RabbitMQ for heavy scraping tasks

## 💰 Cost Estimation (Monthly)

- **Vercel Frontend**: Free (up to certain limits)
- **MongoDB Atlas**: Free (512MB storage)
- **Upstash Redis**: Free (100MB)
- **Heroku/Railway Backend**: $7-50
- **Total**: ~$7-50/month for small scale

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Railway Deployment](https://docs.railway.app/)
- [Render Deployment](https://render.com/docs)
- [Docker Guide](https://docs.docker.com/)

---

For questions or issues, open an issue on GitHub!
