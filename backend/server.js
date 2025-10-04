const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Gmail transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // bdinesh@evernile.com
      pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password
    }
  });
};

// Email template generator
const generateEmailHTML = (data) => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>IPO Readiness Assessment Report</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #f9f9f9;
        }
        .email-container {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header { 
          background-color: #0a2a5e; 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header h2 {
          margin: 10px 0 0 0;
          font-size: 18px;
          font-weight: normal;
          opacity: 0.9;
        }
        .content { padding: 30px 20px; }
        .score-section { 
          background-color: #f8f9fa; 
          padding: 20px; 
          margin: 20px 0; 
          border-left: 4px solid #0a2a5e; 
          border-radius: 4px;
        }
        .score-section h3 {
          margin: 0 0 15px 0;
          color: #0a2a5e;
          font-size: 18px;
        }
        .score-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 15px;
        }
        .score-item {
          background: white;
          padding: 15px;
          border-radius: 4px;
          text-align: center;
        }
        .score-value {
          font-size: 24px;
          font-weight: bold;
          color: #0a2a5e;
        }
        .score-label {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }
        .assessment-section { margin: 25px 0; }
        .assessment-section h3 {
          color: #0a2a5e;
          font-size: 18px;
          margin-bottom: 15px;
        }
        .assessment-points {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #dc2626;
        }
        .assessment-points ul {
          margin: 0;
          padding-left: 20px;
        }
        .assessment-points li {
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .footer { 
          background-color: #f8f9fa; 
          padding: 20px; 
          text-align: center; 
          font-size: 12px; 
          color: #666;
          border-top: 1px solid #e5e7eb;
        }
        .button { 
          background-color: #dc2626; 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 6px; 
          display: inline-block; 
          margin: 15px 0; 
          font-weight: bold;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #b91c1c;
        }
        .contact-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .disclaimer { 
          font-size: 11px; 
          color: #666; 
          margin-top: 20px; 
          padding-top: 15px; 
          border-top: 1px solid #ddd; 
          line-height: 1.4;
        }
        .greeting {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .summary-section {
          background: #e0f2fe;
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #0284c7;
        }
        .summary-section h3 {
          margin: 0 0 15px 0;
          color: #0284c7;
        }
        .next-steps {
          background:rgb(253, 253, 253);
          padding: 20px;
          border-radius: 4px;
          border-left: 4px solid #f59e0b;
        }
        .next-steps h3 {
          margin: 0 0 15px 0;
          color: #f59e0b;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>EVERNILE CAPITAL</h1>
          <h2>IPO Readiness Assessment Report</h2>
        </div>
        
        <div class="content">
          <div class="greeting">
            <p>Dear <strong>${userName}</strong>,</p>
            <p>Thank you for completing the <strong>${assessmentType.toUpperCase()} IPO Readiness Assessment</strong>. Please find your detailed report below:</p>
          </div>
          
          <div class="score-section">
            <h3>Your Readiness Score</h3>
            <div class="score-grid">
              <div class="score-item">
                <div class="score-value">${readinessScore}</div>
                <div class="score-label">out of 5</div>
              </div>
              <div class="score-item">
                <div class="score-value">${totalScore}</div>
                <div class="score-label">Total Points</div>
              </div>
            </div>
            <p style="text-align: center; margin: 15px 0 0 0; font-weight: bold; color: #0a2a5e;">${readinessLabel}</p>
          </div>
          
          <div class="assessment-section">
            <h3>Assessment Analysis</h3>
            <div class="assessment-points">
              <ul>
                ${dynamicPoints.map(point => `<li>${point}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="summary-section">
            <h3>Summary</h3>
            <p>${closingMessage}</p>
          </div>
          
          <div class="next-steps">
            <h3>Next Steps</h3>
            <p>To proceed with your IPO journey, we recommend booking a consultation call with our team:</p>
            <div style="text-align: center;">
              <a href="https://calendly.com/bdinesh-evernile/30min" class="button">Book a Readiness Call</a>
            </div>
            
            <div class="contact-info">
              <p><strong>Contact Details:</strong></p>
              <p>📧 Email: bdinesh@evernile.com<br>
              📱 Mobile: +91-8889926196<br>
              🌐 Website: www.evernile.com</p>
            </div>
          </div>
          
          <div class="disclaimer">
            <p><strong>Disclaimer:</strong> This is an initial readiness assessment and is not a substitute for a comprehensive evaluation. For full eligibility verification, please book a free consultation with us.</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Evernile Capital</strong><br>
          Email: bdinesh@evernile.com | Mobile: +91-8889926196 | Website: www.evernile.com</p>
          <p>This email was generated automatically from the IPO Readiness Assessment Tool.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Generate text version of email
const generateEmailText = (data) => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  return `
Dear ${userName},

Thank you for completing the ${assessmentType.toUpperCase()} IPO Readiness Assessment. Please find your detailed report below:

${'='.repeat(50)}
IPO READINESS ASSESSMENT REPORT
${'='.repeat(50)}

Assessment Type: ${assessmentType.toUpperCase()} IPO
Assessment Date: ${new Date().toLocaleDateString()}

${'='.repeat(30)}
YOUR READINESS SCORE
${'='.repeat(30)}

Readiness Score: ${readinessScore} out of 5
Readiness Level: ${readinessLabel}
Total Score: ${totalScore} points

${'='.repeat(30)}
ASSESSMENT ANALYSIS
${'='.repeat(30)}

${dynamicPoints.map((point, index) => `${index + 1}. ${point}`).join('\n\n')}

${'='.repeat(30)}
SUMMARY
${'='.repeat(30)}

${closingMessage}

${'='.repeat(30)}
NEXT STEPS
${'='.repeat(30)}

To proceed with your IPO journey, we recommend booking a consultation call with our team:

📅 Book a Readiness Call: https://calendly.com/bdinesh-evernile/30min

Contact Details:
📧 Email: bdinesh@evernile.com
📱 Mobile: +91-8889926196
🌐 Website: www.evernile.com

${'='.repeat(30)}
DISCLAIMER
${'='.repeat(30)}

This is an initial readiness assessment and is not a substitute for a comprehensive evaluation. For full eligibility verification, please book a free consultation with us.

${'='.repeat(50)}

Best regards,
Evernile Capital Team

---
Evernile Capital
Email: bdinesh@evernile.com
Mobile: +91-8889926196
Website: www.evernile.com

This email was generated automatically from the IPO Readiness Assessment Tool.
  `.trim();
};

// API endpoint to send assessment report
app.post('/api/send-assessment-report', async (req, res) => {
  try {
    const { to, userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = req.body;

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
