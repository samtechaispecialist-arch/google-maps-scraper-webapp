# 🚀 Complete Web App Setup & Deployment Guide

## ✅ What Has Been Created

You now have a **complete full-stack Google Maps scraper web application** with:

### 📦 Backend (Node.js + Express)
- ✅ REST API endpoints for scraping, proxies, and data management
- ✅ Selenium WebDriver integration for browser automation
- ✅ Rotating proxy management (GitHub proxy lists + MCP support)
- ✅ MongoDB database for storing scraping jobs and results
- ✅ Redis for caching and session management
- ✅ JWT authentication and API key management
- ✅ Socket.IO for real-time progress updates
- ✅ Rate limiting and error handling
- ✅ Anti-detection features (user agent rotation, delays, proxy rotation)

### 🎨 Frontend (React + Vite)
- ✅ Modern React dashboard with TailwindCSS
- ✅ Authentication (Register/Login)
- ✅ Scraper page with job creation
- ✅ Results viewer with CSV/JSON export
- ✅ Proxy statistics and management
- ✅ Real-time job progress tracking
- ✅ Responsive mobile-friendly UI

### 🌐 Deployment Ready
- ✅ Docker & Docker Compose configuration
- ✅ Vercel frontend deployment setup
- ✅ Railway.app backend deployment setup
- ✅ Heroku, Render.com, DigitalOcean configs
- ✅ Nginx reverse proxy configuration
- ✅ MongoDB Atlas + Upstash Redis integration

---

## 🎯 Quick Start (Local Development)

### Prerequisites
```bash
# Install Node.js 18+
# Install Docker & Docker Compose (optional but recommended)
# Install Git
```

### Option A: Docker Compose (Fastest)

```bash
# Clone repository
git clone https://github.com/samtechaispecialist-arch/google-maps-scraper-webapp.git
cd google-maps-scraper-webapp

# Copy environment files
cp server/.env.example server/.env

# Start all services
docker-compose up -d

# Access:
# Frontend: http://localhost:3000
# Backend API: http://localhost:3001
# MongoDB: localhost:27017
# Redis: localhost:6379
```

### Option B: Manual Setup

```bash
# 1. Clone and install
git clone https://github.com/samtechaispecialist-arch/google-maps-scraper-webapp.git
cd google-maps-scraper-webapp
npm install

# 2. Install individual packages
cd server && npm install && cd ..
cd client && npm install && cd ..

# 3. Setup environment
cp server/.env.example server/.env
# Edit server/.env

# 4. Start MongoDB (Terminal 1)
mongod --dbpath ./data

# 5. Start Redis (Terminal 2)
redis-server

# 6. Start Backend (Terminal 3)
cd server && npm run dev

# 7. Start Frontend (Terminal 4)
cd client && npm run dev
```

### First Login

1. Open http://localhost:3000
2. Click "Register"
3. Fill in email, username, password
4. Click "Register"
5. You're logged in!

---

## 🌐 Production Deployment

### Deployment Architecture

```
┌─────────────────┐
│   Frontend      │
│ (Vercel)        │ http://your-app.vercel.app
│ React + Vite    │
└────────┬────────┘
         │ API Calls
         ▼
┌─────────────────────────────┐
│   Backend                   │
│ (Railway/Render/Heroku)     │ https://api.your-domain.com
│ Node.js + Express           │
│ Selenium + Proxy Manager    │
└────────┬────────────────────┘
         │
    ┌────┴──────┬──────────────┐
    ▼           ▼              ▼
┌────────┐ ┌────────┐ ┌──────────────┐
│MongoDB │ │ Redis  │ │Chrome Driver │
│ Atlas  │ │Upstash │ │  (Headless)  │
└────────┘ └────────┘ └──────────────┘
```

### Step 1: Setup Cloud Databases

#### MongoDB Atlas (Free)

```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Sign up for free account
# 3. Create cluster (M0 free tier)
# 4. Create database user (e.g., scraper_user)
# 5. Whitelist IP address (or allow all for development)
# 6. Copy connection string

# Connection string format:
mongodb+srv://username:password@cluster.mongodb.net/maps-scraper?retryWrites=true&w=majority
```

#### Upstash Redis (Free)

```bash
# 1. Go to https://upstash.com
# 2. Sign up (free tier)
# 3. Create Redis database
# 4. Copy REDIS_URL from dashboard

# Connection string format:
redis://default:password@hostname:port
```

### Step 2: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to client directory
cd client

# Deploy
vercel

# Follow prompts:
# - Project name: google-maps-scraper-webapp
# - Build command: npm run build (default)
# - Output directory: dist (default)

