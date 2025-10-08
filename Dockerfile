# Multi-stage Dockerfile for Evernile IPO Assessment Platform
# Frontend: React + Vite + TypeScript
# Backend: Node.js + Express + Nodemailer

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./

# Build frontend for production
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY backend/ ./

# Stage 3: Production Runtime
FROM node:18-alpine AS production

# Install dumb-init and serve for proper signal handling and static file serving
RUN apk add --no-cache dumb-init && \
    npm install -g serve

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy backend from builder stage
COPY --from=backend-builder --chown=nextjs:nodejs /app/backend ./backend

# Copy built frontend from builder stage
COPY --from=frontend-builder --chown=nextjs:nodejs /app/frontend/dist ./frontend/dist

# Copy frontend static files
COPY --from=frontend-builder --chown=nextjs:nodejs /app/frontend/public ./frontend/public

# Create environment file template
RUN echo "# Email Configuration\nGMAIL_USER=your-email@gmail.com\nGMAIL_APP_PASSWORD=your-app-password\nPORT=3001" > .env.template

# Switch to non-root user
USER nextjs

# Expose ports
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start both frontend and backend
CMD ["dumb-init", "sh", "-c", "cd backend && npm start & serve -s frontend/dist -l 3000"]
