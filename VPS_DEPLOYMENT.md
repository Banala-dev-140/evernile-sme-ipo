# VPS Deployment Guide for Evernile IPO Assessment

## 🚀 Quick Deployment Steps

### 1. **Clone Repository on VPS**
```bash
git clone https://github.com/Banala-dev-140/evernile-sme-ipo.git
cd evernile-sme-ipo
```

### 2. **Environment Configuration**
```bash
# Create .env file for frontend
echo "VITE_EMAIL_API_URL=https://api.ipocompass.evernile.com" > .env

# Create .env file for backend
cd backend
echo "GMAIL_USER=bdinesh@evernile.com" > .env
echo "GMAIL_APP_PASSWORD=your-gmail-app-password" >> .env
echo "PORT=3001" >> .env
cd ..
```

### 3. **Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 4. **Build Frontend**
```bash
npm run build
```

### 5. **Start Backend Service**
```bash
cd backend
npm start
```

### 6. **Serve Frontend (Option 1 - Simple)**
```bash
# Install serve globally
npm install -g serve

# Serve the built frontend
serve -s dist -l 3000
```

### 7. **Serve Frontend (Option 2 - Nginx)**
```bash
# Install nginx
sudo apt update
sudo apt install nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/evernile-ipo

# Add this configuration:
server {
    listen 80;
    server_name api.ipocompass.evernile.com;
    
    location / {
        root /path/to/evernile-sme-ipo/dist;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/evernile-ipo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Port Configuration

- **Frontend**: Port 3000 (or 80 with nginx)
- **Backend API**: Port 3001
- **External Access**: 
  - Frontend: `https://ipocompass.evernile.com` (or `https://ipocompass.evernile.com`)
  - Backend: `https://api.ipocompass.evernile.com` (mapped from 3001)

## 📧 Email Configuration

The backend is configured to use Gmail SMTP:
- **Gmail User**: `bdinesh@evernile.com`
- **App Password**: Set in backend/.env
- **SMTP**: Gmail SMTP servers

## 🐳 Docker Deployment (Alternative)

```bash
# Build and run with Docker
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## ✅ Verification

1. **Health Check**: `curl https://api.ipocompass.evernile.com/api/health`
2. **Frontend**: Visit `https://ipocompass.evernile.com`
3. **Test Email**: Complete an assessment and check email delivery

## 🔍 Troubleshooting

- **Port Conflicts**: Ensure ports 3000 and 3001 are available
- **Firewall**: Open ports 3000 and 8013 in firewall
- **Gmail Auth**: Verify Gmail App Password is correct
- **Environment**: Check .env files are properly configured

## 📊 Monitoring

- **Backend Logs**: Check `cd backend && npm start` output
- **Frontend Logs**: Check browser console for errors
- **Email Logs**: Monitor Gmail SMTP delivery