# After deployment, set environment variable:
# 1. Go to Vercel dashboard
# 2. Select your project
# 3. Settings > Environment Variables
# 4. Add VITE_API_URL = https://your-backend-url.com
```

### Step 3: Deploy Backend to Railway.app (Recommended)

```bash
# 1. Go to https://railway.app
# 2. Click "Create a new project"
# 3. Click "Deploy from GitHub"
# 4. Authorize and select this repository
# 5. Railway will auto-detect Node.js
# 6. Add services:

# Add MongoDB
# - Click "Add Service"
# - Select "MongoDB"
# - Set variables

# Add Redis
# - Click "Add Service"
# - Select "Redis"

# Configure Backend Service
# - Root Directory: server
# - Build Command: npm install
# - Start Command: npm start
# - Add environment variables (see below)

# Deploy
# - Railway auto-deploys on git push
```

### Step 4: Environment Variables for Backend

Set these in your deployment platform (Railway, Heroku, Render, etc.):

```env
# Server Config
NODE_ENV=production
PORT=3001

# Database
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/maps-scraper?retryWrites=true&w=majority
REDIS_URL=redis://default:password@host:port

# Authentication
JWT_SECRET=generate-strong-random-string-here
JWT_EXPIRE=7d

# CORS (set to your Vercel frontend URL)
CORS_ORIGIN=https://your-app.vercel.app

# Selenium
CHROME_PATH=/usr/bin/chromium
SELENIUM_HEADLESS=true
SELENIUM_TIMEOUT=30000

# Proxies
PROXY_PROVIDER=github
# Optional: For MCP integration
MCP_API_KEY=your_mcp_key
MCP_ENDPOINT=https://your-mcp-api.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=30
```

### Alternative Backend Deployment Options

#### Heroku (Legacy, but works)

```bash
# 1. Install Heroku CLI
# 2. heroku login
# 3. heroku create your-app-name
# 4. git push heroku main
# 5. heroku config:set VAR_NAME=value
```

#### Render.com

```bash
# 1. Go to https://render.com
# 2. Create new "Web Service"
# 3. Connect GitHub repo
# 4. Set:
#    - Build Command: cd server && npm install
#    - Start Command: npm start
#    - Root Directory: server
# 5. Add environment variables
# 6. Create PostgreSQL & Redis from marketplace
```

#### DigitalOcean App Platform

```bash
# 1. Go to https://www.digitalocean.com
# 2. Create App Platform
# 3. Select GitHub repo
# 4. Configure services (frontend + backend)
# 5. Add managed databases
# 6. Deploy
```

---

## 📊 API Endpoints

### Authentication

```bash
# Register
curl -X POST https://api.your-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "password123"
  }'

# Login
curl -X POST https://api.your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Scraping

```bash
# Start scraping job
curl -X POST https://api.your-domain.com/api/scrape/start \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "searchQuery": "restaurants in New York",
    "limit": 50,
    "options": {
      "includeReviews": true,
      "includeRatings": true,
      "includePhotos": true,
      "includeHours": true
    }
  }'

# Get job status
curl https://api.your-domain.com/api/scrape/status/job_id \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get results
curl https://api.your-domain.com/api/scrape/results/job_id?page=1&limit=20 \
  -H "Authorization: Bearer YOUR_TOKEN"

# Export as CSV
curl https://api.your-domain.com/api/data/export/job_id?format=csv \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o results.csv
```

### Proxies

```bash
# Get proxy list
curl https://api.your-domain.com/api/proxies/list \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get proxy stats
curl https://api.your-domain.com/api/proxies/stats \
  -H "Authorization: Bearer YOUR_TOKEN"

# Refresh proxies
curl -X POST https://api.your-domain.com/api/proxies/refresh \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Full API documentation: See `API_DOCS.md`

---

## 🔧 Configuration

### Proxy Providers

#### GitHub Proxy Lists (Free, Default)
```env
PROXY_PROVIDER=github
# Uses: clarketm/proxy-list, UptimerBot/proxy-list, ShiftyTR/Proxy-list
```

#### ProxyMesh
```env
PROXY_PROVIDER=proxymesh
PROXY_MESH_KEY=your_proxymesh_key
```

#### Bright Data (Luminati)
```env
PROXY_PROVIDER=brightdata
BRIGHTDATA_CUSTOMER_ID=your_customer_id
BRIGHTDATA_ZONE=your_zone
BRIGHTDATA_PASSWORD=your_password
```

#### Custom MCP Endpoint
```env
PROXY_PROVIDER=mcp
MCP_ENDPOINT=https://your-proxy-api.com/get-proxy
MCP_API_KEY=your_api_key
```

### Selenium Options

```env
# Chrome path (auto-detected on most systems)
CHROME_PATH=/usr/bin/chromium

# Run in headless mode (no UI)
SELENIUM_HEADLESS=true

# Timeout for page loads
SELENIUM_TIMEOUT=30000

