# Port Mapping for Evernile SME IPO Application

## 🚀 **Evernile SME IPO Service**

### **Port Configuration:**
- **Frontend**: `3006:3000` (External:Internal)
- **Backend API**: `3007:3001` (External:Internal)

### **Access Points:**
- **Frontend Application**: http://localhost:3006
- **Backend API**: http://localhost:3007
- **Health Check**: http://localhost:3007/api/health

## 📊 **Port Conflict Analysis**

### **Existing Services (from your docker-compose.yml):**
- `3001` - yesmadam-segment-engine (Frontend)
- `3002` - health-record-digitization
- `3003` - candidate-insight-algo
- `3004` - cx360-churn-insight (Frontend)
- `3005` - shopper-lens-dash
- `3006` - **EVERNILE SME IPO (Frontend)** ✅
- `3007` - **EVERNILE SME IPO (Backend)** ✅
- `3008` - Available
- `3009` - Available
- `3010` - Available

### **Additional Ports Used:**
- `8000` - ocr-map-script
- `8001` - sql-pandas-agent
- `8006-8010` - cx360-churn-insight (Multiple APIs)
- `8011-8012` - aurora-cycle-charm

## 🔧 **Service Configuration**

### **Docker Compose Service:**
```yaml
evernile-sme-ipo:
  build:
    context: .
    dockerfile: Dockerfile
  container_name: evernile-sme-ipo
  ports:
    - "3006:3000"   # Frontend
    - "3007:3001"   # Backend API
  environment:
    - NODE_ENV=production
    - GMAIL_USER=${GMAIL_USER}
    - GMAIL_APP_PASSWORD=${GMAIL_APP_PASSWORD}
    - PORT=3001
  volumes:
    - ./backend:/app/backend
    - ./frontend/dist:/app/frontend/dist
  restart: unless-stopped
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:3001/api/health"]
    interval: 30s
    timeout: 10s
    retries: 3
    start_period: 40s
```

## 🚀 **Deployment Commands**

### **Start Evernile SME IPO Service:**
```bash
# Start only the Evernile service
docker-compose up evernile-sme-ipo -d

# Start with logs
docker-compose up evernile-sme-ipo

# Build and start
docker-compose up --build evernile-sme-ipo -d
```

### **Check Service Status:**
```bash
# Check if service is running
docker-compose ps evernile-sme-ipo

# Check logs
docker-compose logs -f evernile-sme-ipo

# Check health
curl http://localhost:3007/api/health
```

### **Stop Service:**
```bash
# Stop the service
docker-compose stop evernile-sme-ipo

# Remove the service
docker-compose rm evernile-sme-ipo
```

## 🔍 **Health Monitoring**

### **Health Check Endpoints:**
- **Backend Health**: `GET http://localhost:3007/api/health`
- **Frontend**: `GET http://localhost:3006`

### **Expected Health Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-08T14:30:00.000Z",
  "service": "Evernile Email Service",
  "version": "1.0.0"
}
```

## 📱 **Mobile Responsiveness**

The application is fully responsive and optimized for:
- **Mobile devices** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px+)

### **Responsive Features:**
- ✅ Mobile-first design approach
- ✅ Touch-friendly interface
- ✅ Optimized font sizes for mobile
- ✅ Responsive grid layouts
- ✅ Mobile-optimized forms
- ✅ Touch-friendly buttons and interactions

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **Port Already in Use:**
   ```bash
   # Check what's using the port
   lsof -i :3006
   lsof -i :3007
   
   # Kill process if needed
   sudo kill -9 <PID>
   ```

2. **Service Not Starting:**
   ```bash
   # Check logs
   docker-compose logs evernile-sme-ipo
   
   # Rebuild service
   docker-compose up --build evernile-sme-ipo -d
   ```

3. **Health Check Failing:**
   ```bash
   # Check if backend is running
   docker-compose exec evernile-sme-ipo curl http://localhost:3001/api/health
   ```

## 📋 **Environment Variables**

### **Required Environment Variables:**
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
NODE_ENV=production
PORT=3001
```

### **Optional Environment Variables:**
```bash
# For development
NODE_ENV=development

# For custom configuration
API_TIMEOUT=30000
MAX_EMAIL_SIZE=10485760
```

## 🎯 **Quick Start Guide**

1. **Set Environment Variables:**
   ```bash
   export GMAIL_USER=your-email@gmail.com
   export GMAIL_APP_PASSWORD=your-app-password
   ```

2. **Start the Service:**
   ```bash
   docker-compose up evernile-sme-ipo -d
   ```

3. **Verify Service:**
   ```bash
   curl http://localhost:3007/api/health
   ```

4. **Access Application:**
   - Frontend: http://localhost:3006
   - Backend: http://localhost:3007

## 📊 **Performance Monitoring**

### **Resource Usage:**
- **Memory**: ~200MB (Frontend + Backend)
- **CPU**: Low usage during idle
- **Disk**: ~500MB (including dependencies)

### **Scaling:**
```bash
# Scale the service
docker-compose up --scale evernile-sme-ipo=2 -d
```

## 🔒 **Security Notes**

- **Non-root user**: Application runs as `nextjs` user
- **Minimal attack surface**: Alpine Linux base
- **Health checks**: Built-in monitoring
- **Environment isolation**: Secure credential handling
