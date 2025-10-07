// Email template generator for IPO Readiness Assessment Reports
// This file contains the HTML and text email templates

// Function to generate correct Key Assessment Highlights based on assessment type and user answers
const generateKeyAssessmentHighlights = (assessmentType, dynamicPoints) => {
  if (!dynamicPoints || dynamicPoints.length === 0) {
    return [];
  }
  
  // For Mainboard IPO: Only show Q2 and Q3 (Business Existence and Paid-up Capital)
  if (assessmentType.toLowerCase() === 'mainboard') {
    return dynamicPoints.filter(point => 
      point.includes('regulatory guideline') || 
      point.includes('regulatory criteria') ||
      point.includes('paid-up capital') ||
      point.includes('existence for')
    );
  }
  
  // For SME IPO: Show Q2, Q3, Q4, Q5, Q6 (Business Existence, D/E Ratio, Net Worth, Operating Profit, Net Tangible Assets)
  if (assessmentType.toLowerCase() === 'sme') {
    return dynamicPoints.filter(point => 
      point.includes('operational history') ||
      point.includes('leverage') ||
      point.includes('net worth') ||
      point.includes('profitability') ||
      point.includes('net tangible assets') ||
      point.includes('Debt to Equity') ||
      point.includes('Operating Profit') ||
      point.includes('Net Tangible Assets')
    );
  }
  
  return dynamicPoints;
};