# Window size
SELENIUM_WINDOW_SIZE=1920x1080
```

---

## 🚨 Troubleshooting

### Chrome Not Found

```bash
# Install Chrome/Chromium
sudo apt-get install chromium-browser  # Linux
brew install chromium                   # macOS

# Set path in environment
CHROME_PATH=/usr/bin/chromium-browser
```

### MongoDB Connection Error

```bash
# Check connection string format
# Should be: mongodb+srv://user:password@host/database

# Verify in MongoDB Atlas:
# 1. Network Access > Add IP (or 0.0.0.0/0 for all)
# 2. Create database user
# 3. Get correct connection string
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping  # Should return PONG

# Verify connection string format
# Should be: redis://user:password@host:port
```

### 429 Rate Limited

```bash
# Reduce concurrent requests
RATE_LIMIT_MAX_REQUESTS=10  # Default 30

# Increase delays between requests
# In code: randomDelay(1000, 3000)  # 1-3 seconds
```

### Selenium Timeout

```bash
# Increase timeout
SELENIUM_TIMEOUT=60000  # 60 seconds

# Check internet speed
# Check proxy responsiveness
# Check if Google Maps is blocking requests
```

---

## 📈 Monitoring & Logging

### Local Development

```bash
# Watch logs
cd server && npm run dev

# MongoDB logs
mongod --logpath ./mongo.log

# Redis logs
redis-server --loglevel verbose
```

### Production Monitoring

#### Vercel
- Dashboard: https://vercel.com/dashboard
- Analytics tab for performance
- Logs tab for errors

#### Railway
- Dashboard: https://railway.app
- Real-time logs
- Deployment history
- Metrics

#### Application Monitoring

```bash
# Add PM2 for process monitoring
npm install -g pm2
pm2 start server/src/index.js --name "maps-scraper"
pm2 monit  # Real-time monitoring
pm2 logs   # View logs
```

---

## 🔒 Security Checklist

- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Enable HTTPS/SSL on custom domain
- [ ] Configure CORS to specific domain only
- [ ] Set MongoDB authentication password
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Implement input validation
- [ ] Use Content Security Policy headers
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Monitor for suspicious activity

---

## 💰 Cost Breakdown (Monthly)

| Service | Free Tier | Paid Tier | Notes |
|---------|-----------|-----------|-------|
| Vercel Frontend | ✅ Free | $20+ | Includes analytics |
| MongoDB Atlas | ✅ 512MB | $9+ | Shared cluster |
| Upstash Redis | ✅ 100MB | $20+ | Managed Redis |
| Railway Backend | $5 | $5+ | First $5 free |
| Domain | - | $10-15 | Annual cost |
| **Total** | **~$15-40** | - | Scalable |

---

## 📚 Repository Structure

```
google-maps-scraper-webapp/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Scraper.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   └── ProxyStats.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── scrape.js
│   │   │   ├── proxy.js
│   │   │   └── data.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Job.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── rateLimiter.js
│   │   └── utils/
│   │       ├── proxyManager.js
│   │       └── seleniumScraper.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── docker-compose.yml
├── SETUP.md
├── DEPLOYMENT.md
├── API_DOCS.md
└── README.md
```

---

## 🔗 Quick Links

- **GitHub Repo**: https://github.com/samtechaispecialist-arch/google-maps-scraper-webapp
- **Vercel**: https://vercel.com
- **Railway**: https://railway.app
- **MongoDB Atlas**: https://mongodb.com/cloud/atlas
- **Upstash Redis**: https://upstash.com

---

## 🆘 Support & Troubleshooting

1. **Check logs** - Backend and frontend logs show errors
2. **Review API_DOCS.md** - All endpoints documented
3. **Read SETUP.md** - Detailed installation guide
4. **GitHub Issues** - Open issue on repository
5. **Check .env files** - Verify all variables set correctly

---

## 📝 Next Steps

1. ✅ **Deployed Frontend to Vercel** 
   ```bash
   cd client
   vercel
   ```

2. ✅ **Deploy Backend to Railway**
   - Go to https://railway.app
   - Connect GitHub repo
   - Add MongoDB + Redis
   - Set environment variables

3. ✅ **Configure CORS** - Update `CORS_ORIGIN` to your Vercel URL

4. ✅ **Test API** - Use curl commands from API_DOCS.md

5. ✅ **Add Custom Domain** - Point to Vercel or Railway

6. ✅ **Setup SSL/HTTPS** - Auto configured by Vercel & Railway

7. ✅ **Monitor & Scale** - Use dashboard monitoring

---

**🎉 Congratulations! Your Google Maps Scraper Web App is ready for production!**

For detailed deployment instructions, see `SETUP.md` and `DEPLOYMENT.md`.
