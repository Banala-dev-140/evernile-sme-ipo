# Gmail + Nodemailer Setup Guide

## Overview

This guide will help you set up automatic email sending using Gmail and Nodemailer for the IPO assessment reports. The system will send professional HTML emails directly from `bdinesh@evernile.com` to users.

## Prerequisites

1. **Gmail Account**: `bdinesh@evernile.com`
2. **2-Factor Authentication**: Must be enabled on the Gmail account
3. **Node.js**: Version 14 or higher
4. **Internet Connection**: For sending emails

## Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in with `bdinesh@evernile.com`
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the setup process to enable 2FA

## Step 2: Generate Gmail App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Sign in with `bdinesh@evernile.com`
3. Select **Mail** as the app
4. Select **Other (Custom name)** as the device
5. Enter "Evernile Email Service" as the name
6. Click **Generate**
7. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

## Step 3: Backend Setup

### 3.1 Install Dependencies

```bash
cd backend
npm install
```

### 3.2 Configure Environment Variables

1. Copy the example environment file:
```bash
cp env.example .env
```

2. Edit `.env` file:
```env
GMAIL_USER=bdinesh@evernile.com
GMAIL_APP_PASSWORD=your_16_character_app_password_here
PORT=3001
```

**Important**: Replace `your_16_character_app_password_here` with the actual App Password from Step 2.

### 3.3 Start the Email Service

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The service will start on `http://localhost:3001`

## Step 4: Frontend Configuration

### 4.1 Environment Variables (Optional)

Create `.env` file in the project root:

```env
VITE_EMAIL_API_URL=http://localhost:3001
```

### 4.2 Test the Integration

1. Start the frontend application
2. Complete an assessment
3. Check if emails are sent successfully

## Step 5: Testing

### 5.1 Health Check

Visit: `http://localhost:3001/api/health`

Expected response:
```json
{
  "status": "OK",
  "service": "Evernile Email Service",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

### 5.2 Test Email Sending

1. Complete an assessment
2. Check the browser console for success messages
3. Check the email inbox for the report
4. Verify the email is also sent to `bdinesh@evernile.com`

## Email Features

### Professional HTML Design
- **Evernile branding** with company colors
- **Responsive design** for all devices
- **Structured layout** with clear sections
- **Call-to-action buttons** for booking calls

### Email Content
- **Personalized greeting** with user's name
- **Readiness score** with visual indicators
- **Assessment analysis** with dynamic points
- **Summary and recommendations**
- **Contact information** and next steps
- **Professional disclaimer**

### Dual Recipients
- **Primary**: User's email address
- **CC**: `bdinesh@evernile.com` (for tracking)

## Troubleshooting

### Common Issues

#### 1. "Invalid login" Error
- **Cause**: Wrong App Password or 2FA not enabled
- **Solution**: 
  - Verify 2FA is enabled
  - Generate a new App Password
  - Update `.env` file

#### 2. "Less secure app access" Error
- **Cause**: Using regular password instead of App Password
- **Solution**: Use the 16-character App Password, not your regular Gmail password

#### 3. "Connection timeout" Error
- **Cause**: Network issues or Gmail server problems
- **Solution**: 
  - Check internet connection
  - Try again after a few minutes
  - Check Gmail service status

#### 4. "API not found" Error
- **Cause**: Backend service not running
- **Solution**: 
  - Start the backend service: `npm start`
  - Check if port 3001 is available
  - Verify the API URL in frontend

### Debug Steps

1. **Check Backend Logs**:
   ```bash
   cd backend
   npm start
   # Look for error messages in console
   ```

2. **Test API Directly**:
   ```bash
   curl -X POST http://localhost:3001/api/send-assessment-report \
     -H "Content-Type: application/json" \
     -d '{
       "to": "test@example.com",
       "userName": "Test User",
       "assessmentType": "mainboard",
       "readinessScore": 4.5,
       "readinessLabel": "High Readiness",
       "totalScore": 18,
       "dynamicPoints": ["Test point 1", "Test point 2"],
       "closingMessage": "Test message"
     }'
   ```

3. **Check Gmail Settings**:
   - Verify App Password is correct
   - Check if 2FA is enabled
   - Ensure account is not locked

## Production Deployment

### Option 1: VPS/Cloud Server

1. **Deploy Backend**:
   ```bash
   # On your server
   git clone your-repo
   cd backend
   npm install --production
   npm start
   ```

2. **Update Frontend**:
   ```env
   VITE_EMAIL_API_URL=https://your-domain.com
   ```

### Option 2: Heroku

1. **Create Heroku App**:
   ```bash
   heroku create evernile-email-service
   ```

2. **Set Environment Variables**:
   ```bash
   heroku config:set GMAIL_USER=bdinesh@evernile.com
   heroku config:set GMAIL_APP_PASSWORD=your_app_password
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

### Option 3: Railway/Render

Similar process with their respective deployment methods.

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **App Passwords**: Keep them secure and rotate regularly
3. **HTTPS**: Use HTTPS in production for API calls
4. **Rate Limiting**: Consider adding rate limiting for email sending

## Monitoring

### Email Delivery
- Check Gmail sent folder
- Monitor bounce rates
- Track email open rates (if using tracking)

### Service Health
- Monitor backend service uptime
- Check error logs regularly
- Set up alerts for failures

## File Structure

```
backend/
├── package.json          # Dependencies
├── server.js             # Main server file
├── env.example           # Environment template
└── .env                  # Your environment variables (not in git)

src/lib/
└── emailService.ts       # Frontend email service
```

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Verify Gmail settings and App Password
3. Check backend service logs
4. Test with a simple email first
5. Contact support if needed

The system is now ready to send professional IPO assessment reports automatically via Gmail! 🚀
