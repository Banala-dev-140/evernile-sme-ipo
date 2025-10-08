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
      point.includes('Net Tangible Assets') ||
      point.includes('SME IPO') ||
      point.includes('financial strength') ||
      point.includes('listing eligibility') ||
      point.includes('operational viability') ||
      point.includes('eligibility threshold')
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
      background: #f8f9fa;
      margin: 0;
      padding: 20px;
      min-height: 100vh;
    }
    .email-wrapper {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: #ffffff;
      color: #212529;
      text-align: center;
      padding: 40px 20px 30px 20px;
      border-bottom: 1px solid #e9ecef;
    }
    .header-title {
      font-size: 2.0em;
      font-weight: 700;
      margin-bottom: 8px;
      color: #212529;
      letter-spacing: 0.01em;
    }
    .header-subtitle {
      font-size: 1.2em;
      font-weight: 500;
      color: #6c757d;
      letter-spacing: 0.02em;
    }
    .content {
      padding: 32px 20px 28px 20px;
      color: #495057;
    }
    .greeting {
      font-size: 1.28em;
      margin-bottom: 28px;
    }
        .score-section {
          margin-bottom: 35px;
        }
        .score-title {
          font-size: 1.3em;
          color: #212529;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: 0.01em;
        }
        .score-card {
          background: #d4edda;
          border-radius: 8px;
          border: 1px solid #c3e6cb;
          padding: 24px 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .readiness-score-line {
          font-size: 1.6em;
          font-weight: 600;
          color: #28a745;
          margin: 8px 0 8px 0;
          letter-spacing: 0.01em;
          text-align: center;
        }
        .readiness-level-line {
          font-size: 1.6em;
          font-weight: 600;
          color: #28a745;
          margin-bottom: 0px;
          letter-spacing: 0.01em;
          text-align: center;
        }
    .assessment-section, .summary-section, .next-steps {
      margin-bottom: 32px;
    }
    .assessment-section h3,
    .summary-section h3,
    .next-steps h3 {
      color: #212529;
      font-size: 1.3em;
      margin-bottom: 16px;
      font-weight: 600;
    }
    .assessment-points {
      background: #f8f9fa;
      padding: 20px 18px;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      font-size: 1.2em;
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
      content: '•';
      position: absolute;
      left: 0;
      color: #dc3545;
      font-size: 18px;
      top: 2px;
    }
        .summary-section h3 {
          margin-bottom: 12px;
        }
        .summary-content {
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
          padding: 20px 18px;
        }
    .next-steps {
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      padding: 24px 20px;
      text-align: center;
    }
    .cta-button {
      background: #dc3545;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      display: inline-block;
      margin: 20px 0;
      font-weight: 600;
      font-size: 1.2em;
      transition: all 0.3s ease;
      letter-spacing: 0.02em;
      border: none;
    }
     .cta-button:hover {
       transform: translateY(-2px);
       box-shadow: 0 8px 26px rgba(211, 47, 47, 0.3);
     }
    .contact-info {
      background: #f8f9fa;
      padding: 20px 18px;
      border-radius: 8px;
      margin: 20px 0 0 0;
      border: 1px solid #e9ecef;
      font-size: 1em;
    }
    .contact-info p {
      margin-bottom: 7px;
      color: #495057;
      line-height: 1.5;
    }
    .contact-info strong {
      color: #212529;
    }
        .disclaimer {
          font-size: 12px;
          color: #6c757d;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #e9ecef;
          line-height: 1.5;
        }
        .copyright {
          text-align: center;
          font-size: 11px;
          color: #6c757d;
          margin-top: 8px;
          font-weight: 500;
        }
    @media (max-width: 700px) {
      .email-wrapper { max-width: 99vw; }
      .content, .header { padding-left: 7vw; padding-right: 7vw;}
      .readiness-score-line { font-size: 1.5em; }
      .readiness-level-line { font-size: 1.5em; }
      .score-title { font-size: 1.2em; }
    }
    @media (max-width: 480px) {
      .email-wrapper { max-width: 100vw; border-radius: 0; }
      .readiness-score-line { font-size: 1.4em; }
      .readiness-level-line { font-size: 1.4em; }
      .score-title { font-size: 1.1em; }
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
        <div class="score-card">
          <div class="readiness-score-line">Readiness Score: ${readinessScore} out of 5</div>
          <div class="readiness-level-line">Readiness Level: ${readinessLabel}</div>
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
        <div class="summary-content">
          <p>${summary}</p>
        </div>
      </div>
      <div class="next-steps">
        <h3>🚀 Next Steps</h3>
        <p>Ready to take your IPO journey to the next level? Our expert team is here to guide you through every step of the process.</p>
                <a href="https://calendly.com/bdinesh-evernile/30min" class="cta-button">Book a call with our IPO Expert</a>
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

    📅 Book a call with our IPO Expert: https://calendly.com/bdinesh-evernile/30min

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
