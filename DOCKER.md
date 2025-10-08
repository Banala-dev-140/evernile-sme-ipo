# Docker Setup for Evernile IPO Assessment Platform

This document provides instructions for running the Evernile IPO Assessment Platform using Docker.

## 🐳 Docker Files Overview

- **`Dockerfile`** - Production-ready multi-stage build
- **`Dockerfile.dev`** - Development environment
- **`docker-compose.yml`** - Orchestration for multiple services
- **`.dockerignore`** - Files to exclude from Docker context

## 🚀 Quick Start

### Prerequisites

1. **Docker** installed on your system
2. **Docker Compose** (usually comes with Docker Desktop)
3. **Environment variables** configured

### Environment Setup

Create a `.env` file in the root directory:

```bash
# Email Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
PORT=3001
```

## 📦 Build and Run

### Option 1: Production Build

```bash
# Build the production image
docker build -t evernile-ipo-app .

# Run the container
docker run -p 3000:3000 -p 3001:3001 \
  -e GMAIL_USER=your-email@gmail.com \
  -e GMAIL_APP_PASSWORD=your-app-password \
  evernile-ipo-app
```

### Option 2: Development Build

```bash
# Build the development image
docker build -f Dockerfile.dev -t evernile-ipo-dev .

# Run the development container
docker run -p 3000:3000 -p 3001:3001 \
  -e GMAIL_USER=your-email@gmail.com \
  -e GMAIL_APP_PASSWORD=your-app-password \
  -v $(pwd):/app \
  evernile-ipo-dev
```

### Option 3: Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# Start with development profile
docker-compose --profile dev up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Development Workflow

### Hot Reload Development

```bash
# Start development environment with volume mounting
docker-compose --profile dev up -d

# View logs
docker-compose logs -f dev

# Stop development environment
docker-compose --profile dev down
```

### Backend Only

```bash
# Build and run only backend
docker build -f Dockerfile -t evernile-backend --target backend-builder .
docker run -p 3001:3001 \
  -e GMAIL_USER=your-email@gmail.com \
  -e GMAIL_APP_PASSWORD=your-app-password \
  evernile-backend
```

### Frontend Only

```bash
# Build and run only frontend
docker build -f Dockerfile -t evernile-frontend --target frontend-builder .
docker run -p 3000:3000 evernile-frontend
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 📊 Monitoring

### Container Health

```bash
# Check container status
docker ps

# View container logs
docker logs <container-id>

# Check health status
docker inspect <container-id> | grep Health
```

### Application Health

```bash
# Test backend health
curl http://localhost:3001/api/health

# Test email service
curl -X POST http://localhost:3001/api/send-assessment-report \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","userName":"Test User","assessmentType":"mainboard","readinessScore":4,"readinessLabel":"Good Readiness","dynamicPoints":["Test point"],"closingMessage":"Test message"}'
```

## 🔒 Security Features

- **Non-root user**: Application runs as `nextjs` user (UID 1001)
- **Minimal attack surface**: Alpine Linux base image
- **Signal handling**: Proper process management with `dumb-init`
- **Health checks**: Built-in health monitoring
- **Environment isolation**: Secure environment variable handling

## 🚀 Production Deployment

### Environment Variables

```bash
# Required environment variables
GMAIL_USER=your-production-email@gmail.com
GMAIL_APP_PASSWORD=your-production-app-password
NODE_ENV=production
PORT=3001
```

### Production Commands

```bash
# Build production image
docker build -t evernile-ipo-prod .

# Run production container
docker run -d \
  --name evernile-ipo \
  -p 3000:3000 \
  -p 3001:3001 \
  -e GMAIL_USER=your-email@gmail.com \
  -e GMAIL_APP_PASSWORD=your-app-password \
  -e NODE_ENV=production \
  --restart unless-stopped \
  evernile-ipo-prod
```

### Docker Compose Production

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d

# Scale services
docker-compose up -d --scale backend=2
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 3001 are available
2. **Environment variables**: Check `.env` file configuration
3. **Gmail credentials**: Verify Gmail App Password is correct
4. **Build failures**: Check Dockerfile syntax and dependencies

### Debug Commands

```bash
# Check container status
docker ps -a

# View detailed logs
docker logs -f <container-id>

# Execute commands in container
docker exec -it <container-id> sh

# Check environment variables
docker exec <container-id> env
```

### Performance Optimization

```bash
# Build with cache
docker build --cache-from evernile-ipo-app .

# Multi-platform build
docker buildx build --platform linux/amd64,linux/arm64 -t evernile-ipo-app .

# Clean up unused images
docker image prune -f
```

## 📝 Notes

- **Frontend**: Served using `serve` package for optimal static file serving
- **Backend**: Express.js API with Nodemailer for email functionality
- **Health Checks**: Built-in health monitoring for production reliability
- **Security**: Non-root user execution and minimal attack surface
- **Scalability**: Docker Compose supports horizontal scaling

## 🔗 Related Files

- `Dockerfile` - Production multi-stage build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Service orchestration
- `.dockerignore` - Build context optimization
- `backend/.env` - Backend environment configuration
