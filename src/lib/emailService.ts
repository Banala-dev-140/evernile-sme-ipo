// Email service for sending assessment reports
export interface EmailData {
  to: string;
  userName: string;
  assessmentType: 'mainboard' | 'sme';
  readinessScore: number;
  readinessLabel: string;
  totalScore: number;
  dynamicPoints: string[];
  closingMessage: string;
}

export const sendAssessmentReport = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Try API first (production)
    const apiSuccess = await sendAssessmentReportViaAPI(emailData);
    if (apiSuccess) {
      return true;
    }
    
    // Fallback to mailto if API fails
    console.warn('API email failed, falling back to mailto');
    return sendAssessmentReportMailto(emailData);
  } catch (error) {
    console.error('Failed to send email:', error);
    // Fallback to mailto
    return sendAssessmentReportMailto(emailData);
  }
};

// Fallback mailto function
const sendAssessmentReportMailto = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Create the email content
    const emailContent = generateEmailContent(emailData);
    
    const subject = `${emailData.assessmentType.toUpperCase()} IPO Readiness Assessment Report`;
    const body = emailContent;
    
    // Create mailto link
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    // Also send a copy to bdinesh@evernile.com
    const bccMailtoLink = `mailto:bdinesh@evernile.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(bccMailtoLink);
    
    return true;
  } catch (error) {
    console.error('Failed to send email via mailto:', error);
    return false;
  }
};

const generateEmailContent = (data: EmailData): string => {
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

// Production API integration
export const sendAssessmentReportViaAPI = async (emailData: EmailData): Promise<boolean> => {
  try {
    const API_URL = import.meta.env.VITE_EMAIL_API_URL || '/api';
    
    const response = await fetch(`${API_URL}/send-assessment-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailData.to,
        userName: emailData.userName,
        assessmentType: emailData.assessmentType,
        readinessScore: emailData.readinessScore,
        readinessLabel: emailData.readinessLabel,
        totalScore: emailData.totalScore,
        dynamicPoints: emailData.dynamicPoints,
        closingMessage: emailData.closingMessage
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Email sent successfully:', result.messageId);
      return true;
    } else {
      console.error('Email sending failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Failed to send email via API:', error);
    return false;
  }
};

const generateEmailHTML = (data: EmailData): string => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>IPO Readiness Assessment Report</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0a2a5e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .score-section { background-color: #f8f9fa; padding: 15px; margin: 15px 0; border-left: 4px solid #0a2a5e; }
        .assessment-section { margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        .button { background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
        .disclaimer { font-size: 12px; color: #666; margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>EVERNILE CAPITAL</h1>
        <h2>IPO Readiness Assessment Report</h2>
      </div>
      
      <div class="content">
        <p>Dear ${userName},</p>
        
        <p>Thank you for completing the <strong>${assessmentType.toUpperCase()} IPO Readiness Assessment</strong>. Please find your detailed report below:</p>
        
        <div class="score-section">
          <h3>Your Readiness Score</h3>
          <p><strong>Readiness Score:</strong> ${readinessScore} out of 5</p>
          <p><strong>Readiness Level:</strong> ${readinessLabel}</p>
          <p><strong>Total Score:</strong> ${totalScore} points</p>
        </div>
        
        <div class="assessment-section">
          <h3>Assessment Analysis</h3>
          <ul>
            ${dynamicPoints.map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>
        
        <div class="assessment-section">
          <h3>Summary</h3>
          <p>${closingMessage}</p>
        </div>
        
        <div class="assessment-section">
          <h3>Next Steps</h3>
          <p>To proceed with your IPO journey, we recommend booking a consultation call with our team:</p>
          <a href="https://calendly.com/bdinesh-evernile/30min" class="button">Book a Readiness Call</a>
          
          <p><strong>Contact Details:</strong><br>
          📧 Email: bdinesh@evernile.com<br>
          📱 Mobile: +91-8889926196</p>
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
    </body>
    </html>
  `;
};
