import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAppointment, checkAvailability, AppointmentData } from '@/lib/google-calendar';
import { sendPatientConfirmation, sendClinicNotification } from '@/lib/email-service';

// Validation schema for appointment booking
const bookingSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  patientEmail: z.string().email('Please enter a valid email address'),
  patientPhone: z.string().min(10, 'Please enter a valid phone number'),
  serviceType: z.string().min(1, 'Please select a service'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  notes: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validationResult = bookingSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid input data',
          details: validationResult.error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }

    const appointmentData: AppointmentData = validationResult.data;

    // Check if the selected date is in the past
    const selectedDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
    const now = new Date();
    
    if (selectedDateTime <= now) {
      return NextResponse.json(
        { error: 'Cannot book appointments in the past' },
        { status: 400 }
      );
    }

    // Double-check availability before booking
    try {
      const timeSlots = await checkAvailability(appointmentData.date);
      const requestedTimeSlot = timeSlots.find(slot => {
        const slotStartTime = new Date(slot.start);
        const requestedTime = `${slotStartTime.getHours().toString().padStart(2, '0')}:${slotStartTime.getMinutes().toString().padStart(2, '0')}`;
        return requestedTime === appointmentData.time;
      });

      if (!requestedTimeSlot || !requestedTimeSlot.available) {
        return NextResponse.json(
          { error: 'Selected time slot is no longer available. Please choose another time.' },
          { status: 409 }
        );
      }
    } catch (availabilityError) {
      console.error('Error checking availability before booking:', availabilityError);
      // Continue with booking if availability check fails - let calendar creation handle conflicts
    }

    let eventId: string;
    let emailsSent = false;

    try {
      // Create appointment in Google Calendar
      eventId = await createAppointment(appointmentData);
      console.log('Calendar event created with ID:', eventId);

      // Send confirmation emails
      try {
        await Promise.all([
          sendPatientConfirmation(appointmentData),
          sendClinicNotification(appointmentData)
        ]);
        emailsSent = true;
        console.log('Confirmation emails sent successfully');
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Don't fail the booking if email sending fails
      }

      return NextResponse.json({
        success: true,
        message: 'Appointment booked successfully',
        eventId,
        emailsSent,
        appointment: {
          ...appointmentData,
          id: eventId,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        }
      }, { status: 201 });

    } catch (calendarError) {
      console.error('Error creating calendar event:', calendarError);
      
      // Handle specific calendar errors
      if (calendarError instanceof Error) {
        if (calendarError.message.includes('Missing Google Calendar credentials')) {
          return NextResponse.json(
            { error: 'Calendar service is not properly configured. Please contact support.' },
            { status: 503 }
          );
        }
        
        if (calendarError.message.includes('Failed to create appointment')) {
          return NextResponse.json(
            { error: 'Unable to create appointment. The time slot may be taken or there may be a calendar conflict.' },
            { status: 409 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Failed to book appointment. Please try again or contact support.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in booking appointment:', error);
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}