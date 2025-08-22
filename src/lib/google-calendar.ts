import { google } from 'googleapis';
import { addHours, startOfDay, endOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

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

// Algeria timezone constant
const ALGERIA_TIMEZONE = 'Africa/Algiers';

// Initialize Google Calendar client
function getCalendarClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  console.log('Initializing Google Calendar client...');
  console.log('Environment check:', {
    hasPrivateKey: !!privateKey,
    hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
    hasProjectId: !!process.env.GOOGLE_PROJECT_ID,
    hasCalendarId: !!process.env.GOOGLE_CALENDAR_ID,
  });
  
  if (!privateKey || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PROJECT_ID) {
    throw new Error('Missing Google Calendar credentials');
  }

  try {
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

    console.log('Google Calendar client initialized successfully');
    return google.calendar({ version: 'v3', auth });
  } catch (error) {
    console.error('Error initializing Google Calendar client:', error);
    throw new Error('Failed to initialize Google Calendar client');
  }
}

// Check calendar availability for a specific date
export async function checkAvailability(date: string): Promise<TimeSlot[]> {
  try {
    console.log('Checking availability for date:', date);
    
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

    // Parse the date more safely
    console.log('Original date string:', date);
    
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error(`Invalid date format: ${date}. Expected YYYY-MM-DD`);
    }
    
    // Parse the date in Algeria timezone - use a more explicit approach
    const [year, month, day] = date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day); // month is 0-indexed
    
    console.log('Parsed selectedDate:', selectedDate);
    
    // Get start and end of day in Algeria timezone, then convert to UTC
    const algeriaStartOfDay = startOfDay(selectedDate);
    const algeriaEndOfDay = endOfDay(selectedDate);
    
    console.log('Algeria start/end of day:', { algeriaStartOfDay, algeriaEndOfDay });
    
    const utcStartTime = fromZonedTime(algeriaStartOfDay, ALGERIA_TIMEZONE);
    const utcEndTime = fromZonedTime(algeriaEndOfDay, ALGERIA_TIMEZONE);
    
    console.log('UTC start/end times:', { utcStartTime, utcEndTime });

    console.log('Making Google Calendar API call...');
    const response = await calendar.events.list({
      calendarId,
      timeMin: utcStartTime.toISOString(),
      timeMax: utcEndTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('Google Calendar API response received');
    const existingEvents = response.data.items || [];
    console.log('Existing events count:', existingEvents.length);
    
    // Generate time slots for the day in Algeria timezone
    const timeSlots: TimeSlot[] = [];
    
    for (let hour = businessHours.start; hour < businessHours.end; hour += businessHours.slotDuration) {
      try {
        // Create slot times more safely using Date constructor
        const algeriaSlotStart = new Date(year, month - 1, day, hour, 0, 0, 0);
        const algeriaSlotEnd = new Date(year, month - 1, day, hour + businessHours.slotDuration, 0, 0, 0);
        
        console.log(`Creating slot for hour ${hour}:`, { algeriaSlotStart, algeriaSlotEnd });
        
        // Convert to UTC for comparison with Google Calendar events
        const utcSlotStart = fromZonedTime(algeriaSlotStart, ALGERIA_TIMEZONE);
        const utcSlotEnd = fromZonedTime(algeriaSlotEnd, ALGERIA_TIMEZONE);
        
        console.log(`UTC slot times for hour ${hour}:`, { utcSlotStart, utcSlotEnd });
      
        // Check if this slot conflicts with existing events
        const isAvailable = !existingEvents.some(event => {
          if (!event.start?.dateTime || !event.end?.dateTime) return false;
          
          const eventStart = new Date(event.start.dateTime);
          const eventEnd = new Date(event.end.dateTime);
          
          return (
            (utcSlotStart >= eventStart && utcSlotStart < eventEnd) ||
            (utcSlotEnd > eventStart && utcSlotEnd <= eventEnd) ||
            (utcSlotStart <= eventStart && utcSlotEnd >= eventEnd)
          );
        });
        
        timeSlots.push({
          start: utcSlotStart.toISOString(),
          end: utcSlotEnd.toISOString(),
          available: isAvailable,
        });
        
        console.log(`Slot ${hour}:00 - available: ${isAvailable}`);
        
      } catch (slotError) {
        console.error(`Error creating slot for hour ${hour}:`, slotError);
        // Continue with next slot instead of failing completely
        continue;
      }
    }
    
    console.log('Total slots generated:', timeSlots.length);
    return timeSlots;
    
  } catch (error) {
    console.error('Error checking calendar availability:', error);
    
    // Check if it's a Google API error
    if (error && typeof error === 'object' && 'code' in error) {
      console.error('Google API error code:', error.code);
      if ('message' in error) {
        console.error('Google API error message:', error.message);
      }
    }
    
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

    // Parse the appointment date and time in Algeria timezone
    const algeriaAppointmentTime = new Date(`${appointmentData.date}T${appointmentData.time}:00`);
    const algeriaEndTime = addHours(algeriaAppointmentTime, 1); // Default 1-hour appointments
    
    // Convert to UTC for Google Calendar
    const appointmentDateTime = fromZonedTime(algeriaAppointmentTime, ALGERIA_TIMEZONE);
    const appointmentEndTime = fromZonedTime(algeriaEndTime, ALGERIA_TIMEZONE);

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
        timeZone: ALGERIA_TIMEZONE,
      },
      end: {
        dateTime: appointmentEndTime.toISOString(),
        timeZone: ALGERIA_TIMEZONE,
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
      const algeriaAppointmentTime = new Date(`${appointmentData.date}T${appointmentData.time}:00`);
      const algeriaEndTime = addHours(algeriaAppointmentTime, 1);
      
      const appointmentDateTime = fromZonedTime(algeriaAppointmentTime, ALGERIA_TIMEZONE);
      const appointmentEndTime = fromZonedTime(algeriaEndTime, ALGERIA_TIMEZONE);
      
      updatedEvent.start = {
        dateTime: appointmentDateTime.toISOString(),
        timeZone: ALGERIA_TIMEZONE,
      };
      updatedEvent.end = {
        dateTime: appointmentEndTime.toISOString(),
        timeZone: ALGERIA_TIMEZONE,
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