// Test script to verify complete Mainboard assessment dynamic points
const { generateEmailHTML } = require('./backend/emailTemplate.js');

// Test with all Mainboard questions answered
const mainboardAnswers = [
  { questionId: 1, selected: "Public Limited", weight: 4 },
  { questionId: 2, selected: "More than 10 Years", weight: 4 },
  { questionId: 3, selected: "Equal to or more than 10 Crore", weight: 3 },
  { questionId: 4, selected: "In one year", weight: 3 },
  { questionId: 5, selected: "More than 10 Crore", weight: 4 }
];

// Mainboard generateDynamicPoints function (updated version)
function generateMainboardDynamicPoints(answers) {
  const points = [];
  const byId = new Map(answers.map(a => [a.questionId, a]));

  // Question 1: Type of Company
  const q1 = byId.get(1);
  if (q1) {
    if (q1.selected === "Public Limited" || q1.selected === "Private Limited") {
      points.push("Your company structure is suitable for mainboard IPO listing requirements.");
    } else if (q1.selected === "Partnership Firm" || q1.selected === "Proprietorship") {
      points.push("Consider converting to a Private Limited or Public Limited company structure to meet mainboard IPO eligibility criteria.");
    }
  }

  // Question 2: Business Existence Duration
  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "0 to 2 Years" || q2.selected === "2 to 3 Years") {
      points.push("As per regulatory guideline a company should be in existence for 3 or more years");
    } else if (q2.selected === "3 to 10 Years" || q2.selected === "More than 10 Years") {
      points.push("Your company fulfills the regulatory criteria of existence for more than 3 years");
    }
  }

  // Question 3: Paid-up Capital
  const q3 = byId.get(3);
  if (q3) {
    if (q3.selected === "Equal to or more than 10 Crore") {
      points.push("Your company fulfills the regulatory criteria of having a paid-up capital of equal to or more than 10 Crore");
    } else if (q3.selected === "Less than 10 Crore") {
      points.push("As per regulations, a company needs to have paid-up capital equal to or more than 10 Crore");
    } else if (q3.selected === "Don't know") {
      points.push("As per regulations, a company needs to have paid-up capital equal to or more than 10 Crore; to understand this please book a session with IPO expert team");
    }
  }

  // Question 4: IPO Filing Timeline
  const q4 = byId.get(4);
  if (q4) {
    if (q4.selected === "In one year") {
      points.push("Your timeline for IPO filing is aggressive and requires immediate preparation and compliance work.");
    } else if (q4.selected === "In two years") {
      points.push("Your IPO timeline provides adequate time for preparation and regulatory compliance.");
    } else if (q4.selected === "Not sure") {
      points.push("Having a clear IPO timeline is crucial for planning and preparation - consider booking a consultation to develop a structured roadmap.");
    }
  }

  // Question 5: PAT/Net Profit
  const q5 = byId.get(5);
  if (q5) {
    if (q5.selected === "More than 10 Crore") {
      points.push("Your company's profitability meets the high standards required for mainboard IPO listing.");
    } else if (q5.selected === "5 to 10 Crore") {
      points.push("Your company's profitability is within the acceptable range for mainboard IPO eligibility.");
    } else if (q5.selected === "0 to 5 Crore") {
      points.push("Consider improving profitability to strengthen your mainboard IPO readiness and attract better valuations.");
    } else if (q5.selected === "Don't know") {
      points.push("Profitability is a key metric for mainboard IPO success - book a consultation to assess your financial readiness.");
    }
  }

  return points;
}

console.log('🧪 Testing Complete Mainboard Assessment...');
console.log('📊 Input answers:', mainboardAnswers);

const dynamicPoints = generateMainboardDynamicPoints(mainboardAnswers);
console.log('📋 Generated Dynamic Points:');
dynamicPoints.forEach((point, index) => {
  console.log(`  ${index + 1}. ${point}`);
});

console.log(`\n✅ Total Dynamic Points: ${dynamicPoints.length}/5`);

// Test email generation
const emailData = {
  userName: 'Test User',
  assessmentType: 'mainboard',
  readinessScore: 4.5,
  readinessLabel: 'High IPO Readiness',
  totalScore: 18,
  dynamicPoints: dynamicPoints,
  closingMessage: 'Based on the data provided in the assessment, your company has a high IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our IPO Expert Team.'
};

const html = generateEmailHTML(emailData);
const hasAllPoints = dynamicPoints.every(point => html.includes(point));
console.log(`\n📧 All points included in email: ${hasAllPoints ? '✅' : '❌'}`);

// Save test output
require('fs').writeFileSync('mainboard-complete-test.html', html);
console.log('💾 Complete test HTML saved to mainboard-complete-test.html');
