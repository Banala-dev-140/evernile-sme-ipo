// Test script for email service
// Run with: node test-email.js

const testEmailData = {
  to: 'test@example.com', // Replace with your test email
  userName: 'Test User',
  assessmentType: 'mainboard',
  readinessScore: 4.5,
  readinessLabel: 'High Readiness',
  totalScore: 18,
  dynamicPoints: [
    'Your company meets the SME IPO minimum operational history requirement of 3 years.',
    'Your company\'s leverage is within the optimal range, meeting regulatory financial strength standards.',
    'Your net worth satisfies the minimum requirement for SME IPO listing eligibility.'
  ],
  closingMessage: 'Based on the data provided in the assessment, your company has a high IPO readiness. To understand how to proceed ahead with the mainboard IPO, please book a Readiness call with our team.'
};

async function testEmailService() {
  try {
    console.log('🧪 Testing email service...');
    
    const response = await fetch('http://localhost:3001/api/send-assessment-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEmailData)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Email sent successfully!');
      console.log('📧 Message ID:', result.messageId);
      console.log('📝 Message:', result.message);
    } else {
      console.log('❌ Email sending failed:');
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
  console.log('🚀 Evernile Email Service Test');
  console.log('================================');
  
  const isHealthy = await checkHealth();
  if (isHealthy) {
    await testEmailService();
  }
  
  console.log('\n📋 Instructions:');
  console.log('1. Make sure backend service is running: cd backend && npm start');
  console.log('2. Update test email address in this script');
  console.log('3. Run: node test-email.js');
}

main();
