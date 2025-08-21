import { google } from 'googleapis';
import { addHours, startOfDay, endOfDay } from 'date-fns';

// Types for appointment data
export interface AppointmentData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceType: string;
  date: string;
  time: string;
  notes?: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// Initialize Google Calendar client
function getCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!privateKey || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PROJECT_ID) {
    throw new Error('Missing Google Calendar credentials');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: privateKey,
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
  });

  return google.calendar({ version: 'v3', auth });
}

// Check calendar availability for a specific date
export async function checkAvailability(date: string): Promise<TimeSlot[]> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    // Define business hours (9 AM to 5 PM)
    const businessHours = {
      start: 9,
      end: 17,
      slotDuration: 1, // 1 hour slots
    };

    // Get existing events for the day
    const startTime = startOfDay(new Date(date));
    const endTime = endOfDay(new Date(date));

    const response = await calendar.events.list({
      calendarId,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const existingEvents = response.data.items || [];
    
    // Generate time slots for the day
    const timeSlots: TimeSlot[] = [];
    
    for (let hour = businessHours.start; hour < businessHours.end; hour += businessHours.slotDuration) {
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      
      const slotEnd = new Date(date);
      slotEnd.setHours(hour + businessHours.slotDuration, 0, 0, 0);
      
      // Check if this slot conflicts with existing events
      const isAvailable = !existingEvents.some(event => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false;
        
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        
        return (
          (slotStart >= eventStart && slotStart < eventEnd) ||
          (slotEnd > eventStart && slotEnd <= eventEnd) ||
          (slotStart <= eventStart && slotEnd >= eventEnd)
        );
      });
      
      timeSlots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        available: isAvailable,
      });
    }
    
    return timeSlots;
  } catch (error) {
    console.error('Error checking calendar availability:', error);
    throw new Error('Failed to check calendar availability');
  }
}

// Create a new appointment in Google Calendar
export async function createAppointment(appointmentData: AppointmentData): Promise<string> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    // Parse the appointment date and time
    const appointmentDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
    const appointmentEndTime = addHours(appointmentDateTime, 1); // Default 1-hour appointments

    // Create the event
    const event = {
      summary: `Dental Appointment - ${appointmentData.patientName}`,
      description: `
Patient: ${appointmentData.patientName}
Email: ${appointmentData.patientEmail}
Phone: ${appointmentData.patientPhone}
Service: ${appointmentData.serviceType}
${appointmentData.notes ? `Notes: ${appointmentData.notes}` : ''}
      `.trim(),
      start: {
        dateTime: appointmentDateTime.toISOString(),
        timeZone: 'Africa/Algiers', // Algeria timezone
      },
      end: {
        dateTime: appointmentEndTime.toISOString(),
        timeZone: 'Africa/Algiers', // Algeria timezone
      },
      // Remove attendees to avoid Domain-Wide Delegation requirement
      // attendees: [
      //   {
      //     email: appointmentData.patientEmail,
      //     displayName: appointmentData.patientName,
      //   },
      // ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 }, // 30 minutes before
          { method: 'popup', minutes: 1440 }, // 24 hours before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'none', // Don't send calendar notifications, we'll handle email separately
    });

    if (!response.data.id) {
      throw new Error('Failed to create calendar event');
    }

    return response.data.id;
  } catch (error) {
    console.error('Error creating calendar appointment:', error);
    throw new Error('Failed to create appointment');
  }
}

// Update an existing appointment
export async function updateAppointment(
  eventId: string, 
  appointmentData: Partial<AppointmentData>
): Promise<void> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    // Get the existing event
    const existingEvent = await calendar.events.get({
      calendarId,
      eventId,
    });

    // Update the event with new data
    const updatedEvent = { ...existingEvent.data };
    
    if (appointmentData.patientName) {
      updatedEvent.summary = `Dental Appointment - ${appointmentData.patientName}`;
    }
    
    if (appointmentData.date && appointmentData.time) {
      const appointmentDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
      const appointmentEndTime = addHours(appointmentDateTime, 1);
      
      updatedEvent.start = {
        dateTime: appointmentDateTime.toISOString(),
        timeZone: 'Africa/Algiers',
      };
      updatedEvent.end = {
        dateTime: appointmentEndTime.toISOString(),
        timeZone: 'Africa/Algiers',
      };
    }

    await calendar.events.update({
      calendarId,
      eventId,
      requestBody: updatedEvent,
      sendUpdates: 'none',
    });
  } catch (error) {
    console.error('Error updating calendar appointment:', error);
    throw new Error('Failed to update appointment');
  }
}

// Cancel an appointment
export async function cancelAppointment(eventId: string): Promise<void> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'none', // We'll handle notifications separately
    });
  } catch (error) {
    console.error('Error canceling calendar appointment:', error);
    throw new Error('Failed to cancel appointment');
  }
}

// Get upcoming appointments
export async function getUpcomingAppointments(days: number = 7) {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    
    if (!calendarId) {
      throw new Error('Google Calendar ID not configured');
    }

    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    const response = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: futureDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Error getting upcoming appointments:', error);
    throw new Error('Failed to get upcoming appointments');
  }
}