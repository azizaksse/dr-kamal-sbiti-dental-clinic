import { NextRequest, NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/google-calendar';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Please use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Check if date is in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'Cannot check availability for past dates' },
        { status: 400 }
      );
    }

    // Check availability using Google Calendar API
    const timeSlots = await checkAvailability(date);

    return NextResponse.json(timeSlots, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Missing Google Calendar credentials')) {
        return NextResponse.json(
          { error: 'Calendar service is not properly configured' },
          { status: 503 }
        );
      }
      
      if (error.message.includes('Calendar ID not configured')) {
        return NextResponse.json(
          { error: 'Calendar service is not properly configured' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to check availability. Please try again later.' },
      { status: 500 }
    );
  }
}

// Options for CORS if needed
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}