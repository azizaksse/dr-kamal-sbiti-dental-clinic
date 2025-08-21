# Google Calendar API Integration Setup Guide

This guide will walk you through setting up Google Calendar API integration for appointment booking on your dental clinic website.

## Prerequisites

- A Google account
- Access to Google Cloud Platform
- Your dental clinic's Google Calendar
- SMTP email credentials (Gmail recommended)

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "Dental Clinic Booking")
4. Note down your **Project ID**

## Step 2: Enable Google Calendar API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - **Name**: `dental-booking-service`
   - **Description**: `Service account for dental appointment booking`
4. Click "Create and Continue"
5. Skip role assignment for now (click "Continue")
6. Click "Done"

## Step 4: Generate Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account name
3. Go to the "Keys" tab
4. Click "Add Key" > "Create New Key"
5. Select "JSON" format
6. Click "Create" - this will download a JSON file
7. **Keep this file secure** - it contains your private key

## Step 5: Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com/)
2. Find your clinic's calendar (or create a new one)
3. Click the three dots next to the calendar name
4. Select "Settings and sharing"
5. In the "Share with specific people" section, click "Add people"
6. Enter your service account email (from the JSON file, looks like: `dental-booking-service@your-project.iam.gserviceaccount.com`)
7. Set permission to "Make changes to events"
8. Click "Send"

## Step 6: Get Calendar ID

1. In Google Calendar, go to your clinic calendar settings
2. Scroll down to "Calendar ID"
3. Copy this ID - it usually looks like: `your-email@gmail.com` or `random-string@group.calendar.google.com`

## Step 7: Set Up Email (Gmail SMTP)

1. In your Gmail account, go to "Settings" > "Security"
2. Enable 2-factor authentication if not already enabled
3. Go to "App passwords"
4. Generate a new app password for "Mail"
5. Copy this password - you'll use it as `SMTP_PASS`

## Step 8: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google Calendar API Configuration
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
GOOGLE_CLIENT_EMAIL=dental-booking-service@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-private-key-here\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-google-project-id

# Email Configuration (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password

# Clinic Configuration
CLINIC_EMAIL=your-clinic-email@gmail.com
CLINIC_NAME=Your Dental Clinic Name
CLINIC_PHONE=+1234567890
CLINIC_ADDRESS="123 Main St, City, State 12345"

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Important Notes for Environment Variables:

1. **GOOGLE_PRIVATE_KEY**: Copy the entire private key from your JSON file, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`. Replace actual line breaks with `\n`.

2. **GOOGLE_CLIENT_EMAIL**: This is the `client_email` from your JSON file.

3. **GOOGLE_PROJECT_ID**: This is the `project_id` from your JSON file.

## Step 9: Test Configuration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/api/appointments/test-config` to test your configuration

3. You should see a JSON response indicating which services are configured correctly

## Step 10: Test Booking Flow

1. Visit `http://localhost:3000/book`
2. Fill out the appointment form
3. Check that:
   - Available time slots are displayed when you select a date
   - Booking creates an event in your Google Calendar
   - Confirmation emails are sent to both patient and clinic

## Troubleshooting

### Common Issues:

1. **"Missing Google Calendar credentials" error**
   - Check that all Google environment variables are set
   - Ensure the private key format is correct (with `\n` for line breaks)

2. **"Calendar service is not properly configured" error**
   - Verify the service account has access to the calendar
   - Check that the calendar ID is correct

3. **Email not sending**
   - Verify SMTP credentials are correct
   - Ensure Gmail app password is used (not regular password)
   - Check that 2FA is enabled on Gmail account

4. **"Time slot no longer available" error**
   - This is normal behavior when multiple users try to book the same slot
   - The system double-checks availability before confirming

### Debugging Steps:

1. Check the browser's Network tab for API call responses
2. Look at the server logs for detailed error messages
3. Test individual components:
   - Calendar availability: `/api/appointments/availability?date=2024-01-15`
   - Configuration: `/api/appointments/test-config`

## Production Deployment

When deploying to production:

1. Set all environment variables in your hosting platform
2. Update `NEXT_PUBLIC_APP_URL` to your production domain
3. Ensure your domain is added to any CORS configurations if needed
4. Test the entire flow in production environment

## Security Considerations

1. **Never commit** `.env.local` or the service account JSON file to version control
2. Keep your service account key secure
3. Regularly rotate your service account keys
4. Monitor your Google Cloud usage and billing
5. Set up proper error logging and monitoring

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are correctly set
3. Ensure your Google Calendar and Gmail are properly configured
4. Test each API endpoint individually to isolate issues

## API Endpoints

- `GET /api/appointments/availability?date=YYYY-MM-DD` - Check available time slots
- `POST /api/appointments/book` - Book an appointment
- `GET /api/appointments/test-config` - Test configuration

## Features Included

✅ **Google Calendar Integration**
- Automatic event creation
- Availability checking
- Time slot management
- Calendar sharing with service account

✅ **Email Confirmations**
- Patient confirmation emails
- Clinic notification emails
- HTML email templates
- SMTP configuration

✅ **Booking Form**
- Form validation
- Real-time availability checking
- Service type selection
- Date and time picker
- Additional notes field

✅ **Error Handling**
- Input validation
- Availability conflicts
- Configuration errors
- Email failures

✅ **User Experience**
- Responsive design
- Loading states
- Success/error messages
- Accessibility features