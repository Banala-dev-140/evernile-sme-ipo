// Test script for SME email service
// Run with: node test-sme-email.js

const testSMEEmailData = {
  to: 'test@example.com', // Replace with your test email
  userName: 'Priya Patel',
  assessmentType: 'sme',
  readinessScore: 3.5,
  readinessLabel: 'Moderate Readiness',
  totalScore: 14,
  dynamicPoints: [
    'Your company meets the SME IPO minimum operational history requirement of 3 years.',
    'Your company\'s leverage is within the optimal range, meeting regulatory financial strength standards.',
    'Your net worth satisfies the minimum requirement for SME IPO listing eligibility.',
    'Your profitability track record supports the operational viability required for SME IPO.',
    'Your net tangible assets meet SME IPO listing requirements.'
  ],
  closingMessage: 'Based on the data provided in the assessment, your company shows moderate IPO readiness. To explore the next steps and improve readiness, please book a Readiness call with our IPO experts.'
};

async function testSMEEmailService() {
  try {
    console.log('🧪 Testing SME email service...');
    
    const response = await fetch('http://localhost:3001/api/send-assessment-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testSMEEmailData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ SME Email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('📝 Message:', result.message);
    } else {
      console.log('❌ SME Email sending failed:');
      console.log('🔍 Error:', result.error);
      console.log('📋 Details:', result.details);
    }
  } catch (error) {
    console.log('❌ Connection failed:');
    console.log('🔍 Error:', error.message);
    console.log('💡 Make sure the email service is running on port 3001');
  }
}

// Check if email service is running
async function checkHealth() {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    const result = await response.json();
    console.log('🏥 Service health:', result.status);
    console.log('⏰ Timestamp:', result.timestamp);
    return true;
  } catch (error) {
    console.log('❌ Service not running. Please start the email service first:');
    console.log('   cd backend && npm start');
    return false;
  }
}

async function main() {
  console.log('🚀 Evernile SME Email Service Test');
  console.log('===================================');
  
  const isHealthy = await checkHealth();
  if (isHealthy) {
    await testSMEEmailService();
  }
  
  console.log('\n📋 Instructions:');
  console.log('1. Make sure backend service is running: cd backend && npm start');
  console.log('2. Update test email address in this script');
  console.log('3. Run: node test-sme-email.js');
}

main();
