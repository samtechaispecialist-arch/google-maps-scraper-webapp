# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "username"
}

Response: 201
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "userId",
    "email": "user@example.com",
    "username": "username"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {...}
}
```

## Scraping Endpoints

### Start Scraping Job
```http
POST /scrape/start
Authorization: Bearer {token}
Content-Type: application/json

{
  "searchQuery": "restaurants in New York",
  "limit": 100,
  "options": {
    "includeReviews": true,
    "includeRatings": true,
    "includePhotos": true,
    "includeHours": true
  },
  "proxyRotation": true
}

Response: 202
{
  "jobId": "job_123456",
  "status": "started",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get Job Status
```http
GET /scrape/status/{jobId}
Authorization: Bearer {token}

Response: 200
{
  "jobId": "job_123456",
  "status": "in_progress",
  "progress": 45,
  "placesScraped": 45,
  "totalPlaces": 100,
  "currentProxy": "122.33.***.***:8080",
  "startedAt": "2024-01-01T00:00:00Z",
  "estimatedCompletion": "2024-01-01T00:15:00Z"
}
```

### Get Scraping Results
```http
GET /scrape/results/{jobId}
Authorization: Bearer {token}
?page=1&limit=20

Response: 200
{
  "jobId": "job_123456",
  "total": 100,
  "page": 1,
  "limit": 20,
  "results": [
    {
      "name": "Restaurant Name",
      "address": "123 Main St, New York, NY",
      "rating": 4.5,
      "reviews": 250,
      "phone": "+1-555-123-4567",
      "website": "https://restaurant.com",
      "hours": "Mon-Sun 11AM-11PM",
      "proxy": "122.33.***.***:8080",
      "scrapedAt": "2024-01-01T00:05:30Z"
    }
  ]
}
```

### Cancel Scraping Job
```http
POST /scrape/cancel/{jobId}
Authorization: Bearer {token}

Response: 200
{
  "jobId": "job_123456",
  "status": "cancelled",
  "placesScraped": 45,
  "cancelledAt": "2024-01-01T00:10:00Z"
}
```

## Proxy Endpoints

### List Proxies
```http
GET /proxies/list
Authorization: Bearer {token}

Response: 200
{
  "total": 150,
  "working": 145,
  "failed": 5,
  "proxies": [
    {
      "ip": "122.33.xxx.xxx",
      "port": 8080,
      "protocol": "http",
      "status": "working",
      "lastChecked": "2024-01-01T00:00:00Z",
      "responseTime": 250
    }
  ]
}
```

### Refresh Proxies
```http
POST /proxies/refresh
Authorization: Bearer {token}

Response: 200
{
  "status": "refreshing",
  "message": "Fetching proxies from GitHub..."
}
```

### Get Proxy Statistics
```http
GET /proxies/stats
Authorization: Bearer {token}

Response: 200
{
  "totalProxies": 150,
  "workingProxies": 145,
  "failedProxies": 5,
  "successRate": 96.67,
  "avgResponseTime": 320,
  "lastRefresh": "2024-01-01T00:00:00Z"
}
```

### Test Proxy
```http
POST /proxies/test
Authorization: Bearer {token}
Content-Type: application/json

{
  "proxy": "122.33.xxx.xxx:8080"
}

Response: 200
{
  "proxy": "122.33.xxx.xxx:8080",
  "working": true,
  "responseTime": 245,
  "testUrl": "https://httpbin.org/ip"
}
```

## Data Endpoints

### Export Results
```http
GET /data/export/{jobId}
Authorization: Bearer {token}
?format=csv

Response: 200 (CSV file download)
```

### Get Scraping History
```http
GET /data/history
Authorization: Bearer {token}
?page=1&limit=20&status=completed

Response: 200
{
  "total": 50,
  "page": 1,
  "limit": 20,
  "jobs": [
    {
      "jobId": "job_123456",
      "searchQuery": "restaurants in New York",
      "status": "completed",
      "placesScraped": 100,
      "createdAt": "2024-01-01T00:00:00Z",
      "completedAt": "2024-01-01T00:15:00Z",
      "duration": 900000
    }
  ]
}
```

### Delete Job Results
```http
DELETE /data/{jobId}
Authorization: Bearer {token}

Response: 200
{
  "message": "Job results deleted successfully",
  "jobId": "job_123456"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Job with ID 'job_invalid' not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate Limited",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 300
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
