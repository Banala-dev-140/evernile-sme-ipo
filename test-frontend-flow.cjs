// Test script to simulate frontend flow and check email generation
const { generateEmailHTML } = require('./backend/emailTemplate.js');

// Simulate SME assessment answers
const smeAnswers = [
  { questionId: 1, selected: "Private Limited", weight: 4 },
  { questionId: 2, selected: "3 to 10 years", weight: 4 },
  { questionId: 3, selected: "Less than or equal to 3:1", weight: 4 },
  { questionId: 4, selected: "1 to 5 Crore", weight: 3 },
  { questionId: 5, selected: "Yes", weight: 4 },
  { questionId: 6, selected: "More than 3 Crore", weight: 4 },
  { questionId: 7, selected: "In one year", weight: 3 }
];

// Simulate Mainboard assessment answers
const mainboardAnswers = [
  { questionId: 1, selected: "Public Limited", weight: 4 },
  { questionId: 2, selected: "More than 10 Years", weight: 4 },
  { questionId: 3, selected: "Equal to or more than 10 Crore", weight: 4 },
  { questionId: 4, selected: "In one year", weight: 3 },
  { questionId: 5, selected: "More than 10 Crore", weight: 4 }
];

// SME generateDynamicPoints function (copied from frontend)
function generateSMEDynamicPoints(answers) {
  const points = [];
  const byId = new Map(answers.map(a => [a.questionId, a]));

  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "3 to 10 years" || q2.selected === "More than 10 years") {
      points.push("Your company meets the SME IPO minimum operational history requirement of 3 years.");
    } else {
      points.push("Building a consistent operational history of at least 3 years is essential to qualify for SME IPO listing.");
    }
  }

  const q3 = byId.get(3);
  if (q3) {
    if (q3.selected === "Less than or equal to 3:1") {
      points.push("Your company's leverage is within the optimal range, meeting regulatory financial strength standards.");
    } else if (q3.selected === "More than 3:1") {
      points.push("Optimizing your debt-to-equity ratio will enhance financial stability and improve SME IPO eligibility.");
    } else if (q3.selected === "Don't know") {
      points.push("Debt to Equity Ratio is an important metric for SME IPO eligibility - book a call with IPO expert team to find your Debt to Equity Ratio");
    }
  }

  const q4 = byId.get(4);
  if (q4) {
    if (q4.selected === "1 to 5 Crore" || q4.selected === "More than 5 Crore") {
      points.push("Your net worth satisfies the minimum requirement for SME IPO listing eligibility.");
    } else if (q4.selected === "Not Yet Positive" || q4.selected === "Less than 1 Crore") {
      points.push("Enhancing your net worth to meet or exceed ₹1 Crore will improve your SME IPO readiness.");
    } else if (q4.selected === "Don't know") {
      points.push("Net worth is an important metric for SME IPO eligibility - book a call with IPO expert team to find your company's Net worth");
    }
  }

  const q5 = byId.get(5);
  if (q5) {
    if (q5.selected === "Yes") {
      points.push("Your profitability track record supports the operational viability required for SME IPO.");
    } else if (q5.selected === "No") {
      points.push("Strengthening profitability for consecutive years is important to align with SME IPO standards.");
    } else if (q5.selected === "Don't know") {
      points.push("Operating Profit is an important metric for SME IPO eligibility - book a call with IPO expert team to find your company's Operating Profit");
    }
  }

  const q6 = byId.get(6);
  if (q6) {
    if (q6.selected === "More than 3 Crore") {
      points.push("Your net tangible assets meet SME IPO listing requirements.");
    } else if (q6.selected === "Less than 3 Crore") {
      points.push("Increasing net tangible assets will help meet the SME IPO eligibility threshold.");
    } else if (q6.selected === "Don't know") {
      points.push("Net Tangible Assets is an important metric for SME IPO eligibility - book a call with IPO expert team to find your company's Net Tangible Assets");
    }
  }

  return points;
}

// Mainboard generateDynamicPoints function (copied from frontend)
function generateMainboardDynamicPoints(answers) {
  const points = [];
  const byId = new Map(answers.map(a => [a.questionId, a]));

  const q2 = byId.get(2);
  if (q2) {
    if (q2.selected === "0 to 2 Years" || q2.selected === "2 to 3 Years") {
      points.push("As per regulatory guideline a company should be in existence for 3 or more years");
    } else if (q2.selected === "3 to 10 Years" || q2.selected === "More than 10 Years") {
      points.push("Your company fulfills the regulatory criteria of existence for more than 3 years");
    }
  }

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

  return points;
}

// Test SME assessment
console.log('🧪 Testing SME Assessment Flow...');
const smeDynamicPoints = generateSMEDynamicPoints(smeAnswers);
console.log('📊 SME Dynamic Points:', smeDynamicPoints);

const smeEmailData = {
  userName: 'Priya Patel',
  assessmentType: 'sme',
  readinessScore: 4.0,
  readinessLabel: 'High Readiness',
  totalScore: 26,
  dynamicPoints: smeDynamicPoints,
  closingMessage: 'Based on the data provided in the assessment, your company has a high IPO readiness. To understand how to proceed ahead with the SME IPO, please book a Readiness call with our IPO experts.'
};

const smeHtml = generateEmailHTML(smeEmailData);
console.log('✅ SME Email generated successfully');
console.log('📧 SME Dynamic points in email:', smeHtml.includes('Your company meets the SME IPO minimum operational history requirement of 3 years'));

// Test Mainboard assessment
console.log('\n🧪 Testing Mainboard Assessment Flow...');
const mainboardDynamicPoints = generateMainboardDynamicPoints(mainboardAnswers);
console.log('📊 Mainboard Dynamic Points:', mainboardDynamicPoints);

const mainboardEmailData = {
  userName: 'Rahul Sharma',
  assessmentType: 'mainboard',
  readinessScore: 4.0,
  readinessLabel: 'Good Readiness',
  totalScore: 19,
  dynamicPoints: mainboardDynamicPoints,
  closingMessage: 'Based on the data provided in the assessment, your company has a good IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our IPO Expert Team.'
};

const mainboardHtml = generateEmailHTML(mainboardEmailData);
console.log('✅ Mainboard Email generated successfully');
console.log('📧 Mainboard Dynamic points in email:', mainboardHtml.includes('Your company fulfills the regulatory criteria of existence for more than 3 years'));

// Save both HTML files
require('fs').writeFileSync('sme-test-output.html', smeHtml);
require('fs').writeFileSync('mainboard-test-output.html', mainboardHtml);
console.log('\n💾 Test HTML files saved: sme-test-output.html, mainboard-test-output.html');
