const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { generateEmailHTML, generateEmailText } = require('./emailTemplate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
// Hardcoded values for testing (replace with .env file later)
const GMAIL_USER = 'bdinesh@evernile.com';
const GMAIL_APP_PASSWORD = 'cmlc uiii kosa uaiq';

console.log('Gmail User:', GMAIL_USER);
console.log('Gmail App Password:', GMAIL_APP_PASSWORD ? 'Set' : 'Not set');

// Gmail transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD
    }
  });
};

// Email templates are imported from emailTemplate.js

// API endpoint to send assessment report
app.post('/api/send-assessment-report', async (req, res) => {
  try {
    const { to, userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = req.body;

    // Debug: Log received data
    console.log('📧 Received email data:');
    console.log('  - to:', to);
    console.log('  - userName:', userName);
    console.log('  - assessmentType:', assessmentType);
    console.log('  - readinessScore:', readinessScore);
    console.log('  - readinessLabel:', readinessLabel);
    console.log('  - dynamicPoints:', dynamicPoints);
    console.log('  - closingMessage:', closingMessage);

    // Validate required fields
    if (!to || !userName || !assessmentType || !readinessScore || !readinessLabel) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Create transporter
    const transporter = createTransporter();

    // Email data
    const emailData = {
      userName,
      assessmentType,
      readinessScore,
      readinessLabel,
      totalScore,
      dynamicPoints: dynamicPoints || [],
      closingMessage: closingMessage || 'Thank you for completing the assessment.'
    };

    // Email options
    const mailOptions = {
      from: {
        name: 'Evernile Capital',
        address: process.env.GMAIL_USER
      },
      to: to,
      cc: process.env.GMAIL_USER, // Send copy to bdinesh@evernile.com
      subject: `${assessmentType.toUpperCase()} IPO Readiness Assessment Report - ${readinessLabel}`,
      text: generateEmailText(emailData),
      html: generateEmailHTML(emailData)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Assessment report sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Lightweight user event logger for Docker logs
app.post('/api/log-user-event', (req, res) => {
  const { eventType, payload, timestamp } = req.body || {};

  const logTimestamp = timestamp || new Date().toISOString();
  console.log('📝 [USER EVENT]', JSON.stringify({
    timestamp: logTimestamp,
    eventType: eventType || 'unknown_event',
    ip: req.ip,
    payload: payload || {}
  }));

  res.json({
    success: true
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Evernile Email Service',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