const generateEmailHTML = (data) => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  // Generate correct Key Assessment Highlights based on assessment type
  const keyAssessmentHighlights = generateKeyAssessmentHighlights(assessmentType, dynamicPoints);
  
  // Use the actual closing message from the assessment logic
  const summary = closingMessage || "Thank you for completing the assessment.";
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IPO Readiness Assessment Report - Evernile Capital</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
    .email-wrapper {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      text-align: center;
      padding: 38px 20px 22px 20px;
      border-radius: 16px 16px 0 0;
    }
     .header-title {
       font-size: 2.1em;
       font-weight: bold;
       margin-bottom: 7px;
       letter-spacing: 0.02em;
     }
     .header-subtitle {
       font-size: 1.2em;
       font-weight: 500;
       opacity: 0.9;
       letter-spacing: 0.03em;
     }
    .content {
      padding: 32px 20px 28px 20px;
      color: #2c3e50;
    }
    .greeting {
      font-size: 1.08em;
      margin-bottom: 28px;
    }
    .score-section {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 14px;
      border: 1px solid #e0e6ed;
      padding: 34px 18px 45px 18px;
      text-align: center;
      margin-bottom: 35px;
      position: relative;
    }
    .score-title {
      font-size: 1.25em;
      color: #1e3c72;
      font-weight: 600;
      margin-bottom: 19px;
      letter-spacing: 0.01em;
    }
        .score-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
          text-align: center;
        }
        .readiness-score-value {
          font-size: 3.5em;
          font-weight: bold;
          color: #1e3c72;
          margin: 20px 0 15px 0;
          letter-spacing: 0.02em;
        }
        .readiness-label {
          font-size: 1.7em;
          font-weight: 600;
          color: #1e3c72;
          margin-bottom: 0px;
        }
    .assessment-section, .summary-section, .next-steps {
      margin-bottom: 32px;
    }
    .assessment-section h3,
    .summary-section h3,
    .next-steps h3 {
      color: #1e3c72;
      font-size: 1.1em;
      margin-bottom: 16px;
      font-weight: 600;
    }
     .assessment-points {
       background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
       padding: 24px 18px;
       border-radius: 12px;
       border-left: 4px solid #2196f3;
       box-shadow: 0 4px 15px rgba(0,0,0,0.08);
       font-size: 1em;
     }
    .assessment-points ul {
      padding-left: 0;
      list-style: none;
    }
    .assessment-points li {
      margin-bottom: 13px;
      line-height: 1.6;
      padding-left: 25px;
      position: relative;
    }
     .assessment-points li::before {
       content: '▶';
       position: absolute;
       left: 0;
       color: #2196f3;
       font-size: 12px;
       top: 2px;
     }
    .summary-section {
      background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
      border-radius: 12px;
      border-left: 4px solid #2196f3;
      padding: 20px 18px 22px 18px;
    }
    .next-steps {
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
      border-radius: 12px;
      border-left: 4px solid #ff9800;
      padding: 22px 16px;
      text-align: center;
    }
     .cta-button {
       background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
       color: #d32f2f;
       padding: 15px 28px;
       text-decoration: none;
       border-radius: 8px;
       display: inline-block;
       margin: 20px 0;
       font-weight: 600;
       font-size: 1em;
       box-shadow: 0 4px 15px rgba(211, 47, 47, 0.2);
       transition: all 0.3s ease;
       letter-spacing: 0.03em;
       border: 2px solid #ffcdd2;
     }
     .cta-button:hover {
       transform: translateY(-2px);
       box-shadow: 0 8px 26px rgba(211, 47, 47, 0.3);
     }
    .contact-info {
      background: white;
      padding: 17px 15px;
      border-radius: 8px;
      margin: 18px 0 0 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      font-size: 1em;
    }
    .contact-info p {
      margin-bottom: 7px;
      color: #2c3e50;
      line-height: 1.5;
    }
    .contact-info strong {
      color: #1e3c72;
    }
        .disclaimer {
          font-size: 11.5px;
          color: #95a5a6;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid #ccc;
          line-height: 1.5;
        }
        .copyright {
          text-align: center;
          font-size: 11px;
          color: #7f8c8d;
          margin-top: 8px;
          font-weight: 500;
        }
    @media (max-width: 700px) {
      .email-wrapper { max-width: 99vw; }
      .content, .header { padding-left: 7vw; padding-right: 7vw;}
      .readiness-score-value { font-size: 3em; }
      .readiness-label { font-size: 1.5em; }
    }
    @media (max-width: 480px) {
      .email-wrapper { max-width: 100vw; border-radius: 0; }
      .readiness-score-value { font-size: 2.5em; }
      .readiness-label { font-size: 1.3em; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
        <div class="header">
          <div class="header-title">IPO Readiness Report</div>
          <div class="header-subtitle">Evernile Capital</div>
        </div>
    <div class="content">
      <div class="greeting">
        <p>Dear <strong>${userName}</strong>,</p>
        <p>Thank you for completing the <strong>${assessmentType.toUpperCase()} IPO Readiness Assessment</strong>. We're pleased to present your comprehensive readiness analysis below:</p>
      </div>
      <div class="score-section">
        <div class="score-title">IPO Readiness Score</div>
        <div class="score-display">
          <div class="readiness-score-value">${readinessScore}/5</div>
          <div class="readiness-label">${readinessLabel}</div>
        </div>
      </div>
      <div class="assessment-section">
        <h3>🔍 Key Assessment Highlights</h3>
        <div class="assessment-points">
          <ul>
            ${keyAssessmentHighlights.map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="summary-section">
        <h3>📋 Summary</h3>
        <p>${summary}</p>
      </div>
      <div class="next-steps">
        <h3>🚀 Next Steps</h3>
        <p>Ready to take your IPO journey to the next level? Our expert team is here to guide you through every step of the process.</p>
        <a href="https://calendly.com/bdinesh-evernile/30min" class="cta-button">Book IPO Expert</a>
        <div class="contact-info">
          <p><strong>📞 Get in Touch:</strong></p>
          <p>📧 <strong>Email:</strong> bdinesh@evernile.com<br>
          📱 <strong>Phone:</strong> +91-8889926196<br>
          🌐 <strong>Website:</strong> www.evernile.com</p>
        </div>
      </div>
      <div class="disclaimer">
        <strong>Disclaimer:</strong> This assessment provides an initial evaluation of your IPO readiness and should not be considered as financial or legal advice. For comprehensive guidance tailored to your specific situation, please consult with our qualified professionals.
        <br><br>
        <div class="copyright">Copyright © 2025 Evernile. All Rights Reserved.</div>
      </div>
    </div>
  </div>
</body>
</html>

  `;
};

// Generate text version of email
const generateEmailText = (data) => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  // Generate correct Key Assessment Highlights based on assessment type
  const keyAssessmentHighlights = generateKeyAssessmentHighlights(assessmentType, dynamicPoints);
  
  // Use the actual closing message from the assessment logic
  const summary = closingMessage || "Thank you for completing the assessment.";
  
  return `
Dear ${userName},

Thank you for completing the ${assessmentType.toUpperCase()} IPO Readiness Assessment. Please find your detailed report below:

${'='.repeat(50)}
IPO READINESS REPORT
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
KEY ASSESSMENT HIGHLIGHTS
${'='.repeat(30)}

${keyAssessmentHighlights.map((point, index) => `${index + 1}. ${point}`).join('\n\n')}

${'='.repeat(30)}
SUMMARY
${'='.repeat(30)}

${summary}

${'='.repeat(30)}
NEXT STEPS
${'='.repeat(30)}

To proceed with your IPO journey, we recommend booking a consultation call with our team:

📅 Book IPO Expert: https://calendly.com/bdinesh-evernile/30min

Contact Details:
📧 Email: bdinesh@evernile.com
📱 Mobile: +91-8889926196
🌐 Website: www.evernile.com

${'='.repeat(50)}
DISCLAIMER
${'='.repeat(50)}

This assessment provides an initial evaluation of your IPO readiness and should not be considered as financial or legal advice. For comprehensive guidance tailored to your specific situation, please consult with our qualified professionals.

Copyright © 2025 Evernile. All Rights Reserved.

---
Evernile Capital
Email: bdinesh@evernile.com | Mobile: +91-8889926196 | Website: www.evernile.com
  `;
};

module.exports = {
  generateEmailHTML,
  generateEmailText
};
