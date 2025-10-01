#!/bin/bash

# Evernile Email Service Startup Script

echo "🚀 Starting Evernile Email Service..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found. Please run this script from the project root."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your Gmail credentials:"
    echo "   - GMAIL_USER=bdinesh@evernile.com"
    echo "   - GMAIL_APP_PASSWORD=your_gmail_app_password"
    echo ""
    echo "Press Enter after updating .env file..."
    read
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the service
echo "🎯 Starting email service on port 3001..."
echo "📧 Health check: http://localhost:3001/api/health"
echo "🛑 Press Ctrl+C to stop the service"
echo ""

npm start
