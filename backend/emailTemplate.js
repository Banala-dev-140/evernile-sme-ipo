// Email template generator for IPO Readiness Assessment Reports
// This file contains the HTML and text email templates

const generateEmailHTML = (data) => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  // Hardcoded assessment analysis based on readiness score
  let assessmentAnalysis = [];
  let executiveSummary = "";
  
  if (readinessScore >= 4.5) {
    assessmentAnalysis = [
      "Your company demonstrates exceptional alignment with IPO readiness criteria across all key areas.",
      "Financial metrics, governance structure, and operational efficiency are well-positioned for public listing.",
      "Strong market positioning and growth trajectory support successful IPO execution.",
      "Minimal regulatory or compliance concerns identified in the assessment."
    ];
    executiveSummary = "Your company exhibits high IPO readiness with strong fundamentals across all critical areas. You are well-positioned to proceed with IPO planning and execution. We recommend booking a consultation with our IPO Expert Team to develop a comprehensive listing strategy.";
  } else if (readinessScore >= 4.0) {
    assessmentAnalysis = [
      "Your company shows strong IPO readiness with most key criteria well-aligned.",
      "Financial performance and operational metrics meet or exceed industry standards.",
      "Minor areas for enhancement identified that can be addressed during IPO preparation.",
      "Solid foundation established for successful public listing."
    ];
    executiveSummary = "Your company demonstrates good IPO readiness with strong fundamentals. Most critical areas are well-positioned for public listing. We recommend booking a consultation with our IPO Expert Team to address minor enhancement areas and optimize your IPO strategy.";
  } else if (readinessScore >= 3.5) {
    assessmentAnalysis = [
      "Your company shows moderate IPO readiness with several areas requiring attention.",
      "Some financial or operational metrics need improvement before IPO consideration.",
      "Strategic planning and preparation required to meet regulatory requirements.",
      "Foundation exists but requires strengthening in key areas."
    ];
    executiveSummary = "Your company shows moderate IPO readiness with potential for improvement. Several areas require attention before proceeding with IPO planning. We recommend booking a consultation with our IPO Expert Team to develop a structured roadmap for enhancement.";
  } else if (readinessScore >= 3.0) {
    assessmentAnalysis = [
      "Your company has basic IPO readiness with significant areas requiring development.",
      "Multiple financial, operational, or governance aspects need substantial improvement.",
      "Considerable preparation and restructuring may be necessary for IPO eligibility.",
      "Long-term planning and expert guidance essential for IPO success."
    ];
    executiveSummary = "Your company has basic IPO readiness with several areas requiring significant development. Substantial preparation and strategic planning are needed before IPO consideration. We recommend booking a consultation with our IPO Expert Team to develop a comprehensive improvement plan.";
  } else {
    assessmentAnalysis = [
      "Your company requires substantial enhancement across multiple IPO readiness factors.",
      "Fundamental changes in financial structure, governance, or operations are necessary.",
      "Current readiness level indicates significant preparation required for IPO eligibility.",
      "Immediate expert intervention and strategic planning essential for IPO success."
    ];
    executiveSummary = "Your company needs significant enhancement across multiple areas to achieve IPO readiness. Fundamental improvements in financial structure, governance, and operations are required. We recommend booking a consultation with our IPO Expert Team to develop a comprehensive transformation strategy.";
  }
  
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
     .gauge-container {
       display: flex;
       flex-direction: column;
       align-items: center;
       margin: 0 auto;
       width: 300px;
       height: 150px;
       position: relative;
     }
     .readiness-score-value {
       font-size: 2em;
       font-weight: bold;
       color: #1e3c72;
       margin-top: 18px;
       margin-bottom: 8px;
       letter-spacing: 0.02em;
     }
     .readiness-label {
       font-size: 1.1em;
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
    @media (max-width: 700px) {
      .email-wrapper { max-width: 99vw; }
      .gauge-container { width: 98vw; max-width: 220px; }
      .content, .header { padding-left: 7vw; padding-right: 7vw;}
    }
    @media (max-width: 480px) {
      .email-wrapper { max-width: 100vw; border-radius: 0; }
      .gauge-container { width: 96vw; max-width: 200px;}
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
      <div class="header">
        <div class="header-title">IPO Readiness Assessment Report</div>
        <div class="header-subtitle">Evernile Capital</div>
      </div>
    <div class="content">
      <div class="greeting">
        <p>Dear <strong>${userName}</strong>,</p>
        <p>Thank you for completing the <strong>${assessmentType.toUpperCase()} IPO Readiness Assessment</strong>. We're pleased to present your comprehensive readiness analysis below:</p>
      </div>
      <div class="score-section">
        <div class="score-title">Your Readiness Score</div>
        <div class="gauge-container">
          <svg id="gauge" viewBox="0 0 300 150" width="300" height="150">
            <!-- Background arc (light gray) -->
            <path d="M 30 120 A 120 120 0 0 1 270 120" fill="none" stroke="#e0e0e0" stroke-width="20" stroke-linecap="round"/>
            <!-- Progress arc (light teal) -->
            <path id="gauge-fill" fill="none" stroke="#80cbc4" stroke-width="20" stroke-linecap="round"/>
            <!-- Scale labels -->
            <text x="30" y="140" text-anchor="middle" font-size="16" fill="#2c3e50" font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif">0</text>
            <text x="270" y="140" text-anchor="middle" font-size="16" fill="#2c3e50" font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif">5</text>
          </svg>
          <div class="readiness-score-value">${readinessScore}/5</div>
          <div class="readiness-label">${readinessLabel}</div>
        </div>
      </div>
      <div class="assessment-section">
        <h3>🔍 Assessment Analysis</h3>
        <div class="assessment-points">
          <ul>
            ${assessmentAnalysis.map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="summary-section">
        <h3>📋 Executive Summary</h3>
        <p>${executiveSummary}</p>
      </div>
      <div class="next-steps">
        <h3>🚀 Next Steps</h3>
        <p>Ready to take your IPO journey to the next level? Our expert team is here to guide you through every step of the process.</p>
        <a href="https://calendly.com/bdinesh-evernile/30min" class="cta-button">Book an IPO Expert</a>
        <div class="contact-info">
          <p><strong>📞 Get in Touch:</strong></p>
          <p>📧 <strong>Email:</strong> bdinesh@evernile.com<br>
          📱 <strong>Phone:</strong> +91-8889926196<br>
          🌐 <strong>Website:</strong> www.evernile.com</p>
        </div>
      </div>
      <div class="disclaimer">
        <strong>Disclaimer:</strong> This assessment provides an initial evaluation of your IPO readiness and should not be considered as financial or legal advice. For comprehensive guidance tailored to your specific situation, please consult with our qualified professionals.
      </div>
    </div>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var score = ${readinessScore};
      var percent = score / 5; // Score is out of 5
      var angle = percent * 180; // Max angle for semi-circle is 180 degrees
      var radius = 120; // Radius of the arc
      var cx = 150; // Center X of the SVG
      var cy = 120; // Center Y of the SVG (adjusted for semi-circle base)
      
      // Calculate end point of the arc
      var rad = (180 - angle) * Math.PI / 180; // Convert angle to radians, starting from 180 (left)
      var x = cx - radius * Math.cos(rad);
      var y = cy - radius * Math.sin(rad);
      
      var largeArcFlag = angle > 180 ? 1 : 0; // Not needed for 0-180 range, but good practice
      
      // Path for the filled arc
      // M start_x start_y A radius_x radius_y rotation_angle large_arc_flag sweep_flag end_x end_y
      var pathD = 'M 30 120 A 120 120 0 0 1 ' + x + ' ' + y;
      
      var gaugeFill = document.getElementById('gauge-fill');
      if (gaugeFill) gaugeFill.setAttribute('d', pathD);
    });
  </script>
</body>
</html>

  `;
};

// Generate text version of email
const generateEmailText = (data) => {
  const { userName, assessmentType, readinessScore, readinessLabel, totalScore, dynamicPoints, closingMessage } = data;
  
  // Hardcoded assessment analysis based on readiness score
  let assessmentAnalysis = [];
  let executiveSummary = "";
  
  if (readinessScore >= 4.5) {
    assessmentAnalysis = [
      "Your company demonstrates exceptional alignment with IPO readiness criteria across all key areas.",
      "Financial metrics, governance structure, and operational efficiency are well-positioned for public listing.",
      "Strong market positioning and growth trajectory support successful IPO execution.",
      "Minimal regulatory or compliance concerns identified in the assessment."
    ];
    executiveSummary = "Your company exhibits high IPO readiness with strong fundamentals across all critical areas. You are well-positioned to proceed with IPO planning and execution. We recommend booking a consultation with our IPO Expert Team to develop a comprehensive listing strategy.";
  } else if (readinessScore >= 4.0) {
    assessmentAnalysis = [
      "Your company shows strong IPO readiness with most key criteria well-aligned.",
      "Financial performance and operational metrics meet or exceed industry standards.",
      "Minor areas for enhancement identified that can be addressed during IPO preparation.",
      "Solid foundation established for successful public listing."
    ];
    executiveSummary = "Your company demonstrates good IPO readiness with strong fundamentals. Most critical areas are well-positioned for public listing. We recommend booking a consultation with our IPO Expert Team to address minor enhancement areas and optimize your IPO strategy.";
  } else if (readinessScore >= 3.5) {
    assessmentAnalysis = [
      "Your company shows moderate IPO readiness with several areas requiring attention.",
      "Some financial or operational metrics need improvement before IPO consideration.",
      "Strategic planning and preparation required to meet regulatory requirements.",
      "Foundation exists but requires strengthening in key areas."
    ];
    executiveSummary = "Your company shows moderate IPO readiness with potential for improvement. Several areas require attention before proceeding with IPO planning. We recommend booking a consultation with our IPO Expert Team to develop a structured roadmap for enhancement.";
  } else if (readinessScore >= 3.0) {
    assessmentAnalysis = [
      "Your company has basic IPO readiness with significant areas requiring development.",
      "Multiple financial, operational, or governance aspects need substantial improvement.",
      "Considerable preparation and restructuring may be necessary for IPO eligibility.",
      "Long-term planning and expert guidance essential for IPO success."
    ];
    executiveSummary = "Your company has basic IPO readiness with several areas requiring significant development. Substantial preparation and strategic planning are needed before IPO consideration. We recommend booking a consultation with our IPO Expert Team to develop a comprehensive improvement plan.";
  } else {
    assessmentAnalysis = [
      "Your company requires substantial enhancement across multiple IPO readiness factors.",
      "Fundamental changes in financial structure, governance, or operations are necessary.",
      "Current readiness level indicates significant preparation required for IPO eligibility.",
      "Immediate expert intervention and strategic planning essential for IPO success."
    ];
    executiveSummary = "Your company needs significant enhancement across multiple areas to achieve IPO readiness. Fundamental improvements in financial structure, governance, and operations are required. We recommend booking a consultation with our IPO Expert Team to develop a comprehensive transformation strategy.";
  }
  
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

${assessmentAnalysis.map((point, index) => `${index + 1}. ${point}`).join('\n\n')}

${'='.repeat(30)}
SUMMARY
${'='.repeat(30)}

${executiveSummary}

${'='.repeat(30)}
NEXT STEPS
${'='.repeat(30)}

To proceed with your IPO journey, we recommend booking a consultation call with our team:

📅 Book a Readiness Call: https://calendly.com/bdinesh-evernile/30min

Contact Details:
📧 Email: bdinesh@evernile.com
📱 Mobile: +91-8889926196
🌐 Website: www.evernile.com

${'='.repeat(50)}
DISCLAIMER
${'='.repeat(50)}

This is an initial readiness assessment and is not a substitute for a comprehensive evaluation. For full eligibility verification, please book a free consultation with us.

---
Evernile Capital
Email: bdinesh@evernile.com | Mobile: +91-8889926196 | Website: www.evernile.com
This email was generated automatically from the IPO Readiness Assessment Tool.
  `;
};

module.exports = {
  generateEmailHTML,
  generateEmailText
};
