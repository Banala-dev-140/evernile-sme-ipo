#!/bin/bash

# Docker Scripts for Evernile IPO Assessment Platform
# Usage: ./docker-scripts.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        log_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Build production image
build_production() {
    log_info "Building production image..."
    docker build -t evernile-ipo-app .
    log_success "Production image built successfully!"
}

# Build development image
build_development() {
    log_info "Building development image..."
    docker build -f Dockerfile.dev -t evernile-ipo-dev .
    log_success "Development image built successfully!"
}

# Run production container
run_production() {
    log_info "Starting production container..."
    docker run -d \
        --name evernile-ipo-prod \
        -p 3000:3000 \
        -p 3001:3001 \
        -e GMAIL_USER=${GMAIL_USER:-"your-email@gmail.com"} \
        -e GMAIL_APP_PASSWORD=${GMAIL_APP_PASSWORD:-"your-app-password"} \
        evernile-ipo-app
    log_success "Production container started!"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend: http://localhost:3001"
}

# Run development container
run_development() {
    log_info "Starting development container..."
    docker run -d \
        --name evernile-ipo-dev \
        -p 3000:3000 \
        -p 3001:3001 \
        -v $(pwd):/app \
        -e GMAIL_USER=${GMAIL_USER:-"your-email@gmail.com"} \
        -e GMAIL_APP_PASSWORD=${GMAIL_APP_PASSWORD:-"your-app-password"} \
        evernile-ipo-dev
    log_success "Development container started!"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend: http://localhost:3001"
}

# Start with Docker Compose
start_compose() {
    log_info "Starting services with Docker Compose..."
    docker-compose up -d
    log_success "Services started with Docker Compose!"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend: http://localhost:3001"
}

# Start development with Docker Compose
start_compose_dev() {
    log_info "Starting development services with Docker Compose..."
    docker-compose --profile dev up -d
    log_success "Development services started!"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend: http://localhost:3001"
}

# Stop containers
stop_containers() {
    log_info "Stopping containers..."
    docker stop evernile-ipo-prod evernile-ipo-dev 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    log_success "Containers stopped!"
}

# Clean up containers and images
cleanup() {
    log_info "Cleaning up containers and images..."
    docker stop evernile-ipo-prod evernile-ipo-dev 2>/dev/null || true
    docker rm evernile-ipo-prod evernile-ipo-dev 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    docker rmi evernile-ipo-app evernile-ipo-dev 2>/dev/null || true
    log_success "Cleanup completed!"
}

# Show logs
show_logs() {
    local container_name=${1:-"evernile-ipo-prod"}
    log_info "Showing logs for $container_name..."
    docker logs -f $container_name
}

# Check health
check_health() {
    log_info "Checking application health..."
    
    # Check if containers are running
    if docker ps | grep -q evernile-ipo; then
        log_success "Containers are running"
    else
        log_warning "No containers are running"
    fi
    
    # Check backend health
    if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
        log_success "Backend is healthy"
    else
        log_warning "Backend health check failed"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        log_success "Frontend is accessible"
    else
        log_warning "Frontend is not accessible"
    fi
}

# Test email service
test_email() {
    log_info "Testing email service..."
    curl -X POST http://localhost:3001/api/send-assessment-report \
        -H "Content-Type: application/json" \
        -d '{
            "to": "test@example.com",
            "userName": "Test User",
            "assessmentType": "mainboard",
            "readinessScore": 4,
            "readinessLabel": "Good Readiness",
            "dynamicPoints": ["Test assessment point"],
            "closingMessage": "Test closing message"
        }'
    echo ""
    log_success "Email test completed!"
}

# Show help
show_help() {
    echo "Docker Scripts for Evernile IPO Assessment Platform"
    echo ""
    echo "Usage: ./docker-scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build-prod      Build production image"
    echo "  build-dev       Build development image"
    echo "  run-prod        Run production container"
    echo "  run-dev         Run development container"
    echo "  compose         Start with Docker Compose"
    echo "  compose-dev     Start development with Docker Compose"
    echo "  stop            Stop all containers"
    echo "  cleanup         Clean up containers and images"
    echo "  logs [name]     Show logs (default: evernile-ipo-prod)"
    echo "  health          Check application health"
    echo "  test-email      Test email service"
    echo "  help            Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  GMAIL_USER              Gmail username"
    echo "  GMAIL_APP_PASSWORD      Gmail app password"
    echo ""
    echo "Examples:"
    echo "  ./docker-scripts.sh build-prod"
    echo "  ./docker-scripts.sh run-prod"
    echo "  ./docker-scripts.sh compose"
    echo "  GMAIL_USER=your-email@gmail.com ./docker-scripts.sh run-prod"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        "build-prod")
            build_production
            ;;
        "build-dev")
            build_development
            ;;
        "run-prod")
            run_production
            ;;
        "run-dev")
            run_development
            ;;
        "compose")
            start_compose
            ;;
        "compose-dev")
            start_compose_dev
            ;;
        "stop")
            stop_containers
            ;;
        "cleanup")
            cleanup
            ;;
        "logs")
            show_logs "$2"
            ;;
        "health")
            check_health
            ;;
        "test-email")
            test_email
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
