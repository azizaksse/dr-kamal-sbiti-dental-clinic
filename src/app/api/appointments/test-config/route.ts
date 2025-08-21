import { NextResponse } from 'next/server';
import { testEmailConfiguration } from '@/lib/email-service';

export async function GET() {
  try {
    // Check if all required environment variables are present
    const requiredVars = [
      'GOOGLE_CALENDAR_ID',
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_PROJECT_ID',
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASS',
      'CLINIC_EMAIL',
      'CLINIC_NAME',
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    const configStatus = {
      calendar: {
        configured: !missingVars.some(v => v.startsWith('GOOGLE_')),
        missing: missingVars.filter(v => v.startsWith('GOOGLE_')),
      },
      email: {
        configured: !missingVars.some(v => v.startsWith('SMTP_') || v === 'CLINIC_EMAIL'),
        missing: missingVars.filter(v => v.startsWith('SMTP_') || v === 'CLINIC_EMAIL'),
        tested: false,
      },
      clinic: {
        configured: !missingVars.includes('CLINIC_NAME'),
        missing: missingVars.includes('CLINIC_NAME') ? ['CLINIC_NAME'] : [],
      }
    };

    // Test email configuration if configured
    if (configStatus.email.configured) {
      try {
        configStatus.email.tested = await testEmailConfiguration();
      } catch (error) {
        console.error('Email configuration test failed:', error);
        configStatus.email.tested = false;
      }
    }

    const allConfigured = configStatus.calendar.configured && 
                         configStatus.email.configured && 
                         configStatus.clinic.configured;

    return NextResponse.json({
      status: allConfigured ? 'ready' : 'incomplete',
      message: allConfigured 
        ? 'All services are configured and ready' 
        : 'Some services need configuration',
      services: configStatus,
      totalMissing: missingVars.length,
      missingVariables: missingVars,
    });

  } catch (error) {
    console.error('Error testing configuration:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to test configuration',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}