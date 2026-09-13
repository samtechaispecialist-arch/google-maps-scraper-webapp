# Google Maps Scraper Web App

A full-stack web application for scraping Google Maps with rotating proxies, MCP integration, and REST API.

## 🌟 Features

- 🗺️ Scrape Google Maps locations, reviews, ratings
- 🔄 Rotating proxy support with GitHub & MCP integration
- 📡 REST API for programmatic access
- 🔐 User authentication & API keys
- 📊 Real-time dashboard with statistics
- 💾 Multiple export formats (CSV, JSON)
- ⚡ Job scheduling & background tasks
- 🛡️ Anti-detection features
- 📈 Proxy performance monitoring

## 📦 Tech Stack

### Frontend
- React 18+ with TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Chart.js (data visualization)
- Axios (HTTP client)

### Backend
- Node.js 18+
- Express.js (REST API)
- Selenium WebDriver (browser automation)
- MongoDB (data storage)
- Redis (caching & sessions)
- Socket.io (real-time updates)
- JWT (authentication)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Redis
- Chrome/Chromium browser

### Installation

```bash
# Clone repository
git clone https://github.com/samtechaispecialist-arch/google-maps-scraper-webapp.git
cd google-maps-scraper-webapp

# Install dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Start development servers
npm run dev
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token

### Scraping
- `POST /api/scrape/start` - Start scraping job
- `GET /api/scrape/status/:jobId` - Get job status
- `GET /api/scrape/results/:jobId` - Get scraping results
- `POST /api/scrape/cancel/:jobId` - Cancel job

### Proxies
- `GET /api/proxies/list` - List available proxies
- `POST /api/proxies/refresh` - Refresh proxy list
- `GET /api/proxies/stats` - Proxy statistics
- `POST /api/proxies/test` - Test proxy availability

### Data
- `GET /api/data/export/:jobId` - Export results
- `GET /api/data/history` - Get scraping history
- `DELETE /api/data/:jobId` - Delete results

## 🔑 API Usage Example

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Start scraping
curl -X POST http://localhost:3001/api/scrape/start \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "searchQuery": "restaurants in New York",
    "limit": 100,
    "options": {
      "includeReviews": true,
      "includeRatings": true,
      "includePhotos": true
    }
  }'
```

## 🔄 MCP Integration

Supports multiple proxy providers:
- GitHub proxy lists (free)
- ProxyMesh
- Bright Data (Luminati)
- Custom MCP endpoints

Configure in `.env`:
```env
PROXY_PROVIDER=github  # or 'mcp', 'proxymesh', 'brightdata'
MCP_API_KEY=your_key
MCP_ENDPOINT=https://api.example.com/proxy
```

## 📊 Dashboard Features

- Real-time scraping progress
- Proxy performance metrics
- Job history & statistics
- Data export interface
- API key management
- Account settings

## 🛡️ Anti-Detection Features

- User agent rotation
- Random delays (300-2000ms)
- Proxy rotation every 3 requests
- Failed proxy tracking
- Headless Chrome detection bypass
- JavaScript rendering support

## 📝 Environment Variables

```env
# Server
NODE_ENV=development
PORT=3001

# Database
MONGO_URI=mongodb://localhost:27017/maps-scraper
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Proxies
PROXY_PROVIDER=github
MCP_API_KEY=
MCP_ENDPOINT=

# Selenium
CHROME_PATH=/usr/bin/chromium
SELENIUM_HEADLESS=true

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=30
```

## 📂 Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── utils/
│   └── package.json
├── .env.example
├── docker-compose.yml
└── package.json
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker
docker-compose up -d

# Access at http://localhost:3000
```

## ⚙️ Configuration

### Selenium Options
- Chrome headless mode
- Window size customization
- JavaScript execution
- Cookie/session handling

### Scraping Options
- Location limit
- Search radius
- Result filters
- Data fields selection

## 📊 Performance

- Concurrent scraping jobs: 5 (configurable)
- Average time per location: 2-5 seconds
- Data storage: MongoDB with indexes
- Caching: Redis for proxy lists & sessions

## 🔒 Security

- JWT authentication
- Rate limiting
- Input validation
- SQL/NoSQL injection prevention
- CORS configuration
- API key rotation

## 📋 Limitations & Disclaimers

⚠️ **Important:**
- Respect Google Maps Terms of Service
- Use responsibly and rate-limit appropriately
- Some data may be behind login requirements
- Large-scale scraping may trigger rate limits
- Comply with local data protection laws (GDPR, CCPA, etc.)

## 🐛 Troubleshooting

### Chrome not found
```bash
# Install Chrome
sudo apt-get install chromium-browser

# Update .env
CHROME_PATH=/usr/bin/chromium-browser
```

### MongoDB connection error
```bash
# Start MongoDB
mongod --dbpath ./data
```

### Redis connection error
```bash
# Start Redis
redis-server
```

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 📞 Support

For issues and feature requests, please open an issue on GitHub.

---

**Made with ❤️ for data enthusiasts**
