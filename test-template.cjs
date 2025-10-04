// Test script to check email template generation
const { generateEmailHTML } = require('./backend/emailTemplate.js');

const testData = {
  userName: 'Rahul Sharma',
  assessmentType: 'mainboard',
  readinessScore: 4.0,
  readinessLabel: 'Good Readiness',
  totalScore: 16,
  dynamicPoints: [
    'Your company fulfills the regulatory criteria of existence for more than 3 years',
    'Your company fulfills the regulatory criteria of having a paid-up capital of equal to or more than 10 Crore'
  ],
  closingMessage: 'Based on the data provided in the assessment, your company has a good IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our IPO Expert Team.'
};

console.log('🧪 Testing email template generation...');
console.log('📧 Input data:');
console.log(JSON.stringify(testData, null, 2));

const html = generateEmailHTML(testData);
console.log('\n📄 Generated HTML (first 1000 chars):');
console.log(html.substring(0, 1000));
console.log('\n...\n');

// Check if dynamic points are in the HTML
const hasDynamicPoints = html.includes('Your company fulfills the regulatory criteria of existence for more than 3 years');
console.log('✅ Dynamic points found in HTML:', hasDynamicPoints);

// Save to file for inspection
require('fs').writeFileSync('test-output.html', html);
console.log('💾 Full HTML saved to test-output.html');
